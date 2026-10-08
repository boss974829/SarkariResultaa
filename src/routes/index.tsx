import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, HOME_ROWS } from "@/data/boards";
import { LEVELS } from "@/data/notices";
import { NoticeColumn } from "@/components/notice-column";
import { byCategory, closingSoon, openCount, tenthDesk } from "@/lib/catalog";
import { NOTICES } from "@/data/notices";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t, tr } = useI18n();
  const [level, setLevel] = useState("");
  const open = openCount();
  const closing = closingSoon(level).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={t("statNotices")} value={NOTICES.length} />
        <Stat label={t("statOpen")} value={open} />
        <Stat label={t("statClosing")} value={closing} hot />
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t("filter")}>
        {LEVELS.map((item) => {
          const on = level === item.id;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={on}
              onClick={() => setLevel(item.id)}
              className={
                "min-h-10 rounded-md border px-3 text-sm font-semibold " +
                (on ? "border-maroon bg-maroon text-cream" : "border-line bg-card text-ink hover:border-maroon")
              }
            >
              {tr(item.label)}
            </button>
          );
        })}
      </div>
      <div className="mt-6 space-y-6">
        {HOME_ROWS.map((row) => (
          <div key={row.join()} className="grid gap-4 lg:grid-cols-3">
            {row.map((slug) => {
              const category = CATEGORIES.find((c) => c.slug === slug);
              return (
                <NoticeColumn
                  key={slug}
                  title={category ? tr(category.label) : slug}
                  notices={byCategory(slug, level).slice(0, slug === "latest-job" || slug === "result" || slug === "admit-card" ? 40 : 8)}
                  view={{ kind: "category", slug }}
                />
              );
            })}
          </div>
        ))}
        <div className="grid gap-4 lg:grid-cols-3">
          <NoticeColumn title={tr("10th / ITI")} notices={tenthDesk(level).slice(0, 8)} view={{ kind: "search", level: "10th" }} />
          <NoticeColumn title={tr("Certificate")} notices={byCategory("certificate", level).slice(0, 8)} view={{ kind: "category", slug: "certificate" }} />
          <NoticeColumn title={tr("Important")} notices={byCategory("important", level).slice(0, 8)} view={{ kind: "category", slug: "important" }} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, hot = false }: { label: string; value: number; hot?: boolean }) {
  return (
    <div className={"rounded-md border px-4 py-3 shadow-sm " + (hot ? "border-maroon bg-maroon text-cream" : "border-line bg-card text-ink")}>
      <p className={"text-[11px] font-semibold uppercase tracking-[0.14em] " + (hot ? "text-white/80" : "text-muted")}>{label}</p>
      <p className={"mt-1 font-sans text-3xl leading-none tabular-nums " + (hot ? "text-cream" : "text-maroon")}>{value}</p>
    </div>
  );
}