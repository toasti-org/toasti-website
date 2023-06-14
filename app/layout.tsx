"use client";

import "/styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import { useState, useEffect, createContext } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const poppinsBold = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-bold",
  weight: "700",
});

const interMedium = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-medium",
  weight: "500",
});

export const ContentPopUpContext = createContext({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navBarExpand, setNavBarExpand] = useState(false);
  const [contentPopUp, setContentPopUp] = useState<
    React.ReactNode | undefined
  >();
  const pathname = usePathname();

  // Reset state when change route
  useEffect(() => {
    setNavBarExpand(false);
    setContentPopUp(undefined);
  }, [pathname]);

  return (
    <html
      lang="id"
      className={`${poppinsBold.variable} ${interMedium.variable}`}
    >
      <body
        className={`flex min-h-screen flex-col ${
          (contentPopUp || navBarExpand) && "h-screen overflow-hidden"
        }`}
      >
        <SessionProvider>
          <NavBar
            navBarExpand={navBarExpand}
            setNavBarExpand={setNavBarExpand}
          />
          <ContentPopUpContext.Provider value={setContentPopUp}>
            {children}
            {contentPopUp && <>{contentPopUp}</>}
          </ContentPopUpContext.Provider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
