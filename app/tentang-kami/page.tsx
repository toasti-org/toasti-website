import { getCMSData } from "@/lib/cms";
import { aboutUsQuery } from "@/lib/cms";
import type { AboutUsPageCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import Image from "next/image";

export const metadata = {
  title: "Tentang Kami | TOASTI",
  description: "Halaman Tentang Kami Website TOASTI",
};

const TentangKami = async () => {
  const { aboutUsPage } = await getCMSData<AboutUsPageCMS>(aboutUsQuery);
  return (
    <main className="flex-auto bg-custom-blue px-5 py-12 xl:py-24">
      <section className="flex flex-col items-center gap-12 xl:gap-24">
        {aboutUsPage.aboutUsSections.map((section) => {
          return (
            <article
              className="flex flex-col items-center gap-6 sm:odd:flex-row-reverse sm:even:flex-row md:gap-10 xl:gap-16"
              key={section.id}
            >
              <Image
                className="h-72 w-72 rounded-full object-cover xl:h-[360px] xl:w-[360px]"
                alt={section.imageSection.alt}
                src={section.imageSection.url}
                width={section.imageSection.width}
                height={section.imageSection.height}
              />
              <div className="flex max-w-xs flex-col items-center gap-6 sm:items-start xl:max-w-sm">
                <h1 className="w-fit border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white xl:pb-3 xl:text-5xl xl:leading-tight">
                  {section.sectionTitle}
                </h1>
                <p className="text-justify font-inter-medium text-base text-custom-white xl:text-lg">
                  <StructuredText data={section.paragraphSection} />
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
