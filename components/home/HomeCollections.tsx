"use client";

import { useRouter } from "next/navigation";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { img } from "@/lib/links";
import { ArrowIcon } from "@/components/icons";

/**
 * Collections as a staggered editorial grid of 4:5 plates. Each photograph
 * is drained to graphite until hover returns its color; a click opens that
 * collection on /shop. The alternating vertical offset carries the rhythm,
 * so no numbering is imposed on what is a taxonomy, not a sequence.
 */
export default function HomeCollections() {
  const { t, tr, dict } = useSite();
  const { categories, catCount, catCover } = useStore();
  const router = useRouter();
  const head = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>(0.04);

  return (
    <section className="msec" id="collections">
      <div className="wrap">
        <div className={revealClass("msec-head rv", head.shown)} ref={head.ref}>
          <div>
            <div className="msec-kick">{t("coll.tag")}</div>
            <h2 className="msec-title" dangerouslySetInnerHTML={{ __html: dict["coll.title"] }} />
          </div>
          <p className="msec-lead">{t("coll.lead")}</p>
        </div>

        <div className={revealClass("mcoll-grid rv", grid.shown)} ref={grid.ref}>
          {categories.map((c, i) => {
            const cover = catCover(c.slug);
            const count = catCount(c.slug);
            return (
              <button
                type="button"
                className="mcoll-card"
                key={c.slug}
                data-cat={c.slug}
                data-cursor="view"
                aria-label={`${tr(c.name)} — ${count} ${t("coll.count")}`}
                onClick={() => router.push(`/shop?cat=${encodeURIComponent(c.slug)}`)}
              >
                <span className="mcoll-media">
                  {cover && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={img(cover, 900)} alt="" loading={i < 2 ? "eager" : "lazy"} />
                  )}
                </span>
                <span className="mcoll-meta">
                  <span className="mcoll-name">{tr(c.name)}</span>
                  <span className="mcoll-go">
                    {count} {t("coll.count")}
                    <ArrowIcon />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
