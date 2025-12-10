import JobDetailClient from "./job-detail-client";

export const runtime = "edge";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetailClient id={id} />;
}
