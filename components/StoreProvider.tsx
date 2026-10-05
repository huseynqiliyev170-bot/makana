"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Catalog, Product, SortKey } from "@/lib/i18n/types";
import { useSite } from "@/components/SiteProvider";
import { fmtPrice, productImages, foldSearch } from "@/lib/format";
import { DEFAULT_PHONE, DEFAULT_INSTAGRAM } from "@/lib/links";
import { StoreContext, type StoreState, type ViewerState, type PriceBound } from "@/components/store-context";
import ProductViewer from "@/components/ProductViewer";

interface ProviderProps {
  catalog: Catalog;
  children: ReactNode;
  /** initial filters from the URL (/shop?cat=…&q=…) */
  initialCat?: string;
  initialQuery?: string;
}

export function StoreProvider({ catalog, children, initialCat, initialQuery }: ProviderProps) {
  const { t, tr, lang } = useSite();
  const [cat, setCatRaw] = useState<string>(initialCat && initialCat !== "all" ? initialCat : "all");
  const [query, setQueryRaw] = useState(initialQuery ?? "");
  const [sort, setSortRaw] = useState<SortKey>("default");
  const [priceMin, setPriceMin] = useState<PriceBound>(null);
  const [priceMax, setPriceMax] = useState<PriceBound>(null);
  const [viewer, setViewer] = useState<ViewerState>({ product: null, startIndex: 0 });

  const phone = (catalog.settings.whatsapp || DEFAULT_PHONE).replace(/\D/g, "") || DEFAULT_PHONE;
  const instagram = catalog.settings.instagram || DEFAULT_INSTAGRAM;

  const setCat = useCallback((slug: string) => setCatRaw(slug), []);
  const setQuery = useCallback((q: string) => setQueryRaw(q), []);
  const setSort = useCallback((s: SortKey) => setSortRaw(s), []);
  const setPriceRange = useCallback((min: PriceBound, max: PriceBound) => {
    setPriceMin(min);
    setPriceMax(max);
  }, []);
  const resetFilters = useCallback(() => {
    setCatRaw("all");
    setQueryRaw("");
    setSortRaw("default");
    setPriceMin(null);
    setPriceMax(null);
  }, []);

  const catName = useCallback(
    (slug: string): string => {
      if (slug === "all") return t("shop.all");
      const found = catalog.categories.find((c) => c.slug === slug);
      return found ? tr(found.name) : slug;
    },
    [catalog.categories, t, tr],
  );

  const catCount = useCallback(
    (slug: string): number =>
      slug === "all" ? catalog.products.length : catalog.products.filter((p) => p.category_slug === slug).length,
    [catalog.products],
  );

  const catCover = useCallback(
    (slug: string): string => {
      const first = catalog.products.find((p) => p.category_slug === slug);
      return first ? productImages(first)[0] ?? "" : "";
    },
    [catalog.products],
  );

  const visible = useMemo(() => {
    let list = catalog.products.slice();
    if (cat !== "all") list = list.filter((p) => p.category_slug === cat);
    const q = foldSearch(query.trim());
    if (q) {
      list = list.filter((p) =>
        foldSearch([tr(p.name), tr(p.sub), tr(p.tag), p.category_slug].join(" ")).includes(q),
      );
    }
    if (priceMin !== null) list = list.filter((p) => Number(p.price ?? 0) >= priceMin);
    if (priceMax !== null) list = list.filter((p) => Number(p.price ?? 0) <= priceMax);
    if (sort === "asc") list.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
    else if (sort === "desc") list.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
    else if (sort === "new")
      list.sort((a, b) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? "")));
    return list;
  }, [catalog.products, cat, query, priceMin, priceMax, sort, tr]);

  const activeFilterCount =
    (cat !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0) +
    (priceMin !== null || priceMax !== null ? 1 : 0);

  /* keep the open viewer in sync with the active language */
  useEffect(() => {
    setViewer((v) => (v.product ? { ...v } : v));
  }, [lang]);

  const openViewer = useCallback((product: Product, startSrc?: string) => {
    const list = productImages(product);
    const idx = startSrc ? Math.max(0, list.indexOf(startSrc)) : 0;
    setViewer({ product, startIndex: idx });
  }, []);

  const closeViewer = useCallback(() => setViewer({ product: null, startIndex: 0 }), []);

  const waFor = useCallback(
    (product: Product): string => {
      const name = tr(product.name) || "Makana";
      const price = fmtPrice(product.price);
      const suffix = price ? ` — ${price} ${product.currency || "AZN"}` : "";
      return `${name}${suffix} · ${t("wa.intro")}`;
    },
    [tr, t],
  );

  const value = useMemo<StoreState>(
    () => ({
      catalog,
      phone,
      instagram,
      categories: catalog.categories,
      products: catalog.products,
      cat,
      setCat,
      query,
      setQuery,
      sort,
      setSort,
      priceMin,
      priceMax,
      setPriceRange,
      resetFilters,
      activeFilterCount,
      visible,
      catName,
      catCount,
      catCover,
      openViewer,
      closeViewer,
      viewer,
      waFor,
    }),
    [catalog, phone, instagram, cat, setCat, query, setQuery, sort, setSort, priceMin, priceMax, setPriceRange, resetFilters, activeFilterCount, visible, catName, catCount, catCover, openViewer, closeViewer, viewer, waFor],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <ProductViewer />
    </StoreContext.Provider>
  );
}
