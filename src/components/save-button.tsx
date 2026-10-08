import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useSaved } from "@/lib/saved";
import { useI18n } from "@/lib/lang";

export function useHydratedSaved() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const finish = () => setReady(true);
    if (useSaved.persist.hasHydrated()) finish();
    return useSaved.persist.onFinishHydration(finish);
  }, []);
  return ready;
}

export function SaveButton({ slug }: { slug: string }) {
  const ready = useHydratedSaved();
  const on = useSaved((s) => s.slugs.includes(slug));
  const toggle = useSaved((s) => s.toggle);
  const { t } = useI18n();
  const saved = ready && on;

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      className="inline-flex min-h-11 items-center gap-2 border border-line bg-card px-4 text-sm font-semibold text-ink hover:border-maroon hover:text-maroon"
    >
      <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} aria-hidden="true" />
      {saved ? t("savedBtn") : t("save")}
    </button>
  );
}
