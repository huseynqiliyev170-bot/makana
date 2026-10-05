"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import type { SortKey } from "@/lib/i18n/types";
import { productImages } from "@/lib/format";
import { img } from "@/lib/links";
import { revealClass, useReveal } from "@/hooks/useReveal";
import { ArrowIcon, ChevronDownIcon, OrnamentIcon, SearchIcon } from "@/components/icons";
import ProductCard from "@/components/ProductCard";

const CURRENCY_SYMBOL: Record<string, string> = { AZN: "₼", USD: "$", EUR: "€" };

const HERO_FALLBACK = "https://res.cloudinary.com/zfbewbxk/image/upload/v1791132260/Geometric_Pattern_Silk_Scarf_Packaging_Unboxing_Luxury.jpg";
const SCARVES_HERO =
  "https://res.cloudinary.com/zfbewbxk/image/upload/v1791132617/Sage_Green_Patterned_Scarf_Perfume_Tray_Still_Life.jpg";

const TWILLY_HERO =
  "https://res.cloudinary.com/zfbewbxk/image/upload/v1791133703/Geometric_Pattern_Skinny_Scarf_In-Hand_Lifestyle.jpg";

const BOYUNLUQ_HERO =
  "https://res.cloudinary.com/zfbewbxk/image/upload/v1791135882/Cream_and_Gold_Geometric_Silk_Scarf_Angle_View.jpg";

const CANDLES_HERO =
  "https://res.cloudinary.com/zfbewbxk/image/upload/v1791136690/Cream_Floral_Decorated_Pillar_Candles_Evening_Ambience_Decor_Story_1.jpg";

const GIFT_HERO =
  "https://res.cloudinary.com/zfbewbxk/image/upload/v1791160259/makana_nexquian_candle_scarf_gift_set-concrete_shadow_play-083f3c89.jpg";

const EDITORIAL_AT = 6;

interface FacetOption {
  key: string;
  label: string;
  count?: number;
  active: boolean;
  onPick: () => void;
}

/** One toolbar dropdown: label + chevron, panel with counted options. */
function Facet({ label, options }: { label: string; options: FacetOption[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const activeCount = options.filter((o) => o.active).length;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="facet" ref={ref}>
      <button
        type="button"
        className={`facet-btn${open ? " open" : ""}${activeCount ? " has" : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="facet-panel">
          {options.map((o) => (
            <button
              type="button"
              key={o.key}
              className={`fopt${o.active ? " on" : ""}`}
              onClick={() => {
                o.onPick();
                setOpen(false);
              }}
            >
              <span>{o.label}</span>
              {o.count !== undefined && <b>{o.count}</b>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** The dedicated /shop page: editorial hero, sticky filter toolbar, grid. */
export default function ShopFull() {
  const { t, tr, dict } = useSite();
  const {
    categories,
    products,
    cat,
    setCat,
    query,
    setQuery,
    sort,
    setSort,
    priceMin,
    priceMax,
    setPriceRange,
    resetFilters,
    activeFilterCount,
    visible,
    catName,
    catCover,
  } = useStore();
  const router = useRouter();

  const [localQ, setLocalQ] = useState(query);
  const [sheet, setSheet] = useState(false);
  const grid = useReveal<HTMLDivElement>(0.02);

  useEffect(() => setLocalQ(query), [query]);
  useEffect(() => {
    const id = window.setTimeout(() => setQuery(localQ), 220);
    return () => window.clearTimeout(id);
  }, [localQ, setQuery]);

  /* keep the address bar shareable: /shop?cat=…&q=…&sort=…&min=…&max=… */
  useEffect(() => {
    const sp = new URLSearchParams();
    if (cat !== "all") sp.set("cat", cat);
    if (query.trim()) sp.set("q", query.trim());
    if (sort !== "default") sp.set("sort", sort);
    if (priceMin !== null) sp.set("min", String(priceMin));
    if (priceMax !== null) sp.set("max", String(priceMax));
    const qs = sp.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }, [cat, query, sort, priceMin, priceMax, router]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", sheet);
    return () => document.body.classList.remove("is-locked");
  }, [sheet]);

  const currency = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const c = p.currency || "AZN";
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    let best = "AZN";
    let n = -1;
    counts.forEach((v, k) => {
      if (v > n) {
        n = v;
        best = k;
      }
    });
    return best;
  }, [products]);
  const sym = CURRENCY_SYMBOL[currency] ?? `${currency} `;

  /* three price bands derived from the catalog's own distribution */
  const priceBands = useMemo(() => {
    const prices = products.map((p) => Number(p.price ?? 0)).filter((n) => n > 0).sort((a, b) => a - b);
    if (prices.length < 6) return [] as { key: string; label: string; min: number | null; max: number | null }[];
    const nice = (n: number) => Math.max(5, Math.round(n / 5) * 5);
    const a = nice(prices[Math.floor(prices.length / 3)]);
    const b = Math.max(a + 5, nice(prices[Math.floor((2 * prices.length) / 3)]));
    return [
      { key: "lo", label: `≤ ${a} ${sym}`, min: null, max: a },
      { key: "mid", label: `${a} – ${b} ${sym}`, min: a, max: b },
      { key: "hi", label: `≥ ${b} ${sym}`, min: b, max: null },
    ];
  }, [products, sym]);

  const inBand = (min: number | null, max: number | null) =>
    products.filter((p) => {
      const v = Number(p.price ?? 0);
      if (min !== null && v < min) return false;
      if (max !== null && v > max) return false;
      return v > 0;
    }).length;

  const catOptions: FacetOption[] = useMemo(
    () => [
      {
        key: "all",
        label: t("shop.tab.all"),
        count: products.length,
        active: cat === "all",
        onPick: () => setCat("all"),
      },
      ...categories.map((c) => ({
        key: c.slug,
        label: tr(c.name),
        count: products.filter((p) => p.category_slug === c.slug).length,
        active: cat === c.slug,
        onPick: () => setCat(c.slug),
      })),
    ],
    [categories, cat, products, setCat, t, tr],
  );

  const priceOptions: FacetOption[] = useMemo(
    () =>
      priceBands.map((b) => ({
        key: b.key,
        label: b.label,
        count: inBand(b.min, b.max),
        active: priceMin === b.min && priceMax === b.max,
        onPick: () =>
          priceMin === b.min && priceMax === b.max ? setPriceRange(null, null) : setPriceRange(b.min, b.max),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [priceBands, priceMin, priceMax, products, setPriceRange],
  );

  const sortOptions: FacetOption[] = useMemo(() => {
    const defs: { value: SortKey; key: "sort.default" | "sort.asc" | "sort.desc" | "sort.new" }[] = [
      { value: "default", key: "sort.default" },
      { value: "new", key: "sort.new" },
      { value: "asc", key: "sort.asc" },
      { value: "desc", key: "sort.desc" },
    ];
    return defs.map((d) => ({
      key: d.value,
      label: t(d.key),
      active: sort === d.value,
      onPick: () => setSort(d.value),
    }));
  }, [sort, setSort, t]);

  const heroSrc =
    cat === "scarves"
      ? SCARVES_HERO
      : cat === "twilly"
        ? TWILLY_HERO
        : cat === "boyunluq"
          ? BOYUNLUQ_HERO
          : cat === "candles"
            ? CANDLES_HERO
            : cat === "gift"
              ? GIFT_HERO
              : cat !== "all"

                ? catCover(cat) || HERO_FALLBACK
                : HERO_FALLBACK;

  const activePriceBand = priceBands.find((b) => b.min === priceMin && b.max === priceMax);

  const editorialTile = (
    <aside className="ed-tile">
      <OrnamentIcon />
      <p dangerouslySetInnerHTML={{ __html: dict["coll.title"] }} />
      <Link href="/about" className="btn btn--ghost-inv btn--sm" data-cursor="view">
        <span>{t("about.cta")}</span>
        <ArrowIcon />
      </Link>
    </aside>
  );

  const gridBody = (
    <div className={revealClass("pgrid rv", grid.shown)} ref={grid.ref} id="pgrid">
      {visible.map((p, i) => (
        <Fragment key={p.id}>
          {i === EDITORIAL_AT && cat === "all" && !query && editorialTile}
          <ProductCard product={p} index={i} />
        </Fragment>
      ))}
      {!visible.length && (
        <div className="shop-empty">
          <OrnamentIcon />
          <p>{t("shop.empty")}</p>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            style={{ marginTop: 24 }}
            onClick={() => {
              resetFilters();
              setLocalQ("");
            }}
          >
            {t("shop.reset")}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <section className="shop-hero">
        <Image
          src={img(heroSrc, 1600)}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="shop-hero-veil" aria-hidden="true" />
        <div className="wrap shop-hero-in">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">{t("sp.home")}</Link>
            <span aria-hidden="true">/</span>
            {cat !== "all" && (
              <>
                <Link href="/shop">{t("sp.title")}</Link>
                <span aria-hidden="true">/</span>
              </>
            )}
            <b>{cat !== "all" ? catName(cat) : t("sp.title")}</b>
          </nav>
          <h1>{cat !== "all" ? catName(cat) : t("sp.title")}</h1>
          <p>{t("sp.sub")}</p>
        </div>
      </section>

      <div className="shop-bar" id="shopBar">
        <div className="wrap shop-bar-in">
          <span className="shop-count" id="shopCount">
            {String(t("shop.count")).replace("{n}", String(visible.length))}
          </span>

          <label className="shop-q">
            <SearchIcon />
            <input
              type="search"
              value={localQ}
              placeholder={t("shop.search")}
              aria-label={t("shop.search")}
              onChange={(e) => setLocalQ(e.target.value)}
            />
          </label>

          <div className="shop-facets">
            <Facet label={t("sp.category")} options={catOptions} />
            {priceBands.length > 0 && <Facet label={t("sp.price")} options={priceOptions} />}
            <Facet label={t("sort.default")} options={sortOptions} />
            <button type="button" className="sheet-open" onClick={() => setSheet(true)}>
              {t("sp.filters")}
              {activeFilterCount > 0 && <b>{activeFilterCount}</b>}
            </button>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="wrap">
          <div className="fchips">
            {cat !== "all" && (
              <button type="button" className="fchip" onClick={() => setCat("all")}>
                {catName(cat)} <i aria-hidden="true">✕</i>
              </button>
            )}
            {query.trim() && (
              <button
                type="button"
                className="fchip"
                onClick={() => {
                  setLocalQ("");
                  setQuery("");
                }}
              >
                «{query.trim()}» <i aria-hidden="true">✕</i>
              </button>
            )}
            {activePriceBand && (
              <button type="button" className="fchip" onClick={() => setPriceRange(null, null)}>
                {activePriceBand.label} <i aria-hidden="true">✕</i>
              </button>
            )}
            <button
              type="button"
              className="fchip clear"
              onClick={() => {
                resetFilters();
                setLocalQ("");
              }}
            >
              {t("sp.clear")}
            </button>
          </div>
        </div>
      )}

      <div className="wrap shop-grid">{gridBody}</div>

      {/* mobile filter sheet */}
      {sheet && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label={t("sp.filters")}>
          <div className="sheet-dim" onClick={() => setSheet(false)} />
          <div className="sheet-box">
            <div className="sheet-hd">
              <h2>{t("sp.filters")}</h2>
              <button type="button" className="sov-x" aria-label="Close" onClick={() => setSheet(false)}>
                ✕
              </button>
            </div>
            <div className="sheet-bd">
              <span className="sov-label">{t("sp.category")}</span>
              <div className="sheet-opts">
                {catOptions.map((o) => (
                  <button type="button" key={o.key} className={`fopt${o.active ? " on" : ""}`} onClick={o.onPick}>
                    <span>{o.label}</span>
                    {o.count !== undefined && <b>{o.count}</b>}
                  </button>
                ))}
              </div>
              {priceBands.length > 0 && (
                <>
                  <span className="sov-label">{t("sp.price")}</span>
                  <div className="sheet-opts">
                    {priceOptions.map((o) => (
                      <button type="button" key={o.key} className={`fopt${o.active ? " on" : ""}`} onClick={o.onPick}>
                        <span>{o.label}</span>
                        {o.count !== undefined && <b>{o.count}</b>}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <span className="sov-label">{t("sort.default")}</span>
              <div className="sheet-opts">
                {sortOptions.map((o) => (
                  <button type="button" key={o.key} className={`fopt${o.active ? " on" : ""}`} onClick={o.onPick}>
                    <span>{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="sheet-ft">
              <button type="button" className="btn btn--ink btn--wide" onClick={() => setSheet(false)}>
                <span>{`${t("sp.apply")} · ${visible.length}`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
