import { Link } from "@tanstack/react-router";
import type { Notice } from "@/data/types";
import { NoticeRow } from "@/components/notice-row";
import { useI18n } from "@/lib/lang";

type ViewAll =
  | { kind: "category"; slug: string }
  | { kind: "search"; level: string };

export function NoticeColumn({ title, notices, view }: { title: string; notices: Notice[]; view: ViewAll }) {
  const { t, tr } = useI18n();
  return (
    <section className="overflow-hidden rounded-md border border-line bg-card shadow-sm">
      <h2 className="flex items-center justify-between bg-maroon px-3 py-2.5 font-sans text-lg text-cream">
        <span>{tr(title)}</span>
        <span className="rounded bg-white/15 px-2 py-0.5 font-sans text-xs tabular-nums">{notices.length}</span>
      </h2>
      {notices.length === 0 ? (
        <p className="px-3 py-4 text-sm text-muted">{t("empty")}</p>
      ) : (
        <ul>
          {notices.map((notice) => (
            <NoticeRow key={notice.slug} notice={notice} />
          ))}
        </ul>
      )}
      <p className="border-t border-line bg-[#faf8f6] px-3 py-2">
        {view.kind === "category" ? (
          <Link to="/category/$slug" params={{ slug: view.slug }} className="text-sm font-semibold text-maroon no-underline hover:underline">
            {t("viewAll")}
          </Link>
        ) : (
          <Link to="/search" search={{ q: "", level: view.level }} className="text-sm font-semibold text-maroon no-underline hover:underline">
            {t("viewAll")}
          </Link>
        )}
      </p>
    </section>
  );
}