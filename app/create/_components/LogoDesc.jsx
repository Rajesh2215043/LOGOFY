import React from "react";
import HeadinDescription from "./HeadinDescription";
import Lookup from "@/app/_data/Lookup";

function LogoDesc({ onHandleInputChange, formData }) {
  return (
    //<div className="relative min-h-screen w-full overflow-hidden bg-amber-200">
    <div className="my-10">
      <HeadinDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDescDesc}
      />
      <input
        type="text"
        placeholder={Lookup.InputtitlePlaceHolder}
        className="p-4 border rounded-lg border-[#ed1e61] mt-5 w-full"
        defaultValue={formData?.desc}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
    //</div>
  );
}

export default LogoDesc;
