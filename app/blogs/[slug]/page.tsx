import ArticlePage from "@/components/ArticlePage";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

// Pre-generate all blog post routes at build time
export async function generateStaticParams() {
  const posts = getAllPosts("blogs");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug, "blogs");

  if (!post) notFound();

  return <ArticlePage post={post} type="blogs" />;
}