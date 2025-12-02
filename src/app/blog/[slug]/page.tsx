import BlogPostClient from './BlogPostClient';

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BlogPostClient slug={params.slug} />;
}
