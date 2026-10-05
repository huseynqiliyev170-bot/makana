"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, TouchEvent as ReactTouchEvent, UIEvent as ReactUIEvent } from "react";

/* layout effect in the browser, plain effect during SSR (avoids the
   dev-mode warning; the component renders null on the server anyway) */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { fmtPrice, productImages, productSize, tagWithoutSize } from "@/lib/format";
import { img, waLink } from "@/lib/links";
import {
  ArrowIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  OrnamentIcon,
} from "@/components/icons";

/** Touch-first presentation: narrow viewport or no hover capability. */
const MOBILE_QUERY = "(max-width: 900px), (hover: none)";

/** Pulled this far (rendered px), releasing closes the gallery. */
const PULL_CLOSE = 100;

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Product viewer — desktop: a two-column lightbox (night stage holding the
 * photograph, quiet paper panel with the facts); touch: a fullscreen snap
 * gallery with a bottom info sheet that can be pulled down to dismiss.
 * The box keeps a fixed height so moving between shots never shifts the
 * layout. Styled entirely through design tokens, so it inherits the
 * monochrome identity on the home page and the warm one on /shop.
 */
export default function ProductViewer() {
  const { t, tr, dict, lang } = useSite();
  const { viewer, closeViewer, waFor, phone, catName } = useStore();

  const [mobile, setMobile] = useState(false);
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pullRef = useRef<{ x: number; y: number; vertical: boolean; d: number } | null>(null);

  const product = viewer.product;
  const images = useMemo<string[]>(() => (product ? productImages(product) : []), [product]);
  const count = images.length;

  /* Presentation mode is decided before the browser paints, so touch
     devices never flash the desktop lightbox first. */
  useBeforePaint(() => {
    if (!product) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [product]);

  /* Every open starts at the requested shot, clamped into range. */
  useBeforePaint(() => {
    if (!product) return;
    setIdx(Math.min(Math.max(0, viewer.startIndex), Math.max(0, count - 1)));
    setDrag(0);
    setDragging(false);
  }, [product, viewer.startIndex, count]);

  /* Touch: park the track on the opening shot (post-layout, so clientWidth
     is real), and only there — never fight the user's own swiping. */
  useBeforePaint(() => {
    if (!product || !mobile) return;
    const el = trackRef.current;
    if (el) el.scrollLeft = idx * el.clientWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, mobile]);

  /* Scroll lock, compensating for the vanished scrollbar so the page
     behind doesn't shift sideways. */
  useEffect(() => {
    if (!product) return;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    document.body.classList.add("is-locked");
    return () => {
      document.body.classList.remove("is-locked");
      document.body.style.paddingRight = "";
    };
  }, [product]);

  /* Keyboard: Escape closes, arrows move between shots, Tab stays inside. */
  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeViewer();
        return;
      }
      if (!mobile && count > 1) {
        if (e.key === "ArrowRight") setIdx((i) => (i + 1) % count);
        else if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + count) % count);
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const items = dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [product, mobile, count, closeViewer]);

  /* Remember what had focus before the open, and give it back on close. */
  useEffect(() => {
    if (!product) return;
    const prev = document.activeElement as HTMLElement | null;
    return () => {
      if (prev && prev.isConnected && typeof prev.focus === "function") prev.focus();
    };
  }, [product]);

  /* Keep focus inside the dialog — on open and on a desktop/touch flip. */
  useEffect(() => {
    if (!product) return;
    const el = dialogRef.current;
    if (el && !el.contains(document.activeElement)) {
      el.querySelector<HTMLElement>("[data-first-focus]")?.focus();
    }
  }, [product, mobile]);

  /* Warm up the neighbouring shots so navigation never flashes an
     unloaded image. */
  useEffect(() => {
    if (!product || count < 2) return;
    for (const d of [1, -1]) {
      const j = (idx + d + count) % count;
      const pre = new window.Image();
      pre.src = img(images[j], mobile ? 1200 : 1400);
    }
  }, [product, idx, count, images, mobile]);

  if (!product) return null;

  const name = tr(product.name);
  const sub = tr(product.sub);
  const tag = tagWithoutSize(product, lang);
  const size = productSize(product, lang);
  const price = fmtPrice(product.price);
  const currency = product.currency || "AZN";
  const orderHref = waLink(waFor(product), phone);
  const askHref = waLink(`${name} — ${t("lb.ask")}`, phone);
  const badges = dict["lb.b"] ?? [];
  const go = (d: number) => setIdx((i) => (i + d + Math.max(1, count)) % Math.max(1, count));

  if (mobile) {
    /* ── touch: fullscreen snap gallery with a pull-to-dismiss sheet ── */

    const onTrackScroll = (e: ReactUIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const next = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
      if (next !== idx && next >= 0 && next < count) setIdx(next);
    };

    const onPullStart = (e: ReactTouchEvent) => {
      const p = e.touches[0];
      pullRef.current = { x: p.clientX, y: p.clientY, vertical: false, d: 0 };
    };

    const onPullMove = (e: ReactTouchEvent) => {
      const st = pullRef.current;
      if (!st) return;
      const p = e.touches[0];
      const dx = p.clientX - st.x;
      const dy = p.clientY - st.y;
      if (!st.vertical) {
        if (dy > 12 && dy > Math.abs(dx) * 1.4) st.vertical = true;
        else if (Math.abs(dx) > 12) {
          /* horizontal intent belongs to the track */
          pullRef.current = null;
          return;
        }
      }
      if (!st.vertical) return;
      st.d = Math.max(0, Math.min(dy * 0.6, 220));
      setDragging(true);
      setDrag(st.d);
    };

    const onPullEnd = () => {
      const st = pullRef.current;
      pullRef.current = null;
      if (st?.vertical && st.d >= PULL_CLOSE) closeViewer();
      setDragging(false);
      setDrag(0);
    };

    const dragStyle = drag
      ? ({
          "--drag": `${drag}px`,
          "--drag-o": String(Math.max(0.35, 1 - drag / 300)),
        } as CSSProperties)
      : undefined;

    return (
      <div
        className={`mg${dragging ? " dragging" : ""}`}
        id="mg"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        ref={dialogRef}
        style={dragStyle}
        onTouchStart={onPullStart}
        onTouchMove={onPullMove}
        onTouchEnd={onPullEnd}
        onTouchCancel={onPullEnd}
      >
        <div className="mg-in">
          <div className="mg-top">
            <span className="cnt">
              {pad2(idx + 1)} / {pad2(Math.max(1, count))}
            </span>
            <button
              className="mg-x"
              id="mgClose"
              data-first-focus
              type="button"
              aria-label={t("lb.close")}
              onClick={closeViewer}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mg-track" id="mgTrack" ref={trackRef} onScroll={onTrackScroll}>
            {images.map((src, i) => (
              <div className="mg-slide" key={`${product.id}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(src, 1200)}
                  alt={`${name} ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="mg-bot">
            <div className="mg-kicker">{catName(product.category_slug)}</div>
            <div className="nm" id="mgName">
              {name}
            </div>
            {count > 1 && (
              <div className="mg-dots" id="mgDots">
                {images.map((_, i) => (
                  <i key={i} className={i === idx ? "on" : ""} />
                ))}
              </div>
            )}
            <div className="pr">
              {price && (
                <b id="mgPrice">
                  {price} <small>{currency}</small>
                  {size && <em className="mg-size">{size}</em>}
                </b>
              )}
              <a
                id="mgCta"
                className="btn btn--gold btn--sm"
                href={orderHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="wa"
              >
                <span>{t("wa.order")}</span>
                <ArrowIcon />
              </a>
            </div>
            <div className="mg-hint">{t("mg.hint")}</div>
          </div>
        </div>
      </div>
    );
  }

  /* ── desktop: two-column lightbox on a night veil ── */

  return (
    <div
      className="lb"
      id="lb"
      role="dialog"
      aria-modal="true"
      aria-label={name}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeViewer();
      }}
    >
      <button
        className="lb-close"
        id="lbClose"
        data-first-focus
        type="button"
        aria-label={t("lb.close")}
        onClick={closeViewer}
      >
        <CloseIcon />
      </button>

      <div className="lb-box">
        <div className={count > 1 ? "lb-stage" : "lb-stage single"}>
          {count > 0 ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="lb-img"
              id="lbImg"
              key={`${product.id}-${idx}`}
              src={img(images[idx], 1400)}
              alt={`${name} ${idx + 1}`}
              draggable={false}
            />
          ) : (
            <OrnamentIcon className="lb-noimg" aria-hidden="true" />
          )}

          {count > 1 && (
            <>
              <button
                className="lb-nav prev"
                id="lbPrev"
                type="button"
                aria-label={t("lb.prev")}
                onClick={() => go(-1)}
              >
                <ChevronLeftIcon />
              </button>
              <button
                className="lb-nav next"
                id="lbNext"
                type="button"
                aria-label={t("lb.next")}
                onClick={() => go(1)}
              >
                <ChevronRightIcon />
              </button>
              <div className="lb-counter" id="lbCounter">
                {pad2(idx + 1)} / {pad2(count)}
              </div>
              <div className="lb-thumbs" id="lbThumbs">
                {images.map((src, i) => (
                  <button
                    key={`${product.id}-t${i}`}
                    type="button"
                    className={i === idx ? "on" : ""}
                    aria-label={`${name} ${i + 1}`}
                    aria-current={i === idx}
                    onClick={() => setIdx(i)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(src, 160)} alt="" draggable={false} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="lb-info">
          <div className="lb-kicker" id="lbTag">
            {tag || catName(product.category_slug)}
          </div>
          <h3 className="lb-name" id="lbName">
            {name}
          </h3>
          {sub && (
            <p className="lb-sub" id="lbSub">
              {sub}
            </p>
          )}

          {price && (
            <div className="lb-price">
              <b id="lbPrice">
                {price} <small>{currency}</small>
                {size && <em className="lb-size">{size}</em>}
              </b>
              <span>{t("lb.incl")}</span>
            </div>
          )}

          {badges.length > 0 && (
            <div className="lb-meta" id="lbMeta">
              {badges.map((b, i) => (
                <span key={i}>{b}</span>
              ))}
            </div>
          )}

          <div className="lb-acts">
            <a
              id="lbCta"
              className="btn btn--gold btn--wide"
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="wa"
            >
              <span>{t("wa.order")}</span>
              <ArrowIcon />
            </a>
            <a
              id="lbAsk"
              className="btn btn--ghost btn--wide"
              href={askHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("lb.ask")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
