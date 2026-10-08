import { createContext, useContext, useEffect, useState } from "react";
import { UI, translate, type Lang, type UiKey } from "@/lib/translate";

type LangValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: UiKey) => string;
  tr: (text: string) => string;
};

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("rajpatra-lang");
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem("rajpatra-lang", next);
  }

  const value: LangValue = {
    lang,
    setLang,
    t: (key) => UI[lang][key],
    tr: (text) => translate(lang, text),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n(): LangValue {
  const value = useContext(LangContext);
  if (!value) throw new Error("useI18n outside LangProvider");
  return value;
}
