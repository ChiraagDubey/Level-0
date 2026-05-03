"use client";

import Link from "next/link";
import { ColorPicker } from "@/components/editor/ColorPicker";
import { COLOR_PRESETS, type ColorPreset } from "@/lib/colorPresets";

interface EditorToolbarProps {
  templateName: string;
  accentColor: string;
  onAccentColorChange: (preset: ColorPreset) => void;
  onSave?: () => void;
  onExport: () => void;
  saveStatus?: "idle" | "saving" | "saved" | "error";
  saveMessage?: string | null;
  isUploadingImage?: boolean;
  imageUploadStatus?: "idle" | "uploading" | "error";
  imageUploadMessage?: string | null;
  mode: "local" | "saved";
  isExporting: boolean;
  exportSupported: boolean;
  exportNote?: string;
}

export function EditorToolbar({
  templateName,
  accentColor,
  onAccentColorChange,
  onSave,
  onExport,
  saveStatus = "idle",
  saveMessage,
  isUploadingImage = false,
  imageUploadStatus = "idle",
  imageUploadMessage,
  mode,
  isExporting,
  exportSupported,
  exportNote,
}: EditorToolbarProps) {
  const isSavedMode = mode === "saved";
  const exportButtonClassName = exportSupported
    ? "rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white disabled:cursor-wait disabled:opacity-70"
    : "rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black/50 disabled:cursor-not-allowed disabled:opacity-100";
  const saveButtonLabel = isUploadingImage
    ? "Uploading image..."
    : saveStatus === "saving"
      ? "Saving..."
      : saveStatus === "saved"
        ? "Saved"
        : saveStatus === "error"
          ? "Error saving"
          : "Save";

  return (
    <div className="panel p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Editor</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{templateName}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-black/65">
              Click mapped text, replace images, change accent color, and export a standalone portfolio ZIP.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium">
              Dashboard
            </Link>
            {isSavedMode ? (
              <button
                type="button"
                onClick={onSave}
                disabled={saveStatus === "saving" || isUploadingImage}
                className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black disabled:cursor-wait disabled:opacity-70"
              >
                {saveButtonLabel}
              </button>
            ) : null}
            <button
              type="button"
              onClick={onExport}
              disabled={isExporting || !exportSupported}
              className={exportButtonClassName}
            >
              {isExporting ? "Preparing ZIP..." : exportSupported ? "Export ZIP" : "Export Unavailable"}
            </button>
          </div>
        </div>

        {exportNote ? <p className="text-sm text-black/55">{exportNote}</p> : null}
        {saveMessage ? (
          <p className={`text-sm ${saveStatus === "error" ? "text-[#b42318]" : "text-black/55"}`}>{saveMessage}</p>
        ) : null}
        {imageUploadMessage ? (
          <p className={`text-sm ${imageUploadStatus === "error" ? "text-[#b42318]" : "text-black/55"}`}>{imageUploadMessage}</p>
        ) : null}

        <div className="grid gap-4 rounded-[24px] bg-sand/70 p-4 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">
              {isSavedMode ? "Saved Draft Mode" : "Local Mode"}
            </p>
            <p className="mt-2 text-sm leading-7 text-black/65">
              {isSavedMode
                ? "Manual save is enabled for this draft. Replaced images upload to Storage before save."
                : "Create a saved draft from Dashboard to persist changes."}
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-black/45">Accent presets</p>
            <ColorPicker presets={COLOR_PRESETS} currentColor={accentColor} onChange={onAccentColorChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
