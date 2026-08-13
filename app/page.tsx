import Hero from "./(homepage)/hero";
import Experience from "./(homepage)/experience";
import Projects from "./(homepage)/projects";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const projects = getAllPosts("projects");

  return (
    <div>
      <Hero />
      <Experience />
      <Projects projects={projects} />
    </div>
  );
}

