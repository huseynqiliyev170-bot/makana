"use client";

import { useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { useStore } from "@/components/store-context";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { waLink, instagramUrl } from "@/lib/links";
import {
  ArrowIcon,
  InstagramIcon,
  PinIcon,
  ShieldIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/icons";

/** Contact: hairline channel rows on the left, WhatsApp-composing form
 *  inside a double-ruled card on the right. */
export default function HomeContact() {
  const { t, tr, dict, toast } = useSite();
  const { categories, products, phone, instagram } = useStore();
  const left = useReveal<HTMLDivElement>();
  const form = useReveal<HTMLFormElement>();

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [chip, setChip] = useState<string | null>(null);
  const [userEdited, setUserEdited] = useState(false);

  const effectiveMessage = chip && !userEdited ? chip : message;

  const send = () => {
    const clean = name.trim();
    if (!clean) {
      toast(t("toast.fill"));
      return;
    }
    const chosen = product === "__any" ? t("form.any") : product === "__other" ? t("form.other") : product;
    const lines = [t("wa.intro"), `${t("wa.name")}: ${clean}`];
    if (tel.trim()) lines.push(`${t("wa.phone")}: ${tel.trim()}`);
    if (chosen) lines.push(`${t("wa.product")}: ${chosen}`);
    if (effectiveMessage.trim()) lines.push(`${t("wa.msg")}: ${effectiveMessage.trim()}`);
    toast(t("toast.open"));
    window.open(waLink(lines.join("\n"), phone), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="msec" id="contact">
      <div className="wrap">
        <div className="mcontact-grid">
          <div className={revealClass("rv", left.shown)} ref={left.ref}>
            <div className="msec-kick">{t("ct.tag")}</div>
            <h2 className="mcontact-title" dangerouslySetInnerHTML={{ __html: dict["ct.title"] }} />
            <p className="mcontact-desc">{t("ct.desc")}</p>

            <div style={{ marginTop: 30 }}>
              <a href={waLink("", phone)} target="_blank" rel="noopener noreferrer" className="mchan" data-cursor="wa">
                <span className="ic">
                  <WhatsAppIcon />
                </span>
                <div>
                  <span>WhatsApp</span>
                  <b>
                    +{phone.slice(0, 3)} {phone.slice(3, 5)} {phone.slice(5, 8)} {phone.slice(8, 10)} {phone.slice(10)}
                  </b>
                </div>
              </a>

              <a href={instagramUrl(instagram)} target="_blank" rel="noopener noreferrer" className="mchan" data-cursor="ig">
                <span className="ic">
                  <InstagramIcon />
                </span>
                <div>
                  <span>Instagram</span>
                  <b>@{instagram}</b>
                </div>
              </a>

              <div className="mchan">
                <span className="ic">
                  <PinIcon />
                </span>
                <div>
                  <span>{t("ct.loc2")}</span>
                  <b>{t("ct.loc")}</b>
                </div>
              </div>

              
            </div>
          </div>

          <form className={revealClass("mform rv", form.shown)} ref={form.ref} onSubmit={(e) => e.preventDefault()}>
            <h3>{t("form.title")}</h3>
            <p>{t("form.sub")}</p>

            <div className="mfgrid">
              <div className="mfld">
                <label htmlFor="mc-name">{t("form.name")}</label>
                <input
                  id="mc-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mfld">
                <label htmlFor="mc-phone">{t("form.phone")}</label>
                <input
                  id="mc-phone"
                  type="tel"
                  autoComplete="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <div className="mfld full">
                <label htmlFor="mc-prod">{t("form.product")}</label>
                <select id="mc-prod" value={product} onChange={(e) => setProduct(e.target.value)}>
                  <option value="">—</option>
                  <option value="__any">{t("form.any")}</option>
                  {categories.map((c) => {
                    const group = products.filter((p) => p.category_slug === c.slug);
                    if (!group.length) return null;
                    return (
                      <optgroup key={c.slug} label={tr(c.name)}>
                        {group.map((p) => {
                          const label = tr(p.name);
                          return (
                            <option key={p.id} value={label}>
                              {label}
                            </option>
                          );
                        })}
                      </optgroup>
                    );
                  })}
                  <option value="__other">{t("form.other")}</option>
                </select>
              </div>
              <div className="mfld full">
                <label htmlFor="mc-msg">{t("form.msg")}</label>
                <textarea
                  id="mc-msg"
                  value={effectiveMessage}
                  onChange={(e) => {
                    setUserEdited(true);
                    setMessage(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mchips">
              {dict.chips.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`mchip${chip === c ? " on" : ""}`}
                  onClick={() => setChip((prev) => (prev === c ? null : c))}
                >
                  {c}
                </button>
              ))}
            </div>

            <button className="btn btn--gold btn--wide" type="button" data-cursor="wa" onClick={send}>
              <span>{t("form.send")}</span>
              <ArrowIcon />
            </button>
            <div className="mform-note">
              <ShieldIcon />
              <span>{t("form.note")}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
