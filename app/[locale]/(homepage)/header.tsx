'use client'

import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Menu, X } from "lucide-react";
import ProgressBar from "@/components/ui/progress_bar";
import { useParams, usePathname, useRouter } from "next/navigation";
import HireMeModal from "./hire-modal";
import Link from "next/link";
import en from '@/dictionaries/en.json';
import id from '@/dictionaries/id.json';

const links = [
  { labelKey: "home", href: "/" },
  { labelKey: "blogs", href: "/blogs" },
  { labelKey: "projects", href: "/projects" },
  { labelKey: "contact", href: "/contact" },
] as const;

export default function Header({ locale }: { locale?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeLocale = (locale || params.locale as string) || 'en';
  const dict = activeLocale === 'id' ? id : en;

  const isActive = (href: string) => {
    const cleanPathname = pathname.replace(/^\/(en|id)/, '') || '/';
    return href === "/" ? cleanPathname === "/" : cleanPathname.startsWith(href);
  };

  const getLocalizedHref = (href: string) => {
    if (href === '/') return `/${activeLocale}`;
    return `/${activeLocale}${href}`;
  };

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === activeLocale) return;

    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'id') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    // Set cookie to remember language preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.push(segments.join('/') || `/${newLocale}`);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-black/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3">

        {/* Logo — left */}
        <Link href={getLocalizedHref("/")} className="text-black font-bold text-lg tracking-tight whitespace-nowrap md:justify-self-start">
          Fadela Numah Kadenza<span className="text-violet-500">.</span>
        </Link>

        {/* Desktop Nav — perfectly centered */}
        <NavigationMenu.Root className="hidden md:flex justify-self-center">
          <NavigationMenu.List className="flex items-center gap-1 list-none m-0 p-0">
            {links.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      ${isActive(link.href)
                        ? "text-violet-600 bg-violet-50"
                        : "text-black/60 hover:text-black hover:bg-black/5"
                      }`}
                  >
                    {dict.header[link.labelKey]}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right side — Language Switcher + CTA + hamburger */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 border border-black/10 rounded-lg p-0.5 bg-black/5 text-[10px] font-bold">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:cursor-pointer ${activeLocale === 'en' ? 'bg-white text-black shadow-xs' : 'text-black/50 hover:text-black'}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('id')}
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:cursor-pointer ${activeLocale === 'id' ? 'bg-white text-black shadow-xs' : 'text-black/50 hover:text-black'}`}
            >
              ID
            </button>
          </div>

          <div className="hidden md:block">
            <HireMeModal locale={activeLocale} />
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
            <Link
              key={link.href}
              href={getLocalizedHref(link.href)}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${isActive(link.href)
                  ? "text-violet-600 bg-violet-50"
                  : "text-black/70 hover:text-black hover:bg-black/5"
                }`}
            >
              {dict.header[link.labelKey]}
            </Link>
          ))}
          <div className="pt-2">
            <HireMeModal locale={activeLocale} />
          </div>
        </nav>
      )}
    </header>
  );
}