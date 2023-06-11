import { getCMSData, allArticlesQuery, allEventsQuery } from "@/lib/cms";
import type { AllArticlesCMS, AllEventsCMS } from "@/types/cms";
import CarouselCards from "@/components/CarouselCards";
import StarField from "@/components/StarField";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Beranda | TOASTI",
  description: "Halaman Beranda Website TOASTI",
};

const Home = async () => {
  // Query data from CMS
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  const { allEvents } = await getCMSData<AllEventsCMS>(allEventsQuery);
  return (
    <main className="z-0 flex flex-auto flex-col items-center gap-20 bg-custom-blue px-5 pb-24 pt-8 xl:gap-24">
      {/* Landing Page Hero Section */}
      <section className="relative flex min-h-[calc(100vh-9rem)] w-full flex-col items-center justify-center gap-14 overflow-hidden rounded-xl px-5 text-center font-poppins-bold sm:h-[400px] lg:gap-8 xl:rounded-2xl">
        <div className="z-30 flex flex-col items-center gap-4">
          <h1 className="text-5xl tracking-widest text-custom-white xl:text-7xl">
            TOASTI
          </h1>
          <h2 className="text-xl tracking-wider text-custom-pink xl:text-3xl">
            TIM OLIMPIADE ASTRONOMI INDONESIA
          </h2>
        </div>
        <div className="z-30 flex flex-col items-center gap-7 xl:gap-6">
          <Button
            smoothScrollToId="artikel"
            paddingX="25px"
            paddingY="14px"
            color="pink"
          >
            Artikel TOASTI
          </Button>
          <Button
            smoothScrollToId="kalender-astronomi"
            paddingX="25px"
            paddingY="14px"
            color="pink"
          >
            Kalender Astronomi
          </Button>
        </div>
        <StarField />
      </section>

      <div className="flex flex-col items-center gap-20 xl:gap-24">
        {/* Article Carousel Section */}
        <section
          id="artikel"
          className="flex w-fit flex-col items-center gap-8 xl:gap-10"
        >
          <h3 className="line-clamp-3 border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white sm:self-start xl:pb-3 xl:text-5xl xl:leading-tight">
            Artikel TOASTI
          </h3>
          <CarouselCards allArticles={allArticles} />
          <Link href="/artikel">
            <Button color="pink">Lihat Lebih Banyak</Button>
          </Link>
        </section>

        {/* Calendar Section */}
        <section
          id="kalender-astronomi"
          className="flex w-fit flex-col items-center gap-8 self-start sm:items-start xl:gap-10"
        >
          {/* Title */}
          <h3 className="line-clamp-3 border-b-4 border-solid border-custom-pink pb-2 text-center font-poppins-bold text-3xl text-custom-white sm:self-start xl:pb-3 xl:text-5xl xl:leading-tight">
            Fenomena Astronomi Terdekat
          </h3>
          {/* 4 Nearest future events */}
          <ul className="flex flex-col gap-8 lg:gap-10">
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
                      src={event.image.url}
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
          <Link href="/kalender-astronomi">
            <Button color="pink">Lihat Lebih Banyak</Button>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Home;
