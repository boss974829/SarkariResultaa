import { createFileRoute } from "@tanstack/react-router";
import { searchNotices } from "@/lib/catalog";
import { LEVELS } from "@/data/notices";
import { NoticeRow } from "@/components/notice-row";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
    level: typeof search.level === "string" ? search.level : "",
  }),
  head: ({ match }) => ({
    meta: [{ title: match.search.q ? `Search “${match.search.q}” — SarkariResultaa` : "Search — SarkariResultaa" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { t, tr } = useI18n();
  const { q, level } = Route.useSearch();
  const notices = searchNotices(q, level);
  const levelLabel = LEVELS.find((item) => item.id === level)?.label;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("search")}</h1>
      <p className="mt-2 text-muted">
        {q ? `“${q}”` : t("allNotices")}
        {levelLabel && level ? ` · ${tr(levelLabel)}` : ""} · {notices.length} {t("found")}
      </p>
      {notices.length === 0 ? (
        <p className="mt-6 border border-line bg-card px-4 py-6">{t("noMatch")}</p>
      ) : (
        <ul className="mt-6 border border-line bg-card">
          {notices.map((notice) => (
            <NoticeRow key={notice.slug} notice={notice} />
          ))}
        </ul>
      )}
    </div>
  );
}
