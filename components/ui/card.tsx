'use client'

import { useEffect, useState } from "react";
import { Post } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// ── Featured Post Card ─────────────────────────────────────
export function FeaturedCard({ post, visible }: { post: Post; visible: boolean }) {
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
export function PostCard({ post, index, visible }: { post: Post; index: number; visible: boolean }) {
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