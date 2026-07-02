import ArticlePage from "@/components/ArticlePage";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

// Pre-generate all project post routes at build time
export async function generateStaticParams() {
  const posts = getAllPosts("projects");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ProjectPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug, "projects");

  if (!post) notFound();

  return <ArticlePage post={post} type="projects" />;
}