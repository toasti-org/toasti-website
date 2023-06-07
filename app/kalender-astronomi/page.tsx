import { getCMSData } from "@/lib/cms";
import type { EventCMS } from "@/types/cms";
import Image from "next/image";
import Calendar from "@/components/Calendar";

export const metadata = {
  title: "Kalender Astronomi | TOASTI",
  description: "Kalender Astronomi Page Website TOASTI",
};

const KalenderAstronomi = async () => {
  const { allEvents } = await getCMSData<EventCMS>(query);
  return (
    <main className="flex flex-auto flex-col items-center gap-16 bg-custom-blue px-5 py-16 lg:flex-row lg:justify-center lg:gap-24 lg:px-16 xl:gap-32">
      {/* Calendar */}
      <Calendar allEvents={allEvents} />

      {/* 4 Nearest future events */}
      <ul className="flex flex-col gap-6 lg:gap-9">
        {allEvents
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
                className="flex flex-row items-center gap-6 lg:gap-9"
              >
                <Image
                  className="h-16 w-16 rounded-full object-cover xl:h-24 xl:w-24"
                  alt={event.image.alt}
                  src={event.image.link}
                  width={event.image.width}
                  height={event.image.height}
                />
                <div className="flex flex-col gap-1 text-custom-white xl:gap-2">
                  <div className="font-poppins-bold text-2xl xl:text-3xl">
                    {event.title}
                  </div>
                  <div className="font-inter-medium text-base xl:text-lg">
                    {new Date(event.date).toLocaleString("id-ID", {
                      dateStyle: "long",
                    })}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </main>
  );
};

export default KalenderAstronomi;

const query = `{
  allEvents(orderBy: date_ASC) {
    title
    id
    description
    date
    image {
      url
      alt
      width
      height
      id
    }
  }
}`;
