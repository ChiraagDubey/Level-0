"use client";

import { type ReactNode, useEffect, useState } from "react";

interface EditableLinkButtonProps {
  href: string;
  onHrefSave?: (value: string) => void;
  editable?: boolean;
  variant: "primary" | "secondary";
  accentColor: string;
  editLabel: string;
  children: ReactNode;
}

function isLightColor(color: string) {
  if (!(color.startsWith("#") && color.length === 7)) {
    return false;
  }

  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.72;
}

export function EditableLinkButton({
  href,
  onHrefSave,
  editable = false,
  variant,
  accentColor,
  editLabel,
  children,
}: EditableLinkButtonProps) {
  const [draftHref, setDraftHref] = useState(href);
  const primaryTextClassName = isLightColor(accentColor) ? "text-on-surface" : "text-white";

  useEffect(() => {
    setDraftHref(href);
  }, [href]);

  const baseClassName =
    "group relative inline-flex items-center rounded-full px-4 py-2.5 text-sm font-medium transition";

  const variantClassName =
    variant === "primary" ? primaryTextClassName : "border border-outline-variant bg-surface text-on-surface";

  if (!editable) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${baseClassName} ${variantClassName}`}
        style={variant === "primary" ? { backgroundColor: accentColor } : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={`${baseClassName} ${variantClassName}`}
        style={variant === "primary" ? { backgroundColor: accentColor } : undefined}
      >
        {children}
      </button>

      <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-72 rounded-2xl border border-outline-variant bg-surface p-3 opacity-0 shadow-panel transition group-hover:pointer-events-auto group-hover:opacity-100">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">{editLabel}</p>
        <input
          type="url"
          value={draftHref}
          onChange={(event) => setDraftHref(event.target.value)}
          onBlur={() => onHrefSave?.(draftHref)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onHrefSave?.(draftHref);
              event.currentTarget.blur();
            }

            if (event.key === "Escape") {
              setDraftHref(href);
              event.currentTarget.blur();
            }
          }}
          className="mt-2 h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 text-xs text-on-surface outline-none ring-0"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
