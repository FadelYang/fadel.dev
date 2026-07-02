import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import TableOfContents, { Heading } from "./TableOfContents";

interface ArticlePageProps {
  post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readingTime: string;
    content: string;
  };
  type: "blogs" | "projects";
}

function rehypeExtractAndSlugify(headings: Heading[]) {
  return () => (tree: any) => {
    function getElementText(node: any): string {
      if (node.type === "text") return node.value;
      if (node.children) {
        return node.children.map(getElementText).join("");
      }
      return "";
    }

    function visit(node: any) {
      if (node.type === "element" && /^h[1-4]$/.test(node.tagName)) {
        const text = getElementText(node);
        const slug = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        let id = slug;
        let count = 1;
        while (headings.some((h) => h.id === id)) {
          id = `${slug}-${count}`;
          count++;
        }

        node.properties = node.properties || {};
        node.properties.id = id;

        headings.push({
          id,
          text,
          level: parseInt(node.tagName.slice(1), 10),
        });
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

async function markdownToHtml(markdown: string): Promise<{ contentHtml: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeExtractAndSlugify(headings))
    .use(rehypePrettyCode, {
      theme: "github-light",
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return {
    contentHtml: result.toString(),
    headings,
  };
}

export default async function ArticlePage({ post, type }: ArticlePageProps) {
  const { contentHtml, headings } = await markdownToHtml(post.content);

  const backLink = type === "blogs" ? "/blogs" : "/projects";
  const backText = type === "blogs" ? "Back to blog" : "Back to project";

  return (
    <main className="bg-white min-h-screen relative">
      {/* Background blobs wrapped to prevent breaking position: sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-130 h-130 bg-violet-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">

          {/* Desktop Table of Contents Sidebar - Sticky & left-aligned */}
          <aside className="w-[220px] shrink-0 sticky top-24 hidden lg:block self-start">
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-violet-600 transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              {backText}
            </Link>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          {/* Main Article Content */}
          <div className="flex-1 max-w-3xl min-w-0">
            {/* Back button for mobile/tablet */}
            <div className="lg:hidden mb-8">
              <Link
                href={backLink}
                className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-violet-600 transition-colors duration-200 group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                {backText}
              </Link>
            </div>

            {/* Header */}
            <div className="mb-10">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold border border-violet-200 text-violet-600 bg-violet-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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
                href={backLink}
                className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-violet-600 transition-colors duration-200 group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                {backText}
              </Link>
              <span className="text-xs text-black/30">— Fadel</span>
            </div>
          </div>

        </div>
      </div>

      {/* Prose styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');

        html {
          scroll-behavior: smooth;
        }

        .prose-content {
          color: rgba(0,0,0,0.75);
          line-height: 1.8;
          font-size: 1rem;
          width: 100%;
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
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
          scroll-margin-top: 100px; /* Offset for smooth scroll positioning */
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
        .prose-content figure {
          width: 100% !important;
          max-width: 100% !important;
        }
        .prose-content img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          border-radius: 12px;
          margin: 1.75rem 0;
        }
      `}</style>
    </main>
  );
}
