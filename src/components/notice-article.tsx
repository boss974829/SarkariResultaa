import { Link } from "@tanstack/react-router";
import { badge, categoryBySlug, formatDate, jobPosting, latest } from "@/lib/catalog";
import { noticeDetail } from "@/lib/detail";
import { useI18n } from "@/lib/lang";
import { trBadge } from "@/lib/translate";
import type { Notice, Row } from "@/data/types";
import { SaveButton } from "@/components/save-button";
import { isHot, Mark } from "@/components/mark";

function Bar({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-6 bg-maroon px-3 py-2 text-center text-lg text-cream">{children}</h2>;
}

function Bullets({ rows }: { rows: Row[] }) {
  return (
    <ul className="mt-3 space-y-1.5 border border-line bg-card px-5 py-3 text-sm">
      {rows.map((row) => (
        <li key={row.label} className="list-disc">
          {row.label} : <strong>{row.value}</strong>
        </li>
      ))}
    </ul>
  );
}

export function NoticeArticle({ notice }: { notice: Notice }) {
  const { lang, t, tr } = useI18n();
  const category = categoryBySlug(notice.category);
  const detail = noticeDetail(notice, lang);
  const board = detail.board;
  const official = detail.links[0]?.href ?? board?.url ?? "#";
  const json = notice.category === "latest-job" ? JSON.stringify(jobPosting(notice)).replace(/</g, "\\u003c") : null;
  const fresh = latest(6).filter((item) => item.slug !== notice.slug);
  const mark = badge(notice);
  const hot = mark ? isHot(mark) : false;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      {json ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} /> : null}
      <article>
        <p className="text-xs font-bold uppercase tracking-widest text-maroon">
          <Link to="/board/$slug" params={{ slug: notice.boardId }} className="text-maroon">
            {board?.short}
          </Link>
          {" · "}
          <Link to="/category/$slug" params={{ slug: notice.category }} className="text-maroon">
            {category ? tr(category.label) : null}
          </Link>
        </p>
        <h1 className="mt-2 bg-maroon px-4 py-3 text-center text-2xl leading-tight text-cream sm:text-3xl">{tr(notice.headline)}</h1>
        <p className="mt-3 text-sm">
          {tr("Post date")} : <strong>{formatDate(notice.postDate, lang)}</strong>
          {mark ? (
            <>
              {" "}
              <Mark text={trBadge(lang, mark)} />
            </>
          ) : null}
        </p>
        {hot && mark ? (
          <p className="mt-3 bg-[#fff8e8] px-3 py-2 text-sm font-semibold text-maroon">
            {trBadge(lang, mark)}. {t("hot")}
          </p>
        ) : null}
        <p className="mt-3 text-base leading-relaxed">{tr(notice.summary)}</p>
        <p className="mt-3 border border-line bg-sand px-3 py-2 text-sm">{t("confirm")}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={official}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex min-h-11 items-center bg-maroon px-4 font-bold text-cream no-underline"
          >
            {t("open")}
          </a>
          <SaveButton slug={notice.slug} />
        </div>

        <Bar>{tr(notice.title)}</Bar>
        <h3 className="mt-4 text-center text-lg text-navy">
          {board?.name} : {t("shortDetails")}
        </h3>

        <Bar>{t("dates")}</Bar>
        <Bullets rows={detail.dates} />

        <Bar>{t("fee")}</Bar>
        <Bullets rows={detail.fees} />
        {detail.pay.length > 0 ? (
          <div className="border border-t-0 border-line bg-card px-5 py-3 text-sm">
            <p className="font-bold">{t("pay")}</p>
            <ul className="mt-1 list-disc pl-5">
              {detail.pay.map((mode) => (
                <li key={mode}>{mode}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <Bar>{detail.ageTitle}</Bar>
        <Bullets rows={detail.age} />
        <p className="mt-2 text-sm">
          {board?.short} {t("ageNote")}
        </p>

        <Bar>{t("total")}</Bar>
        <p className="mt-3 border border-line bg-card px-4 py-3 text-center text-2xl font-bold">{detail.total}</p>

        <Bar>{t("vacancy")}</Bar>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-maroon text-cream">
                <th className="border border-maroon px-3 py-2 text-left">{t("postName")}</th>
                <th className="border border-maroon px-3 py-2 text-left">{t("postCount")}</th>
                <th className="border border-maroon px-3 py-2 text-left">{t("eligibility")}</th>
              </tr>
            </thead>
            <tbody>
              {detail.vacancies.map((row) => (
                <tr key={row.post} className="bg-card">
                  <td className="border border-line px-3 py-2 font-semibold">{row.post}</td>
                  <td className="border border-line px-3 py-2">{row.count}</td>
                  <td className="border border-line px-3 py-2">{row.eligibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {detail.also ? (
          <p className="mt-4 border border-line bg-sand px-3 py-3 text-center text-sm font-bold">
            {t("also")} :{" "}
            <Link to="/notice/$slug" params={{ slug: detail.also.slug }} className="text-link">
              {tr(detail.also.title)}
            </Link>
          </p>
        ) : null}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-maroon px-3 py-2 text-center text-base text-cream">{detail.stepsTitle}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-line bg-card px-4 py-3">
                  <ol className="list-decimal space-y-1 pl-5">
                    {detail.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Bar>{t("selection")}</Bar>
        <ul className="mt-3 list-disc space-y-1 border border-line bg-card px-5 py-3 text-sm">
          {detail.selection.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        {detail.zones.length > 0 ? (
          <>
            <Bar>{t("zones")}</Bar>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-maroon text-cream">
                    <th className="border border-maroon px-3 py-2 text-left">{t("zoneCol")}</th>
                    <th className="border border-maroon px-3 py-2 text-left">{t("siteCol")}</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.zones.map((zone) => (
                    <tr key={zone.name} className="bg-card">
                      <td className="border border-line px-3 py-2 font-semibold">{zone.name}</td>
                      <td className="border border-line px-3 py-2">
                        <a href={zone.href} target="_blank" rel="noopener noreferrer nofollow">
                          {t("click")}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm">{t("zoneNote")}</p>
          </>
        ) : null}

        <Bar>{t("links")}</Bar>
        <table className="mt-3 w-full border-collapse text-sm">
          <tbody>
            {detail.links.map((link) => (
              <tr key={link.href + link.label}>
                <th className="w-[55%] border border-line bg-sand px-3 py-2 text-left font-semibold">{link.label}</th>
                <td className="border border-line bg-card px-3 py-2">
                  <a href={link.href} target="_blank" rel="noopener noreferrer nofollow" className="font-bold">
                    {t("click")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Bar>{t("questions")}</Bar>
        <dl className="mt-3 space-y-3">
          {detail.faqs.map((item) => (
            <div key={item.q} className="border border-line bg-card px-3 py-3">
              <dt className="font-bold">{item.q}</dt>
              <dd className="mt-1 text-sm">{item.a}</dd>
            </div>
          ))}
        </dl>
      </article>
      <aside className="space-y-6">
        <SideList title="Latest" notices={fresh} />
      </aside>
    </div>
  );
}

function SideList({ title, notices }: { title: string; notices: Notice[] }) {
  const { tr } = useI18n();
  if (notices.length === 0) return null;
  return (
    <section className="border border-line bg-card">
      <h2 className="bg-maroon px-3 py-2 font-sans text-lg text-cream">{tr(title)}</h2>
      <ul>
        {notices.map((item) => (
          <li key={item.slug} className="border-b border-line last:border-b-0">
            <Link to="/notice/$slug" params={{ slug: item.slug }} className="block px-3 py-2 text-sm font-bold text-link underline hover:bg-sand">
              {tr(item.title)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
