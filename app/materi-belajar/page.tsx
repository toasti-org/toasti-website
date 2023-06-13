import { getCMSData } from "@/lib/cms";
import { studyMaterialQuery } from "@/lib/cms";
import type { AllStudyMaterialContents } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import Button from "@/components/Button";
import Link from "next/link";

export const metadata = {
  title: "Materi Belajar | TOASTI",
  description: "Halaman Materi Belajar Website TOASTI",
};

const MateriBelajar = async () => {
  const { allStudyMaterialContents } =
    await getCMSData<AllStudyMaterialContents>(studyMaterialQuery);

  return (
    <main className="flex-auto bg-custom-blue px-5 py-12 xl:py-16">
      <section className="flex flex-col items-center gap-12 xl:gap-16">
        {allStudyMaterialContents.map((section) => {
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
