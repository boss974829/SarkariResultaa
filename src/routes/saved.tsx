import { createFileRoute, Link } from "@tanstack/react-router";
import { noticeBySlug } from "@/lib/catalog";
import { useHydratedSaved } from "@/components/save-button";
import { useSaved } from "@/lib/saved";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved notices — SarkariResultaa" }] }),
  component: SavedPage,
});

function SavedPage() {
  const ready = useHydratedSaved();
  const slugs = useSaved((s) => s.slugs);
  const { t, tr } = useI18n();
  const notices = slugs.map((slug) => noticeBySlug(slug)).filter((n) => n != null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("saved")}</h1>
      <p className="mt-2 text-muted">{t("savedLead")}</p>
      {!ready ? <p className="mt-6">{t("opening")}</p> : null}
      {ready && notices.length === 0 ? (
        <p className="mt-6 border border-line bg-card px-4 py-6">{t("noneSaved")}</p>
      ) : null}
      {ready && notices.length > 0 ? (
        <ul className="mt-6 border border-line bg-card">
          {notices.map((notice) => (
            <li key={notice.slug} className="border-b border-line last:border-b-0">
              <Link to="/notice/$slug" params={{ slug: notice.slug }} className="block px-4 py-3 font-bold text-link underline hover:bg-sand">
                {tr(notice.title)}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
