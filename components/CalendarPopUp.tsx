"use client";

import { Event } from "@/types/component";
import { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { ContentPopUpContext } from "@/app/layout";
import { ContentPopUpContextType } from "@/types/component";

const CalendarPopUp = ({ event }: { event: Event }) => {
  // Get setPopUp
  const setContentPopUp = useContext(
    ContentPopUpContext
  ) as ContentPopUpContextType;

  // PopUp Rev
  const popUpRef = useRef<HTMLDivElement>(null);

  // Close PopUp
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If Userclick is in the black background stuff
      if (!popUpRef.current?.contains(event.target as Node)) {
        setContentPopUp(undefined);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setContentPopUp]);

  return (
    <div className="fixed inset-0 z-40 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50">
      <div
        ref={popUpRef}
        className="relative flex h-fit w-[300px] cursor-default flex-col gap-4 rounded-xl border-4 border-custom-dark-pink bg-custom-light-blue px-4 pb-5 pt-11 text-custom-blue xl:w-[350px]"
      >
        {/* Title and Image */}
        <div className="flex flex-row items-center gap-3">
          <Image
            className="h-16 w-16 rounded-full object-cover"
            src={event.image.link}
            width={event.image.width}
            height={event.image.height}
            alt={event.image.alt}
          />
          <h4 className="line-clamp-2 max-w-[150px] font-poppins-bold text-2xl xl:text-3xl">
            {event.title}
          </h4>
        </div>

        {/* Paragraph */}
        <p className="font-inter-medium text-base xl:text-lg">
          {event.description}
        </p>

        {/* Close Button */}
        <button
          className="group absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-custom-blue"
          onClick={() => setContentPopUp(undefined)}
        >
          <svg
            className="h-4 fill-custom-white lg:group-hover:fill-custom-pink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarPopUp;
