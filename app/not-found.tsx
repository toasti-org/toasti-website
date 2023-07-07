import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export const metadata = {
  title: "Error 404 | Tim Olimpiade Astronomi Indonesia (TOASTI)",
  description: "Halaman Error 404 Website Tim Olimpiade Astronomi Indonesia (TOASTI).",
};

const NotFound = () => {
  return (
    <main className="flex flex-auto flex-col items-center justify-center gap-6 bg-custom-blue px-5 py-12 sm:flex-row lg:gap-20">
      {/* 404 Image */}
      <div data-aos="zoom-in" className="relative aspect-square w-52 lg:w-96">
        <Image fill={true} src="/404.svg" alt="Error 404 Image" />
      </div>

      <div
        data-aos="zoom-in"
        className="flex max-w-[400px] flex-col items-center gap-6 lg:max-w-lg lg:gap-8"
      >
        {/* Texts */}
        <div className="flex flex-col gap-4 lg:gap-8">
          <h1 className="text-center font-poppins-bold text-4xl text-custom-white lg:text-6xl">
            Tersesat di Luar Angkasa?
          </h1>
          <p className="text-center font-inter-medium text-base text-custom-white lg:text-xl">
            Halaman yang Anda cari tidak dapat ditemukan
          </p>
        </div>

        {/* Button */}
        <Link href="/">
          <Button color="pink">Beranda</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
