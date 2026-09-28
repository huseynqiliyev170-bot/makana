"use client";

import { createContext, useContext } from "react";
import type { Catalog, Category, Product, SortKey } from "@/lib/i18n/types";

export interface ViewerState {
  product: Product | null;
  startIndex: number;
}

/** Open price bound or null = unbounded. */
export type PriceBound = number | null;

export interface StoreState {
  catalog: Catalog;
  phone: string;
  instagram: string;
  categories: Category[];
  products: Product[];
  /** currently selected category slug ("all" = everything) */
  cat: string;
  setCat: (slug: string) => void;
  query: string;
  setQuery: (q: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  priceMin: PriceBound;
  priceMax: PriceBound;
  setPriceRange: (min: PriceBound, max: PriceBound) => void;
  limit: number;
  setLimit: (n: number) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  visible: Product[];
  catName: (slug: string) => string;
  catCount: (slug: string) => number;
  catCover: (slug: string) => string;
  openViewer: (product: Product, startSrc?: string) => void;
  closeViewer: () => void;
  viewer: ViewerState;
  waFor: (product: Product) => string;
}

export const StoreContext = createContext<StoreState | null>(null);

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
