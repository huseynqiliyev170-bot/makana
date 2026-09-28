"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { img, waLink } from "@/lib/links";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";

const FALLBACK =
  "https://res.cloudinary.com/dn2jro6kd/image/upload/v1779456912/qyrn20qmsuus1xefm3h1.jpg";

export default function HomeHero() {
  const { t, dict } = useSite();
  const { catalog, phone } = useStore();

  const rootRef = useRef<HTMLElement | null>(null);

  const settings = catalog.settings;

  const imageSrc =
    settings.hero_image ||
    settings.lifestyle_image ||
    settings.about_image ||
    FALLBACK;

  const lines = [
    dict["hero.l1"],
    dict["hero.l2"],
    dict["hero.l3"],
  ].filter(Boolean);

  useEffect(() => {
    const element = rootRef.current;

    if (!element) return;

    const frame = window.requestAnimationFrame(() => {
      element.classList.add("is-in");
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="hero"
      id="top"
      ref={rootRef}
      aria-labelledby="hero-title"
    >
      <div className="hero-inner">
        {/* TOP BAR */}
        <header className="hero-top">
          <span className="hero-eyebrow">
            {t("hero.kick")}
          </span>

          <span className="hero-location">
            Bakı · {t("about.founded")} 2019
          </span>
        </header>

        {/* MAIN CONTENT */}
        <div className="hero-body">
          {/* LEFT */}
          <div className="hero-copy">
            <div className="hero-copy-top">
              <span className="hero-kicker">
                Handcrafted in Baku
              </span>

              <span className="hero-kicker-line" />
            </div>

            <h1
              className="hero-title"
              id="hero-title"
            >
              {lines.map((line, index) => (
                <span
                  className="hero-line"
                  key={`${line}-${index}`}
                  style={
                    {
                      "--i": index,
                    } as React.CSSProperties
                  }
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line,
                    }}
                  />
                </span>
              ))}
            </h1>

            <p className="hero-desc">
              {t("hero.desc")}
            </p>

            {/* ACTIONS */}
            <div className="hero-actions">
              <Link
                href="/shop"
                className="hero-btn"
                data-cursor="view"
              >
                <span>{t("hero.cta1")}</span>
                <ArrowIcon />
              </Link>

              <a
                href={waLink("", phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
                data-cursor="wa"
              >
                <WhatsAppIcon />
                <span>{t("hero.cta2")}</span>
              </a>
            </div>

            {/* MICRO COPY */}
            <div className="hero-micro">
              <span className="hero-micro-dot" />
              <span>Personal selection · Baku</span>
            </div>

            {/* SOCIAL PROOF */}
            <div className="hero-proof">
              
           
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <figure className="hero-media">
            <div className="hero-media-image">
              <Image
                src={img(imageSrc, 1600)}
                alt="Makana by Ruh — handcrafted silk collection"
                fill
                priority
                sizes="
                  (max-width: 700px) 100vw,
                  (max-width: 1100px) 48vw,
                  44vw
                "
              />
            </div>

            {/* IMAGE LABEL */}
            

            {/* IMAGE CAPTION */}
         
          </figure>
        </div>

      </div>
    </section>
  );
}