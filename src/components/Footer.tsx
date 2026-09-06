import { Instagram, Mail, MessageCircle } from "lucide-react";
import { contact, profile } from "@/data/profile";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tools", href: "#tools" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const socials = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/_akshit.edits/",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: contact.email.startsWith("[")
        ? undefined
        : `mailto:${contact.email}`,
      label: "Email",
    },
    {
      icon: MessageCircle,
      href: contact.phone.startsWith("[")
        ? undefined
        : `https://wa.me/${contact.phone.replace(/\D/g, "")}`,
      label: "WhatsApp",
    },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/8 py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <img
                src="/assets/branding/logo.png"
                alt="Akshit Saini"
                className="h-10 w-auto"
              />
            </div>

            <p className="mt-2 text-xs text-ink-300">{profile.title}</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="text-xs font-medium text-ink-300 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const isPlaceholder =
                !social.href || social.href?.startsWith("[");
              if (isPlaceholder) {
                return (
                  <span
                    key={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-ink-500"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </span>
                );
              }
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href?.startsWith("http") ? "_blank" : undefined
                  }
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-ink-300 transition-all duration-300 hover:border-accent/40 hover:text-accent"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-ink-400">
            © 2026 Akshit Saini. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
