"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { waLink, instagramUrl } from "@/lib/links";
import {
  ClockIcon,
  InstagramIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";

const LOGO =
  "https://res.cloudinary.com/dn2jro6kd/image/upload/v1779474544/logo_ui0eob.png";

const NAV_LINKS: {
  href: string;
  key:
    | "nav.about"
    | "nav.coll"
    | "nav.shop"
    | "nav.gallery"
    | "nav.contact";
}[] = [
  { href: "/about", key: "nav.about" },
  { href: "/#collections", key: "nav.coll" },
  { href: "/shop", key: "nav.shop" },
  { href: "/#gallery", key: "nav.gallery" },
  { href: "/#contact", key: "nav.contact" },
];

export default function Footer() {
  const { t, tr } = useSite();
  const { categories, phone, instagram } = useStore();
  const router = useRouter();

  const openCollection = (slug: string) => {
    router.push(`/shop?cat=${encodeURIComponent(slug)}`);
  };

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          {/* BRAND */}
          <div className="foot-brand">
            <Link
              href="/"
              className="foot-logo"
              aria-label="Makana by Ruh"
            >
              <Image
                src={LOGO}
                alt="Makana by Ruh"
                width={72}
                height={72}
                className="foot-logo-image"
                unoptimized
              />
            </Link>

            <p>{t("foot.desc")}</p>

            <div className="foot-soc">
              <a
                href={instagramUrl(instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor="ig"
              >
                <InstagramIcon />
              </a>

              <a
                href={waLink("", phone)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-cursor="wa"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* MENU */}
          <div className="foot-col">
            <h4>{t("foot.menu")}</h4>

            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* CATEGORIES */}
          <div className="foot-col">
            <h4>{t("foot.cats")}</h4>

            <div id="footCats">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.slug}
                  className="foot-cat"
                  onClick={() => openCollection(c.slug)}
                >
                  {tr(c.name)}
                </button>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="foot-col">
            <h4>{t("foot.contact")}</h4>

            <ul className="foot-ch">
              <li>
                <a
                  href={waLink("", phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="wa"
                >
                  <span className="foot-ch-ic" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  +{phone.slice(0, 3)}{" "}
                  {phone.slice(3, 5)}{" "}
                  {phone.slice(5, 8)}{" "}
                  {phone.slice(8, 10)}{" "}
                  {phone.slice(10)}
                </a>
              </li>

              <li>
                <a
                  href={instagramUrl(instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="ig"
                >
                  <span className="foot-ch-ic" aria-hidden="true">
                    <InstagramIcon />
                  </span>
                  @{instagram}
                </a>
              </li>

              <li>
                <span className="foot-ch-ic" aria-hidden="true">
                  <PinIcon />
                </span>
                {t("ct.loc")}
              </li>

              <li>
                <span className="foot-ch-ic" aria-hidden="true">
                  <ClockIcon />
                </span>
                {t("foot.hours")}
              </li>
            </ul>
          </div>
        </div>

        {/* LARGE BRAND WORD */}
        <div
          className="foot-word"
          aria-hidden="true"
        >
          MAKANA <em>by</em> RUH
        </div>

        <div className="foot-bot">
          <p>{t("foot.txt")}</p>
        </div>
      </div>
    </footer>
  );
}