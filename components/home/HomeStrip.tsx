"use client";

import { useMemo } from "react";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { img, instagramUrl } from "@/lib/links";
import { InstagramIcon } from "@/components/icons";

/** Full-bleed instagram filmstrip: square frames, graphite until hover. */
export default function HomeStrip() {
  const { t, dict } = useSite();
  const { products, instagram } = useStore();
  const head = useReveal<HTMLDivElement>();
  const strip = useReveal<HTMLDivElement>(0.05);

  const picks = useMemo(() => {
    const out: string[] = [];
    const pool = products.slice();
    /* deterministic pseudo-shuffle so SSR and client markup always match */
    for (let i = pool.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      const tmp = pool[i];
      pool[i] = pool[j];
      pool[j] = tmp;
    }
    pool.forEach((p) => {
      if (out.length < 10) {
        const cover = p.images?.[0] ?? p.image_url;
        if (cover && !out.includes(cover)) out.push(cover);
      }
    });
    return out;
  }, [products]);

  const href = instagramUrl(instagram);

  return (
    <section className="msec" id="gallery" style={{ paddingBottom: "clamp(50px,7vh,90px)" }}>
      <div className="wrap">
        <div className={revealClass("msec-head rv", head.shown)} ref={head.ref}>
          <div>
            <div className="msec-kick">{t("ig.tag")}</div>
            <h2 className="msec-title">{dict["ig.title"]}</h2>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
            data-cursor="ig"
          >
            <span>{t("ig.cta")}</span>
            <InstagramIcon style={{ width: 15, height: 15 }} />
          </a>
        </div>
      </div>

      <div className={revealClass("mstrip rv", strip.shown)} ref={strip.ref} id="instaStrip">
        {picks.map((src, i) => (
          <a
            key={src}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="ig"
            aria-label={`${dict["ig.title"]} ${i + 1}`}
            style={{ transitionDelay: `${Math.min(i + 1, 6) * 60}ms` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(src, 520)} alt="" loading="lazy" />
            <InstagramIcon />
          </a>
        ))}
      </div>
    </section>
  );
}
