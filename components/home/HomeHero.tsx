
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/SiteProvider";

const HERO_IMAGES = [
  "/images/Navy_Geometric_Patterned_Scarf_Close-Up_Detail.jpg",
  "/images/Sage_Green_Patterned_Scarf_Perfume_Tray_Still_Life.jpg",
  "/images/White_Mythical_Creature_Print_Scarf_Angle_View.jpg",
  "/images/Geometric_Pattern_Silk_Scarf_Packaging_Unboxing_Luxury.jpg",
  "/images/Monochrome_Floral_and_Geometric_Scarf_Perfume_Tray_Still_Life.jpg",
];

const INTERVAL = 4200;

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const { t } = useSite();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % HERO_IMAGES.length);
    }, INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mk-hero" aria-label="Makana by Ruh">
      {/* IMAGE SLIDES */}
      <div className="mk-hero-media">
  {HERO_IMAGES.map((src, index) => (
    <div
      key={src}
      className={`mk-hero-slide ${
        index === active ? "is-active" : ""
      }`}
    >
      <div
        className="mk-hero-backdrop"
        style={{ backgroundImage: `url("${src}")` }}
      />

      <div className="mk-hero-photo">
        <Image
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="(max-width: 700px) 94vw, 100vw"
          className="mk-hero-image"
        />
      </div>
    </div>
  ))}
</div>

      {/* DARK GRADIENT */}
      <div className="mk-hero-gradient" />

      {/* TOP */}
      <header className="mk-hero-header">
        <Link href="/" className="mk-hero-logo">
          Makana <span>by Ruh</span>
        </Link>

        <Link href="/shop" className="mk-hero-shop">
          {t("nav.shop")}
        </Link>
      </header>

      {/* BOTTOM */}
      <div className="mk-hero-bottom">
        <Link href="/shop" className="mk-hero-cta">
          {t("hero.cta1")}
          <span>↗</span>
        </Link>

        <div className="mk-hero-counter">
          <span>{String(active + 1).padStart(2, "0")}</span>

          <i />

          <span>{String(HERO_IMAGES.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

