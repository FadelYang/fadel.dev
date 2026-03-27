import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "contents/blogs");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  featured?: boolean;
  readingTime: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content } = matter(raw);

    const words = content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
      cover: data.cover ?? null,
      featured: data.featured ?? false,
      readingTime,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const words = content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    cover: data.cover ?? null,
    featured: data.featured ?? false,
    readingTime,
    content,
  };
}