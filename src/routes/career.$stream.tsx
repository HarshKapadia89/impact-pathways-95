import { createFileRoute, Link, Outlet, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { STREAM_BY_ID, type StreamId, type Stream } from "@/lib/careerData";

export const Route = createFileRoute("/career/$stream")({
  loader: ({ params }): { stream: Stream } => {
    const stream = STREAM_BY_ID[params.stream as StreamId];
    if (!stream) throw notFound();
    return { stream };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title: `${loaderData.stream.name} after Class 12 — Gujarat Colleges, Exams & Salaries | Disha`,
            },
            {
              name: "description",
              content: `${loaderData.stream.name} in Gujarat: top colleges, GUJCET/national entrance exams, course durations and average salary ranges. ${loaderData.stream.tagline}.`,
            },
            { property: "og:title", content: `${loaderData.stream.name} — Disha` },
            { property: "og:description", content: loaderData.stream.tagline },
          ],
        }
      : {},
  component: () => <Outlet />,
  notFoundComponent: () => (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Stream not found</h1>
        <Link to="/career" className="text-primary mt-4 inline-block">
          ← Back to all streams
        </Link>
      </div>
    </PublicLayout>
  ),
  errorComponent: ({ error }) => (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p>Something went wrong: {error.message}</p>
        <Link to="/career" className="text-primary mt-4 inline-block">
          ← Back
        </Link>
      </div>
    </PublicLayout>
  ),
});