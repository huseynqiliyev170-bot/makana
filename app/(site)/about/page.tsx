import type { Metadata } from "next";
import { getCatalog } from "@/lib/catalog";
import AboutRoute from "@/components/AboutRoute";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Haqqımızda — Makana by Ruh",
  description:
    "Nigar Əhmədova — Makana by Ruh brendinin yaradıcısı. Kiçik bir şamdan doğulan hekayə: estetika, məna və ruhun bir araya gəldiyi məkan.",
  openGraph: {
    title: "About — Makana by Ruh",
    description:
      "The story of Nigar Ahmadova and the brand she founded in Baku — handcrafted silk and candles, where aesthetics, meaning and soul meet.",
    url: "https://makanabyruh.az/about",
  },
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const catalog = await getCatalog();
  return <AboutRoute catalog={catalog} />;
}
