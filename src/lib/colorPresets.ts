import type { AccentColorName } from "@/types/portfolio";

export interface ColorPreset {
  name: AccentColorName;
  label: string;
  value: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: "cyan", label: "Cyan", value: "#06b6d4" },
  { name: "purple", label: "Purple", value: "#8b5cf6" },
  { name: "orange", label: "Orange", value: "#f97316" },
  { name: "emerald", label: "Emerald", value: "#10b981" },
  { name: "rose", label: "Rose", value: "#f43f5e" },
  { name: "monochrome", label: "Monochrome", value: "#111111" },
];
