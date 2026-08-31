import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/dictionary';

const links = [
  { labelKey: "home", href: "/" },
  { labelKey: "blogs", href: "/blogs" },
  { labelKey: "projects", href: "/projects" },
  { labelKey: "contact", href: "/contact" },
] as const;

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/FadelYang",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fadela-numah-kadenza-0305751ab/",
    icon: Linkedin,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6285156305768",
    icon: MessageCircle,
  },
  {
    label: "Email",
    href: "mailto:fadelanumah@gmail.com",
    icon: Mail,
  },
];

export default async function Footer({ locale }: { locale?: string }) {
  const currentYear = new Date().getFullYear();
  const activeLocale = (locale as Locale) || 'en';
  const dict = await getDictionary(activeLocale);

  const getLocalizedHref = (href: string) => {
    if (href === '/') return `/${activeLocale}`;
    return `/${activeLocale}${href}`;
  };

  return (
    <footer className="w-full border-t border-black/10 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col gap-4">
            <Link href={getLocalizedHref("/")} className="text-black font-bold text-lg tracking-tight whitespace-nowrap w-fit">
              Fadela Numah Kadenza<span className="text-violet-500">.</span>
            </Link>
            <p className="text-sm text-black/50 leading-relaxed max-w-sm">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 md:pl-10">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-black/40">{dict.footer.navigation}</h4>
            <nav className="flex flex-col gap-2.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedHref(link.href)}
                  className="text-sm font-medium text-black/60 hover:text-violet-600 transition-colors duration-200 w-fit"
                >
                  {dict.header[link.labelKey]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials / Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-black/40">{dict.footer.connect}</h4>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-black/10 flex items-center justify-center text-black/60 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-black/30 mt-2 font-medium">
              {dict.footer.based_in}
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-black/5 mt-10 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/40">
            &copy; {currentYear} Fadela Numah Kadenza. {dict.footer.rights_reserved}
          </p>
          <p className="text-xs text-black/30 flex items-center gap-1.5 font-medium">
            {dict.footer.built_with}
          </p>
        </div>
      </div>
    </footer>
  );
}

