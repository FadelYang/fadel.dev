import Hero from "./(homepage)/hero";
import Experience from "./(homepage)/experience";
import Projects from "./(homepage)/projects";
import Contact from "./(homepage)/contact";
import { getAllPosts } from "@/lib/blog";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = locale || 'en';
  const projects = getAllPosts("projects", activeLocale);

  return (
    <div>
      <Hero locale={activeLocale} />
      <Experience locale={activeLocale} />
      <Projects projects={projects} locale={activeLocale} />
      <Contact locale={activeLocale} />
    </div>
  );
}


