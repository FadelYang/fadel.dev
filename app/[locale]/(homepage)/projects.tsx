'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/lib/blog';
import { PostCard } from '@/components/ui/card';
import en from '@/dictionaries/en.json';
import id from '@/dictionaries/id.json';

interface ProjectsProps {
  projects: Post[];
  locale?: string;
}

export default function Projects({ projects, locale }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const activeLocale = locale || 'en';
  const dict = activeLocale === 'id' ? id : en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const published = projects.filter(
    (post) => process.env.NODE_ENV !== 'production' || !post.isDraft
  );

  // Show top 3 projects
  const displayProjects = published.slice(0, 3);

  if (published.length === 0) return null;

  return (
    <section ref={ref} className="relative bg-white pt-12 pb-12 overflow-hidden">
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

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-3 block">
              {dict.projects.badge}
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-black tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {dict.projects.title_selected}
            </h2>
          </div>

          <div
            className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Link
              href={`/${activeLocale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-violet-600 transition-colors duration-200 group"
            >
              {dict.projects.view_all}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => (
            <PostCard
              key={project.slug}
              post={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}

