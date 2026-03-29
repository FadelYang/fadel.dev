'use client'

import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Menu, X } from "lucide-react";
import ProgressBar from "@/components/ui/progress_bar";
import { usePathname } from "next/navigation";
import HireMeModal from "./hire-modal";

const links = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-black/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3">

        {/* Logo — left */}
        <a href="/" className="text-black font-bold text-lg tracking-tight whitespace-nowrap md:justify-self-start">
          Fadela Numah Kadenza<span className="text-violet-500">.</span>
        </a>

        {/* Desktop Nav — perfectly centered */}
        <NavigationMenu.Root className="hidden md:flex justify-self-center">
          <NavigationMenu.List className="flex items-center gap-1 list-none m-0 p-0">
            {links.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link
                  href={link.href}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive(link.href)
                      ? "text-violet-600 bg-violet-50"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right side — CTA + hamburger */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          <div className="hidden md:block">
            <HireMeModal />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-black p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <ProgressBar />

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-black/10 px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${isActive(link.href)
                  ? "text-violet-600 bg-violet-50"
                  : "text-black/70 hover:text-black hover:bg-black/5"
                }`}
            >
              {link.label}
            </a>
          ))}
          <div className="hidden md:block">
            <HireMeModal />
          </div>
        </nav>
      )}
    </header>
  );
}