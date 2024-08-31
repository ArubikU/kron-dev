import React from "react";
import { ThemeColors } from "./Theme";

export const BlackAndWhiteTheme: ThemeColors = {
    placeholderWither: "placeholder-[#000000]",  // Gris Claro
    placeholderTranslucent: "placeholder-[#000000]/60",
    fullTextColor: 'text-[#000000]',              // Negro
    fillTextColor: 'fill-[#000000]',              // Negro
    fullTextColorStyleTwo: 'text-[#FFFFFF]',              // Negro
    fullTextColorStyleThree: 'text-[#FFFFFF]',              // Negro
    textColor: 'text-[#000000]/60',
    borderColor: 'border-[#666666]/20',           // Gris Medio
    borderWither: 'border-[#666666]/20',
    kronShadow: 'bg-[#000000]/10',                // Gris Claro
    hoverKronShadow: 'hover:bg-[#000000]/10',
    bgWither: 'bg-[#CCCCCC]/10',
    mainColor: 'bg-[#000000]',                    // Negro (Principal)
    borderMainColor: 'border-[#000000]',
    fromMainColor: 'from-[#000000]',
    toMainColor: 'to-[#333333]',       
    menuColor: "#FFFFFF",           // Gris Oscuro
    viaMainColor: 'via-[#666666]',                // Gris Medio
    mainColorTrans: 'bg-[#FFFFFF]/80',
    mainColorTransless: 'bg-[#FFFFFF]/60',
    borderContrast4: 'border-[#FFFFFF]',          // Blanco
    tobgContrast4: 'to-[#FFFFFF]',
    viabgcomplement: 'via-[#CCCCCC]',             // Gris Claro
    gradient: 'bg-[#FFFFFF]',
    buttons: [
        { bg: "bg-[#000000]", hover: "hover:bg-[#000000]/80", bgshadow: "bg-[#000000]/80" }, // Negro
        { bg: "bg-[#333333]", hover: "hover:bg-[#333333]/80", bgshadow: "bg-[#333333]/80" }, // Gris Oscuro
        { bg: "bg-[#666666]", hover: "hover:bg-[#666666]/80", bgshadow: "bg-[#666666]/80" }, // Gris Medio
        { bg: "bg-[#999999]", hover: "hover:bg-[#999999]/80", bgshadow: "bg-[#999999]/80" }, // Gris
        { bg: "bg-[#CCCCCC]", hover: "hover:bg-[#CCCCCC]/80", bgshadow: "bg-[#CCCCCC]/80" }, // Gris Claro
        { bg: "bg-[#E5E5E5]", hover: "hover:bg-[#E5E5E5]/80", bgshadow: "bg-[#E5E5E5]/80" }, // Gris muy Claro
        { bg: "bg-[#FFFFFF]", hover: "hover:bg-[#FFFFFF]/80", bgshadow: "bg-[#FFFFFF]/80" }, // Blanco
      ],
      logo:  (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="20" fill="#ffffff" />
          <path
            d="M10 30V10H15L20 15L25 10H30V30H25V17.5L20 22.5L15 17.5V30H10Z"
            fill="#000000"
          />
        </svg>
      )
};
