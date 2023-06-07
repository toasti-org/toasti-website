"use client";

import { Event } from "@/types/component";
import { useState, useContext } from "react";
import { ContentPopUpContext } from "@/app/layout";
import { ContentPopUpContextType } from "@/types/component";
import CalendarPopUp from "./CalendarPopUp";

interface CalendarBox {
  date: number;
  event?: Event;
}

const CalendarBox = ({ date, event }: CalendarBox) => {
  const [popUpActive, setPopUpActive] = useState(false);
  const setContentPopUp = useContext(
    ContentPopUpContext
  ) as ContentPopUpContextType;
  return (
    <>
      {typeof event === "undefined" ? (
        // No Event
        <div className="h-20 w-full p-1 text-base shadow-[0_0px_0px_4px_rgb(187,0,172,1)] xl:h-24 xl:p-2 xl:text-lg">
          {date}
        </div>
      ) : (
        // There's an event
        <div
          className="flex h-20 w-full cursor-pointer flex-col justify-between bg-custom-pink p-1 text-custom-blue shadow-[0_0px_0px_4px_rgb(187,0,172,1)] xl:h-24 xl:p-2"
          onClick={() => {
            setContentPopUp(<CalendarPopUp event={event} />);
          }}
        >
          <div className="text-base xl:text-lg">{date}</div>
          <div className="text-xs xl:text-sm">{event.title}</div>
        </div>
      )}
    </>
  );
};

export default CalendarBox;
