import { format, parseISO } from "date-fns";
import { translate } from "@/lib/translate";
import { BOARDS, CATEGORIES } from "@/data/boards";
import { NOTICES } from "@/data/notices";
import type { Board, CategorySlug, Notice, Qualification } from "@/data/types";

export function boardById(id: string): Board | undefined {
  return BOARDS.find((b) => b.id === id);
}

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function noticeBySlug(slug: string): Notice | undefined {
  return NOTICES.find((n) => n.slug === slug);
}

export function formatDate(iso: string, lang: "en" | "hi" = "en"): string {
  const date = parseISO(iso);
  if (lang === "hi") {
    const months = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  return format(date, "d MMM yyyy");
}

export function matchesLevel(notice: Notice, level: string): boolean {
  if (!level) return true;
  if (level === "10th") return notice.qualification === "10th" || notice.qualification === "iti";
  return notice.qualification === (level as Qualification);
}

export function badge(notice: Notice, today = new Date()): string | null {
  if (notice.flag) return notice.flag;
  if (!notice.lastDate) return null;
  if (notice.category !== "latest-job" && notice.category !== "admission") return null;
  const last = parseISO(notice.lastDate);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.round((last.getTime() - start.getTime()) / 86_400_000);
  if (diff < 0) return "Closed";
  if (diff === 0) return "Last date today";
  if (diff <= 5) return `${diff} days left`;
  return null;
}

function daysLeft(notice: Notice, today: Date): number | null {
  if (!notice.lastDate) return null;
  const last = parseISO(notice.lastDate);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((last.getTime() - start.getTime()) / 86_400_000);
}

export function byCategory(slug: CategorySlug, level = "", today = new Date()): Notice[] {
  const items = NOTICES.filter((n) => n.category === slug && matchesLevel(n, level));
  if (slug === "latest-job" || slug === "admission") {
    return items.sort((a, b) => {
      const da = daysLeft(a, today);
      const db = daysLeft(b, today);
      const aSoon = da != null && da >= 0 && da <= 7;
      const bSoon = db != null && db >= 0 && db <= 7;
      if (aSoon !== bSoon) return aSoon ? -1 : 1;
      if (aSoon && bSoon && da !== db) return (da ?? 0) - (db ?? 0);
      return b.postDate.localeCompare(a.postDate);
    });
  }
  return items.sort((a, b) => b.postDate.localeCompare(a.postDate));
}

export function closingSoon(level = "", today = new Date()): Notice[] {
  return NOTICES.filter((n) => {
    if (!matchesLevel(n, level)) return false;
    if (n.category !== "latest-job" && n.category !== "admission") return false;
    const days = daysLeft(n, today);
    return days != null && days >= 0 && days <= 7;
  }).sort((a, b) => (daysLeft(a, today) ?? 0) - (daysLeft(b, today) ?? 0));
}

export function tenthDesk(level = ""): Notice[] {
  return NOTICES.filter(
    (n) =>
      (n.qualification === "10th" || n.qualification === "iti") && matchesLevel(n, level),
  ).sort((a, b) => b.postDate.localeCompare(a.postDate));
}

export function byBoard(id: string): Notice[] {
  return NOTICES.filter((n) => n.boardId === id).sort((a, b) => b.postDate.localeCompare(a.postDate));
}

export function latest(limit = 8): Notice[] {
  return [...NOTICES].sort((a, b) => b.postDate.localeCompare(a.postDate)).slice(0, limit);
}

export function related(notice: Notice, limit = 6): Notice[] {
  return NOTICES.filter(
    (n) => n.slug !== notice.slug && (n.boardId === notice.boardId || n.category === notice.category),
  )
    .sort((a, b) => {
      const board = Number(a.boardId !== notice.boardId) - Number(b.boardId !== notice.boardId);
      if (board !== 0) return board;
      return b.postDate.localeCompare(a.postDate);
    })
    .slice(0, limit);
}

export function searchNotices(q: string, level = ""): Notice[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return NOTICES.filter((n) => {
    if (!matchesLevel(n, level)) return false;
    if (terms.length === 0) return true;
    const board = boardById(n.boardId);
    const hay = `${n.title} ${translate("hi", n.title)} ${n.headline} ${translate("hi", n.headline)} ${n.summary} ${translate("hi", n.summary)} ${board?.name ?? ""} ${board?.short ?? ""}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  }).sort((a, b) => b.postDate.localeCompare(a.postDate));
}

export function openCount(today = new Date()): number {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return NOTICES.filter((n) => {
    if (n.category !== "latest-job" && n.category !== "admission") return false;
    if (!n.lastDate) return true;
    return parseISO(n.lastDate).getTime() >= start.getTime();
  }).length;
}

export function linksFor(notice: Notice): { label: string; href: string }[] {
  if (notice.links.length > 0) return notice.links;
  const board = boardById(notice.boardId);
  if (!board) return [];
  const links = [{ label: `${board.short} official website`, href: board.url }];
  if (board.portal) links.push({ label: `${board.short} candidate portal`, href: board.portal });
  return links;
}

export function jobPosting(notice: Notice) {
  const board = boardById(notice.boardId);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: notice.headline,
    description: notice.summary,
    datePosted: notice.postDate,
    validThrough: notice.lastDate,
    directApply: false,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: board?.name ?? "Government recruiting board",
      sameAs: board?.url,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    url: board?.url,
  };
}
