import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "/styles/globals.css";
import { Poppins, Inter } from "next/font/google";

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

export const metadata = {
  title: "Home | TOASTI",
  description: "Home Page Website TOASTI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppinsBold.variable} ${interMedium.variable}`}
    >
      <body className="absolute inset-0 flex flex-col">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
