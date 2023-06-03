import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex h-fit w-full flex-col items-center gap-4 bg-custom-light-blue px-7 py-8 sm:flex-row sm:justify-between lg:px-10">
      <p className="text-center font-poppins-bold text-base text-custom-blue">
        2022 © Tim Olimpiade Astronomi Indonesia
      </p>
      <div className="flex flex-row items-center gap-x-6 lg:gap-x-8">
        {/* Instagram */}
        <Link
          className="relative h-[28px] w-[28px]"
          href="https://www.instagram.com/toasti_official/"
          target="_blank"
        >
          <button>
            <Image src="/instagram.svg" alt="Instagram Logo" fill={true} />
          </button>
        </Link>

        {/* Youtube */}
        <Link
          className="relative h-[28px] w-[40px]"
          href="https://www.youtube.com/@timolimpiadeastronomiindon1130/featured"
          target="_blank"
        >
          <button>
            <Image src="/youtube.svg" alt="Instagram Logo" fill={true} />
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
