"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { productImages } from "@/lib/format";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { ArrowIcon } from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/i18n/types";

/** Four featured pieces — one voice per collection — leading to /shop. */
export default function HomeFeatured() {
  const { t, dict } = useSite();
  const { categories, products } = useStore();
  const head = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>(0.04);

  const picks = useMemo<Product[]>(() => {
    const out: Product[] = [];
    for (const c of categories) {
      if (out.length >= 4) break;
      const p = products.find((x) => x.category_slug === c.slug && productImages(x).length > 0);
      if (p && !out.some((o) => o.id === p.id)) out.push(p);
    }
    for (const p of products) {
      if (out.length >= 4) break;
      if (!out.some((o) => o.id === p.id) && productImages(p).length) out.push(p);
    }
    return out;
  }, [categories, products]);

  return (
    <section className="msec" id="featured">
      <div className="wrap">
        <div className={revealClass("msec-head rv", head.shown)} ref={head.ref}>
          <div>
            <div className="msec-kick">{t("shop.tag")}</div>
            <h2 className="msec-title" dangerouslySetInnerHTML={{ __html: dict["ft.title"] }} />
          </div>
          <p className="msec-lead">{t("ft.sub")}</p>
        </div>

        <div className={revealClass("pgrid rv", grid.shown)} ref={grid.ref}>
          {picks.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mfeat-cta">
          <Link href="/shop" className="btn btn--gold" data-cursor="view">
            <span>{t("ft.cta")}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
