"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { waLink, instagramUrl } from "@/lib/links";
import { ClockIcon, InstagramIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

const LOGO = "https://res.cloudinary.com/dn2jro6kd/image/upload/v1779474544/logo_ui0eob.png";

const NAV_LINKS: { href: string; key: "nav.about" | "nav.coll" | "nav.shop" | "nav.gallery" | "nav.contact" }[] = [
  { href: "/about", key: "nav.about" },
  { href: "/#collections", key: "nav.coll" },
  { href: "/shop", key: "nav.shop" },
  { href: "/#gallery", key: "nav.gallery" },
  { href: "/#contact", key: "nav.contact" },
];

/** Monochrome footer closing the home page with an outlined wordmark. */
export default function HomeFooter() {
  const { t, tr } = useSite();
  const { categories, phone, instagram } = useStore();
  const router = useRouter();

  const openCollection = (slug: string) => {
    router.push(`/shop?cat=${encodeURIComponent(slug)}`);
  };

  return (
    <footer className="mftr">
      <div className="wrap">
        <div className="mftr-top">
          <div className="mftr-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Makana by Ruh" width={48} height={48} />
            <p>{t("foot.desc")}</p>
            <div className="mftr-soc">
              <a href={instagramUrl(instagram)} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-cursor="ig">
                <InstagramIcon />
              </a>
              <a href={waLink("", phone)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-cursor="wa">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div className="mftr-col">
            <h4>{t("foot.menu")}</h4>
            {NAV_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="mftr-col">
            <h4>{t("foot.cats")}</h4>
            {categories.map((c) => (
              <button type="button" key={c.slug} onClick={() => openCollection(c.slug)}>
                {tr(c.name)}
              </button>
            ))}
          </div>

          <div className="mftr-col">
            <h4>{t("foot.contact")}</h4>
            <ul className="mftr-ch">
              <li>
                <a href={waLink("", phone)} target="_blank" rel="noopener noreferrer" data-cursor="wa">
                  <span className="mftr-ch-ic" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  +{phone.slice(0, 3)} {phone.slice(3, 5)} {phone.slice(5, 8)} {phone.slice(8, 10)} {phone.slice(10)}
                </a>
              </li>
              <li>
                <a href={instagramUrl(instagram)} target="_blank" rel="noopener noreferrer" data-cursor="ig">
                  <span className="mftr-ch-ic" aria-hidden="true">
                    <InstagramIcon />
                  </span>
                  @{instagram}
                </a>
              </li>
              <li>
                <span className="mftr-ch-ic" aria-hidden="true">
                  <PinIcon />
                </span>
                {t("ct.loc")}
              </li>
              <li>
                <span className="mftr-ch-ic" aria-hidden="true">
                  <ClockIcon />
                </span>
                {t("foot.hours")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mftr-word" aria-hidden="true">
          MAKANA BY RUH
        </div>

        <div className="mftr-bot">
          <p>{t("foot.txt")}</p>
        </div>
      </div>
    </footer>
  );
}
