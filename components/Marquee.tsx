"use client";

import { useSite } from "@/components/SiteProvider";
import { Icon } from "@/components/icons";

/** Infinite brand ticker — rendered twice for a seamless loop. */
export default function Marquee() {
  const { dict } = useSite();
  const items = dict.marq;

  const piece = (
    <div style={{ display: "flex" }}>
      {items.map((text, i) => (
        <div className="ticker-item" key={`${text}-${i}`}>
          {i % 2 ? <em>{text}</em> : text}
          <Icon name="ornament" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {piece}
        {piece}
      </div>
    </div>
  );
}
