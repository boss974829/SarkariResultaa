import { Link, useRouterState } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { badge, boardById, closingSoon } from "@/lib/catalog";
import { useI18n } from "@/lib/lang";
import { trBadge } from "@/lib/translate";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/category/$slug", label: "Latest Job", params: { slug: "latest-job" } },
  { to: "/category/$slug", label: "Admit Card", params: { slug: "admit-card" } },
  { to: "/category/$slug", label: "Result", params: { slug: "result" } },
  { to: "/category/$slug", label: "Answer Key", params: { slug: "answer-key" } },
  { to: "/category/$slug", label: "Syllabus", params: { slug: "syllabus" } },
  { to: "/category/$slug", label: "Admission", params: { slug: "admission" } },
  { to: "/saved", label: "Saved" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const home = pathname === "/";
  const { lang, setLang, t, tr } = useI18n();
  const navigate = useNavigate();
  const closing = closingSoon().slice(0, 4);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") ?? "");
    void navigate({ to: "/search", search: { q, level: "" } });
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a className="skip" href="#desk">
        {t("skip")}
      </a>
      <header className="bg-maroon text-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3 text-cream no-underline">
            <Logo className="h-12 w-12 shrink-0" />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">{t("kicker")}</span>
              {home ? (
                <h1 className="font-sans text-2xl leading-none tracking-tight text-cream sm:text-3xl">{t("brand")}</h1>
              ) : (
                <span className="block font-sans text-2xl leading-none tracking-tight text-cream">{t("brand")}</span>
              )}
            </span>
          </Link>
          <div className="flex w-full flex-col gap-2 sm:max-w-xl sm:flex-row sm:items-center">
            <div className="flex shrink-0 border border-cream" role="group" aria-label={t("language")}>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={"min-h-11 px-3 text-sm font-bold " + (lang === "en" ? "bg-navy text-cream" : "bg-cream text-ink")}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                aria-pressed={lang === "hi"}
                className={"min-h-11 px-3 text-sm font-bold " + (lang === "hi" ? "bg-navy text-cream" : "bg-cream text-ink")}
              >
                हिन्दी
              </button>
            </div>
            <form onSubmit={onSearch} className="flex w-full" role="search">
              <label className="sr-only" htmlFor="q">
                {t("searchLabel")}
              </label>
              <input
                id="q"
                name="q"
                placeholder={t("searchPlaceholder")}
                className="min-h-11 w-full border border-cream bg-card px-3 text-ink placeholder:text-muted"
              />
              <button type="submit" className="min-h-11 bg-navy px-4 font-bold text-cream">
                {t("search")}
              </button>
            </form>
          </div>
        </div>
        <nav className="flex justify-center gap-0.5 overflow-x-auto bg-navy px-2" aria-label="Sections">
          {NAV.map((item) => {
            const href =
              "params" in item && item.params ? `/category/${item.params.slug}` : item.to === "/" ? "/" : item.to;
            const active = item.to === "/" ? pathname === "/" : pathname === href;
            return (
              <Link
                key={item.label}
                to={item.to}
                params={"params" in item ? item.params : undefined}
                className={
                  "shrink-0 px-3 py-2.5 text-sm font-semibold text-cream no-underline " +
                  (active ? "bg-maroon" : "hover:bg-white/10")
                }
              >
                {item.label === "Home" ? t("home") : item.label === "Saved" ? t("saved") : tr(item.label)}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className="flex items-stretch border-b border-[#e6d36a] bg-sand" aria-label={t("tickerLabel")}>
        <p className="flex shrink-0 items-center bg-maroon px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream">
          {t("tickerLabel")}
        </p>
        {closing.length === 0 ? (
          <p className="px-4 py-2 text-sm text-ink">{t("tickerEmpty")}</p>
        ) : (
          <div className="ticker min-w-0 flex-1 border-0">
            <div className="ticker-track">
              {[...closing, ...closing].map((notice, index) => (
                <Link
                  key={`${notice.slug}-${index}`}
                  to="/notice/$slug"
                  params={{ slug: notice.slug }}
                  className="shrink-0 px-4 py-2 text-sm font-semibold text-ink no-underline hover:underline"
                >
                  {boardById(notice.boardId)?.short}: {tr(notice.title)}
                  <span className="text-maroon"> — {trBadge(lang, badge(notice) ?? "")}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <main id="desk">{children}</main>
      <footer className="mt-12 border-t-4 border-maroon bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-serif text-xl">
              <Logo className="h-9 w-9" />
              {t("footerBrand")}
            </p>
            <p className="mt-2 text-sm text-muted">{t("footerBlurb")}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{t("onDesk")}</p>
            <ul className="mt-2 space-y-1">
              <li><Link to="/boards">{t("boards")}</Link></li>
              <li><Link to="/tools">{t("ageTool")}</Link></li>
              <li><Link to="/category/$slug" params={{ slug: "certificate" }}>{t("certificates")}</Link></li>
              <li><Link to="/category/$slug" params={{ slug: "important" }}>{tr("Important")}</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{t("about")}</p>
            <ul className="mt-2 space-y-1">
              <li><Link to="/disclaimer">{t("disclaimer")}</Link></li>
              <li><Link to="/privacy">{t("privacy")}</Link></li>
              <li><Link to="/contact">{t("contact")}</Link></li>
            </ul>
          </div>
        </div>
        <p className="border-t border-line px-4 py-3 text-center text-xs text-muted">{t("footerNote")}</p>
      </footer>
    </div>
  );
}