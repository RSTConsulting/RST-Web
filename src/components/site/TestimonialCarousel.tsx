import { Star } from "lucide-react";
import { Marquee } from "./Marquee";
import type { Testimonial } from "./data";

// ── StarRow ──────────────────────────────────────────────────────────────────
export function StarRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-steel text-steel" : "text-border"}`}
        />
      ))}
    </div>
  );
}

// ── ReviewCard ───────────────────────────────────────────────────────────────
function ReviewCard({ name, text, rating }: Testimonial) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border border-border bg-white p-5 shadow-navy-sm transition-shadow hover:shadow-navy-md">
      <div className="flex flex-row items-center gap-3 mb-3">
        {/* Avatar: initials on navy background */}
        <div className="h-9 w-9 shrink-0 rounded-full bg-navy text-white flex items-center justify-center text-xs font-semibold tracking-wide select-none">
          {initials}
        </div>
        <div className="flex flex-col gap-0.5">
          <figcaption className="text-sm font-semibold text-navy leading-tight">{name}</figcaption>
          <StarRow rating={rating} />
        </div>
      </div>
      <blockquote className="text-sm text-ink/80 leading-relaxed line-clamp-4">
        &ldquo;{text}&rdquo;
      </blockquote>
    </figure>
  );
}

// ── TestimonialMarquee ────────────────────────────────────────────────────────
interface Props {
  items: Testimonial[];
}

export function TestimonialCarousel({ items }: Props) {
  const half = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, half);
  const secondRow = items.slice(half);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
      <Marquee pauseOnHover className="[--duration:28s]">
        {firstRow.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:28s]">
        {secondRow.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </Marquee>
      {/* Left / right fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-mist" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-mist" />
    </div>
  );
}
