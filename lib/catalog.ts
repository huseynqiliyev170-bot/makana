import type { Catalog, Category, Product, Settings } from "@/lib/i18n/types";
import snapshot from "@/lib/snapshot.json";
import { getCategories, getProducts, getSettings } from "@/lib/store-data";

const FALLBACK = snapshot as unknown as Catalog;

function normalizeCatalog(products: Product[], categories: Category[], settings: Settings): Catalog {
  return {
    categories: (categories ?? [])
      .filter((c) => c.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    products: (products ?? [])
      .filter((p) => p.active !== false)
      .map((p) => ({
        ...p,
        images: Array.isArray(p.images) && p.images.length ? p.images : p.image_url ? [p.image_url] : [],
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    settings: settings ?? {},
  };
}

/**
 * Loads the catalog from the FastAPI backend. Each source falls back to the
 * bundled snapshot independently: if the backend is reachable, its data is the
 * truth (even when a collection is empty); only a failed/unreachable read
 * degrades that piece to the snapshot so the site still renders fully.
 */
export async function getCatalog(): Promise<Catalog> {
  const [products, categories, settings] = await Promise.all([
    getProducts().catch(() => FALLBACK.products as Product[]),
    getCategories().catch(() => FALLBACK.categories as Category[]),
    getSettings().catch(() => FALLBACK.settings as Settings),
  ]);
  return normalizeCatalog(products, categories, settings);
}
