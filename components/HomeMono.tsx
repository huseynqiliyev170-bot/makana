"use client";

import type { Catalog } from "@/lib/i18n/types";
import { SiteProvider } from "@/components/SiteProvider";
import { StoreProvider } from "@/components/StoreProvider";
import Chrome from "@/components/Chrome";
import Marquee from "@/components/Marquee";
import HomeHero from "@/components/home/HomeHero";
import HomeCollections from "@/components/home/HomeCollections";
import HomeStatement from "@/components/home/HomeStatement";
import HomeFeatured from "@/components/home/HomeFeatured";
import HomeVoices from "@/components/home/HomeVoices";
import HomeStrip from "@/components/home/HomeStrip";
import HomeContact from "@/components/home/HomeContact";
import HomeFooter from "@/components/home/HomeFooter";

/**
 * Home page — "Monochrome Atelier" identity.
 *
 * Narrative: typographic hero on white with a graphite photograph
 * → brand ticker → collections as a numbered editorial grid (photos
 * drain to black & white, color returns on hover) → black statement
 * canvas with the founder's quote and counters → four featured pieces
 * → customer voices as ruled serif rows → instagram filmstrip
 * → contact channels + WhatsApp form → outlined wordmark footer.
 *
 * Everything warm-toned on /shop and /admin stays untouched: the whole
 * identity is scoped to .home-mono, which redefines the design tokens.
 */
export default function HomeMono({ catalog }: { catalog: Catalog }) {
  return (
    <SiteProvider>
      <div className="home-mono">
        <StoreProvider catalog={catalog}>
          <Chrome phone={catalog.settings.whatsapp} instagram={catalog.settings.instagram} />
          <main>
            <HomeHero />
            <Marquee />
            <HomeCollections />
            <HomeStatement />
            <HomeFeatured />
            <HomeVoices />
            <HomeStrip />
            <HomeContact />
          </main>
          <HomeFooter />
        </StoreProvider>
      </div>
    </SiteProvider>
  );
}
