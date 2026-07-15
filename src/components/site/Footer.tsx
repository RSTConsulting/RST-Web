import { Link } from "@tanstack/react-router";
import { Facebook, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/rst_logo.jpeg";
import { contact } from "./data";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Our Work" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy-surface text-white">
      <div className="container-wide py-10 md:py-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="RST Consulting Engineers"
                className="h-12 w-12 rounded-sm"
              />
              <div className="font-display text-lg font-semibold">
                RST Consulting Engineers
              </div>
            </div>
            <p className="mt-5 text-sm text-white/70 max-w-sm leading-relaxed">
              Structural and civil engineering design for residential,
              commercial, industrial and institutional projects across
              Melbourne. Based in Springvale, Victoria.
            </p>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center border border-white/25 hover:bg-steel hover:border-steel transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          <div>
            <p className="eyebrow !text-steel mb-5">Navigate</p>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-steel mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-steel" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-steel" />
                <a href={contact.phoneHref} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-steel" />
                <a href={contact.emailHref} className="hover:text-white">
                  {contact.email}
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} RST Consulting Engineers. All rights reserved.</p>
          <p>Springvale, Victoria · Australia</p>
        </div>
      </div>
    </footer>
  );
}
