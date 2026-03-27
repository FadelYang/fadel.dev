import { Suspense } from 'react';
import Header from '../(homepage)/header';
import BlogPage from './card';
import { getAllPosts } from '@/lib/blog';

export default function Blogs() {
  const posts = getAllPosts();

  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <BlogPage posts={posts}/>
    </div>
  );
}
