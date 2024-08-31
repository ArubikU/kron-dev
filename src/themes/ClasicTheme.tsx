import React from "react"
import { ThemeColors } from "./Theme"
export const ClasicTheme: ThemeColors = {
  placeholderWither: "placeholder-[#FFF6E9]",
  placeholderTranslucent: "placeholder-[#FFF6E9]/60",
  fullTextColor: 'text-[#FFF6E9]',
  fillTextColor: 'fill-[#FFF6E9]',
  textColor: 'text-[#FFF6E9]/60',
  fullTextColorStyleTwo: 'text-[#FFBF00]', // Negro
  fullTextColorStyleThree: 'text-[#FFF6E9]', // Negro
  borderColor: 'border-[#FFF6E9]/20',
  borderWither: 'border-[#FFF6E9]/20',
  kronShadow: 'bg-[#FFF6E9]/10',
  hoverKronShadow: 'hover:bg-[#FFF6E9]/10',
  bgWither: 'bg-[#FFF6E9]/10',
  menuColor: "#000000",
  mainColor: 'bg-[#960018]',
  borderMainColor: 'border-[#960018]',
  fromMainColor: 'from-[#960018]',
  toMainColor: 'to-[#960018]',
  viaMainColor: 'via-[#960018]',
  mainColorTrans: 'bg-[#960018]/80',
  mainColorTransless: 'bg-[#960018]/60',
  borderContrast4: 'border-[#FCAE1E]',
  tobgContrast4: 'to-[#FCAE1E]',
  viabgcomplement: 'via-[##C8442C]',
  gradient: 'bg-gradient-to-br from-[#960018] to-[#FCAE1E] via-[#C8442C]',
  buttons: [
    { bg: "bg-[#960018]", hover: "hover:bg-[#960018]/80" ,bgshadow: "bg-[#ab3346]"},
    { bg: "bg-[#E34234]", hover: "hover:bg-[#E34234]/80" ,bgshadow: "bg-[#E34234]/80"},
    { bg: "bg-[#FF7F50]", hover: "hover:bg-[#FF7F50]/80" ,bgshadow: "bg-[#FF7F50]/80"},
    { bg: "bg-[#FFA07A]", hover: "hover:bg-[#FFA07A]/80" ,bgshadow: "bg-[#FFA07A]/80"},
    { bg: "bg-[#FFA500]", hover: "hover:bg-[#FFA500]/80" ,bgshadow: "bg-[#FFA500]/80"},
    { bg: "bg-[#FCAE1E]", hover: "hover:bg-[#FCAE1E]/80" ,bgshadow: "bg-[#FCAE1E]/80"},
    { bg: "bg-[#FFBF00]", hover: "hover:bg-[#FFBF00]/80" ,bgshadow: "bg-[#FFBF00]/80"},
  ],
  logo: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#FCAE1E" />
      <path
        d="M10 30V10H15L20 15L25 10H30V30H25V17.5L20 22.5L15 17.5V30H10Z"
        fill="#960018"
      />
    </svg>
  )
}