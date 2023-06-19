"use client";

import { Event } from "@/types/component";
import { useState, useContext } from "react";
import { ContentPopUpContext } from "@/app/layout";
import { ContentPopUpContextType } from "@/types/component";
import CalendarPopUp from "./CalendarPopUp";

interface CalendarBox {
  date: number;
  isDisabled: boolean;
  event?: Event;
}

const CalendarBox = ({ date, isDisabled, event }: CalendarBox) => {
  const setContentPopUp = useContext(
    ContentPopUpContext
  ) as ContentPopUpContextType;
  const isEvent = typeof event !== "undefined";
  return (
    <div
      className={`h-20 w-full p-1 shadow-[0_0px_0px_4px_rgb(187,0,172,1)] 2xl:h-24 2xl:p-2 ${
        isEvent && "flex flex-col justify-between"
      } ${
        isDisabled
          ? "cursor-default bg-[#cfcfcf] text-custom-white"
          : isEvent
          ? "cursor-pointer bg-custom-pink text-custom-blue"
          : "cursor-default bg-transparent text-custom-white"
      }`}
      onClick={
        !isDisabled && isEvent
          ? () => setContentPopUp(<CalendarPopUp event={event} />)
          : () => {}
      }
    >
      <div className="text-base 2xl:text-lg">{date}</div>
      {isEvent && (
        <div className="break-words text-xs 2xl:text-sm">{event.title}</div>
      )}
    </div>
  );
};

export default CalendarBox;
