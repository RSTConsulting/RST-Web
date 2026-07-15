import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import logo from "@/assets/rst_logo.jpeg";
import { contact } from "./data";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Our Work" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-border shadow-navy-md"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="container-wide relative z-50 flex items-center justify-between gap-4 bg-white py-4 md:py-5">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="RST Consulting Engineers"
            className="h-11 w-11 shrink-0 rounded-sm object-cover"
          />
          <div className="leading-tight">
            <div className="font-display text-[15px] sm:text-base font-semibold text-navy tracking-tight whitespace-nowrap">
              RST Consulting Engineers
            </div>
            <div className="text-[11px] text-muted-foreground tracking-wide hidden sm:block">
              Structural · Civil · Design
            </div>
          </div>
        </Link>

        {/* Desktop Nav (xl and above: 1280px+) */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 shrink-0">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nav-underline text-sm font-medium text-ink hover:text-navy transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pl-4 border-l border-border shrink-0">
            <a
              href={contact.phoneHref}
              className="text-sm font-medium text-navy hover:text-steel transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              {contact.phone}
            </a>
            <Link
              to="/contact"
              className="btn-primary bg-navy-surface text-white px-4 py-2.5 text-sm font-medium hover:bg-steel transition-colors whitespace-nowrap shrink-0"
            >
              Get a Quote
            </Link>
          </div>
        </nav>

        {/* Mobile & iPad/Tablet Controls (below xl: 1280px) */}
        <div className="flex items-center gap-3 xl:hidden">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="hidden sm:inline-flex btn-primary bg-navy-surface text-white px-3.5 py-2 text-xs md:text-sm font-medium hover:bg-steel transition-colors whitespace-nowrap"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 p-2 -mr-2 text-navy hover:text-steel transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet slide-in menu (shown below xl) */}
      <div
        className={`xl:hidden fixed inset-x-0 bottom-0 top-[76px] z-40 bg-white transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="container-wide w-full flex flex-col min-h-full py-8 md:py-12">
          <nav className="flex flex-col divide-y divide-border/80 border-y border-border/80">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="group flex items-center justify-between py-5 md:py-7 font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-navy hover:text-steel transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-5 w-5 md:h-7 md:w-7 text-steel opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-10 md:pt-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-mist/60 p-6 md:p-8 rounded-2xl border border-border/60">
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider uppercase text-steel block">Call or enquire online</span>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-2.5 text-navy font-display text-xl md:text-2xl font-semibold hover:text-steel transition-colors"
                >
                  <Phone className="h-5 w-5 text-steel shrink-0" /> {contact.phone}
                </a>
              </div>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary bg-navy-surface text-white px-8 py-4 text-base font-medium hover:bg-steel transition-colors rounded-xl text-center shrink-0 shadow-navy-md"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
