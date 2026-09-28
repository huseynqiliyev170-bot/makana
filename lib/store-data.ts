import { backend } from "@/lib/backend";
import type { Category, LocalizedText, Product, Settings } from "@/lib/i18n/types";

/**
 * Public (storefront-facing) reads from the FastAPI backend. These run during
 * SSR and hit the no-auth public endpoints; the caller (catalog.ts) falls back
 * to the bundled snapshot when the backend is unreachable or empty.
 */

interface RawProduct {
  id: string;
  category_slug?: string;
  name?: LocalizedText;
  sub?: LocalizedText;
  tag?: LocalizedText;
  image_url?: string;
  images?: string[];
  price?: number | null;
  currency?: string;
  order?: number;
  active?: boolean;
  created_at?: string;
}

interface RawCategory {
  id: string;
  slug?: string;
  name?: LocalizedText;
  icon?: string;
  order?: number;
  active?: boolean;
  created_at?: string;
}

export async function getProducts(): Promise<Product[]> {
  const rows = await backend<RawProduct[]>("/api/products", { timeoutMs: 5000 });
  return rows.map((r) => ({
    id: r.id,
    category_slug: r.category_slug ?? "",
    name: r.name ?? "",
    sub: r.sub ?? "",
    tag: r.tag ?? "",
    image_url: r.image_url ?? "",
    images: Array.isArray(r.images) ? r.images.filter(Boolean) : r.image_url ? [r.image_url] : [],
    price: typeof r.price === "number" && Number.isFinite(r.price) ? r.price : null,
    currency: r.currency || "AZN",
    order: r.order ?? 0,
    active: r.active !== false,
    created_at: r.created_at ?? "",
  }));
}

export async function getCategories(): Promise<Category[]> {
  const rows = await backend<RawCategory[]>("/api/categories", { timeoutMs: 5000 });
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug ?? "",
    name: r.name ?? "",
    icon: r.icon ?? "",
    order: r.order ?? 0,
    active: r.active !== false,
    created_at: r.created_at ?? "",
  }));
}

export async function getSettings(): Promise<Settings> {
  const s = await backend<Record<string, string>>("/api/settings", { timeoutMs: 5000 });
  return {
    hero_image: s.hero_image ?? "",
    about_image: s.about_image ?? "",
    lifestyle_image: s.lifestyle_image ?? "",
    whatsapp: s.whatsapp ?? "",
    instagram: s.instagram ?? "",
  };
}
