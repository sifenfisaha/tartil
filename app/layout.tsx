import type { Metadata, Viewport } from "next";
import { Amiri, Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tartīl — A roadmap for learning Tajweed",
  description:
    "Seventy-nine lessons from the Arabic 101 channel, arranged in nine stages: the letters, their character, the rules, the page, the breath, and your own voice.",
};

export const viewport: Viewport = {
  themeColor: "#ecebe6",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jost.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
