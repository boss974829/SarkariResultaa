import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { boardById, byBoard, formatDate } from "@/lib/catalog";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/board/$slug")({
  loader: ({ params }) => {
    const board = boardById(params.slug);
    if (!board) throw notFound();
    return { board, notices: byBoard(board.id) };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.board.short ?? "Board"} notices — SarkariResultaa` }],
  }),
  component: BoardPage,
});

function BoardPage() {
  const { lang, t, tr } = useI18n();
  const { board, notices } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-maroon">{t("board")}</p>
      <h1 className="mt-2 font-serif text-4xl">{board.name}</h1>
      <p className="mt-2">
        <a href={board.url} target="_blank" rel="noopener noreferrer nofollow">
          {t("official")}
        </a>
        {board.portal ? (
          <>
            {" · "}
            <a href={board.portal} target="_blank" rel="noopener noreferrer nofollow">
              {t("portal")}
            </a>
          </>
        ) : null}
      </p>
      <ul className="mt-6 border border-line bg-card">
        {notices.map((notice) => (
          <li key={notice.slug} className="border-b border-line last:border-b-0">
            <Link to="/notice/$slug" params={{ slug: notice.slug }} className="block px-4 py-3 font-bold text-link underline hover:bg-sand">
              {tr(notice.title)}
              <span className="mt-1 block text-xs text-muted">{formatDate(notice.postDate, lang)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
