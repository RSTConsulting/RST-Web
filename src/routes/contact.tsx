import { ContactForm } from "@/components/site/ContactForm";
import { contact } from "@/components/site/data";
import { Reveal } from "@/components/site/Reveal";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - RST Consulting Engineers" },
      {
        name: "description",
        content:
          "Get a quote or enquire about a project. RST Consulting Engineers - Shop 11, 134 Springvale Road, Springvale VIC 3171. Phone (+61) 04024 52824.",
      },
      { property: "og:title", content: "Contact - RST Consulting Engineers" },
      {
        property: "og:description",
        content:
          "Get a quote - Shop 11, 134 Springvale Road, Springvale VIC 3171. Phone (+61) 04024 52824..",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const mapSrc =
  "https://www.google.com/maps?q=Shop+11,+134+Springvale+Road,+Springvale+VIC+3171,+Australia&output=embed";

function ContactPage() {
  return (
    <>
      <section className="py-10 md:py-10 border-b border-border">
        <div className="container-wide max-w-4xl w-full">
          <Reveal>
            <p className="eyebrow mb-5">Contact</p>
            <h1
              className="font-display font-semibold text-navy leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.75rem)" }}
            >
              Get a quote. We respond within one business day.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Send through the details of your project - site address, scope, timing - and we'll
              come back with a fixed engineering quote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-wide grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy mb-8">
                Send us the details.
              </h2>
              <div className="rounded-xl border border-border bg-white p-6 md:p-8 shadow-navy-md">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-semibold text-navy mb-8">
                Or reach us directly.
              </h2>
              <ul className="space-y-6">
                <ContactRow icon={<MapPin />} label="Studio">
                  <p className="text-navy">{contact.address}</p>
                </ContactRow>
                <ContactRow icon={<Phone />} label="Phone">
                  <a
                    href={contact.phoneHref}
                    className="text-navy hover:text-steel transition-colors block"
                  >
                    {contact.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail />} label="Email">
                  <a
                    href={contact.emailHref}
                    className="text-navy hover:text-steel transition-colors"
                  >
                    {contact.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<Clock />} label="Hours">
                  <p className="text-navy">Monday–Friday · 9:00 AM – 5:00 PM</p>
                  <p className="text-muted-foreground text-sm">Saturday by appointment only</p>
                </ContactRow>
              </ul>
              <div className="mt-10 aspect-4/3 w-full border border-border overflow-hidden rounded-xl shadow-navy-md">
                <iframe
                  title="RST Consulting Engineers - Springvale, VIC"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-5">
      <div className="h-10 w-10 shrink-0 border border-border flex items-center justify-center text-steel [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-1.5">
          {label}
        </div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </li>
  );
}
