import type { Metadata } from "next";
import { Newsreader, Work_Sans, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { company } from "@/lib/site-config";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default:
      "Sky Accelerate Group | Compliance & Strategic Advisory, Malaysia",
    template: "%s | Sky Accelerate Group",
  },
  description:
    "Sky Accelerate Group is an independent Malaysian compliance and strategic advisory group serving the construction and related business industries, with a primary focus on CIDB compliance and registration advisory.",
  keywords: [
    "CIDB Consultant Malaysia",
    "CIDB Registration Malaysia",
    "CIDB Contractor Registration",
    "CIDB Renewal",
    "CIDB Grade Upgrade",
    "Construction Compliance Malaysia",
    "Contractor Compliance Advisory",
  ],
  openGraph: {
    title: "Sky Accelerate Group | Compliance & Strategic Advisory",
    description:
      "Integrated compliance and strategic advisory for the construction and related industries in Malaysia.",
    url: company.siteUrl,
    siteName: "Sky Accelerate Group",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Accelerate Group | Compliance & Strategic Advisory",
    description:
      "Integrated compliance and strategic advisory for the construction and related industries in Malaysia.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
