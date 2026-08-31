import ArticlePage from "@/components/ArticlePage";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

// Pre-generate all project post routes at build time
export async function generateStaticParams() {
  const locales = ["en", "id"];
  const paths = [];

  for (const locale of locales) {
    const posts = getAllPosts("projects", locale);
    for (const post of posts) {
      paths.push({ locale, slug: post.slug });
    }
  }

  return paths;
}

export default async function ProjectPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const activeLocale = locale || 'en';

  const post = getPostBySlug(slug, "projects", activeLocale);

  if (!post) notFound();

  return <ArticlePage post={post} type="projects" />;
}
