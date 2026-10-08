import { Link } from "@tanstack/react-router";
import { badge, formatDate } from "@/lib/catalog";
import { isHot, Mark } from "@/components/mark";
import { useI18n } from "@/lib/lang";
import { trBadge } from "@/lib/translate";
import type { Notice } from "@/data/types";

export function NoticeRow({ notice }: { notice: Notice }) {
  const { lang, tr } = useI18n();
  const mark = badge(notice);
  const hot = mark ? isHot(mark) : false;
  return (
    <li className={"border-b border-line last:border-b-0 " + (hot ? "border-l-[3px] border-l-maroon" : "")}>
      <Link to="/notice/$slug" params={{ slug: notice.slug }} className="block px-3 py-2.5 no-underline hover:bg-[#faf8f6]">
        <span className="text-[15px] font-semibold leading-snug text-navy">{tr(notice.title)}</span>
        <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
          <time dateTime={notice.postDate}>{formatDate(notice.postDate, lang)}</time>
          {mark ? <Mark text={trBadge(lang, mark)} /> : null}
        </span>
      </Link>
    </li>
  );
}