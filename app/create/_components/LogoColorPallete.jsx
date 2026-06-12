"use client";
import React, { useState } from "react";
import HeadinDescription from "./HeadinDescription";
import Lookup from "@/app/_data/Lookup";
import Colors from "@/app/_data/Colors";

function LogoColorPallete({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.pallete);
  const [showCustomPalette, setShowCustomPalette] = useState(false);
  const [customColors, setCustomColors] = useState([
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
  ]);

  const handleCustomColorChange = (index, color) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);

    if (selectedOption === "custom") {
      onHandleInputChange("custom", newColors);
    }
  };

  return (
    <div className="my-10">
      <HeadinDescription
        title={Lookup.LogoColorPaletteTitle}
        description={Lookup.LogoColorPaletteDesc}
      />

      {/* Custom Palette Toggle Button */}
      <button
        onClick={() => setShowCustomPalette(!showCustomPalette)}
        className=" mt-10 mb-4 px-4 py-2 rounded-lg bg-[#ed1e61] text-white hover:bg-[#d01a55] transition-colors duration-200"
      >
        {showCustomPalette ? "Hide Custom Colors" : "Create Custom Palette"}
      </button>

      {/* Custom Color Palette Input */}
      {showCustomPalette && (
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Custom Color Palette</h3>
          <div className="flex flex-wrap gap-4">
            {customColors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    handleCustomColorChange(index, e.target.value)
                  }
                  className="w-12 h-12 p-1 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) =>
                    handleCustomColorChange(index, e.target.value)
                  }
                  className="mt-2 w-20 text-sm p-1 border rounded text-center"
                  placeholder="#000000"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setSelectedOption("custom");
              onHandleInputChange("custom", customColors);
            }}
            className={`mt-4 px-4 py-2 rounded-lg ${
              selectedOption === "custom"
                ? "bg-[#ed1e61] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Use Custom Palette
          </button>
        </div>
      )}

      {/* Existing Predefined Palettes */}
      <div className="grid grid-cols-3 md-grid-cols-2 gap-5 mt-5">
        {Colors.map((pallete, index) => (
          <div
            className={`flex flex-col cursor-pointer ${
              selectedOption === pallete.name &&
              `border-3 rounded-lg border-[#ed1e61]`
            }`}
            key={index}
          >
            <div
              className="flex p-1 w-full"
              onClick={() => {
                setSelectedOption(pallete.name);
                onHandleInputChange(pallete.name);
              }}
            >
              {pallete &&
                pallete.colors.map((color, index) => (
                  <div
                    className="h-40 w-full rounded-md"
                    key={index}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
            </div>
            <p className="text-center my-5 font-medium">{pallete.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoColorPallete;
