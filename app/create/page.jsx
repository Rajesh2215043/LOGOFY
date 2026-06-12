"use client";
import React, { useState, useEffect } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPallete from "./_components/LogoColorPallete";
import LogoDesign from "./_components/LogoDesign";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import { useSearchParams } from "next/navigation";

function page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const searchParams = useSearchParams();
  const isNewSession = !searchParams.get("continue");

  useEffect(() => {
    // Clear localStorage for new sessions
    if (isNewSession) {
      localStorage.removeItem("formData");
      console.log("Starting new session - cleared localStorage");
    } else {
      // Load data only if continuing an existing session
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Loading existing session data:", parsedData);
        setFormData(parsedData);
      }
    }
  }, [isNewSession]);

  const onHandleInputChange = (field, value) => {
    console.log("Updating formData:", field, value);
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      console.log("New formData state:", newData);
      return newData;
    });
  };

  const isContinueDisabled = () => {
    if (!formData) return true;
    switch(step) {
      case 1: return !formData.title?.trim();
      case 2: return !formData.desc?.trim();
      case 3: return !formData.pallete;
      case 4: return !formData.design?.title; // Assuming design is an object with title, or just check truthy
      case 5: return !formData.idea?.trim();
      default: return false;
    }
  };

  // Log formData changes and save to localStorage
  useEffect(() => {
    console.log("formData updated:", formData);
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="mt-28 p-10 border border-gray-500 rounded-xl shadow-lg 2xl:mx-72">
      {step == 1 ? (
        <LogoTitle
          onHandleInputChange={(v) => onHandleInputChange("title", v)}
          formData={formData}
        />
      ) : step == 2 ? (
        <LogoDesc
          onHandleInputChange={(v) => onHandleInputChange("desc", v)}
          formData={formData}
        />
      ) : step == 3 ? (
        <LogoColorPallete
          onHandleInputChange={(v) => onHandleInputChange("pallete", v)}
          formData={formData}
        />
      ) : step == 4 ? (
        <LogoDesign
          onHandleInputChange={(v) => onHandleInputChange("design", v)}
          formData={formData}
        />
      ) : step == 5 ? (
        <LogoIdea
          onHandleInputChange={(v) => onHandleInputChange("idea", v)}
          formData={formData}
        />
      ) : step == 6 ? (
        <PricingModel
          onHandleInputChange={(v) => onHandleInputChange("pricing", v)}
          formData={formData}
        />
      ) : null}

      {/* Sticky Bottom Navigation Bar */}
      <div className="flex justify-between items-center sticky bottom-5 mt-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-200 z-50">
        {step != 1 ? (
          <Button variant={"outline"} onClick={() => setStep(step - 1)}>
            <ArrowLeft className="mr-2" />
            Previous
          </Button>
        ) : (
          <div></div> // Empty div to keep 'Continue' on the right
        )}
        <Button onClick={() => setStep(step + 1)} disabled={isContinueDisabled()}>
          Continue
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default page;
