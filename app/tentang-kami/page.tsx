import { getCMSData } from "@/lib/cms";
import { aboutUsQuery } from "@/lib/cms";
import type { AllAboutUsContentsCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import Image from "next/image";
import type { Metadata } from "next";

const TentangKami = async () => {
  const { allAboutUsContents } = await getCMSData<AllAboutUsContentsCMS>(
    aboutUsQuery
  );
  return (
    <main className="flex-auto bg-custom-blue px-5 py-12 xl:py-24">
      <section className="flex flex-col items-center gap-12 xl:gap-24">
        {allAboutUsContents.map((section) => {
          return (
            <article
              className="group flex flex-col items-center gap-6 sm:odd:flex-row-reverse sm:even:flex-row md:gap-10 xl:gap-16"
              key={section.id}
            >
              <Image
                className="h-72 w-72 rounded-full object-cover xl:h-[360px] xl:w-[360px]"
                alt={section.image.alt}
                src={section.image.url}
                width={section.image.width}
                height={section.image.height}
              />
              <div className="flex max-w-xs flex-col items-center gap-6 sm:items-start sm:group-odd:items-end sm:group-even:items-start lg:max-w-sm xl:max-w-md 2xl:max-w-lg">
                <h1 className="w-fit border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white xl:pb-3 xl:text-5xl xl:leading-tight">
                  {section.title}
                </h1>
                <p className="text-justify font-inter-medium text-base text-custom-white xl:text-lg">
                  <StructuredText data={section.paragraph} />
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default TentangKami;

export const metadata: Metadata = {
  title: "Tentang Kami | TOASTI",
  description: "Halaman Tentang Kami Website TOASTI",
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
    title: "Tentang Kami | TOASTI",
    description: "Halaman Tentang Kami Website TOASTI",
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
    title: "Tentang Kami | TOASTI",
    description: "Halaman Tentang Kami Website TOASTI",
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
