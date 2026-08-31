'use client'

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText, Mail, ArrowRight, ArrowLeft, Download } from "lucide-react";
import en from '@/dictionaries/en.json';
import id from '@/dictionaries/id.json';

// ── CV Modal ───────────────────────────────────────────────
function CVModal({ onClose, onBack, dict, locale }: { onClose: () => void; onBack: () => void; dict: typeof en; locale: string }) {
  const cvUrl = locale === 'id' ? '/cv_indo.pdf' : '/cv.pdf';
  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-3xl bg-white rounded-2xl border border-black/10 shadow-2xl shadow-black/10 overflow-hidden"
        style={{ animation: "modalIn 0.25s ease forwards", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors duration-200 group hover:cursor-pointer"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            {dict.hire_modal.back}
          </button>

          <span className="text-sm font-bold text-black" style={{ fontFamily: "'Syne', sans-serif" }}>
            Fadela Numah Kadenza — CV
          </span>

          <div className="flex items-center gap-2">
            <a
              href={cvUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors duration-200"
            >
              <Download size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-colors duration-200 hover:cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="overflow-auto" style={{ height: "75vh" }}>
          <iframe
            src={cvUrl}
            className="w-full h-full"
            style={{ minHeight: "75vh" }}
            title="Fadela Numah Kadenza CV"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Hire Me Dialog ─────────────────────────────────────────
function HireMeDialog({ onClose, onViewCV, dict }: { onClose: () => void; onViewCV: () => void; dict: typeof en }) {
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-black/10 shadow-2xl shadow-black/10 p-8"
        style={{ animation: "modalIn 0.25s ease forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-colors duration-200 hover:cursor-pointer"
        >
          <X size={15} />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            {dict.contact.available_now}
          </div>
          <h2
            className="text-2xl font-black text-black tracking-tight mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {activeLocaleText(dict, "Let's work together.", "Mari bekerja sama.")}
          </h2>
          <p className="text-sm text-black/50 leading-relaxed">
            {activeLocaleText(dict, "I'm open for freelance projects and part-time work. Pick how you'd like to connect.", "Saya terbuka untuk proyek freelance dan pekerjaan paruh waktu. Silakan pilih cara yang paling nyaman bagi Anda untuk terhubung.")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onViewCV}
            className="group flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 text-left w-full hover:cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors duration-200">
              <FileText size={18} className="text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-black">{dict.hire_modal.view_cv}</p>
              <p className="text-xs text-black/40 mt-0.5">{dict.hire_modal.see_skills}</p>
            </div>
            <ArrowRight size={15} className="text-black/20 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all duration-200" />
          </button>

          <a
            href="mailto:fadelanumah@gmail.com"
            className="group flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600 transition-colors duration-200">
              <Mail size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-black">{dict.hire_modal.send_email}</p>
              <p className="text-xs text-black/40 mt-0.5">fadelanumah@gmail.com</p>
            </div>
            <ArrowRight size={15} className="text-black/20 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all duration-200" />
          </a>
        </div>

        <p className="text-xs text-black/30 text-center mt-6">
          {dict.contact.respond_time_short}
        </p>
      </div>
    </div>,
    document.body
  );
}

function activeLocaleText(dict: typeof en, enText: string, idText: string) {
  return dict.header.home === "Beranda" ? idText : enText;
}

// ── Main Export ────────────────────────────────────────────
export default function HireMeModal({ locale }: { locale?: string }) {
  const [view, setView] = useState<"closed" | "hire" | "cv">("closed");
  const [mounted, setMounted] = useState(false);

  const activeLocale = locale || 'en';
  const dict = activeLocale === 'id' ? id : en;

  // Wait for DOM to be available before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setView("closed");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = view !== "closed" ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [view]);

  return (
    <>
      <button
        onClick={() => setView("hire")}
        className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors duration-200 hover:cursor-pointer"
      >
        {dict.header.hire_me}
      </button>

      {mounted && view === "hire" && (
        <HireMeDialog
          onClose={() => setView("closed")}
          onViewCV={() => setView("cv")}
          dict={dict}
        />
      )}

      {mounted && view === "cv" && (
        <CVModal
          onClose={() => setView("closed")}
          onBack={() => setView("hire")}
          dict={dict}
          locale={activeLocale}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  );
}