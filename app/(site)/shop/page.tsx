import type { Metadata } from "next";
import { getCatalog } from "@/lib/catalog";
import ShopRoute from "@/components/ShopRoute";

export const metadata: Metadata = {
  title: "Mağaza — Makana by Ruh",
  description:
    "Bütün Makana by Ruh kolleksiyaları: ipək yaylıqlar, şamlar, home diffuzorlar, gift boxlar və kişi boyunluqları. Bakı, Azərbaycan.",
  openGraph: {
    title: "Shop — Makana by Ruh",
    description: "Handcrafted silk scarves, candles, diffusers and gift boxes. Every piece in a single copy.",
    url: "https://makanabyruh.az/shop",
  },
  alternates: { canonical: "/shop" },
};

interface Search {
  cat?: string | string[];
  q?: string | string[];
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const [catalog] = await Promise.all([getCatalog()]);
  const cat = typeof params.cat === "string" && params.cat ? params.cat : undefined;
  const q = typeof params.q === "string" && params.q ? params.q : undefined;
  return <ShopRoute catalog={catalog} initialCat={cat} initialQuery={q} />;
}
