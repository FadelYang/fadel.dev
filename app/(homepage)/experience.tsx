'use client'

import { experiences } from "@/lib/dummy_data";
import { useEffect, useRef, useState } from "react";

const typeColor: Record<string, string> = {
  "Full-time": "text-violet-600 bg-violet-50 border-violet-200",
  Contract: "text-blue-600 bg-blue-50 border-blue-200",
  "Part-time": "text-emerald-600 bg-emerald-50 border-emerald-200",
  Freelance: "text-orange-600 bg-orange-50 border-orange-200",
  Internship: "text-red-600 bg-red-50 border-red-200",
};

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-6 md:gap-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-100 mt-1.5 shrink-0" />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 bg-linear-to-b from-violet-200 to-transparent mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-xs text-black/40 font-medium">{exp.period}</span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${typeColor[exp.type] ?? "text-black/50 bg-black/5 border-black/10"}`}
          >
            {exp.type}
          </span>
        </div>

        <h3 className="text-lg font-bold text-black tracking-tight">{exp.role}</h3>
        <p className="text-sm font-semibold text-violet-600 mb-3">{exp.company}</p>
        <p className="text-sm text-black/50 leading-relaxed mb-4">{exp.description}</p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold border border-black/10 text-black/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-3 block">
            Experience
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Where I've worked.
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}