"use client";

interface CarouselButton {
  type: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}

const CarouselButton = ({ type, disabled, onClick }: CarouselButton) => {
  return (
    <button
      className={`group p-2 ${disabled && "cursor-not-allowed"}`}
      disabled={disabled}
      type="button"
      aria-label={`${type} button`}
      onClick={() => onClick()}
    >
      <svg
        className={`${
          !disabled
            ? "fill-custom-pink xl:group-hover:fill-custom-dark-pink"
            : "fill-custom-gray"
        } ${
          type === "previous" ? "rotate-180" : "rotate-0"
        } transition-all duration-300 ease-in-out`}
        width="24"
        height="28"
        viewBox="0 0 24 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 14L0 28L0 0L24 14Z" />
      </svg>
    </button>
  );
};

export default CarouselButton;
