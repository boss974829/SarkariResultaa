import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — SarkariResultaa" }] }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("contact")}</h1>
      <div className="mt-4 space-y-3">
        <p>{t("c1")}</p>
        <p>
          {t("c2")} <Link to="/boards">{t("boards")}</Link>
        </p>
        <p>{t("c3")}</p>
      </div>
    </div>
  );
}
