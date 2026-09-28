"use client";

import { useSite } from "@/components/SiteProvider";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { StarIcon } from "@/components/icons";

/** Customer voices as ruled editorial rows — quote left, attribution right. */
export default function HomeVoices() {
  const { t, dict } = useSite();
  const head = useReveal<HTMLDivElement>();
  const rows = useReveal<HTMLDivElement>(0.05);

  return (
    <section className="msec" id="voices" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className={revealClass("msec-head rv", head.shown)} ref={head.ref}>
          <div>
            <div className="msec-kick">{t("testi.tag")}</div>
            <h2 className="msec-title" dangerouslySetInnerHTML={{ __html: dict["testi.title"] }} />
          </div>
          <p className="msec-lead">{t("testi.lead")}</p>
        </div>

        <div className={revealClass("rv", rows.shown)} ref={rows.ref}>
          {dict.testi.map((item) => (
            <div className="mvoice-row" key={item.n}>
              <blockquote>&ldquo;{item.t}&rdquo;</blockquote>
              <div className="mvoice-who">
                <div className="mvoice-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                <b>{item.n}</b>
                <span>{item.c}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
