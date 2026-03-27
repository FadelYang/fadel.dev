import { Suspense } from 'react';
import Header from '../(homepage)/header';
import BlogPageClient from './page-hero';
import { getAllPosts } from '@/lib/blog';

export default function Blogs() {
  const posts = getAllPosts();

  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <BlogPageClient posts={posts} />
    </div>
  );
}
