import { Marquee } from "./Marquee";

interface SectorMarqueeProps {
  images: string[];
  onOpen: (src: string) => void;
}

// Below this count there aren't enough images to loop smoothly, so
// show a static row instead of animating.
const MIN_IMAGES_TO_ROTATE = 5;

// Above this count, split into two rows scrolling opposite directions
// so a single row doesn't get too long to scan.
const SPLIT_INTO_TWO_ROWS_ABOVE = 8;

function MarqueeImage({ src, onOpen }: { src: string; onOpen: (src: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className="block h-44 md:h-62 w-64 md:w-80 shrink-0 overflow-hidden rounded-xl border border-border shadow-navy-sm transition-shadow hover:shadow-navy-md cursor-pointer"
      aria-label="Expand image"
    >
      <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
    </button>
  );
}

export function SectorMarquee({ images, onOpen }: SectorMarqueeProps) {
  if (images.length === 0) return null;

  // Not enough images to loop cleanly: show a plain static row,
  // no animation, no fade edges, no cutting off mid-scroll.
  if (images.length < MIN_IMAGES_TO_ROTATE) {
    return (
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {images.map((src, i) => (
          <MarqueeImage key={`${src}-${i}`} src={src} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  // Enough images to loop, but not so many that a single row gets
  // unwieldy: one animated row.
  if (images.length <= SPLIT_INTO_TWO_ROWS_ABOVE) {
    return (
      <div className="relative flex w-full items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:60s]">
          {images.map((src, i) => (
            <MarqueeImage key={`${src}-${i}`} src={src} onOpen={onOpen} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-mist" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-mist" />
      </div>
    );
  }

  // Plenty of images: split into two rows scrolling opposite directions.
  const half = Math.ceil(images.length / 2);
  const firstRow = images.slice(0, half);
  const secondRow = images.slice(half);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
      <Marquee pauseOnHover className="[--duration:60s]">
        {firstRow.map((src, i) => (
          <MarqueeImage key={`${src}-a-${i}`} src={src} onOpen={onOpen} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:60s]">
        {secondRow.map((src, i) => (
          <MarqueeImage key={`${src}-b-${i}`} src={src} onOpen={onOpen} />
        ))}
      </Marquee>
    </div>
  );
}
