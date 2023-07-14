import { getCMSData, allAboutToastisQuery } from "@/lib/cms";
import type { AllAboutToastisCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import Image from "next/image";
import type { Metadata } from "next";

const TentangKami = async () => {
  const { allAboutToastis } = await getCMSData<AllAboutToastisCMS>(
    allAboutToastisQuery
  );
  return (
    <main className="flex-auto bg-custom-blue px-5 py-12 xl:py-24">
      {/* IMPORTANT overflow-x-hidden CONTAINER TO FIX AOS BUG, DONT PUT ON MAIN => FOOTER BUG WHEN EXPAND (MOBILE) */}
      <div className="flex flex-col items-center gap-12 overflow-x-hidden xl:gap-24">
        {allAboutToastis.map((section, index) => {
          return (
            <section
              key={section.id}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="group flex flex-col items-center gap-6 sm:odd:flex-row-reverse sm:even:flex-row md:gap-10 xl:gap-16"
            >
              <Image
                className="h-72 w-72 rounded-full object-cover xl:h-[360px] xl:w-[360px]"
                alt={section.image.alt}
                src={section.image.url}
                width={section.image.width}
                height={section.image.height}
              />
              <div className="flex max-w-xs flex-col items-center gap-6 sm:items-start sm:group-odd:items-end sm:group-even:items-start lg:max-w-sm xl:max-w-md 2xl:max-w-lg">
                <h1 className="w-fit border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white xl:pb-4 xl:text-5xl">
                  {section.title}
                </h1>
                <div className="text-justify font-inter-medium text-base text-custom-white xl:text-lg">
                  <StructuredText data={section.description} />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default TentangKami;

export const metadata: Metadata = {
  title: "Tentang TOASTI | Tim Olimpiade Astronomi Indonesia (TOASTI)",
  description:
    "Tentang TOASTI, sejarah, visi dan misi, dan kegiatan dari Tim Olimpiade Astronomi Indonesia (TOASTI).",
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
    title: "Tentang TOASTI | Tim Olimpiade Astronomi Indonesia (TOASTI)",
    description:
      "Tentang TOASTI, sejarah, visi dan misi, dan kegiatan dari Tim Olimpiade Astronomi Indonesia (TOASTI).",
    url: "https://toasti.id/tentang-toasti",
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
    title: "Tentang TOASTI | Tim Olimpiade Astronomi Indonesia (TOASTI)",
    description:
      "Tentang TOASTI, sejarah, visi dan misi, dan kegiatan dari Tim Olimpiade Astronomi Indonesia (TOASTI).",
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
