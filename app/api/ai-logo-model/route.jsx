import { AILogoPrompt } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";

export async function POST(req) {
  const { prompt, email, title, desc, type } = await req.json();
  console.log("Received prompt:", prompt);
  let base64ImageWithMine = "";

  try {
    // Create a new chat session for each request
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    console.log("AI Response:", AiPromptResult);

    // Parse the response text and extract the JSON
    const responseText = AiPromptResult.response.text();
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : responseText;
    const AIPrompt = JSON.parse(jsonStr).prompt;

    try {
      if (type == "Free") {
        console.log("Sending prompt to AI Guru Lab:", AIPrompt);
        const BASE_URL = "https://aigurulab.tech";
        console.log("Sending request to AI Guru Lab with prompt:", AIPrompt);
        const result = await axios.post(
          BASE_URL + "/api/generate-image",
          {
            width: 1024,
            height: 1024,
            input: AIPrompt, // Using the AI-generated prompt
            model: "flux",
            aspectRatio: "1:1",
          },
          {
            headers: {
              "x-api-key": process.env.AI_GURU_LAB_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("AI Guru Lab API Response:", result.data);

        if (!process.env.AI_GURU_LAB_API_KEY) {
          console.error("AI_GURU_LAB_API_KEY is not configured");
          throw new Error("API key not configured");
        }

        if (!result.data || !result.data.image) {
          console.error("Invalid response from AI Guru Lab API:", result.data);
          throw new Error("Invalid response from image generation API");
        }

        // The API returns a Firebase Storage URL, so we'll use it directly
        const imageUrl = result.data.image;
        console.log("Image URL:", imageUrl);

        try {
          await setDoc(
            doc(db, "users", email, "logos", Date.now().toString()),
            {
              image: imageUrl, // Store the URL directly instead of base64
              title: title || "Untitled Logo",
              desc: desc || "No description provided",
            }
          );
          console.log("Image URL saved to Firestore successfully");
        } catch (e) {
          console.error("Firestore save error:", e);
          return NextResponse.json(
            { error: "Failed to save image to database" },
            { status: 500 }
          );
        }

        return NextResponse.json({ Image: imageUrl });
      }
    } catch (huggingFaceError) {
      console.error(
        "AI Guru Lab API Error:",
        huggingFaceError.response?.data || huggingFaceError.message
      );
      return NextResponse.json(
        {
          error: "Failed to generate image",
          details: huggingFaceError.response?.data || huggingFaceError.message,
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json(
      {
        error: e.message,
        stack: e.stack,
      },
      { status: 500 }
    );
  }
}
