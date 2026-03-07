'use client'

import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-black/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">

        {/* Logo — always far left */}
        <a href="/" className="text-black font-bold text-lg tracking-tight whitespace-nowrap">
          Fadela Numah Kadenza<span className="text-violet-500">.</span>
        </a>

        {/* Desktop Nav — centered with auto margins */}
        <NavigationMenu.Root className="hidden md:flex flex-1 justify-center">
          <NavigationMenu.List className="flex items-center gap-1 list-none m-0 p-0">
            {links.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link
                  href={link.href}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors duration-200"
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right side — pushed to far right with ml-auto */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href="/contact"
            className="hidden md:block px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors duration-200"
          >
            Hire me
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-black p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-black/10 px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-black/70 hover:text-black hover:bg-black/5 text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="mt-2 px-4 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold text-center transition-colors duration-200"
          >
            Hire me
          </a>
        </nav>
      )}
    </header>
  );
}