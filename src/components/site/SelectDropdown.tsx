import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectDropdownProps {
  id?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  invalid?: boolean;
  placeholder?: string;
}

export function SelectDropdown({
  id,
  value,
  options,
  onChange,
  invalid,
  placeholder,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between rounded-md border ${
          invalid ? "border-destructive" : "border-border"
        } bg-white px-3 py-3 text-sm text-left transition-colors hover:border-steel/60 focus:border-steel focus:outline-none focus:ring-2 focus:ring-steel/20`}
      >
        <span className={value ? "text-ink" : "text-muted-foreground"}>
          {value || placeholder || "Select…"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-steel transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-border shadow-navy-lg rounded-md overflow-hidden"
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm text-left transition-colors ${
                  selected ? "bg-mist text-navy" : "text-ink hover:bg-mist"
                }`}
              >
                <span>{opt}</span>
                {selected && <Check className="h-4 w-4 text-steel" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
