'use client'

import { useEffect, useState } from "react";
import { Github, Linkedin, ArrowRight } from "lucide-react";

export default function ComingSoon() {
  const [visible, setVisible] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-130 h-130 bg-violet-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-violet-50 rounded-full blur-2xl opacity-40 pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 py-24 w-full flex flex-col items-center text-center">

        {/* Logo */}
        <a
          href="/"
          className={`text-black font-bold text-xl tracking-tight mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Fadela Numah Kadenza<span className="text-violet-500">.</span>
        </a>

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-8 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Under Construction
        </div>

        {/* Headline — smaller on mobile, bigger on md+ */}
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-black leading-[1.1] mb-4 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Something{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-violet-600">cool</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-violet-100 z-0 rounded" />
          </span>
          <br />
          {/* Dots sit inline but with fixed width so they never cause reflow */}
          is coming<span className="text-violet-500 inline-block min-w-8 text-left">{dots}</span>
        </h1>

        {/* Subtext */}
        <p
          className={`text-base md:text-lg text-black/50 max-w-md leading-relaxed mb-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          I'm <span className="text-black font-semibold">Fadel</span> — a Fullstack Software Engineer
          building this space. Check back soon or reach out in the meantime.
        </p>

        {/* CTA — stacks vertically on mobile */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-16 w-full sm:w-auto transition-all duration-700 delay-[250ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-violet-600 transition-colors duration-200"
          >
            Go to homepage
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-black/10 text-black text-sm font-semibold hover:border-violet-400 hover:text-violet-600 transition-colors duration-200"
          >
            Get in touch
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Divider */}
        <div
          className={`w-12 h-px bg-black/10 mb-8 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}
        />

        {/* Socials */}
        <div
          className={`flex items-center gap-4 transition-all duration-700 delay-[350ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="text-xs text-black/30 uppercase tracking-widest">Find me on</span>
          <div className="h-px w-8 bg-black/10" />
          <a
            href="https://github.com/FadelYang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/40 hover:text-black transition-colors duration-200"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/fadela-numah-kadenza-0305751ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/40 hover:text-violet-600 transition-colors duration-200"
          >
            <Linkedin size={18} />
          </a>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </main>
  );
}