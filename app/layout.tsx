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

const title = "Tartīl — A roadmap for learning Tajweed";
const description =
  "Seventy-nine lessons from the Arabic 101 channel, arranged in nine stages: the letters, their character, the rules, the page, the breath, and your own voice.";

// The share image itself comes from app/opengraph-image.jpg and app/twitter-image.jpg
// (rendered from design/og-card.html); Next.js adds those tags and their sizes.
export const metadata: Metadata = {
  metadataBase: new URL("https://tartil.seefun.dev"),
  title,
  description,
  applicationName: "Tartīl",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Tartīl",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
