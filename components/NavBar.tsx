"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = ({
  navBarExpand,
  setNavBarExpand,
}: {
  navBarExpand: boolean;
  setNavBarExpand: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const blackBgRef = useRef<HTMLDivElement>(null);
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

  // Close Navbar when user clicks on black background stuffs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If Userclick is in the black background stuff
      if (
        blackBgRef.current &&
        blackBgRef.current.contains(event.target as Node)
      ) {
        setNavBarExpand(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setNavBarExpand]);
  return (
    <nav className="left-0 top-0 z-20 mb-20 flex-none">
      <div className="fixed z-40 flex h-20 w-full flex-row items-center justify-between bg-custom-blue px-7 shadow-lg lg:px-10">
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
          className={`fixed left-0 top-20 h-fit w-full flex-col bg-custom-blue px-7 py-2 font-poppins-bold text-base text-white ${
            navBarExpand ? "flex" : "hidden"
          } lg:static lg:flex lg:w-fit lg:flex-row lg:items-center lg:gap-8 lg:p-0`}
        >
          {NavBarItems.map((item, index) => {
            return (
              <Link
                className={`${
                  pathname?.startsWith(item.href) && "text-custom-pink"
                }`}
                key={index}
                href={item.href}
              >
                <li className="p-2">{item.title}</li>
              </Link>
            );
          })}
          <li className="self-center p-2">
            <Button
              paddingY="10px"
              paddingX="22px"
              color="pink"
              onClick={
                !session
                  ? () => signIn("google")
                  : () => signOut({ redirect: false })
              }
            >
              {!session ? "Masuk" : "Keluar"}
            </Button>
          </li>
        </ul>

        {/* Close Button */}
        <button
          aria-label="Menu / Close Button"
          className="flex h-[27px] w-[30px] cursor-pointer flex-col gap-y-[6px] lg:hidden"
          onClick={() => setNavBarExpand(!navBarExpand)}
        >
          <span
            className={`h-[5px] w-full origin-left bg-white opacity-100 transition duration-300 ease-in-out ${
              navBarExpand ? "rotate-45 scale-x-105" : "rotate-0 scale-x-100"
            }`}
          />
          <span
            className={`h-[5px] w-full bg-white transition duration-300 ease-in-out ${
              navBarExpand ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[5px] w-full origin-left bg-white opacity-100 transition duration-300 ease-in-out ${
              navBarExpand
                ? "rotate-[-45deg] scale-x-105"
                : "rotate-0 scale-x-100"
            }`}
          />
        </button>
      </div>

      {/* Black Background Stuff */}
      {navBarExpand && (
        <div
          ref={blackBgRef}
          className="fixed inset-0 z-20 h-screen w-full bg-black opacity-50 lg:hidden"
        />
      )}
    </nav>
  );
};

export default NavBar;
