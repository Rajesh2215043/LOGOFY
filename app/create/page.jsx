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

      <div className="flex justify-between mt-10">
        {step != 1 && (
          <Button variant={"outline"} onClick={() => setStep(step - 1)}>
            <ArrowLeft />
            Previous
          </Button>
        )}
        <Button onClick={() => setStep(step + 1)}>
          <ArrowRight />
          Continue
        </Button>
      </div>
    </div>
  );
}

export default page;
