'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import en from '@/dictionaries/en.json';
import id from '@/dictionaries/id.json';

export default function Contact({ locale }: { locale?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const activeLocale = locale || 'en';
  const dict = activeLocale === 'id' ? id : en;

  const contacts = [
    {
      label: "Email",
      value: "fadelanumah@gmail.com",
      description: activeLocale === 'id' ? "Terbaik untuk diskusi proyek" : "Best for project inquiries",
      href: "mailto:fadelanumah@gmail.com",
      icon: Mail,
      iconBg: "bg-black group-hover:bg-violet-600",
    },
    {
      label: "WhatsApp",
      value: "+62 8515 630 5768",
      description: activeLocale === 'id' ? "Untuk obrolan cepat" : "For quick chats",
      href: "https://wa.me/6285156305768",
      icon: MessageCircle,
      iconBg: "bg-emerald-500 group-hover:bg-emerald-600",
    },
    {
      label: "LinkedIn",
      value: "Fadela Numah Kadenza",
      description: activeLocale === 'id' ? "Mari terhubung secara profesional" : "Let's connect professionally",
      href: "https://www.linkedin.com/in/fadela-numah-kadenza-0305751ab/",
      icon: Linkedin,
      iconBg: "bg-blue-600 group-hover:bg-blue-700",
    },
    {
      label: "GitHub",
      value: "FadelYang",
      description: activeLocale === 'id' ? "Lihat proyek open source saya" : "Check out my open source work",
      href: "https://github.com/FadelYang",
      icon: Github,
      iconBg: "bg-zinc-800 group-hover:bg-black",
    },
  ];

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

  return (
    <section ref={ref} className="relative bg-white pt-12 pb-24 overflow-hidden">
      {/* Background blobs — same style as other sections */}
      <div className="absolute -top-32 -right-32 w-130 h-130 bg-violet-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-violet-50 rounded-full blur-2xl opacity-40 pointer-events-none" />


      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-3 block">
            {dict.contact.badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {dict.contact.title}
          </h2>
          <p className="text-base text-black/50 leading-relaxed max-w-2xl mt-4">
            {dict.contact.description}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionProperty: "opacity, transform, background, border-color",
                  transitionDuration: "600ms, 600ms, 200ms, 200ms",
                  transitionDelay: `${0.1 + i * 0.08}s, ${0.1 + i * 0.08}s, 0s, 0s`,
                }}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${contact.iconBg}`}
                >
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
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}

