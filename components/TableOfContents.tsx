"use client";

import React, { useEffect, useState, useRef } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    if (headings.length === 0) return;

    // Set initial active heading to first one
    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry;
      });

      // Find all heading entries that are currently intersecting
      const intersectingEntries = Object.values(headingElementsRef.current).filter(
        (entry) => entry.isIntersecting
      );

      if (intersectingEntries.length > 0) {
        // If there are intersecting entries, choose the one closest to the top of the viewport
        const topIntersecting = intersectingEntries.reduce((prev, curr) => {
          return curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev;
        });
        setActiveId(topIntersecting.target.id);
      } else {
        // If none are currently intersecting, check if any are above the viewport
        const aboveViewport = Object.values(headingElementsRef.current).filter(
          (entry) => entry.boundingClientRect.top < 0
        );
        if (aboveViewport.length > 0) {
          // Choose the one closest to the top but negative (i.e. largest top)
          const lastAbove = aboveViewport.reduce((prev, curr) => {
            return curr.boundingClientRect.top > prev.boundingClientRect.top ? curr : prev;
          });
          setActiveId(lastAbove.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-100px 0px -60% 0px", // trigger when heading is in the upper part of the viewport
      threshold: 0,
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings, activeId]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-3">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-black/30 mb-4 font-mono">
        On this page
      </p>
      <ul className="relative space-y-2 border-l border-black/10 pl-0 py-1 list-none m-0">
        {headings.map((heading) => {
          // Indent based on level (h1 -> 0, h2 -> 1, h3 -> 2)
          const indentClass =
            heading.level === 1
              ? "pl-3"
              : heading.level === 2
              ? "pl-6"
              : "pl-9";

          const borderIndentClass =
            heading.level === 1
              ? "-ml-[1px]"
              : heading.level === 2
              ? "-ml-[1px] border-l border-black/5"
              : "-ml-[1px] border-l border-black/5";

          return (
            <li key={heading.id} className="list-none m-0 p-0">
              <a
                href={`#${heading.id}`}
                className={`block text-xs py-1 transition-all duration-200 border-l-2 -ml-[1px] ${indentClass} no-underline hover:no-underline font-medium ${
                  activeId === heading.id
                    ? "text-violet-600 border-violet-600 font-bold translate-x-0.5"
                    : "text-black/40 border-transparent hover:text-black/80"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
