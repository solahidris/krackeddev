import BlogPostClient from './BlogPostClient';
import { posts } from "../posts";

// Required for static export with dynamic routes
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}

