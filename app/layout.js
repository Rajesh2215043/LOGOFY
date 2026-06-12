import { Geist, Geist_Mono, Host_Grotesk } from "next/font/google";
import {
  Alumni_Sans,
  Playwrite_HU,
  Playwrite_IT_Moderna,
  Teko,
} from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const host_Grotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  variable: "--font-alumni-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const playwriteHU = Playwrite_HU({
  subsets: ["latin"],
  variable: "--font-playwrite-hu",
  weight: ["100", "200", "300", "400"],
});

const playwriteITModerna = Playwrite_IT_Moderna({
  subsets: ["latin"],
  variable: "--font-playwrite-it-moderna",
  weight: ["100", "200", "300", "400"],
});

const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "LogoFY",
  description:
    "LogoFY is a logo generator that allows you to create a logo for your business.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* For adding External fonts use the link tag*/}
          <link
            href="https://fonts.googleapis.com/css2?family=Alumni+Sans:ital,wght@0,100..900;1,100..900&family=Playwrite+IT+Moderna:wght@100..400&display=swap"
            rel="stylesheet"
          />
        </head>
        {/* For adding fonts to the body use the className prop */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${host_Grotesk.variable} ${alumniSans.variable} ${playwriteHU.variable} ${playwriteITModerna.variable} ${teko.variable}`}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
