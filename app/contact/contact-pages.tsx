'use client'

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const contacts = [
  {
    label: "Email",
    value: "fadelanumah@gmail.com",
    description: "Best for project inquiries",
    href: "mailto:fadelanumah@gmail.com",
    icon: Mail,
    iconBg: "bg-black group-hover:bg-violet-600",
  },
  {
    label: "WhatsApp",
    value: "+62 8515 630 5768",
    description: "For quick chats",
    href: "https://wa.me/6285156305768",
    icon: MessageCircle,
    iconBg: "bg-emerald-500 group-hover:bg-emerald-600",
  },
  {
    label: "LinkedIn",
    value: "Fadela Numah Kadenza",
    description: "Let's connect professionally",
    href: "https://www.linkedin.com/in/fadela-numah-kadenza-0305751ab/",
    icon: Linkedin,
    iconBg: "bg-blue-600 group-hover:bg-blue-700",
  },
  {
    label: "GitHub",
    value: "FadelYang",
    description: "Check out my open source work",
    href: "https://github.com/FadelYang",
    icon: Github,
    iconBg: "bg-zinc-800 group-hover:bg-black",
  },
];

export default function ContactPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">

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

      <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">

          {/* Label */}
          <span
            className={`text-xs font-semibold uppercase tracking-widest text-violet-500 mb-3 block transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Contact
          </span>

          {/* Headline */}
          <h1
            className={`text-4xl md:text-6xl font-black text-black tracking-tight leading-[1.05] mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's build something
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-violet-600">together.</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-violet-100 -z-0 rounded" />
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-base md:text-lg text-black/50 leading-relaxed mb-12 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Have a project in mind or just want to say hi? Pick any channel below — I'm always open to new opportunities and conversations.
          </p>

          {/* Contact cards */}
          <div className="flex flex-col gap-3">
            {contacts.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{
                    transitionProperty: "opacity, transform, background, border-color",
                    transitionDuration: "600ms, 600ms, 200ms, 200ms",
                    transitionDelay: `${0.2 + i * 0.08}s, ${0.2 + i * 0.08}s, 0s, 0s`,
                  }}
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${contact.iconBg}`}>
                    <Icon size={18} className="text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-0.5">
                      {contact.label}
                    </p>
                    <p className="text-sm font-bold text-black truncate">{contact.value}</p>
                    <p className="text-xs text-black/40 mt-0.5">{contact.description}</p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="text-black/20 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </div>

          {/* Footer note */}
          <p
            className={`text-xs text-black/30 mt-8 transition-all duration-700 delay-[500ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Usually respond within 24 hours ✦ Based in Indonesia
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </main>
  );
}