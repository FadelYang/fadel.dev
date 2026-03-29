'use client'

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText, Mail, ArrowRight, ArrowLeft, Download } from "lucide-react";

// ── CV Modal ───────────────────────────────────────────────
function CVModal({ onClose, onBack }: { onClose: () => void; onBack: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
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
            className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors duration-200 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back
          </button>

          <span className="text-sm font-bold text-black" style={{ fontFamily: "'Syne', sans-serif" }}>
            Fadela Numah Kadenza — CV
          </span>

          <div className="flex items-center gap-2">
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors duration-200"
            >
              <Download size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-colors duration-200"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="overflow-auto" style={{ height: "75vh" }}>
          <iframe
            src="/cv.pdf"
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
function HireMeDialog({ onClose, onViewCV }: { onClose: () => void; onViewCV: () => void }) {
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
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-colors duration-200"
        >
          <X size={15} />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Available now
          </div>
          <h2
            className="text-2xl font-black text-black tracking-tight mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's work together.
          </h2>
          <p className="text-sm text-black/50 leading-relaxed">
            I'm open for freelance projects and part-time work. Pick how you'd like to connect.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onViewCV}
            className="group flex items-center gap-4 p-4 rounded-xl border border-black/10 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 text-left w-full"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors duration-200">
              <FileText size={18} className="text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-black">View my CV</p>
              <p className="text-xs text-black/40 mt-0.5">See my experience and skills</p>
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
              <p className="text-sm font-bold text-black">Send me an email</p>
              <p className="text-xs text-black/40 mt-0.5">fadelanumah@gmail.com</p>
            </div>
            <ArrowRight size={15} className="text-black/20 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all duration-200" />
          </a>
        </div>

        <p className="text-xs text-black/30 text-center mt-6">
          Usually respond within 24 hours.
        </p>
      </div>
    </div>,
    document.body
  );
}

// ── Main Export ────────────────────────────────────────────
export default function HireMeModal() {
  const [view, setView] = useState<"closed" | "hire" | "cv">("closed");
  const [mounted, setMounted] = useState(false);

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
        className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors duration-200"
      >
        Hire me
      </button>

      {mounted && view === "hire" && (
        <HireMeDialog
          onClose={() => setView("closed")}
          onViewCV={() => setView("cv")}
        />
      )}

      {mounted && view === "cv" && (
        <CVModal
          onClose={() => setView("closed")}
          onBack={() => setView("hire")}
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