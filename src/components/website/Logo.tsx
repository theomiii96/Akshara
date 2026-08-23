import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "dark", size = "md", className = "" }: LogoProps) {
  const isWhite = variant === "white";
  
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 md:w-11 md:h-11",
    lg: "w-12 h-12 md:w-14 md:h-14",
  };

  const titleSizes = {
    sm: "text-base leading-tight",
    md: "text-lg md:text-xl leading-none",
    lg: "text-2xl md:text-3xl leading-tight",
  };

  const subtitleSizes = {
    sm: "text-[9px] tracking-wider",
    md: "text-[10px] md:text-xs tracking-wider",
    lg: "text-xs md:text-sm tracking-widest",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon SVG */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-forest-600 via-forest-700 to-forest-900 shadow-md ${iconSizes[size]} flex-shrink-0 p-2 text-white border border-forest-500/30`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Sun background glow */}
          <circle cx="24" cy="18" r="10" fill="#F59E0B" fillOpacity="0.4" />
          
          {/* Sprouting Seed & Green Leaves */}
          <path
            d="M24 38C24 38 17 32 17 22C17 14 24 10 24 10C24 10 31 14 31 22C31 32 24 38 24 38Z"
            fill="#22C55E"
          />
          <path
            d="M24 12C24 12 28 17 28 23C28 30 24 36 24 36"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Golden Wheat Stalks on Left & Right */}
          <path
            d="M12 34C14 30 14 24 18 20"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="34" r="2" fill="#F59E0B" />
          <circle cx="15" cy="27" r="2" fill="#F59E0B" />
          <circle cx="18" cy="20" r="2" fill="#F59E0B" />

          <path
            d="M36 34C34 30 34 24 30 20"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="36" cy="34" r="2" fill="#F59E0B" />
          <circle cx="33" cy="27" r="2" fill="#F59E0B" />
          <circle cx="30" cy="20" r="2" fill="#F59E0B" />

          {/* Soil Base Line */}
          <path
            d="M10 40C16 38 32 38 38 40"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-black tracking-tight ${titleSizes[size]} ${
              isWhite ? "text-white" : "text-forest-950"
            }`}
          >
            AKSHARA
          </span>
          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-harvest-500 text-stone-900 tracking-wider">
            FPC
          </span>
        </div>
        <span
          className={`font-sans font-semibold uppercase ${subtitleSizes[size]} ${
            isWhite ? "text-forest-200" : "text-forest-700"
          }`}
        >
          Farmer Producer Company
        </span>
      </div>
    </div>
  );
}
