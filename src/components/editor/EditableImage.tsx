"use client";

import { useRef } from "react";

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  onChange: (file: File) => void;
}

export function EditableImage({ src, alt, className, onChange }: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={`group relative overflow-hidden rounded-[28px] border border-outline-variant bg-surface-container ${className ?? ""}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 flex items-end justify-end bg-black/0 p-4 text-left text-white transition group-hover:bg-black/15"
      >
        <span className="rounded-full bg-black/75 px-3 py-2 text-xs font-medium">Replace image</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (!file) {
            return;
          }

          onChange(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}
