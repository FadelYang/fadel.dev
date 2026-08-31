import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  type: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string | null;
  featured?: boolean;
  readingTime: string;
  languages: string[]; // indonesia, english
  isDraft: boolean;
};

function resolvePostsDir(type: string, locale: string) {
  return path.join(process.cwd(), "contents", type, locale);
}

function extractFirstImage(content: string): string | null {
  // Regex to match Markdown image: ![alt](url)
  const mdImageRegex = /!\[.*?\]\(([^)\s]+)(?:\s+["'].*?["'])?\)/;
  // Regex to match HTML image: <img ... src="url" ...>
  const htmlImageRegex = /<img\s+[^>]*src=["']([^"']+)["']/i;

  const mdMatch = content.match(mdImageRegex);
  if (mdMatch && mdMatch[1]) {
    return mdMatch[1];
  }

  const htmlMatch = content.match(htmlImageRegex);
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1];
  }

  return null;
}

export function getAllPosts(type: string, locale: string): Post[] {
  const postsDir = resolvePostsDir(type, locale);

  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");

      const { data, content } = matter(raw);

      const words = content.trim().split(/\s+/).length;
      const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;

      let cover = data.cover ?? null;
      if (!cover) {
        cover = extractFirstImage(content);
      }

      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        cover,
        featured: data.featured ?? false,
        readingTime,
        languages: data.languages ?? [],
        type: data.type,
        isDraft: data.isDraft,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, type: string, locale: string) {
  const postsDir = resolvePostsDir(type, locale);

  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const words = content.trim().split(/\s+/).length;

  let cover = data.cover ?? null;
  if (!cover) {
    cover = extractFirstImage(content);
  }

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    cover,
    featured: data.featured ?? false,
    readingTime: `${Math.max(1, Math.round(words / 200))} min read`,
    content,
    type: data.type,
  };
}