"use client";

import { useState, useEffect } from "react";

interface Button {
  children: string | React.ReactNode;
  color: "pink" | "trans-pink" | "blue" | "trans-blue";
  disabled: boolean;
  onClick: (e: React.MouseEvent) => void;
  fullWidth: boolean;
  type: "submit" | "button" | "reset";
  paddingX: string;
  paddingY: string;
  ariaLabel?: string;
  smoothScrollToId?: string;
}

const bgColorDefault = {
  pink: "bg-custom-dark-pink text-white xl:hover:bg-custom-pink",
  "trans-pink":
    "border-2 border-solid border-custom-dark-pink bg-white bg-opacity-0 text-custom-dark-pink xl:hover:bg-opacity-20",
  blue: "bg-custom-blue text-white xl:hover:bg-[#234099]",
  "trans-blue":
    "border-2 border-solid border-custom-blue bg-white bg-opacity-0 text-custom-blue xl:hover:bg-opacity-20",
} as const;

const bgColorTransition = {
  pink: "bg-custom-soft-black",
  "trans-pink": "bg-custom-white",
  blue: "bg-custom-soft-black",
  "trans-blue": "bg-custom-white",
} as const;

const Button = ({
  children,
  color,
  disabled,
  onClick,
  fullWidth,
  type,
  paddingX,
  paddingY,
  ariaLabel,
  smoothScrollToId,
}: Button) => {
  const [click, setClick] = useState(false); // Value alternates everytime it is clicked (determines if the button is clicked)
  const [clickedStyle, setClickedStyle] = useState(false); // Value alternates everytime the button state is changed (determines the button styling)

  // useEffect To Reset Button & Cleanup timeout everytime the button is clicked
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setClickedStyle(false); // Reset styling
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [click]);

  return (
    <button
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      onClick={(e) => {
        setClickedStyle(true); // Update styling
        setClick(!click); // Tell button is clicked
        onClick(e); // Custom function
        if (smoothScrollToId) {
          const element = document.getElementById(smoothScrollToId);
          var headerOffset = 100;
          var elementPosition = element?.getBoundingClientRect().top as number;
          var offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }}
      style={{ padding: `${paddingY} ${paddingX}` }}
      className={`xl:transititon relative flex h-fit items-center justify-center overflow-hidden rounded-md font-poppins-bold text-base shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] xl:duration-300 xl:ease-in-out ${
        fullWidth ? "w-full" : "w-fit"
      } ${disabled && "cursor-not-allowed bg-custom-gray text-white"} ${
        !disabled && bgColorDefault[color]
      }`}
    >
      {/* Content */}
      <span className="z-10">{children}</span>

      {/* Circle Zoom Effect When Clicked */}
      <div
        className={`absolute z-0 aspect-square rounded-full ${
          clickedStyle
            ? `w-[150%] transition-width delay-[40ms] duration-100 ease-in ${bgColorTransition[color]}`
            : "w-9 bg-transparent"
        }`}
      />
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  fullWidth: false,
  paddingX: "25px",
  paddingY: "15px",
  type: "button",
  onClick: () => {
    return;
  },
};

export default Button;
