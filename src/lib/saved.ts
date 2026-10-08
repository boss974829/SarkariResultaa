import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedState = {
  slugs: string[];
  toggle: (slug: string) => void;
};

export const useSaved = create<SavedState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const has = get().slugs.includes(slug);
        set({ slugs: has ? get().slugs.filter((s) => s !== slug) : [slug, ...get().slugs] });
      },
    }),
    { name: "rajpatra-saved" },
  ),
);
