import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: [{ title: "Age calculator — SarkariResultaa" }] }),
  component: ToolsPage,
});

function ageAsOn(dob: string, asOn: string) {
  if (!dob || !asOn) return null;
  const birth = new Date(`${dob}T00:00:00`);
  const on = new Date(`${asOn}T00:00:00`);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(on.getTime()) || on < birth) return null;
  let years = on.getFullYear() - birth.getFullYear();
  let months = on.getMonth() - birth.getMonth();
  let days = on.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(on.getFullYear(), on.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function ToolsPage() {
  const [dob, setDob] = useState("2000-08-01");
  const [asOn, setAsOn] = useState("2026-08-01");
  const { t } = useI18n();
  const age = useMemo(() => ageAsOn(dob, asOn), [dob, asOn]);

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("ageH")}</h1>
      <p className="mt-2 text-muted">{t("ageLead")}</p>
      <form className="mt-6 space-y-4 border border-line bg-card p-4" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="text-sm font-semibold">{t("dob")}</span>
          <input type="date" value={dob} onChange={(event) => setDob(event.target.value)} className="mt-1 min-h-11 w-full border border-line bg-cream px-3" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">{t("asOn")}</span>
          <input type="date" value={asOn} onChange={(event) => setAsOn(event.target.value)} className="mt-1 min-h-11 w-full border border-line bg-cream px-3" />
        </label>
      </form>
      <p className="mt-4 border border-line bg-sand px-4 py-4 font-serif text-2xl" aria-live="polite">
        {age ? `${age.years} ${t("years")}, ${age.months} ${t("months")}, ${age.days} ${t("days")}` : t("ageBad")}
      </p>
    </div>
  );
}
