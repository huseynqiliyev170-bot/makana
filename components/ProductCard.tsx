"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/i18n/types";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { fmtPrice, productImages, productSize, tagWithoutSize } from "@/lib/format";
import { img, waLink } from "@/lib/links";
import { WhatsAppIcon } from "@/components/icons";

interface Props {
  product: Product;
  index: number;
}

/**
 * Premium product card in the maison register: a clean 4:5 photograph with
 * no frame, a slow crossfade to the second shot on hover, and a quiet type
 * block beneath (collection label, serif name, one descriptor line, price
 * with the piece's dimensions beside it, WhatsApp order link). Mobile:
 * swipe cycles the cover image.
 */
export default function ProductCard({ product, index }: Props) {
  const { t, tr, lang } = useSite();
  const { openViewer, catName, phone, waFor } = useStore();
  const [shot, setShot] = useState(0);

  const images = productImages(product);
  const name = tr(product.name);
  const sub = tr(product.sub);
  const tag = tagWithoutSize(product, lang);
  const size = productSize(product, lang);
  const price = fmtPrice(product.price);

  useEffect(() => setShot(0), [product.id]);

  const touchStart = useCallback((e: React.TouchEvent) => {
    (e.currentTarget as HTMLElement).dataset.x = String(e.touches[0].clientX);
  }, []);

  const touchEnd = useCallback(
    (e: React.TouchEvent) => {
      const el = e.currentTarget as HTMLElement;
      const x0 = Number(el.dataset.x ?? 0);
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) < 40 || images.length < 2) return;
      e.preventDefault();
      setShot((s) => (dx < 0 ? (s + 1) % images.length : (s - 1 + images.length) % images.length));
    },
    [images.length],
  );

  const open = () => openViewer(product, images[shot] ?? images[0]);

  return (
    <article className="pcard" data-id={product.id}>
      <div
        className="pcard-media"
        data-cursor="zoom"
        role="button"
        tabIndex={0}
        aria-label={name}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >
        <Image
          className="main"
          src={img(images[shot] ?? images[0], 900)}
          alt={name}
          fill
          sizes="(max-width:980px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          loading={index < 3 ? "eager" : "lazy"}
        />
        {images[1] && (
          <Image
            className="alt"
            src={img(images[1], 900)}
            alt=""
            fill
            sizes="(max-width:980px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        )}
        {tag && <span className="pcard-flag">{tag}</span>}
        {images.length > 1 && (
          <span className="pcard-dots">
            {images.slice(0, 5).map((_, i) => (
              <i key={i} className={i === shot ? "on" : ""} />
            ))}
          </span>
        )}
      </div>

      <div className="pcard-info">
        <div className="pcard-cat">{catName(product.category_slug)}</div>
        <h3
          className="pcard-name"
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === "Enter") open();
          }}
        >
          {name}
        </h3>
        {sub && <p className="pcard-sub">{sub}</p>}
        <div className="pcard-row">
          {(price || size) && (
            <div className="pcard-price">
              {price && (
                <>
                  {price} <small>{product.currency || "AZN"}</small>
                </>
              )}
              {size && <span className="pcard-size">{size}</span>}
            </div>
          )}
          <a
            className="pcard-wa"
            href={waLink(waFor(product), phone)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="wa"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${t("wa.order")}: ${name}`}
          >
            <WhatsAppIcon />
            <span>{t("wa.short")}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
