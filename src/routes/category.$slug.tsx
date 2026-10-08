import { createFileRoute, notFound } from "@tanstack/react-router";
import { categoryBySlug, byCategory } from "@/lib/catalog";
import { NoticeRow } from "@/components/notice-row";
import { useI18n } from "@/lib/lang";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category, notices: byCategory(category.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.label ?? "Section"} — SarkariResultaa` },
      { name: "description", content: loaderData?.category.blurb ?? "" },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { t, tr } = useI18n();
  const { category, notices } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-maroon">{t("section")}</p>
      <h1 className="mt-2 font-serif text-4xl">{tr(category.label)}</h1>
      <p className="mt-2 text-muted">{tr(category.blurb)}</p>
      <ul className="mt-6 border border-line bg-card">
        {notices.map((notice) => (
          <NoticeRow key={notice.slug} notice={notice} />
        ))}
      </ul>
    </div>
  );
}
