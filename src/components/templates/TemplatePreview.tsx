import type { TemplateGalleryMetadata } from "@/lib/templates";

const themeSurfaceClasses: Record<TemplateGalleryMetadata["theme"], string> = {
  light: "border-black/10 bg-[#fffaf2] text-black/75",
  dark: "border-white/10 bg-[#111317] text-white/75",
};

export function TemplatePreview({ gallery }: { gallery: TemplateGalleryMetadata }) {
  return (
    <div
      className={`relative h-52 overflow-hidden rounded-[24px] border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${themeSurfaceClasses[gallery.theme]}`}
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>
      {renderPreview(gallery.previewStyle)}
    </div>
  );
}

function renderPreview(previewStyle: TemplateGalleryMetadata["previewStyle"]) {
  switch (previewStyle) {
    case "minimal":
      return (
        <div className="relative z-10 flex h-full flex-col gap-3 rounded-[18px] border border-black/[0.08] bg-white/90 p-4 text-black">
          <div className="h-2 w-16 rounded-full bg-black/10" />
          <div className="space-y-2">
            <div className="h-7 w-3/5 rounded-full bg-black/90" />
            <div className="h-2.5 w-4/5 rounded-full bg-black/15" />
            <div className="h-2.5 w-3/5 rounded-full bg-black/10" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-2">
            <div className="h-16 rounded-[16px] bg-[#f5efe3]" />
            <div className="h-16 rounded-[16px] bg-[#f2f2f2]" />
            <div className="h-16 rounded-[16px] bg-[#efe7da]" />
          </div>
        </div>
      );
    case "dark-clean":
      return (
        <div className="relative z-10 flex h-full flex-col rounded-[18px] border border-white/10 bg-[#0d1014] p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-6 w-2/5 rounded-full bg-white" />
            <div className="h-2.5 w-4/5 rounded-full bg-white/20" />
            <div className="h-2.5 w-3/5 rounded-full bg-white/12" />
          </div>
          <div className="mt-auto grid grid-cols-2 gap-3">
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-3">
              <div className="h-2 w-10 rounded-full bg-white/50" />
              <div className="mt-3 h-10 rounded-[12px] bg-white/[0.08]" />
            </div>
            <div className="rounded-[16px] border border-white/10 bg-[#181d24] p-3">
              <div className="h-2 w-8 rounded-full bg-cyan-300/70" />
              <div className="mt-3 h-10 rounded-[12px] bg-white/[0.08]" />
            </div>
          </div>
        </div>
      );
    case "dark-vcard":
      return (
        <div className="relative z-10 grid h-full grid-cols-[92px_1fr] gap-3 rounded-[18px] border border-white/10 bg-[#0d0f13] p-3 text-white">
          <div className="rounded-[16px] border border-white/10 bg-white/5 p-3">
            <div className="mx-auto h-14 w-14 rounded-[18px] bg-[linear-gradient(135deg,#6b7280,#1f2937)]" />
            <div className="mt-3 h-2.5 rounded-full bg-white/80" />
            <div className="mt-2 h-2 rounded-full bg-white/20" />
            <div className="mt-5 space-y-2">
              <div className="h-8 rounded-[12px] bg-white/[0.06]" />
              <div className="h-8 rounded-[12px] bg-white/[0.06]" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-[16px] border border-white/10 bg-[#141821] p-3">
              <div className="h-3 w-16 rounded-full bg-fuchsia-300/80" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-14 rounded-[12px] bg-white/[0.07]" />
                <div className="h-14 rounded-[12px] bg-white/[0.07]" />
                <div className="h-14 rounded-[12px] bg-white/[0.07]" />
              </div>
            </div>
            <div className="flex-1 rounded-[16px] border border-white/10 bg-white/5 p-3">
              <div className="h-2.5 w-2/3 rounded-full bg-white/70" />
              <div className="mt-2 h-2.5 w-4/5 rounded-full bg-white/20" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-10 rounded-[12px] bg-white/[0.08]" />
                <div className="h-10 rounded-[12px] bg-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>
      );
    case "light-vcard":
      return (
        <div className="relative z-10 grid h-full grid-cols-[92px_1fr] gap-3 rounded-[18px] border border-black/[0.08] bg-white/90 p-3 text-black">
          <div className="rounded-[16px] border border-black/[0.08] bg-[#f7efe2] p-3">
            <div className="mx-auto h-14 w-14 rounded-[18px] bg-[linear-gradient(135deg,#f4d5c2,#c2d8ea)]" />
            <div className="mt-3 h-2.5 rounded-full bg-black/80" />
            <div className="mt-2 h-2 rounded-full bg-black/18" />
            <div className="mt-5 space-y-2">
              <div className="h-8 rounded-[12px] bg-white/70" />
              <div className="h-8 rounded-[12px] bg-white/70" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-[16px] border border-black/[0.08] bg-[#fff8ef] p-3">
              <div className="h-3 w-16 rounded-full bg-amber-500/70" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-14 rounded-[12px] bg-[#f2eadf]" />
                <div className="h-14 rounded-[12px] bg-[#f9f2e8]" />
                <div className="h-14 rounded-[12px] bg-[#eef2f6]" />
              </div>
            </div>
            <div className="flex-1 rounded-[16px] border border-black/[0.08] bg-white p-3">
              <div className="h-2.5 w-2/3 rounded-full bg-black/80" />
              <div className="mt-2 h-2.5 w-4/5 rounded-full bg-black/15" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-10 rounded-[12px] bg-[#f5efe6]" />
                <div className="h-10 rounded-[12px] bg-[#eef3f7]" />
              </div>
            </div>
          </div>
        </div>
      );
    case "developer-os":
      return (
        <div className="relative z-10 flex h-full flex-col rounded-[18px] border border-emerald-300/15 bg-[#08110f] p-3 text-emerald-100">
          <div className="flex items-center justify-between rounded-[14px] border border-emerald-300/15 bg-black/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-300/70" />
              <div className="h-2 w-12 rounded-full bg-emerald-200/20" />
            </div>
            <div className="h-2 w-10 rounded-full bg-emerald-200/20" />
          </div>
          <div className="mt-3 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-3">
            <div className="rounded-[16px] border border-emerald-300/15 bg-[#0c1715] p-3">
              <div className="space-y-2 font-mono text-[10px]">
                <div className="h-2.5 w-4/5 rounded-full bg-emerald-300/55" />
                <div className="h-2.5 w-3/5 rounded-full bg-emerald-300/30" />
                <div className="h-2.5 w-2/5 rounded-full bg-emerald-300/20" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-12 rounded-[12px] bg-emerald-300/[0.08]" />
                <div className="h-12 rounded-[12px] bg-emerald-300/[0.08]" />
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-[16px] border border-emerald-300/15 bg-emerald-300/[0.06] p-3">
                <div className="h-2 w-12 rounded-full bg-emerald-200/45" />
                <div className="mt-3 h-12 rounded-[12px] bg-black/20" />
              </div>
              <div className="rounded-[16px] border border-cyan-300/15 bg-cyan-300/[0.08] p-3">
                <div className="h-2 w-10 rounded-full bg-cyan-200/60" />
                <div className="mt-3 h-12 rounded-[12px] bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      );
    case "arcade-neon":
      return (
        <div className="relative z-10 h-full rounded-[18px] border border-fuchsia-300/20 bg-[#12051e] p-3 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f0abfc22,transparent_35%),radial-gradient(circle_at_bottom_right,#22d3ee22,transparent_30%)]" />
          <div className="relative flex h-full flex-col gap-3">
            <div className="rounded-[16px] border border-fuchsia-300/25 bg-black/25 p-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 rounded-full bg-fuchsia-300/80" />
                <div className="h-3 w-10 rounded-full bg-cyan-300/70" />
              </div>
              <div className="mt-3 grid grid-cols-[72px_1fr] gap-3">
                <div className="rounded-[14px] border border-cyan-300/20 bg-cyan-300/10" />
                <div className="space-y-2">
                  <div className="h-2.5 w-4/5 rounded-full bg-white/70" />
                  <div className="h-2.5 w-3/5 rounded-full bg-white/30" />
                  <div className="h-2.5 w-2/5 rounded-full bg-fuchsia-300/45" />
                </div>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-3">
              <div className="rounded-[16px] border border-fuchsia-300/20 bg-fuchsia-300/10" />
              <div className="rounded-[16px] border border-cyan-300/20 bg-cyan-300/10" />
              <div className="rounded-[16px] border border-amber-300/20 bg-amber-300/10" />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
