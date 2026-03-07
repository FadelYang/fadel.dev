'use client'

import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import MainTag from "@/components/ui/main_tag";
import { stacks } from "@/lib/dummy_data";

const roles = ["Frontend.", "Backend.", "AI Engineer."];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">

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

      <div className="relative max-w-5xl mx-auto px-6 py-24 w-full flex flex-col md:flex-row items-center gap-12">

        {/* LEFT — Text content */}
        <div className="flex-1 min-w-0">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Available for freelance and part time work
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1] mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Fullstack Software
            <br />
            Engineer.
          </h1>

          {/* Rotating role */}
          <div
            className={`text-3xl md:text-4xl font-black tracking-tight mb-6 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span
              className="text-violet-500 transition-opacity duration-300"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {roles[roleIndex]}
            </span>
          </div>

          {/* Subtext */}
          <p
            className={`text-base md:text-lg text-black/50 max-w-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            I'm <span className="text-black font-semibold">Fadel</span> — I build end-to-end web
            applications, design scalable APIs, and integrate AI models into real products.
            From pixel-perfect UIs to intelligent backends.
          </p>

          {/* Skill tags */}
          <div
            className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-[250ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {stacks.map((tag) => (
             <MainTag tag={tag} key={tag}/>
            ))}
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-3 mb-16 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-violet-600 transition-colors duration-200"
            >
              View my work
              <ArrowRight size={15} />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-black/10 text-black text-sm font-semibold hover:border-violet-400 hover:text-violet-600 transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>

          {/* Socials */}
          <div
            className={`flex items-center gap-4 transition-all duration-700 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="text-xs text-black/30 uppercase tracking-widest">Find me on</span>
            <div className="h-px w-8 bg-black/10" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors duration-200"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-violet-600 transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* RIGHT — Photo placeholder */}
        <div
          className={`relative shrink-0 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Dashed decorative ring */}
          <div className="absolute -inset-3 rounded-3xl border border-dashed border-violet-300 opacity-70" />
          {/* Soft glow */}
          <div className="absolute -inset-6 bg-violet-100 rounded-3xl blur-2xl opacity-40" />

          {/* Photo frame */}
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-black/10 bg-linear-to-br from-violet-50 via-white to-violet-50 flex flex-col items-center justify-center gap-3 shadow-sm">
            {/* Avatar icon */}
            <div className="w-50 h-50 rounded-full bg-violet-100 border-2 border-violet-200 flex items-center justify-center">
              {/* <svg className="w-10 h-10 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg> */}
              <img src="/sad.jpg" alt="" className="rounded-full" />
            </div>
            <span className="text-xs text-black/30 font-medium tracking-wide"></span>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-violet-400 rounded-tl-sm" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-violet-400 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-violet-400 rounded-bl-sm" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-violet-400 rounded-br-sm" />
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}