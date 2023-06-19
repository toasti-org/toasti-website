import { getCMSData, allStudyMaterialsQuery } from "@/lib/cms";
import type { AllStudyMaterialsCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import Button from "@/components/Button";
import Link from "next/link";
import type { Metadata } from "next";

const MateriBelajar = async () => {
  const { allStudyMaterials } = await getCMSData<AllStudyMaterialsCMS>(
    allStudyMaterialsQuery
  );

  return (
    <main className="flex-auto bg-custom-blue px-5 py-12 xl:py-16">
      <section className="flex flex-col items-center gap-12 xl:gap-16">
        {allStudyMaterials.map((section) => {
          return (
            <article
              className="flex max-w-xs flex-col items-center gap-6 sm:max-w-md sm:odd:items-start sm:even:items-end md:max-w-lg lg:max-w-xl xl:max-w-3xl xl:gap-8 2xl:max-w-4xl"
              key={section.id}
            >
              <h1 className="w-fit border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white xl:pb-3 xl:text-5xl xl:leading-tight">
                {section.title}
              </h1>
              <p className="text-justify font-inter-medium text-base text-custom-white xl:text-lg">
                <StructuredText data={section.paragraph} />
              </p>
              <Link href={section.buttonUrl} target="_blank">
                <Button color="pink">{section.buttonText}</Button>
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default MateriBelajar;

export const metadata: Metadata = {
  title: "Materi Belajar | TOASTI",
  description:
    "Materi belajar untuk persiapan olimpiade astronomi oleh Tim Olimpiade Astronomi Indonesia.",
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
    "Materi Belajar",
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
    title: "Materi Belajar | TOASTI",
    description:
      "Materi belajar untuk persiapan olimpiade astronomi oleh Tim Olimpiade Astronomi Indonesia.",
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
    title: "Materi Belajar | TOASTI",
    description:
      "Materi belajar untuk persiapan olimpiade astronomi oleh Tim Olimpiade Astronomi Indonesia.",
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
