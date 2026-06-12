"use client";
import React, { useState, useEffect } from "react";
import HeadinDescription from "./HeadinDescription";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({ onHandleInputChange, formData }) {
  const searchParam = useSearchParams();
  const [title, setTitle] = useState(
    formData?.title || searchParam.get("title") || ""
  );

  useEffect(() => {
    // Set initial title from URL params if not already in formData
    if (!formData?.title && searchParam.get("title")) {
      onHandleInputChange(searchParam.get("title"));
    }
  }, []);

  const handleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onHandleInputChange(newTitle);
  };

  return (
    <div className="my-10">
      <HeadinDescription
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <input
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg border-[#ed1e61] mt-5 w-full"
        value={title}
        onChange={handleChange}
      />
    </div>
  );
}

export default LogoTitle;
