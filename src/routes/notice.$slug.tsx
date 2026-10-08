import { createFileRoute, notFound } from "@tanstack/react-router";
import { noticeBySlug } from "@/lib/catalog";
import { NoticeArticle } from "@/components/notice-article";

export const Route = createFileRoute("/notice/$slug")({
  loader: ({ params }) => {
    const notice = noticeBySlug(params.slug);
    if (!notice) throw notFound();
    return { notice };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.notice.headline ?? "Notice"} — SarkariResultaa` },
      { name: "description", content: loaderData?.notice.summary.slice(0, 160) ?? "" },
    ],
  }),
  component: NoticePage,
});

function NoticePage() {
  const { notice } = Route.useLoaderData();
  return <NoticeArticle notice={notice} />;
}
