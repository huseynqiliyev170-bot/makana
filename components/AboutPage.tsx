"use client";

import Link from "next/link";
import Image from "next/image";
import type { Catalog } from "@/lib/i18n/types";
import { useSite } from "@/components/SiteProvider";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { img } from "@/lib/links";
import { ArrowIcon } from "@/components/icons";

const PORTRAIT_FALLBACK =
  "https://res.cloudinary.com/dn2jro6kd/image/upload/v1777980967/uz5p05bvwza6jns5yli8.jpg";

/**
 * /about — the founder's story, told quietly.
 *
 * A full-height title stage (kicker, display name, the portrait drained to
 * graphite), then the letter set as a single narrow measure so the eye rests.
 * The signature closes it as the page's one statement, followed by a single
 * path onward. No sections, no cards — just the voice.
 */
export default function AboutPage({ catalog }: { catalog: Catalog }) {
  const { t, dict } = useSite();
  const title = useReveal<HTMLDivElement>();
  const letter = useReveal<HTMLDivElement>(0.03);
  const sign = useReveal<HTMLDivElement>(0.2);
  const cta = useReveal<HTMLDivElement>(0.2);

  const portrait = catalog.settings.about_image || catalog.settings.lifestyle_image || PORTRAIT_FALLBACK;

  return (
    <>
      <section className="ab-hero">
        <div className="wrap ab-hero-in">
          <div className={revealClass("ab-hero-copy rv", title.shown)} ref={title.ref}>
            <div className="ab-kick">
              <i />
              <span>{t("ab.kick")}</span>
            </div>
            <h1 className="ab-name" dangerouslySetInnerHTML={{ __html: dict["ab.title"] }} />
            <p className="ab-lead">{t("ab.lead")}</p>
          </div>

          <div className="ab-portrait">
            <Image
              src={img(portrait, 1000)}
              alt={t("ab.alt")}
              width={720}
              height={900}
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>

      <section className="ab-letter-sec">
        <div className={revealClass("ab-letter rv", letter.shown)} ref={letter.ref}>
          {dict["ab.story"].map((para, i) => (
            <p className={`ab-p${i === 0 ? " ab-p--first" : ""}`} key={i}>
              {para}
            </p>
          ))}
        </div>

        <div className={revealClass("ab-sign rv", sign.shown)} ref={sign.ref}>
          <span className="ab-rule" aria-hidden="true" />
          <blockquote className="ab-signature">{t("ab.sign")}</blockquote>
          <p className="ab-welcome">{t("ab.welcome")}</p>
        </div>

        <div className={revealClass("ab-cta rv", cta.shown)} ref={cta.ref}>
          <Link href="/shop" className="btn btn--gold" data-cursor="view">
            <span>{t("about.cta")}</span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
