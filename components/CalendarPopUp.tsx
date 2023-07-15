"use client";

import { Event } from "@/types/component";
import { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { ContentPopUpContext } from "@/app/layout";
import { ContentPopUpContextType } from "@/types/component";
import Button from "./Button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { StructuredText } from "react-datocms/structured-text";

const CalendarPopUp = ({ event }: { event: Event }) => {
  // Get Session
  const { data: session } = useSession();

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
        className="relative flex h-fit w-[300px] cursor-default flex-col items-center gap-4 overflow-y-auto rounded-xl border-4 border-custom-dark-pink bg-custom-light-blue px-4 pb-5 pt-11 text-custom-blue sm:h-[90vh] sm:w-[375px] lg:h-fit xl:w-[450px] xl:gap-6 xl:px-5 xl:pb-6 xl:pt-12"
      >
        {/* Title and Image */}
        <div className="flex w-full flex-row items-center gap-5 xl:gap-7">
          <Image
            className="h-16 w-16 rounded-full object-cover xl:h-20 xl:w-20"
            src={event.image.url}
            width={event.image.width}
            height={event.image.height}
            alt={event.image.alt}
          />
          <h4 className="line-clamp-2 w-full font-poppins-bold text-2xl xl:text-3xl">
            {event.title}
          </h4>
        </div>

        {/* Paragraph */}
        <div className="w-full text-justify font-inter-medium text-base xl:text-lg">
          <StructuredText data={event.description} />
        </div>

        {/* Close Button */}
        <button
          className="group absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-custom-blue xl:right-3 xl:top-3"
          onClick={() => setContentPopUp(undefined)}
        >
          <svg
            className="h-4 fill-custom-white xl:group-hover:fill-custom-pink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>

        {/* Reminder Button */}
        <Button
          color="blue"
          onClick={
            session
              ? async () => {
                  // Set timeout 12 seconds if no response for better UX
                  const controller = new AbortController();
                  const timeoutId = setTimeout(() => controller.abort(), 12000);

                  // Loading and Close PopUp
                  setContentPopUp(undefined);
                  const toastId = toast.loading("Menambahkan ke kalender...");

                  // Fetch Api Route
                  try {
                    await fetch("/api/insert-calendar", {
                      method: "POST",
                      body: JSON.stringify(event),
                      signal: controller.signal,
                    }).then((res) => {
                      // Close loading toast
                      toast.dismiss(toastId);
                      if (res.ok) {
                        // Success 2xx
                        toast.success("Berhasil menambahkan ke kalender");
                      } else {
                        // Error 4xx or 5xx
                        toast.error("Gagal menambahkan ke kalender");
                      }
                    });
                  } catch {
                    // Network Error
                    toast.dismiss(toastId);
                    toast.error("Gagal menambahkan ke kalender");
                  } finally {
                    clearTimeout(timeoutId);
                  }
                }
              : () => {
                  // Close PopUp and Show Error TOAST
                  setContentPopUp(undefined);
                  toast.error("Anda harus login terlebih dahulu");
                }
          }
        >
          Tambah Ke Kalender
        </Button>
      </div>
    </div>
  );
};

export default CalendarPopUp;
