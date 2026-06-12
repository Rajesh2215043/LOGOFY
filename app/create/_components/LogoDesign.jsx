"use client";
import React, { useState } from "react";
import HeadinDescription from "./HeadinDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesig from "@/app/_data/LogoDesig";
import Image from "next/image";

function LogoDesign({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="my-10">
      <HeadinDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-20">
        {LogoDesig.slice(0, showMore ? LogoDesig.length : 9).map(
          (design, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedOption(design.title);
                onHandleInputChange(design);
              }}
              className={`p-1 hover:border-3 border-[#ed1e61] rounded-xl ${
                selectedOption == design.title &&
                `border-3 rounded-xl border-[#ed1e61]`
              } cursor-pointer`}
            >
              <Image
                src={design.image}
                alt={design.title}
                width={300}
                height={200}
                className="w-full rounded-xl h-[200px] object-cover"
              />
              <h2 className="my-10 text-center font-bold text-lg">
                {design.title}
              </h2>
            </div>
          )
        )}
      </div>

      {/* More Designs Button */}
      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="mt-4 px-4 py-2 rounded-lg bg-[#ed1e61] text-white hover:bg-[#d01a55] transition-colors duration-200"
        >
          More Designs
        </button>
      )}
    </div>
  );
}

export default LogoDesign;
