"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/SiteProvider";
import { LANGS, LANG_LABEL } from "@/lib/i18n/dictionaries";
import type { Lang } from "@/lib/i18n/types";
import { waLink, instagramUrl, DEFAULT_PHONE, DEFAULT_INSTAGRAM } from "@/lib/links";
import { onScrollRaf, isFinePointer } from "@/lib/motion";
import { WhatsAppIcon, InstagramIcon, ArrowIcon } from "@/components/icons";
import SearchOverlay from "@/components/SearchOverlay";

const LOGO =
  "https://res.cloudinary.com/dn2jro6kd/image/upload/v1779474544/logo_ui0eob.png";


type NavKey = "nav.coll" | "nav.about" | "nav.shop" | "nav.gallery" | "nav.contact";

/** Shop and About are real routes; the rest are sections on the home page. */
const NAV_ITEMS: { href: string; key: NavKey; id: string | null }[] = [
  { href: "/#collections", key: "nav.coll", id: "collections" },
  { href: "/about", key: "nav.about", id: null },
  { href: "/shop", key: "nav.shop", id: null },
  { href: "/#gallery", key: "nav.gallery", id: "gallery" },
  { href: "/#contact", key: "nav.contact", id: "contact" },
];

/** Must match the `max-width: 1080px` breakpoint in the CSS. */
const DESKTOP_MQ = "(min-width: 1081px)";

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const off = window.innerWidth > 1080 ? 74 : 64;
  window.scrollTo({
    top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - off),
    behavior: reduce ? "auto" : "smooth",
  });
}

export default function Chrome({ phone, instagram }: { phone?: string; instagram?: string }) {
  const { t, setLang, lang } = useSite();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [floatOn, setFloatOn] = useState(false);

  const progRef = useRef<HTMLElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");

  /* scroll: progress bar is written straight to the DOM (no per-frame
     re-render); header/float/active states only setState on change. */
  useEffect(() => {
    return onScrollRaf((y) => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) progRef.current.style.width = h > 0 ? `${Math.min(100, (y / h) * 100)}%` : "0%";
      setSolid(y > 80);
      setFloatOn(y > 620);
      if (!onHome) return;
      let current: string | null = null;
      NAV_ITEMS.forEach((item) => {
        if (!item.id) return;
        const el = document.getElementById(item.id);
        if (el && el.offsetTop - 160 <= y) current = item.id;
      });
      setActive(current);
    });
  }, [onHome]);

  /* lock body while mobile menu is open */
  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen);
    return () => document.body.classList.remove("is-locked");
  }, [menuOpen]);

  /* close menu on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* close menu if the viewport grows past the mobile breakpoint
     (rotation, split-screen, devtools) so it never stays stuck open */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* custom cursor (fine pointers only) */
  useEffect(() => {
    if (!isFinePointer()) return;
    /* tells CSS it is safe to hide the native arrow — without JS the
       custom cursor never moves, so the native one must stay */
    document.documentElement.classList.add("has-cur");
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px,${my}px)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = window.requestAnimationFrame(loop);
    };
    const selector = "a,button,.pcard-media,.mcoll-card,input,textarea,select,[data-cursor]";

    const cursorLabelFor = (el: Element): string => {
      const kind = el.getAttribute("data-cursor");
      if (kind === "wa") return t("cur.wa");
      if (kind === "ig") return t("cur.ig");
      if (kind === "zoom") return t("cur.zoom");
      if (kind === "view") return t("cur.view");
      if (el.classList.contains("pcard-media")) return t("cur.zoom");
      return "";
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(selector);
      if (!el || !ringRef.current) return;
      ringRef.current.classList.add("big");
      setLabel(cursorLabelFor(el));
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(selector);
      if (!el || !ringRef.current) return;
      const to = e.relatedTarget as Element | null;
      if (to && to.closest && to.closest(selector)) return;
      ringRef.current.classList.remove("big");
      setLabel("");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = window.requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-cur");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.cancelAnimationFrame(raf);
    };
  }, [t]);

  /* on the home page, section links smooth-scroll instead of navigating */
  const onAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: (typeof NAV_ITEMS)[number]) => {
      if (onHome && item.id) {
        e.preventDefault();
        setMenuOpen(false);
        scrollToHash(`#${item.id}`);
        window.history.replaceState(null, "", `#${item.id}`);
      }
    },
    [onHome],
  );

  const langButtons = (
    <div className="lang" role="group" aria-label="Language">
      {LANGS.map((code: Lang) => (
        <button key={code} type="button" data-lang={code} className={lang === code ? "on" : ""} onClick={() => setLang(code)}>
          {LANG_LABEL[code]}
        </button>
      ))}
    </div>
  );

  const waHref = waLink("", phone ?? DEFAULT_PHONE);
  const igHref = instagramUrl(instagram ?? DEFAULT_INSTAGRAM);

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    item.key === "nav.shop"
      ? pathname.startsWith("/shop")
      : item.key === "nav.about"
        ? pathname.startsWith("/about")
        : active === item.id;

  /* while the menu is open the header drops its solid (paper) state and
     goes transparent over the dark panel — otherwise a light strip sits on
     top of the menu and the burger becomes dark-on-dark */
  const hdrClass = ["hdr", solid && !menuOpen ? "solid" : "", menuOpen ? "mopen" : ""].filter(Boolean).join(" ");

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="prog" aria-hidden="true">
        <i ref={progRef} />
      </div>
      <div className="cur-r" ref={ringRef} data-label={label} aria-hidden="true" />
      <div className="cur" ref={dotRef} aria-hidden="true" />

      <header className={hdrClass} id="nav">
        <div className="hdr-in">
          <Link
            href="/"
            className="brand"
            aria-label="Makana by Ruh"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Makana by Ruh" width={38} height={38} />
            <span className="brand-t">
              <b>Makana</b>
              <i>{t("brand.sub")}</i>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={isActive(item) ? "act" : ""}
                onClick={(e) => onAnchor(e, item)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="nav-r">
            <SearchOverlay />
            {langButtons}
            <Link href="/shop" className="btn btn--gold btn--sm nav-cta" data-cursor="view">
              <span>{t("nav.cta")}</span>
            </Link>
            <button
              className={`burger${menuOpen ? " on" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Menu"}
              aria-expanded={menuOpen}
              aria-controls="mmenu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="burger-box" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mmenu" className={`mmenu${menuOpen ? " on" : ""}`} aria-hidden={!menuOpen}>
        <nav className="mnav" aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              className={`ml${isActive(item) ? " act" : ""}`}
              style={{ "--i": i } as CSSProperties}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => onAnchor(e, item)}
            >
              <span className="ml-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="ml-t">
                <span>{t(item.key)}</span>
              </span>
              <span className="ml-a" aria-hidden="true">
                <ArrowIcon style={{ width: 16, height: 16 }} />
              </span>
            </Link>
          ))}
        </nav>

        <div className="mfoot">
          <Link href="/shop" className="btn btn--gold mcta" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
            <span>{t("nav.cta")}</span>
          </Link>
          <div className="mfoot-row">
            {langButtons}
            <div className="soc">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="btn btn--ghost-inv"
                tabIndex={menuOpen ? 0 : -1}
              >
                <WhatsAppIcon />
              </a>
              <a
                href={igHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="btn btn--ghost-inv"
                tabIndex={menuOpen ? 0 : -1}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <a href={waHref} target="_blank" rel="noopener noreferrer" className={`wa-float${floatOn ? " on" : ""}`} aria-label="WhatsApp" data-cursor="wa">
        <WhatsAppIcon />
      </a>

      <button
        className={`top-btn${floatOn ? " on" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowIcon style={{ transform: "rotate(-90deg)", width: 15, height: 15 }} />
      </button>
    </>
  );
}
