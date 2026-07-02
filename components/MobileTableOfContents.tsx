"use client";

import React, { useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { Heading } from "./TableOfContents";

export default function MobileTableOfContents({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <div className="border border-black/10 rounded-xl bg-gray-50/50 overflow-hidden backdrop-blur-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-xs font-semibold text-black/70 hover:bg-gray-100/50 transition-colors"
      >
        <span className="flex items-center gap-2 font-mono uppercase tracking-wider text-[10px]">
          <List size={14} className="text-violet-600" />
          On this page
        </span>
        <ChevronDown
          size={14}
          className={`text-black/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-violet-600" : ""}`}
        />
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[350px] border-t border-black/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 bg-white overflow-y-auto max-h-[300px]">
          <ul className="space-y-3 pl-0 list-none m-0">
            {headings.map((heading) => {
              const paddingLeft = (heading.level - 1) * 12;
              return (
                <li
                  key={heading.id}
                  className="list-none m-0 p-0"
                  style={{ paddingLeft: `${paddingLeft}px` }}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-xs py-0.5 text-black/50 hover:text-violet-600 transition-colors no-underline font-medium"
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
