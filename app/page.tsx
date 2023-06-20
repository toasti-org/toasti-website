import {
  getCMSData,
  allArticlesQuery,
  allAstronomyCalendarsQuery,
} from "@/lib/cms";
import type { AllArticlesCMS, AllAstronomyCalendarsCMS } from "@/types/cms";
import CarouselCards from "@/components/CarouselCards";
import StarField from "@/components/StarField";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

const Home = async () => {
  // Query data from CMS
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  const { allAstronomyCalendars } = await getCMSData<AllAstronomyCalendarsCMS>(
    allAstronomyCalendarsQuery
  );
  return (
    <main className="z-0 flex flex-auto flex-col items-center gap-20 bg-custom-blue px-5 pb-24 pt-8 xl:gap-24">
      {/* Landing Page Hero Section */}
      <section className="relative flex min-h-[calc(100vh-9rem)] w-full flex-col items-center justify-center gap-14 overflow-hidden rounded-xl px-5 text-center font-poppins-bold sm:h-[400px] lg:gap-8 xl:rounded-2xl">
        <div className="z-30 flex flex-col items-center gap-4">
          <h1
            data-aos="zoom-in"
            className="bg-gradient-to-b from-custom-white to-custom-gray bg-clip-text text-5xl tracking-widest text-transparent xl:text-7xl"
          >
            TOASTI
          </h1>
          <h2
            data-aos="zoom-in"
            data-aos-delay="100"
            className="bg-gradient-to-b from-custom-pink to-custom-dark-pink bg-clip-text text-xl tracking-wider text-transparent xl:text-3xl"
          >
            TIM OLIMPIADE ASTRONOMI INDONESIA
          </h2>
        </div>
        <div className="z-30 flex flex-col items-center gap-7 xl:gap-6">
          <div data-aos="zoom-in" data-aos-delay="200">
            <Button smoothScrollToId="artikel" color="pink">
              Artikel Terbaru
            </Button>
          </div>
          <div data-aos="zoom-in" data-aos-delay="300">
            <Button smoothScrollToId="kalender-astronomi" color="pink">
              Fenomena Astronomi Terdekat
            </Button>
          </div>
        </div>
        <StarField />
      </section>

      <div className="flex flex-col items-center gap-20 xl:gap-24">
        {/* Article Carousel Section */}
        <section
          id="artikel"
          data-aos="zoom-in"
          className="flex w-full flex-col items-center gap-8 xl:gap-10"
        >
          <h3 className="border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white sm:self-start xl:pb-3 xl:text-5xl xl:leading-tight">
            Artikel Terbaru
          </h3>
          <CarouselCards allArticles={allArticles} />
          <Link href="/artikel">
            <Button color="pink">Lihat Lebih Banyak</Button>
          </Link>
        </section>

        {/* Calendar and Youtube Video */}
        <div className="flex w-full flex-col items-center gap-20 sm:flex-row sm:gap-8 md:gap-12 lg:gap-16 2xl:gap-24">
          {/* Calendar Section */}
          <section
            id="kalender-astronomi"
            data-aos="zoom-in"
            className="flex w-fit flex-col items-center gap-8 sm:w-1/2 sm:items-start xl:gap-10"
          >
            {/* Title */}
            <h3 className="border-b-4 border-solid border-custom-pink pb-2 text-center font-poppins-bold text-3xl text-custom-white sm:self-start xl:pb-3 xl:text-5xl xl:leading-tight">
              Fenomena Astronomi Terdekat
            </h3>
            {/* 4 Nearest future events */}
            <ul className="flex flex-col gap-8 lg:gap-10">
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

          {/* Youtube Video */}
          <section
            data-aos="zoom-in"
            className="flex w-fit flex-col items-center gap-8 sm:w-1/2 sm:items-start sm:self-end xl:gap-10"
          >
            {/* Title */}
            <h3 className="border-b-4 border-solid border-custom-pink pb-2 text-center font-poppins-bold text-3xl text-custom-white sm:self-start xl:pb-3 xl:text-5xl xl:leading-tight">
              Video Terbaru
            </h3>
            {/* Iframe src is set in a way so that it grabs the latest youtube video from a channel. */}
            <iframe
              className="sm: aspect-[16/9] w-full"
              src="https://www.youtube.com/embed?listType=playlist&list=UULFS8o_R311DRq4Dp2bTN3ZdQ"
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "Beranda | TOASTI",
  description:
    "Sebuah asosiasi alumni Tim Olimpiade Astronomi Indonesia yang bertujuan untuk menciptakan akses pendidikan Astronomi yang berkualitas bagi pelajar Indonesia.",
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
    title: "Beranda | TOASTI",
    description:
      "Sebuah asosiasi alumni Tim Olimpiade Astronomi Indonesia yang bertujuan untuk menciptakan akses pendidikan Astronomi yang berkualitas bagi pelajar Indonesia.",
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
    title: "Beranda | TOASTI",
    description:
      "Sebuah asosiasi alumni Tim Olimpiade Astronomi Indonesia yang bertujuan untuk menciptakan akses pendidikan Astronomi yang berkualitas bagi pelajar Indonesia.",
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
