"use client";

import { useState } from "react";
import CarouselButton from "./CarouselButton";
import CalendarBox from "./CalendarBox";
import { AllEventsCMS } from "@/types/cms";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "@/lib/framer";

// CONSTRAINT: 1 DATE CAN ONLY HAVE 1 EVENT!
const Calendar = ({ allEvents }: AllEventsCMS) => {
  // Convert each dates to number and sort them from lowest to highest
  const numberDates = allEvents.map((event) => {
    return new Date(event.date).getTime();
  });
  numberDates.sort();

  // Get the maximum index (minimum index is set to be 0)
  const minDate = new Date(numberDates[0]);
  const maxDate = new Date(numberDates[numberDates.length - 1]);
  const rangeMaxMinMonth = // Max - Min (Number of Month Difference)
    maxDate.getMonth() -
    minDate.getMonth() +
    12 * (maxDate.getFullYear() - minDate.getFullYear());
  const idxMin = 0;
  const idxMax = idxMin + rangeMaxMinMonth;

  // Get initial index (Based on current month & year)
  const nowDate = new Date();
  const rangeNowMinMonth =
    nowDate.getMonth() -
    minDate.getMonth() +
    12 * (nowDate.getFullYear() - minDate.getFullYear());
  const idxNow = idxMin + rangeNowMinMonth;

  // Carousel State
  const [idxShow, setIdxShow] = useState(idxNow);
  const [direction, setDirection] = useState(0);
  const monthNumberShow = minDate.getMonth() + ((idxShow - idxMin) % 12);
  const yearNumberShow =
    minDate.getFullYear() + Math.floor((idxShow - idxMin) / 12);
  const countDaysShow = new Date(
    yearNumberShow,
    monthNumberShow + 1,
    0
  ).getDate();

  // Create array of days for the shown month [1..countDaysShow-1]
  const showDates = Array.from({ length: countDaysShow }, (_, i) => i + 1);
  const showDays = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-[300px] overflow-x-auto font-poppins-bold sm:w-auto">
      {/* Shown Month & Year and Buttons */}
      <div className="flex w-[400px] flex-row justify-between sm:w-auto">
        {/* Previous Button */}
        <CarouselButton
          type="previous"
          onClick={() => {
            setIdxShow(idxShow - 1);
            setDirection(-1);
          }}
          disabled={idxNow < idxMin ? idxShow === idxNow : idxShow === idxMin}
        />

        {/* Month & Year */}
        <div className="text-4xl xl:text-5xl">
          {new Date(yearNumberShow, monthNumberShow).toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
          })}
        </div>

        {/* Next Button */}
        <CarouselButton
          type="next"
          onClick={() => {
            setIdxShow(idxShow + 1);
            setDirection(+1);
          }}
          disabled={idxNow > idxMax ? idxShow === idxNow : idxShow === idxMax}
        />
      </div>

      {/* Calendar */}
      <div className="relative h-[492px] w-[592px] overflow-hidden xl:h-[576px] xl:w-[704px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            variants={variants}
            animate="animate"
            initial="initial"
            exit="exit"
            className="absolute inset-0"
            key={allEvents[idxShow].id}
            custom={direction}
          >
            <div className="grid grid-cols-[80px_80px_80px_80px_80px_80px_80px] gap-1 p-1 xl:grid-cols-[96px_96px_96px_96px_96px_96px_96px]">
              {/* Days */}
              {showDays.map((date) => {
                const showDate = new Date(
                  yearNumberShow,
                  monthNumberShow,
                  date
                );
                return (
                  <div
                    key={date}
                    className="flex justify-center py-5 text-base text-custom-white xl:text-lg"
                  >
                    {showDate.toLocaleString("id-ID", { weekday: "long" })}
                  </div>
                );
              })}
              {/* Dates */}
              {showDates.map((date) => {
                const showDate = new Date(
                  yearNumberShow,
                  monthNumberShow,
                  date
                );
                for (let i = 0; i < allEvents.length; i++) {
                  const eventDate = new Date(allEvents[i].date);
                  if (
                    eventDate.getDate() === showDate.getDate() &&
                    eventDate.getMonth() === showDate.getMonth() &&
                    eventDate.getFullYear() === showDate.getFullYear()
                  ) {
                    // There's an event
                    return (
                      <CalendarBox
                        key={date}
                        date={date}
                        event={allEvents[i]}
                      />
                    );
                  }
                }
                // No event
                return <CalendarBox key={date} date={date} />;
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Calendar;
