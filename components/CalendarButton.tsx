"use client";

import Button from "./Button";
import { useContext } from "react";
import { ContentPopUpContext } from "@/app/layout";
import { ContentPopUpContextType } from "@/types/component";
import CalendarPopUp from "./CalendarPopUp";
import type { Event } from "@/types/component";

const CalendarButton = ({
  color,
  event,
}: {
  color: "pink" | "trans-pink" | "blue" | "trans-blue";
  event: Event;
}) => {
  // Get setPopUp
  const setContentPopUp = useContext(
    ContentPopUpContext
  ) as ContentPopUpContextType;

  return (
    <Button
      color={color}
      ariaLabel="Notify Event Button"
      onClick={() => setContentPopUp(<CalendarPopUp event={event} />)}
    >
      <svg
        width="28"
        height="31"
        viewBox="0 0 28 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 31.0002C14.9946 31.0002 15.9484 30.6051 16.6516 29.9018C17.3549 29.1986 17.75 28.2447 17.75 27.2502H10.25C10.25 28.2447 10.6451 29.1986 11.3483 29.9018C12.0516 30.6051 13.0054 31.0002 14 31.0002ZM15.8656 3.0608C15.8918 2.80009 15.863 2.53679 15.7812 2.28788C15.6993 2.03896 15.5662 1.80997 15.3905 1.61566C15.2147 1.42135 15.0001 1.26604 14.7606 1.15975C14.5211 1.05345 14.262 0.998535 14 0.998535C13.738 0.998535 13.4789 1.05345 13.2394 1.15975C12.9999 1.26604 12.7853 1.42135 12.6095 1.61566C12.4338 1.80997 12.3007 2.03896 12.2188 2.28788C12.137 2.53679 12.1082 2.80009 12.1344 3.0608C10.0151 3.49186 8.10992 4.6421 6.74143 6.31674C5.37295 7.99138 4.62527 10.0875 4.625 12.2502C4.625 14.3089 3.6875 23.5002 0.875 25.3752H27.125C24.3125 23.5002 23.375 14.3089 23.375 12.2502C23.375 7.71268 20.15 3.92518 15.8656 3.0608V3.0608Z"
          fill="#FDF7FA"
        />
      </svg>
    </Button>
  );
};

export default CalendarButton;
