"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang, LocalizedText } from "@/lib/i18n/types";
import { dictionaries, detectLang } from "@/lib/i18n/dictionaries";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface SiteState {
  lang: Lang;
  dict: Dictionary;
  setLang: (lang: Lang) => void;
  t: (key: keyof Dictionary) => string;
  /** localized field from API rows */
  tr: (field: LocalizedText) => string;
  toast: (message: string) => void;
}

const Ctx = createContext<SiteState | null>(null);
const STORAGE_KEY = "makana_lang";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("az");
  const [message, setMessage] = useState<string | null>(null);

  /* restore persisted / browser language once on mount (avoids hydration mismatch) */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    setLangState(detectLang(stored ?? (typeof navigator !== "undefined" ? navigator.language : "az")));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked (private mode) - ignore */
    }
  }, []);

  const dict = dictionaries[lang];

  const t = useCallback((key: keyof Dictionary): string => {
    const value = dict[key];
    return typeof value === "string" ? value : String(key);
  }, [dict]);

  const tr = useCallback(
    (field: LocalizedText): string => {
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
    },
    [lang],
  );

  const toast = useCallback((text: string) => {
    setMessage(text);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [message]);

  const value = useMemo<SiteState>(
    () => ({ lang, dict, setLang, t, tr, toast }),
    [lang, dict, setLang, t, tr, toast],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={`toast${message ? " on" : ""}`} role="status" aria-live="polite">
        {message ?? ""}
      </div>
    </Ctx.Provider>
  );
}

export function useSite(): SiteState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}