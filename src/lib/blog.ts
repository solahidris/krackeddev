// Shared blog logic
import { posts, type Post } from '@/app/blog/posts';

export { posts };
export type { Post };

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map(post => post.slug);
}






