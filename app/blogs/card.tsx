'use client'

import { useEffect, useState } from "react";
import { Post } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// ── Featured Post Card ─────────────────────────────────────
function FeaturedCard({ post, visible }: { post: Post; visible: boolean }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article
        className={`relative rounded-2xl border border-black/10 bg-gradient-to-br from-violet-50 via-white to-white p-8 md:p-10 hover:border-violet-300 transition-all duration-300 hover:shadow-lg hover:shadow-violet-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          Featured
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <h2
              className="text-2xl md:text-3xl font-black text-black tracking-tight leading-tight mb-3 group-hover:text-violet-600 transition-colors duration-200"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {post.title}
            </h2>
            <p className="text-black/50 leading-relaxed mb-6 max-w-xl">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold border border-black/10 text-black/50">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-black/40">
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
            </div>
          </div>

          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 transition-all duration-200 self-end md:self-start mt-2">
            <ArrowRight size={16} className="text-black/40 group-hover:text-white transition-colors duration-200" />
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Regular Post Card ──────────────────────────────────────
function PostCard({ post, index, visible }: { post: Post; index: number; visible: boolean }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article
        className={`h-full rounded-2xl border border-black/10 bg-white p-6 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transition: `opacity 0.6s ease ${0.35 + index * 0.08}s, transform 0.6s ease ${0.35 + index * 0.08}s` }}
      >
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold border border-violet-200 text-violet-600 bg-violet-50">
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="text-lg font-black text-black tracking-tight leading-snug mb-3 group-hover:text-violet-600 transition-colors duration-200"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {post.title}
        </h3>

        <p className="text-sm text-black/50 leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between text-xs text-black/40 mt-auto">
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
        </div>
      </article>
    </Link>
  );
}

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