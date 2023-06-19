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
    <main className="flex flex-auto flex-col items-center gap-16 bg-custom-blue px-5 py-16 lg:flex-row lg:justify-center lg:px-16 2xl:gap-32">
      {/* Calendar */}
      <Calendar allAstronomyCalendars={allAstronomyCalendars} />

      {/* 4 Nearest future events */}
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
                  <div className="line-clamp-1 break-all font-poppins-bold text-2xl xl:text-3xl">
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
    </main>
  );
};

export default KalenderAstronomi;

export const metadata: Metadata = {
  title: "Kalender Astronomi | TOASTI",
  description:
    "Kalender berisi fenomena-fenomena astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia.",
  generator: "Next.js",
  applicationName: "Website TOASTI",
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
  creator: "Tim Website TOASTI",
  category: "education",
  themeColor: "#1A3072",
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  openGraph: {
    title: "Kalender Astronomi | TOASTI",
    description:
      "Kalender berisi fenomena-fenomena astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia.",
    url: "https://toasti.id",
    siteName: "Website TOASTI",
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
    title: "Kalender Astronomi | TOASTI",
    description:
      "Kalender berisi fenomena-fenomena astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia.",
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
