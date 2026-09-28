import type { Metadata, Viewport } from "next";
import { Cormorant, Commissioner } from "next/font/google";
import "../globals.css";

/* Display face: Cormorant — a delicate high-contrast serif with a true italic
   and full cyrillic coverage (az/en/ru). */
const cormorant = Cormorant({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--ff-display",
  display: "swap",
});

/* Body face: Commissioner — a quiet grotesque with the same coverage. */
const commissioner = Commissioner({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--ff-body",
  display: "swap",
});

const LOGO = "https://res.cloudinary.com/dn2jro6kd/image/upload/v1779474544/logo_ui0eob.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://makanabyruh.az"),
  title: "Makana by Ruh — İpək Yaylıqlar & Şamlar | Bakı",
  description:
    "Makana by Ruh — Bakıdan doğulan əl işi ipək yaylıqlar, ətirli şamlar, home diffuzorlar və gift boxlar. Sənətin irslə qovuşduğu yer.",
  keywords: ["Makana by Ruh", "ipək yaylıq", "şamlar", "gift box", "Bakı", "silk scarf", "candles"],
  icons: { icon: LOGO, apple: LOGO },
  openGraph: {
    type: "website",
    url: "https://makanabyruh.az/",
    title: "Makana by Ruh — İpək Yaylıqlar & Şamlar | Bakı",
    description: "Əl işi ipək yaylıqlar, ətirli şamlar və eksklyuziv kolleksiyalar. Bakı, Azərbaycan.",
    images: ["https://res.cloudinary.com/dn2jro6kd/image/upload/v1779456912/qyrn20qmsuus1xefm3h1.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#191310",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Makana by Ruh",
  url: "https://makanabyruh.az",
  logo: LOGO,
  description:
    "Handcrafted silk scarves, soy wax candles, home diffusers and gift boxes born from Azerbaijani heritage motifs. Baku, Azerbaijan.",
  address: { "@type": "PostalAddress", addressLocality: "Baku", addressCountry: "AZ" },
  sameAs: ["https://instagram.com/makanabyruh"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+994998007154",
    contactType: "sales",
    availableLanguage: ["az", "en", "ru"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${cormorant.variable} ${commissioner.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
