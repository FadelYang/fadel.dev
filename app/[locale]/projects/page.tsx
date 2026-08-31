import ProjectPageClient from './page-hero';
import { getAllPosts } from '@/lib/blog';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale || 'en';
  const posts = getAllPosts("projects", activeLocale);

  return (
    <div>
      <ProjectPageClient posts={posts} />
    </div>
  );
}

