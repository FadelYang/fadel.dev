import { Suspense } from 'react';
import Header from '../(homepage)/header';
import { getAllPosts } from '@/lib/blog';
import ProjectPageClient from './page-hero';

export default function Blogs() {
  const posts = getAllPosts("projects");

  return (
    <div>
      <ProjectPageClient posts={posts} />
    </div>
  );
}
