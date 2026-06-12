import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-[#ed1e61] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ed1e61] font-mono border-b-2 border-[#ed1e61] mt-10">
          Generating...
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
