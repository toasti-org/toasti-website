import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "/styles/globals.css";
import { Poppins, Lora } from "next/font/google";

const poppinsBold = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-bold",
  weight: "700",
});

const loraRegular = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora-regular",
  weight: "400",
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
      className={`${poppinsBold.variable} ${loraRegular.variable}`}
    >
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
