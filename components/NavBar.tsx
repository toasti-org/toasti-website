"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [expand, setExpand] = useState(false);
  const pathname = usePathname();
  const NavBarItems = [
    {
      title: "Artikel",
      href: "/artikel",
    },
    {
      title: "Kalender Astronomi",
      href: "/kalender-astronomi",
    },
    {
      title: "Materi Belajar",
      href: "/materi-belajar",
    },
    {
      title: "Tentang Kami",
      href: "/tentang-kami",
    },
  ];
  return (
    <nav className="sticky top-0 z-30 flex h-20 w-full flex-none flex-row items-center justify-between bg-custom-blue px-7 shadow-lg lg:px-10">
      {/* TOASTI Logo */}
      <Link href="/">
        <Image
          src="/toasti-full-logo.png"
          width={1022}
          height={188}
          alt="Logo TOASTI"
          className="h-[30px] w-36"
        />
      </Link>

      {/* Navigation List */}
      <ul
        className={`absolute left-0 top-20 h-fit w-full flex-col bg-custom-blue px-7 py-2 font-poppins-bold text-base text-white ${
          expand ? "flex" : "hidden"
        } lg:static lg:flex lg:w-fit lg:flex-row lg:gap-8 lg:p-0`}
      >
        {NavBarItems.map((item, index) => {
          return (
            <Link
              className={`${
                pathname.startsWith(item.href) && "text-custom-pink"
              }`}
              key={index}
              href={item.href}
            >
              <li className="p-2">{item.title}</li>
            </Link>
          );
        })}
      </ul>

      {/* Close Button */}
      <button
        aria-label="Menu / Close Button"
        className="flex h-[27px] w-[30px] cursor-pointer flex-col gap-y-[6px] lg:hidden"
        onClick={() => setExpand(!expand)}
      >
        <span
          className={`h-[5px] w-full origin-left bg-white opacity-100 transition duration-300 ease-in-out ${
            expand ? "rotate-45 scale-x-105" : "rotate-0 scale-x-100"
          }`}
        />
        <span
          className={`h-[5px] w-full bg-white transition duration-300 ease-in-out ${
            expand ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-[5px] w-full origin-left bg-white opacity-100 transition duration-300 ease-in-out ${
            expand ? "rotate-[-45deg] scale-x-105" : "rotate-0 scale-x-100"
          }`}
        />
      </button>
    </nav>
  );
};

export default NavBar;
