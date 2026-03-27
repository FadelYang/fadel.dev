import { Suspense } from 'react';
import Header from '../(homepage)/header';
import BlogPage from './card';

export default function Blogs() {
  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <BlogPage />
    </div>
  );
}
