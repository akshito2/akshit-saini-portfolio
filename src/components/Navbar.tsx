import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tools", href: "#tools" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
  const sections = navLinks
    .map((link) => document.getElementById(link.href.slice(1)))
    .filter(Boolean) as HTMLElement[];

  const updateActiveSection = () => {
    const viewportCenter = window.innerHeight / 2;

    let closestSection = sections[0];
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      setActiveSection(closestSection.id);
    }
  };

  updateActiveSection();

  window.addEventListener("scroll", updateActiveSection, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
}, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3 shadow-2xl shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          className="group flex items-center gap-2.5"
          data-cursor="hover"
        >
          <img
            src="/assets/branding/logo.png"
            alt="Akshit Saini"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-ink-300 hover:text-white"
                }`}
                data-cursor="hover"
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? "w-5" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#contact");
            }}
            className="group relative overflow-hidden rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
            data-cursor="magnet"
          >
            <span className="relative z-10">Let's Work Together</span>
            {/* <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" /> */}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-400 lg:hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-5 mt-3 flex flex-col gap-1 rounded-2xl glass-strong p-4">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
              className={`transform transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "bg-accent/15 text-accent"
                    : "text-ink-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClick("#contact");
              }}
              className="block rounded-xl bg-accent px-4 py-3 text-center text-base font-semibold text-ink-950"
            >
              Let's Work Together
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
