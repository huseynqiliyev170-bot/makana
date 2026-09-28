"use client";

import type { Catalog } from "@/lib/i18n/types";
import { SiteProvider } from "@/components/SiteProvider";
import { StoreProvider } from "@/components/StoreProvider";
import Chrome from "@/components/Chrome";
import AboutPage from "@/components/AboutPage";
import HomeFooter from "@/components/home/HomeFooter";

/** /about — same mono identity as the home page, same providers,
 *  so the chrome (header, search, cursor) behaves identically. */
export default function AboutRoute({ catalog }: { catalog: Catalog }) {
  return (
    <SiteProvider>
      <div className="home-mono">
        <StoreProvider catalog={catalog}>
          <Chrome phone={catalog.settings.whatsapp} instagram={catalog.settings.instagram} />
          <main>
            <AboutPage catalog={catalog} />
          </main>
          <HomeFooter />
        </StoreProvider>
      </div>
    </SiteProvider>
  );
}
