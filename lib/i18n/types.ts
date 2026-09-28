export type Lang = "az" | "en" | "ru";

/** Every translatable field may be a plain string (legacy rows) or an object keyed by language. */
export type LocalizedText = string | Partial<Record<Lang, string>> | null | undefined;

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  icon?: string;
  order: number;
  active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  category_slug: string;
  name: LocalizedText;
  sub: LocalizedText;
  tag: LocalizedText;
  image_url?: string;
  images: string[];
  price: number | null;
  currency: string;
  order: number;
  active?: boolean;
  created_at: string;
}

export interface Settings {
  hero_image?: string;
  about_image?: string;
  lifestyle_image?: string;
  whatsapp?: string;
  instagram?: string;
}

export interface Catalog {
  products: Product[];
  categories: Category[];
  settings: Settings;
}

export type SortKey = "default" | "asc" | "desc" | "new";