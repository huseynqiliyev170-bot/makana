"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { fmtPrice, productImages, foldSearch } from "@/lib/format";
import { img, waLink } from "@/lib/links";
import { ArrowIcon, CloseIcon, SearchIcon } from "@/components/icons";
import type { Category, Product } from "@/lib/i18n/types";

const MAX_PRODUCTS = 6;

/**
 * Global navbar search: a command-palette style overlay with instant
 * client-side results over the whole catalog. Opens with the icon, ⌘K/Ctrl+K
 * or "/" outside inputs; arrow keys + Enter navigate, Escape closes.
 */
export default function SearchOverlay() {
  const { t, tr } = useSite();
  const { categories, products, catName, openViewer, phone } = useStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { catMatches, prodMatches } = useMemo(() => {
    const needle = foldSearch(q.trim());
    if (!needle) return { catMatches: [] as Category[], prodMatches: [] as Product[] };
    const cats = categories.filter((c) => foldSearch([tr(c.name), c.slug].join(" ")).includes(needle)).slice(0, 2);
    const prods = products
      .filter((p) =>
        foldSearch(
          [p.name, p.sub, p.tag]
            .flatMap((f) => (typeof f === "string" ? [f] : [f?.az, f?.en, f?.ru]))
            .concat(p.category_slug)
            .filter(Boolean)
            .join(" "),
        ).includes(needle),
      )
      .slice(0, MAX_PRODUCTS);
    return { catMatches: cats, prodMatches: prods };
  }, [q, categories, products, tr]);

  const flatCount = catMatches.length + prodMatches.length;

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(-1);
  }, []);

  const goCat = (slug: string) => {
    close();
    router.push(`/shop?cat=${encodeURIComponent(slug)}`);
  };

  const goAll = () => {
    const text = q.trim();
    close();
    router.push(text ? `/shop?q=${encodeURIComponent(text)}` : "/shop");
  };

  const pick = (p: Product) => {
    close();
    openViewer(p);
  };

  const activate = (idx: number) => {
    if (idx < catMatches.length) goCat(catMatches[idx].slug);
    else if (idx < flatCount) pick(prodMatches[idx - catMatches.length]);
    else goAll();
  };

  /* open with ⌘K / Ctrl+K, or "/" when not typing in a field */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.activeElement;
        const tag = el?.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select" || (el as HTMLElement | null)?.isContentEditable) return;
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* focus the field whenever the overlay opens; lock body scroll */
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    document.body.classList.add("is-locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (flatCount ? (i + 1) % (flatCount + 1) : -1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (flatCount ? (i - 1 + flatCount + 1) % (flatCount + 1) : -1));
      }
      if (e.key === "Enter" && active >= 0) {
        e.preventDefault();
        activate(active);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active, flatCount, close]);

  return (
    <>
      <button
        type="button"
        className="sov-btn"
        aria-label={t("nav.search")}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        <span className="sov-kbd">⌘K</span>
      </button>

      {open && (
        <div className="sov" role="dialog" aria-modal="true" aria-label={t("nav.search")}>
          <div className="sov-dim" onClick={close} />
          <div className="sov-panel">
            <form
              className="sov-head"
              onSubmit={(e) => {
                e.preventDefault();
                if (active >= 0) activate(active);
                else goAll();
              }}
            >
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                value={q}
                placeholder={t("search.ph")}
                aria-label={t("nav.search")}
                autoComplete="off"
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(-1);
                }}
              />
              <button type="button" className="sov-x" aria-label="Close" onClick={close}>
                <CloseIcon />
              </button>
            </form>

            <div className="sov-body">
              {!q.trim() ? (
                <div className="sov-pop">
                  <span className="sov-label">{t("search.popular")}</span>
                  <div className="sov-cats">
                    {categories.slice(0, 6).map((c) => (
                      <button type="button" key={c.slug} onClick={() => goCat(c.slug)}>
                        {tr(c.name)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {catMatches.length > 0 && (
                    <div className="sov-group">
                      <span className="sov-label">{t("sp.category")}</span>
                      {catMatches.map((c, i) => (
                        <button
                          type="button"
                          key={c.slug}
                          className={`sov-item${active === i ? " on" : ""}`}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => goCat(c.slug)}
                        >
                          <span className="sov-thumb" aria-hidden="true" />
                          <span className="sov-meta">
                            <b>{tr(c.name)}</b>
                          </span>
                          <span className="sov-price" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="sov-group">
                    <span className="sov-label">
                      {t("search.results")}
                      {prodMatches.length > 0 ? ` · ${prodMatches.length}` : ""}
                    </span>
                    {prodMatches.map((p, i) => {
                      const idx = catMatches.length + i;
                      const cover = productImages(p)[0];
                      const price = fmtPrice(p.price);
                      return (
                        <button
                          type="button"
                          key={p.id}
                          className={`sov-item${active === idx ? " on" : ""}`}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => pick(p)}
                        >
                          <span className="sov-thumb">
                            {cover && <Image src={img(cover, 120)} alt="" width={52} height={64} />}
                          </span>
                          <span className="sov-meta">
                            <b>{tr(p.name)}</b>
                            <i>{catName(p.category_slug)}</i>
                          </span>
                          <span className="sov-price">
                            {price ? `${price} ${p.currency || "AZN"}` : ""}
                          </span>
                        </button>
                      );
                    })}

                    {!flatCount && (
                      <div className="sov-none">
                        <p>{t("search.none")}</p>
                        <a href={waLink(`${t("wa.intro")}: "${q.trim()}"`, phone)} target="_blank" rel="noopener noreferrer">
                          {t("lb.ask")} <ArrowIcon />
                        </a>
                      </div>
                    )}
                  </div>

                  {prodMatches.length > 0 && (
                    <button
                      type="button"
                      className={`sov-all${active === flatCount ? " on" : ""}`}
                      onMouseEnter={() => setActive(flatCount)}
                      onClick={goAll}
                    >
                      {t("search.all")}
                      <ArrowIcon />
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="sov-foot">{t("search.hint")}</div>
          </div>
        </div>
      )}
    </>
  );
}
