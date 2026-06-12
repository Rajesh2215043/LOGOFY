"use client";
import React from "react";
import Image from "next/image";
import HeadinDescription from "./HeadinDescription";
import Lookup from "@/app/_data/Lookup";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
function PricingModel({ formData }) {
  const { user } = useUser();
  useEffect(() => {
    try {
      if (formData) {
        console.log("Attempting to store formData:", formData);
        localStorage.setItem("formData", JSON.stringify(formData));
        console.log("Successfully stored formData in localStorage");
      } else {
        console.log("formData is not available yet");
      }
    } catch (error) {
      console.error("Error storing formData in localStorage:", error);
    }
  }, [formData]);
  return (
    <div className="my-10">
      <HeadinDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {Lookup.pricingOption.map((pricing, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-10 border rounded-lg"
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="text-2xl font-medium ">{pricing.title}</h2>
            <div className="mt-5">
              {pricing.features.map((feature, index) => (
                <h2 className="mt-5" key={index}>
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              <Link href={"/generate-logo?type=" + pricing.title}>
                <Button className="mt-5">{pricing.button}</Button>
              </Link>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/generate-logo?type=" + pricing.title}
              >
                <Button className="mt-5">{pricing.button}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
