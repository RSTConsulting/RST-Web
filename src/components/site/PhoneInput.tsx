import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
}

// Curated list - top international dialing codes. Users can search.
const countries: Country[] = [
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳" },
  { name: "Cambodia", code: "KH", dial: "+855", flag: "🇰🇭" },
  { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭" },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪" },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
];

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  id?: string;
  required?: boolean;
  invalid?: boolean;
}

export function PhoneInput({ value, onChange, id, required, invalid }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>(countries[0]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Parse local number from full value
  const local = value.startsWith(country.dial)
    ? value.slice(country.dial.length).trim()
    : value;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.dial.includes(query),
  );

  return (
    <div
      ref={wrapRef}
      className={`relative flex rounded-md border ${
        invalid ? "border-destructive" : "border-border"
      } focus-within:border-steel focus-within:ring-2 focus-within:ring-steel/20 bg-white transition-colors`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 pl-3 pr-2 border-r border-border text-sm text-navy hover:bg-mist transition-colors"
        aria-label="Select country code"
      >
        <span className="text-base leading-none">{country.flag}</span>
        <span className="tabular-nums">{country.dial}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <input
        id={id}
        type="tel"
        required={required}
        value={local}
        onChange={(e) => onChange(`${country.dial} ${e.target.value}`)}
        placeholder="400 000 000"
        className="flex-1 px-3 py-3 text-sm outline-none bg-transparent"
      />
      {open && (
        <div className="absolute top-full left-0 z-30 mt-1 w-72 bg-white border border-border shadow-navy-lg rounded-md max-h-80 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="flex-1 text-sm outline-none bg-transparent"
            />
          </div>
          <div className="overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCountry(c);
                  setOpen(false);
                  setQuery("");
                  onChange(`${c.dial} ${local}`);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-mist text-left"
              >
                <span>{c.flag}</span>
                <span className="flex-1 text-ink">{c.name}</span>
                <span className="text-muted-foreground tabular-nums">{c.dial}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                No matches
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
