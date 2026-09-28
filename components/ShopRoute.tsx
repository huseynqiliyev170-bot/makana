"use client";

import { useEffect } from "react";
import type { Catalog } from "@/lib/i18n/types";
import { SiteProvider } from "@/components/SiteProvider";
import { StoreProvider } from "@/components/StoreProvider";
import { useStore } from "@/components/store-context";
import Chrome from "@/components/Chrome";
import ShopFull from "@/components/ShopFull";
import Footer from "@/components/Footer";

/** Applies URL params that arrive after the first render (client navigation
 *  from the search overlay, footer links, collection rows). */
function ParamSync({ cat, q }: { cat?: string; q?: string }) {
  const { setCat, setQuery } = useStore();
  useEffect(() => {
    if (cat !== undefined) setCat(cat);
  }, [cat, setCat]);
  useEffect(() => {
    if (q !== undefined) setQuery(q);
  }, [q, setQuery]);
  return null;
}

export default function ShopRoute({
  catalog,
  initialCat,
  initialQuery,
}: {
  catalog: Catalog;
  initialCat?: string;
  initialQuery?: string;
}) {
  return (
    <SiteProvider>
      <StoreProvider catalog={catalog} initialCat={initialCat} initialQuery={initialQuery}>
        <ParamSync cat={initialCat} q={initialQuery} />
        <Chrome phone={catalog.settings.whatsapp} instagram={catalog.settings.instagram} />
        <main className="shop-page">
          <ShopFull />
        </main>
        <Footer />
      </StoreProvider>
    </SiteProvider>
  );
}
