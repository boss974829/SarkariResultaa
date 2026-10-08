import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — SarkariResultaa" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("privacy")}</h1>
      <div className="mt-4 space-y-3">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
      </div>
    </div>
  );
}
