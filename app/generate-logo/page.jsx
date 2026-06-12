"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../_context/UserDetailsContext";
import Prompt from "../_data/Prompt";
import Colors from "../_data/Colors";
import { AILogoPrompt } from "@/configs/AiModel";
import axios from "axios";
import LoadingSpinner from "../_components/LoadingSpinner";
import { useSearchParams, useRouter } from "next/navigation";

function GenerateLogo() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [formData, setFormData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [LogoImage, setLogoImage] = useState();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");
  const router = useRouter();
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  //console.log("Form Data:", formData); // Added to debug formData

  useEffect(() => {
    if (typeof window !== "undefined" && userDetails?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log("Loaded formData:", JSON.parse(storage));
      }
    }
  }, [userDetails]);

  const GenerateAILogo = async () => {
    setLoading(true);
    if (!formData) {
      console.error("No form data available");
      return;
    }

    // Get color codes from the selected palette
    const selectedPalette = Colors.find(
      (palette) => palette.name === formData.pallete
    );
    const colorCodes = selectedPalette ? selectedPalette.colors.join(", ") : "";

    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoColor}", colorCodes)
      .replace("{logoDesign}", formData.design?.title)
      .replace("{logoIdea}", formData.idea)
      .replace("{logoPrompt}", formData.design?.prompt);

    console.log("Generated Prompt:", PROMPT);

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetails?.email,
        title: formData.title,
        desc: formData.desc,
        type: modelType,
      });

      if (result.data?.error) {
        console.error("API Error:", result.data.error);
        setLoading(false);
        // You might want to show this error to the user in the UI
        return;
      }

      console.log("API Response:", result.data);
      setLogoImage(result?.data?.Image);
    } catch (error) {
      console.error(
        "Error generating logo:",
        error.response?.data || error.message
      );
      // You might want to show this error to the user in the UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData) {
      GenerateAILogo();
    }
  }, [formData]);

  const handleRegenerate = () => {
    router.push("/create?step=2");
  };

  const handleRatingSubmit = () => {
    let message = "";
    switch (rating) {
      case 1:
        message =
          "We're sorry you're not satisfied with the logo. Would you like to try regenerating it?";
        break;
      case 2:
        message =
          "We understand this isn't quite what you were looking for. Feel free to regenerate!";
        break;
      case 3:
        message =
          "Thanks for your feedback! Let us know if you'd like to try a different style.";
        break;
      case 4:
        message = "We're glad you like the logo! Thanks for your rating!";
        break;
      case 5:
        message =
          "We're thrilled you love the logo! Thank you for the perfect rating!";
        break;
      default:
        message = "Thank you for rating your logo!";
    }
    alert(message);
    setRatingSubmitted(true);
    setHoveredRating(rating); // Set hovered rating to match the submitted rating
  };

  const handleDownload = async (format) => {
    try {
      if (format === "svg") {
        // For SVG, create a simple SVG wrapper and open in new tab
        const svgData = `
          <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
            <image href="${LogoImage}" width="1024" height="1024"/>
          </svg>
        `;
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
      } else {
        // For PNG and JPG, open the direct URL in new tab
        window.open(LogoImage, "_blank");
      }

      setShowDownloadMenu(false);
    } catch (error) {
      console.error("Failed to open image:", error);
      alert("Failed to open the image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-3xl font-bold text-[#ed1e61] mb-8 font-mono">
        Your Logo is Being Generated
      </h1>
      {Loading ? (
        <LoadingSpinner />
      ) : (
        LogoImage && (
          <div className="flex flex-col items-center gap-4">
            <img
              src={LogoImage}
              alt="Generated Logo"
              className="rounded-lg shadow-lg max-w-[300px] w-full"
              onError={(e) => {
                console.error("Error loading image:", e);
                e.target.src = "/placeholder.png"; // Add a placeholder image
              }}
            />
            <p className="text-gray-600 font-mono text-center">
              Your logo has been generated successfully!
            </p>

            {/* Star Rating Component */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <p className="text-gray-600 font-mono">Rate your logo:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-2xl focus:outline-none"
                    onClick={() => !ratingSubmitted && setRating(star)}
                    onMouseEnter={() =>
                      !ratingSubmitted && setHoveredRating(star)
                    }
                    onMouseLeave={() =>
                      !ratingSubmitted && setHoveredRating(rating)
                    }
                    disabled={ratingSubmitted}
                  >
                    <span
                      className={
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
              {rating > 0 && !ratingSubmitted && (
                <button
                  onClick={handleRatingSubmit}
                  className="mt-2 bg-green-500 text-white py-1 px-3 rounded-lg text-sm"
                >
                  Submit Rating
                </button>
              )}
              {ratingSubmitted && (
                <p className="text-green-500 font-mono mt-2">
                  Rating submitted!
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="mt-4 bg-[#ed1e61] text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Logo
                </button>
                {showDownloadMenu && (
                  <div className="absolute z-10 right-full -top-10 mr-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 pb-2" role="menu">
                      <button
                        onClick={() => handleDownload("png")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Download as PNG
                      </button>
                      <button
                        onClick={() => handleDownload("jpg")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Download as JPG
                      </button>
                      <button
                        onClick={() => handleDownload("svg")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Download as SVG
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleRegenerate}
                className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
              >
                Regenerate
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GenerateLogo;
