import { createFileRoute, Link } from "@tanstack/react-router";
import { BOARDS } from "@/data/boards";
import { byBoard } from "@/lib/catalog";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/boards")({
  head: () => ({ meta: [{ title: "Boards — SarkariResultaa" }] }),
  component: BoardsPage,
});

function BoardsPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-serif text-4xl">{t("boards")}</h1>
      <p className="mt-2 text-muted">{t("boardsLead")}</p>
      <ul className="mt-6 divide-y divide-line border border-line bg-card">
        {BOARDS.map((board) => (
          <li key={board.id} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
            <Link to="/board/$slug" params={{ slug: board.id }} className="font-semibold">
              {board.short}
              <span className="ml-2 font-normal text-muted">{board.name}</span>
            </Link>
            <span className="text-sm text-muted">{byBoard(board.id).length} {t("notices")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
