"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "@/components/SiteProvider";
import { useReveal, revealClass } from "@/hooks/useReveal";
import { ArrowIcon } from "@/components/icons";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const { ref, shown } = useReveal<HTMLSpanElement>(0.5);
  const [value, setValue] = useState("0");

  useEffect(() => {
    if (!shown) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const format = (n: number) =>
      (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(n)) + suffix;
    if (reduce) {
      setValue(format(to));
      return;
    }
    let raf = 0;
    const started = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - started) / 1500);
      setValue(format(Math.round(to * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [shown, to, suffix]);

  return <span ref={ref}>{value}</span>;
}

/** Black canvas: the founder's quote at display scale, then the story
 *  and hairline-ruled counters. The page's single dark caesura. */
export default function HomeStatement() {
  const { t, dict } = useSite();
  const quote = useReveal<HTMLDivElement>();
  const row = useReveal<HTMLDivElement>(0.06);

  return (
    <section className="msec mstate" id="manifest">
      <div className="wrap">
        <div className={revealClass("rv", quote.shown)} ref={quote.ref}>
          <div className="msec-kick">{t("about.tag")}</div>
          <blockquote className="mstate-quote" style={{ marginTop: 26 }}>
            {t("about.quote")}
          </blockquote>
          <div className="mstate-author">{t("about.author")}</div>
        </div>

        <div className={revealClass("mstate-row rv", row.shown)} ref={row.ref}>
          <div className="mstate-txt">
            <h2
              className="msec-title"
              style={{ marginTop: 0, marginBottom: 22 }}
              dangerouslySetInnerHTML={{ __html: dict["about.title"] }}
            />
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <Link href="/about" className="btn btn--ghost-inv mstate-more" data-cursor="view">
              <span>{t("about.more")}</span>
              <ArrowIcon />
            </Link>
          </div>
          <div className="mstate-stats">
            <div>
              <b>
                <Counter to={3800} suffix="+" />
              </b>
              <span>{t("about.s1")}</span>
            </div>
            <div>
              <b>
                <Counter to={306} suffix="+" />
              </b>
              <span>{t("about.s2")}</span>
            </div>
            <div>
              <b>
                <Counter to={6} suffix="+" />
              </b>
              <span>{t("about.s3")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
