import { getAllPosts, Post } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

// ── Featured Post Card ─────────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article className="relative rounded-2xl border border-black/10 bg-gradient-to-br from-violet-50 via-white to-white p-8 md:p-10 hover:border-violet-300 transition-all duration-300 hover:shadow-lg hover:shadow-violet-100">

        {/* Featured badge */}
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
            <p className="text-black/50 leading-relaxed mb-6 max-w-xl">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold border border-black/10 text-black/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-black/40">
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readingTime}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 transition-all duration-200 self-end md:self-start mt-2">
            <ArrowRight size={16} className="text-black/40 group-hover:text-white transition-colors duration-200" />
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Regular Post Card ──────────────────────────────────────
function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article
        className="h-full rounded-2xl border border-black/10 bg-white p-6 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100 transition-all duration-300"
        style={{
          animationDelay: `${index * 80}ms`,
        }}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-semibold border border-violet-200 text-violet-600 bg-violet-50"
            >
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

        <p className="text-sm text-black/50 leading-relaxed mb-6 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-black/40 mt-auto">
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readingTime}
          </span>
        </div>
      </article>
    </Link>
  );
}

// ── Blog Page ──────────────────────────────────────────────
export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="bg-white min-h-screen">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-130 h-130 bg-violet-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-3 block">
            Blog
          </span>
          <h1
            className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Thoughts & writings.
          </h1>
          <p className="text-black/50 text-lg max-w-xl leading-relaxed">
            I write about fullstack development, AI engineering, and things I learn along the way.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <div className="mb-10">
            <FeaturedCard post={featured} />
          </div>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/30">
              All posts
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
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