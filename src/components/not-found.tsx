import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/lang";

export function NotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-maroon">{t("missing")}</p>
      <h1 className="mt-2 font-serif text-4xl">{t("missingH")}</h1>
      <p className="mt-3 text-muted">{t("missingP")}</p>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-navy underline">
        {t("back")}
      </Link>
    </div>
  );
}