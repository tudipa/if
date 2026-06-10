import { CalendarDays, Clock, MapPin, Newspaper } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/student/Badge";
import { getAgenda, getNews } from "@/lib/cms-store";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

type NewsDetail = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string | null;
  status: string;
};

type AgendaDetail = {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  statusAgenda: string;
  excerpt: string;
  content: string;
  image?: string | null;
  publishStatus: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function isNewsDetail(item: unknown): item is NewsDetail {
  return Boolean(item && typeof item === "object" && "status" in item && "content" in item);
}

function isAgendaDetail(item: unknown): item is AgendaDetail {
  return Boolean(item && typeof item === "object" && "publishStatus" in item && "statusAgenda" in item);
}

function renderBody(content: string) {
  return content.split(/\n{2,}/).map((paragraph) => (
    <p className="text-base leading-8 text-slate-700" key={paragraph}>
      {paragraph}
    </p>
  ));
}

export default async function NewsAgendaDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const news = await getNews(slug);

  if (isNewsDetail(news) && news.status === "published") {
    return (
      <>
        <Navbar />
        <main className="bg-slate-50">
          <section className="bg-ink py-16 text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="blue">{news.category}</Badge>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-50">
                  <CalendarDays size={16} />
                  {formatDate(news.date)}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">{news.title}</h1>
              <p className="mt-5 text-lg leading-8 text-blue-50">{news.excerpt}</p>
            </div>
          </section>
          <section className="py-14">
            <article className="mx-auto max-w-4xl rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {news.image ? (
                <img alt="" className="mb-8 aspect-[16/9] w-full rounded-md object-cover" src={news.image} />
              ) : (
                <div className="mb-8 flex aspect-[16/9] items-center justify-center rounded-md bg-gradient-to-br from-blue-50 via-white to-amber-50">
                  <Newspaper className="text-ocean" size={56} />
                </div>
              )}
              <div className="grid gap-5">{renderBody(news.content)}</div>
            </article>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const agenda = await getAgenda(slug);
  if (!isAgendaDetail(agenda) || agenda.publishStatus !== "published") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="bg-ink py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="blue">{agenda.category}</Badge>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-50">
                <CalendarDays size={16} />
                {formatDate(agenda.date)}
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">{agenda.title}</h1>
            <p className="mt-5 text-lg leading-8 text-blue-50">{agenda.excerpt}</p>
          </div>
        </section>
        <section className="py-14">
          <article className="mx-auto grid max-w-4xl gap-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {agenda.image ? <img alt="" className="aspect-[16/9] w-full rounded-md object-cover" src={agenda.image} /> : null}
            <div className="grid gap-3 rounded-md bg-slate-50 p-5 text-sm font-semibold text-slate-700 sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <Clock size={17} />
                {agenda.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={17} />
                {agenda.location}
              </p>
            </div>
            <div className="grid gap-5">{renderBody(agenda.content)}</div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
