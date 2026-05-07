"use client";

import type { ColorPreset } from "@/lib/colorPresets";

interface ColorPickerProps {
  presets: ColorPreset[];
  currentColor: string;
  onChange: (preset: ColorPreset) => void;
}

export function ColorPicker({ presets, currentColor, onChange }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {presets.map((preset) => {
        const isActive = preset.value === currentColor;

        return (
          <button
            key={preset.name}
            type="button"
            onClick={() => onChange(preset)}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition ${
              isActive ? "border-primary bg-primary text-on-primary" : "border-outline-variant bg-surface text-on-surface hover:border-outline"
            }`}
          >
            <span className={`h-4 w-4 rounded-full border ${isActive ? "border-on-primary/20" : "border-outline-variant"}`} style={{ backgroundColor: preset.value }} />
            <span>{preset.label}</span>
          </button>
        );
      })}
    </div>
  );
}
