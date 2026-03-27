import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

// Pre-generate all blog post routes at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}

export default async function BlogPostPage({
  params,
}: {
  params:  Promise<{ slug: string }>;
}) {
  const { slug } = await params; 

  const post = getPostBySlug(slug);

  if (!post) notFound();

  const contentHtml = await markdownToHtml(post.content);

  return (
    <main className="bg-white min-h-screen">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-130 h-130 bg-violet-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Back button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-violet-600 transition-colors duration-200 mb-12 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to blog
        </Link>

        {/* Header */}
        <div className="mb-10">

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag: any) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold border border-violet-200 text-violet-600 bg-violet-50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-black/40 pb-8 border-b border-black/10">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Markdown content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-black/10 flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-violet-600 transition-colors duration-200 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to blog
          </Link>
          <span className="text-xs text-black/30">— Fadel</span>
        </div>
      </div>

      {/* Prose styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');

        .prose-content {
          color: rgba(0,0,0,0.75);
          line-height: 1.8;
          font-size: 1rem;
        }
        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          color: #000;
          letter-spacing: -0.02em;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }
        .prose-content h1 { font-size: 2rem; }
        .prose-content h2 { font-size: 1.5rem; }
        .prose-content h3 { font-size: 1.2rem; }
        .prose-content p {
          margin-bottom: 1.4rem;
        }
        .prose-content a {
          color: #7c3aed;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-content a:hover {
          color: #6d28d9;
        }
        .prose-content strong {
          color: #000;
          font-weight: 700;
        }
        .prose-content code {
          background: #f5f3ff;
          color: #6d28d9;
          padding: 0.15em 0.45em;
          border-radius: 5px;
          font-size: 0.875em;
          font-family: 'Fira Code', 'Cascadia Code', monospace;
        }
        .prose-content pre {
          background: #0a0a0a;
          color: #e5e7eb;
          padding: 1.25rem 1.5rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-size: 0.875rem;
          line-height: 1.7;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .prose-content pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }
        .prose-content blockquote {
          border-left: 3px solid #7c3aed;
          padding-left: 1.25rem;
          margin: 1.75rem 0;
          color: rgba(0,0,0,0.5);
          font-style: italic;
        }
        .prose-content ul,
        .prose-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .prose-content li {
          margin-bottom: 0.4rem;
        }
        .prose-content ul li::marker {
          color: #7c3aed;
        }
        .prose-content ol li::marker {
          color: #7c3aed;
          font-weight: 700;
        }
        .prose-content hr {
          border: none;
          border-top: 1px solid rgba(0,0,0,0.08);
          margin: 2.5rem 0;
        }
        .prose-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.75rem 0;
          font-size: 0.9rem;
        }
        .prose-content th {
          background: #f5f3ff;
          color: #000;
          font-weight: 700;
          padding: 0.6rem 1rem;
          text-align: left;
          border-bottom: 2px solid #e5e7eb;
        }
        .prose-content td {
          padding: 0.6rem 1rem;
          border-bottom: 1px solid #f3f4f6;
          color: rgba(0,0,0,0.65);
        }
        .prose-content tr:hover td {
          background: #fafafa;
        }
        .prose-content img {
          border-radius: 12px;
          margin: 1.75rem 0;
          width: 100%;
        }
      `}</style>
    </main>
  );
}