import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Disclaimer — SarkariResultaa" }] }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("disclaimer")}</h1>
      <div className="mt-4 space-y-3">
        <p>{t("d1")}</p>
        <p>{t("d2")}</p>
        <p>{t("d3")}</p>
        <p>{t("d4")}</p>
      </div>
    </div>
  );
}
