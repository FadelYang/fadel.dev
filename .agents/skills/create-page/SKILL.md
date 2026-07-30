---
name: create-page
description: Rules and guidelines for creating, configuring, or modifying a page/route in this Next.js codebase.
---

# Creating a New Page / Route

Use these guidelines whenever you create or update a page or route segment in this project.

## 1. Routing & Directory Structure

- Place pages in folders inside `app/` (e.g., [app](file:///Users/fadelanumah/Documents/playground/fadel.dev/app)).
- Each route segment requires a `page.tsx` file to render.
- **Dynamic Routes**: Use bracket syntax for folders (e.g., `app/blogs/[slug]/page.tsx`).
- **Route Groups**: Use parenthesis syntax for organization without adding to the URL path (e.g., `app/(homepage)/`).

## 2. Next.js 15/16 Routing Conventions (Critical)

In Next.js 15+, `params` and `searchParams` are asynchronous APIs. You **MUST** await them before accessing their properties.
- **Example for Dynamic Route Page**:
  ```typescript
  export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
    // ...
  }
  ```

## 3. Server vs. Client Pages

- **Keep Page Files as Server Components (Default)**: Do not place `'use client'` directly on page files unless absolutely necessary.
- **Delegate Interactivity**: If a page needs state, forms, or interaction, create a separate client component (e.g. `page-hero.tsx` or a component in `components/`) and import it into the main `page.tsx`.

## 4. Metadata & SEO

- **Static Metadata**: Export `metadata` at the top of static pages:
  ```typescript
  import { Metadata } from "next";

  export const metadata: Metadata = {
    title: "About Me | Fadel Anumah",
    description: "A description of my professional experience and skills.",
  };
  ```
- **Dynamic Metadata**: Use `generateMetadata` for dynamic routes:
  ```typescript
  import { Metadata } from "next";

  export async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug, "projects");
    return {
      title: `${post?.title} | Fadel Anumah`,
      description: post?.excerpt,
    };
  }
  ```

## 5. Static Site Generation (SSG)

- If building static dynamic pages (such as blog posts or project pages), export `generateStaticParams()` to pre-generate paths at build time:
  ```typescript
  export async function generateStaticParams() {
    const posts = getAllPosts("projects");
    return posts.map((post) => ({ slug: post.slug }));
  }
  ```

## 6. Page Checklist

1. **Heading Structure**: Ensure there is exactly one `<h1>` per page.
2. **Path Aliases**: Use `@/` for imports (e.g., `import Header from "@/components/Header"` instead of relative paths).
3. **Data Fetching**: Fetch data in the Server Component and pass it down to interactive components.
4. **Verification**: Run `npm run build` or `yarn build` to ensure static generation passes without compilation errors.
