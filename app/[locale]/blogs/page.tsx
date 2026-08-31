import BlogPageClient from './page-hero';
import { getAllPosts } from '@/lib/blog';

export default async function Blogs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale || 'en';
  const posts = getAllPosts("blogs", activeLocale);

  return (
    <div>
      <BlogPageClient posts={posts} />
    </div>
  );
}

