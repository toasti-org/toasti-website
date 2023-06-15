import { getCMSData } from "@/lib/cms";
import { privacyPolicyQuery } from "@/lib/cms";
import type { PrivacyPolicyContentCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";

export const metadata = {
  title: "Kebijakan Privasi | TOASTI",
  description: "Halaman Kebijakan Privasi Website TOASTI",
};

const KebijakanPrivasi = async () => {
  const { privacyPolicyContent } = await getCMSData<PrivacyPolicyContentCMS>(
    privacyPolicyQuery
  );

  return (
    <main className="flex flex-auto justify-center bg-custom-blue px-5 py-12 xl:py-20">
      <article className="flex max-w-xs flex-col items-center gap-10 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl xl:gap-12 2xl:max-w-4xl">
        {/* Title and Intro Div */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="w-fit border-b-4 border-solid border-custom-pink pb-2 text-center font-poppins-bold text-4xl text-custom-white xl:pb-3 xl:text-5xl xl:leading-tight">
            {privacyPolicyContent.title}
          </h1>
          <p className="text-justify font-inter-medium text-base text-custom-white xl:text-lg">
            <StructuredText data={privacyPolicyContent.paragraph} />
          </p>
        </div>
        {/* Details */}
        {privacyPolicyContent.sections.map((section) => {
          return (
            <div key={section.id} className="flex flex-col gap-6">
              <h2 className="w-fit border-b-4 border-solid border-custom-pink pb-2 font-poppins-bold text-2xl text-custom-white xl:pb-3 xl:text-3xl xl:leading-tight">
                {section.title}
              </h2>
              {section.paragraphs.map((item) => {
                return (
                  <p
                    key={item.id}
                    className="text-justify font-inter-medium text-base text-custom-white xl:text-lg"
                  >
                    <StructuredText data={item.paragraph} />
                  </p>
                );
              })}
            </div>
          );
        })}
      </article>
    </main>
  );
};

export default KebijakanPrivasi;
