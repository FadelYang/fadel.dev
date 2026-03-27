'use client';

import { FeaturedCard, PostCard } from '@/components/ui/card';
import { Post } from '@/lib/blog';
import { useEffect, useState } from 'react';

// ── Blog Page Client ───────────────────────────────────────
export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="bg-white min-h-screen overflow-hidden">
      {/* Background blobs — same as hero */}
      <div className="absolute -top-32 -right-32 w-130 h-130 bg-violet-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-violet-50 rounded-full blur-2xl opacity-40 pointer-events-none" />

      {/* Grid lines — same as hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-14">
          <span className={`text-xs font-semibold uppercase tracking-widest text-violet-500 mb-3 block transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Blog
          </span>
          <h1
            className={`text-4xl md:text-6xl font-black text-black tracking-tight mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Thoughts & writings.
          </h1>
          <p className={`text-black/50 text-lg max-w-xl leading-relaxed transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            I write about fullstack development, AI engineering, and things I learn along the way.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <div className="mb-10">
            <FeaturedCard post={featured} visible={visible} />
          </div>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <div className={`flex items-center gap-4 mb-8 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-black/30">All posts</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} visible={visible} />
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-24 text-black/30">
            <p className="text-lg font-semibold">No posts yet.</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </main>
  );
}