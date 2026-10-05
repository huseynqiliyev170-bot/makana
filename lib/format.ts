import type { Lang, LocalizedText, Product } from "@/lib/i18n/types";

/** Resolve a localized field (object keyed by lang, or legacy plain string). */
export function tr(field: LocalizedText, lang: Lang): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    if (field[lang]) return field[lang] as string;
    if (field.az) return field.az;
    if (field.en) return field.en;
    if (field.ru) return field.ru;
    const keys = Object.keys(field);
    return keys.length ? String(field[keys[0] as Lang] ?? "") : "";
  }
  return "";
}

/** Price without currency symbol: "50" or "24.50" */
export function fmtPrice(price: number | null | undefined): string {
  if (price == null) return "";
  const n = Number(price);
  if (!Number.isFinite(n)) return "";
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
}

export function productImages(p: Product): string[] {
  if (Array.isArray(p.images) && p.images.length) return p.images.filter(Boolean);
  return p.image_url ? [p.image_url] : [];
}

/* Scarves and neckwear keep their dimensions inside the tag field
   ("Ölçü 90*90", "Size 120*120", "Размер 120х120"). The card lifts them out
   to sit beside the price; whatever tag text remains stays over the photo. */
const SIZE_RE = /(\d{2,3})\s*[*×xх]\s*(\d{2,3})/i;

/** Normalized dimensions from the tag ("120 × 120"), or "" when there are none. */
export function productSize(p: Product, lang: Lang): string {
  const m = tr(p.tag, lang).match(SIZE_RE);
  return m ? `${m[1]} × ${m[2]}` : "";
}

/** The tag with the size dimension (and a leftover "Ölçü/Size/Размер" label) removed. */
export function tagWithoutSize(p: Product, lang: Lang): string {
  return tr(p.tag, lang)
    .replace(SIZE_RE, "")
    .replace(/(?:ölçü|olcu|size|размер)\s*$/i, "")
    .replace(/^[\s·•—-]+|[\s·•—-]+$/g, "")
    .trim();
}

export function productText(p: Product, lang: Lang): string {
  return [tr(p.name, lang), tr(p.sub, lang), tr(p.tag, lang), p.category_slug]
    .join(" ")
    .toLowerCase();
}

/* Letters that NFD does not decompose but that users routinely type without
   their diacritics (Azerbaijani schwa, dotless i, breve-g; Russian yo). */
const FOLD_MAP: Record<string, string> = { ə: "e", ı: "i", ğ: "g", ё: "e", ў: "y" };

/**
 * Case- and diacritic-insensitive search folding: "Şəki", "seki" and "SEKI"
 * all reduce to the same token, so a non-AZ keyboard still finds the piece.
 */
export function foldSearch(s: string): string {
  return s
    .toLocaleLowerCase()
    .replace(/[əığёў]/g, (c) => FOLD_MAP[c] ?? c)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}