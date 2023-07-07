import { getCMSData, allAstronomyCalendarsQuery } from "@/lib/cms";
import type { AllAstronomyCalendarsCMS } from "@/types/cms";
import Image from "next/image";
import Calendar from "@/components/Calendar";
import CalendarButton from "@/components/CalendarButton";
import type { Metadata } from "next";

const KalenderAstronomi = async () => {
  const { allAstronomyCalendars } = await getCMSData<AllAstronomyCalendarsCMS>(
    allAstronomyCalendarsQuery
  );
  return (
    <main className="flex-auto bg-custom-blue px-5 py-16 lg:px-16">
      {/* IMPORTANT overflow-x-hidden CONTAINER TO FIX AOS BUG, DONT PUT ON MAIN => FOOTER BUG WHEN EXPAND (MOBILE) */}
      <div className="flex flex-col items-center gap-16 overflow-x-hidden lg:flex-row lg:justify-center 2xl:gap-32">
        {/* Calendar */}
        <section data-aos="zoom-in">
          <Calendar allAstronomyCalendars={allAstronomyCalendars} />
        </section>

        {/* 4 Nearest future events */}
        <section
          data-aos="zoom-in"
          className="flex flex-col items-center gap-8 lg:gap-10 lg:self-start"
        >
          <h3 className="border-b-4 border-solid border-custom-pink pb-2 text-center font-poppins-bold text-3xl text-custom-white lg:self-start xl:pb-3 xl:text-5xl xl:leading-tight">
            Fenomena Terdekat
          </h3>
          <ul className="flex w-full max-w-sm flex-col gap-8 sm:max-w-md lg:max-w-sm lg:gap-10 xl:max-w-md 2xl:max-w-lg">
            {allAstronomyCalendars
              .filter((event) => {
                const timeEvent = new Date(event.date).getTime();
                const timeNow = new Date().getTime();
                return timeEvent >= timeNow;
              })
              .slice(0, 4)
              .map((event, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-row items-center gap-6 xl:gap-9"
                  >
                    <Image
                      className="h-16 w-16 rounded-full object-cover xl:h-24 xl:w-24"
                      alt={event.image.alt}
                      src={event.image.url}
                      width={event.image.width}
                      height={event.image.height}
                    />
                    <div className="flex w-full flex-col gap-1 text-custom-white xl:gap-2">
                      <div className="line-clamp-1 break-all font-poppins-bold text-xl xl:text-2xl">
                        {event.title}
                      </div>
                      <div className="line-clamp-1 break-all font-inter-medium text-base xl:text-lg">
                        {new Date(event.date).toLocaleString("id-ID", {
                          dateStyle: "long",
                        })}
                      </div>
                    </div>
                    <CalendarButton color="pink" event={event} />
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default KalenderAstronomi;

export const metadata: Metadata = {
  title: "Kalender Astronomi | Tim Olimpiade Astronomi Indonesia (TOASTI)",
  description:
    "Kalender berisi fenomena-fenomena astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia (TOASTI).",
  generator: "Next.js",
  applicationName: "Tim Olimpiade Astronomi Indonesia (TOASTI)",
  keywords: [
    "TOASTI",
    "Tim Olimpiade Astronomi Indonesia",
    "Website TOASTI",
    "Astronomi",
    "OSN Astronomi",
    "OSP Astronomi",
    "OSK Astronomi",
  ],
  colorScheme: "dark",
  category: "education",
  themeColor: "#1A3072",
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  openGraph: {
    title: "Kalender Astronomi | Tim Olimpiade Astronomi Indonesia (TOASTI)",
    description:
      "Kalender berisi fenomena-fenomena astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia (TOASTI).",
    url: "https://toasti.id/kalender-astronomi",
    siteName: "Tim Olimpiade Astronomi Indonesia (TOASTI)",
    images: [
      {
        url: "https://toasti.id/toasti-link-preview.png",
        width: 1200,
        height: 630,
        alt: "TOASTI Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalender Astronomi | Tim Olimpiade Astronomi Indonesia (TOASTI)",
    description:
      "Kalender berisi fenomena-fenomena astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia (TOASTI).",
    images: [
      {
        url: "https://toasti.id/toasti-link-preview.png",
        width: 1200,
        height: 630,
        alt: "TOASTI Logo",
      },
    ],
  },
};
