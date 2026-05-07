import type { TemplateGalleryMetadata } from "@/lib/templates";

const themeSurfaceClasses: Record<TemplateGalleryMetadata["theme"], string> = {
  light: "border-outline-variant bg-surface-container-low text-on-background",
  dark: "border-[#0d2326] bg-[#102225] text-white",
};

export function TemplatePreview({ gallery }: { gallery: TemplateGalleryMetadata }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden border p-4 ${themeSurfaceClasses[gallery.theme]}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d69a8b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#c0cfb5]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d5bc8d]" />
      </div>
      {renderPreview(gallery.previewStyle)}
    </div>
  );
}

function renderPreview(previewStyle: TemplateGalleryMetadata["previewStyle"]) {
  switch (previewStyle) {
    case "minimal":
      return (
        <div className="relative flex h-[calc(100%-20px)] flex-col gap-3 border border-outline-variant bg-white p-4 text-black">
          <div className="h-2 w-16 bg-black/10" />
          <div className="space-y-2">
            <div className="h-7 w-3/5 bg-black/90" />
            <div className="h-2.5 w-4/5 bg-black/15" />
            <div className="h-2.5 w-3/5 bg-black/10" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-2">
            <div className="h-16 bg-[#f5efe3]" />
            <div className="h-16 bg-[#f2f2f2]" />
            <div className="h-16 bg-[#efe7da]" />
          </div>
        </div>
      );
    case "dark-clean":
      return (
        <div className="relative flex h-[calc(100%-20px)] flex-col border border-white/10 bg-[#0d1014] p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-6 w-2/5 bg-white" />
            <div className="h-2.5 w-4/5 bg-white/20" />
            <div className="h-2.5 w-3/5 bg-white/12" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-3">
            <div className="border border-white/10 bg-white/5 p-3">
              <div className="h-2 w-10 bg-white/50" />
              <div className="mt-3 h-10 bg-white/[0.08]" />
            </div>
            <div className="border border-white/10 bg-[#181d24] p-3">
              <div className="h-2 w-8 bg-cyan-300/70" />
              <div className="mt-3 h-10 bg-white/[0.08]" />
            </div>
          </div>
        </div>
      );
    case "dark-vcard":
      return (
        <div className="relative grid h-[calc(100%-20px)] grid-cols-[92px_1fr] gap-3 border border-white/10 bg-[#0d0f13] p-3 text-white">
          <div className="border border-white/10 bg-white/5 p-3">
            <div className="mx-auto h-14 w-14 bg-[linear-gradient(135deg,#6b7280,#1f2937)]" />
            <div className="mt-3 h-2.5 bg-white/80" />
            <div className="mt-2 h-2 bg-white/20" />
            <div className="mt-5 space-y-2">
              <div className="h-8 bg-white/[0.06]" />
              <div className="h-8 bg-white/[0.06]" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="border border-white/10 bg-[#141821] p-3">
              <div className="h-3 w-16 bg-fuchsia-300/80" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-14 bg-white/[0.07]" />
                <div className="h-14 bg-white/[0.07]" />
                <div className="h-14 bg-white/[0.07]" />
              </div>
            </div>
            <div className="flex-1 border border-white/10 bg-white/5 p-3">
              <div className="h-2.5 w-2/3 bg-white/70" />
              <div className="mt-2 h-2.5 w-4/5 bg-white/20" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-10 bg-white/[0.08]" />
                <div className="h-10 bg-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>
      );
    case "light-vcard":
      return (
        <div className="relative grid h-[calc(100%-20px)] grid-cols-[92px_1fr] gap-3 border border-black/[0.08] bg-white/90 p-3 text-black">
          <div className="border border-black/[0.08] bg-[#f7efe2] p-3">
            <div className="mx-auto h-14 w-14 bg-[linear-gradient(135deg,#f4d5c2,#c2d8ea)]" />
            <div className="mt-3 h-2.5 bg-black/80" />
            <div className="mt-2 h-2 bg-black/18" />
            <div className="mt-5 space-y-2">
              <div className="h-8 bg-white/70" />
              <div className="h-8 bg-white/70" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="border border-black/[0.08] bg-[#fff8ef] p-3">
              <div className="h-3 w-16 bg-amber-500/70" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-14 bg-[#f2eadf]" />
                <div className="h-14 bg-[#f9f2e8]" />
                <div className="h-14 bg-[#eef2f6]" />
              </div>
            </div>
            <div className="flex-1 border border-black/[0.08] bg-white p-3">
              <div className="h-2.5 w-2/3 bg-black/80" />
              <div className="mt-2 h-2.5 w-4/5 bg-black/15" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-10 bg-[#f5efe6]" />
                <div className="h-10 bg-[#eef3f7]" />
              </div>
            </div>
          </div>
        </div>
      );
    case "developer-os":
      return (
        <div className="relative flex h-[calc(100%-20px)] flex-col border border-emerald-300/15 bg-[#08110f] p-3 text-emerald-100">
          <div className="flex items-center justify-between border border-emerald-300/15 bg-black/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-300/70" />
              <div className="h-2 w-12 bg-emerald-200/20" />
            </div>
            <div className="h-2 w-10 bg-emerald-200/20" />
          </div>
          <div className="mt-3 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-3">
            <div className="border border-emerald-300/15 bg-[#0c1715] p-3">
              <div className="space-y-2 font-mono text-[10px]">
                <div className="h-2.5 w-4/5 bg-emerald-300/55" />
                <div className="h-2.5 w-3/5 bg-emerald-300/30" />
                <div className="h-2.5 w-2/5 bg-emerald-300/20" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-12 bg-emerald-300/[0.08]" />
                <div className="h-12 bg-emerald-300/[0.08]" />
              </div>
            </div>
            <div className="grid gap-3">
              <div className="border border-emerald-300/15 bg-emerald-300/[0.06] p-3">
                <div className="h-2 w-12 bg-emerald-200/45" />
                <div className="mt-3 h-12 bg-black/20" />
              </div>
              <div className="border border-cyan-300/15 bg-cyan-300/[0.08] p-3">
                <div className="h-2 w-10 bg-cyan-200/60" />
                <div className="mt-3 h-12 bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      );
    case "arcade-neon":
      return (
        <div className="relative h-[calc(100%-20px)] border border-fuchsia-300/20 bg-[#12051e] p-3 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f0abfc22,transparent_35%),radial-gradient(circle_at_bottom_right,#22d3ee22,transparent_30%)]" />
          <div className="relative flex h-full flex-col gap-3">
            <div className="border border-fuchsia-300/25 bg-black/25 p-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 bg-fuchsia-300/80" />
                <div className="h-3 w-10 bg-cyan-300/70" />
              </div>
              <div className="mt-3 grid grid-cols-[72px_1fr] gap-3">
                <div className="border border-cyan-300/20 bg-cyan-300/10" />
                <div className="space-y-2">
                  <div className="h-2.5 w-4/5 bg-white/70" />
                  <div className="h-2.5 w-3/5 bg-white/30" />
                  <div className="h-2.5 w-2/5 bg-fuchsia-300/45" />
                </div>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-3">
              <div className="border border-fuchsia-300/20 bg-fuchsia-300/10" />
              <div className="border border-cyan-300/20 bg-cyan-300/10" />
              <div className="border border-amber-300/20 bg-amber-300/10" />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
