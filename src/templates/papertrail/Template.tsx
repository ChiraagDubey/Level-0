"use client";

import { createElement, type CSSProperties, type ElementType } from "react";
import { EditableImage } from "@/components/editor/EditableImage";
import { EditableLinkButton } from "@/components/editor/EditableLinkButton";
import { EditableText } from "@/components/editor/EditableText";
import type { PortfolioData } from "@/types/portfolio";

interface PaperTrailTemplateProps {
  data: PortfolioData;
  editable?: boolean;
  onTextEdit?: (path: Array<string | number>, value: string) => void;
  onImageEdit?: (path: Array<string | number>, file: File) => void;
}

function withAlpha(color: string, alpha: string) {
  return color.startsWith("#") && color.length === 7 ? `${color}${alpha}` : color;
}

const sections = ["Cover Page", "Author's Note", "Selected Work", "Experience Log", "Toolbox", "Contact Sheet"];
const noteCardTones = ["bg-[#f4ecdf]", "bg-[#eef1e8]", "bg-[#ece5d8]"];
const handwritingStyle = {
  fontFamily: 'var(--font-caveat), "Brush Script MT", "Segoe Script", cursive',
} as CSSProperties;

function Thumbtack({ className = "", tone = "rose" }: { className?: string; tone?: "rose" | "brass" | "sage" | "ink" }) {
  const toneClasses = {
    rose: "bg-[#c4887e] shadow-[0_8px_12px_rgba(144,90,79,0.24)]",
    brass: "bg-[#b59a67] shadow-[0_8px_12px_rgba(117,95,58,0.24)]",
    sage: "bg-[#93a28a] shadow-[0_8px_12px_rgba(88,102,80,0.22)]",
    ink: "bg-[#7d8490] shadow-[0_8px_12px_rgba(76,84,96,0.24)]",
  } as const;

  return (
    <span className={`pointer-events-none absolute block ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-3 h-4 w-[2px] -translate-x-1/2 rounded-full bg-[#978e84]/65" />
      <span className={`relative block h-4 w-4 rounded-full border border-white/45 ${toneClasses[tone]}`}>
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/65" />
      </span>
    </span>
  );
}

function MaskingTape({ className = "", tone = "cream" }: { className?: string; tone?: "cream" | "rose" | "beige" }) {
  const toneClasses = {
    cream: "border-[#ddcfaf]/70 bg-[#f7eed7]/85",
    rose: "border-[#d2b4a2]/70 bg-[#efdccf]/82",
    beige: "border-[#d1c09e]/70 bg-[#ece0c7]/85",
  } as const;

  return (
    <span
      className={`pointer-events-none absolute block rounded-[4px] border shadow-[0_6px_14px_rgba(94,78,58,0.08)] backdrop-blur-[0.5px] ${toneClasses[tone]} ${className}`}
      aria-hidden="true"
    />
  );
}

function PaperClip({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute block h-12 w-7 ${className}`} aria-hidden="true">
      <span className="absolute inset-0 rounded-[14px] border-2 border-[#86827b]/85" />
      <span className="absolute left-[7px] top-[6px] h-7 w-3.5 rounded-[10px] border-2 border-[#86827b]/75" />
    </span>
  );
}

function PenStroke({ className = "", tone = "rose" }: { className?: string; tone?: "rose" | "sage" | "ink" }) {
  const toneClasses = {
    rose: "bg-[#b8766d]/65",
    sage: "bg-[#7f9279]/60",
    ink: "bg-[#6b7b92]/55",
  } as const;

  return <span className={`pointer-events-none absolute block h-[3px] rounded-full ${toneClasses[tone]} ${className}`} aria-hidden="true" />;
}

function WaxSealStamp({ className = "", children }: { className?: string, children?: React.ReactNode }) {
  const waxRed = "#901a1e";
  const waxHighlight = "#a82d31";
  const waxShadow = "#6b1114";
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: 56, height: 56 }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true" style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }}>
        <defs>
          <radialGradient id="wax-grad" cx="40%" cy="40%" r="60%" fx="35%" fy="35%">
            <stop offset="0%" stopColor={waxHighlight} />
            <stop offset="50%" stopColor={waxRed} />
            <stop offset="100%" stopColor={waxShadow} />
          </radialGradient>
        </defs>
        
        <path d="M 50 5 C 65 2, 85 10, 92 25 C 98 38, 95 60, 85 75 C 75 90, 55 98, 35 92 C 15 85, 2 65, 5 45 C 8 25, 30 10, 50 5 Z" fill="url(#wax-grad)" />
        
        <circle cx="48" cy="50" r="32" fill="none" stroke={waxShadow} strokeWidth="3" opacity="0.6" />
        <circle cx="49" cy="51" r="32" fill="none" stroke={waxHighlight} strokeWidth="1.5" opacity="0.4" />
      </svg>
      {children && (
        <div className="relative z-10 font-serif font-bold text-[#e6bfa5] text-[18px] opacity-85" style={{ transform: 'rotate(-5deg)', letterSpacing: '1px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function DateStamp({ className = "", date = "20 MAY 2024" }: { className?: string; date?: string }) {
  const redInk = "#bd5e5e";
  return (
    <div className={`pointer-events-none absolute flex flex-col items-center justify-center border-2 px-3 py-1 opacity-80 rotate-[3deg] ${className}`} style={{ borderColor: redInk }} aria-hidden="true">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: redInk }}>Date</span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: redInk }}>{date}</span>
    </div>
  );
}

function HandDrawnArrow({ className = "", tone = "rose" }: { className?: string; tone?: "rose" | "sage" | "ink" }) {
  const toneClasses = {
    rose: "stroke-[#b8766d]/80",
    sage: "stroke-[#7f9279]/80",
    ink: "stroke-[#6b7b92]/80",
  };
  return (
    <svg className={`pointer-events-none absolute ${className}`} viewBox="0 0 50 50" width="30" height="30" fill="none" aria-hidden="true">
      <path d="M5,10 Q25,10 40,40 M30,35 Q40,40 45,30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={toneClasses[tone]} />
    </svg>
  );
}

function HeartSVG({ className = "", tone = "rose" }: { className?: string; tone?: "rose" | "sage" | "ink" }) {
  const toneClasses = {
    rose: "stroke-[#b8766d]",
    sage: "stroke-[#7f9279]",
    ink: "stroke-[#6b7b92]",
  };
  return (
    <svg className={`pointer-events-none inline-block ${className}`} viewBox="0 0 40 40" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M20,32 Q10,22 6,14 A8,8 0 0,1 20,10 A8,8 0 0,1 34,14 Q30,22 20,32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={toneClasses[tone]} />
    </svg>
  );
}

function HandDrawnScribble({ className = "", tone = "sage" }: { className?: string; tone?: "rose" | "sage" | "ink" }) {
  const toneClasses = {
    rose: "stroke-[#b8766d]/80",
    sage: "stroke-[#7f9279]/80",
    ink: "stroke-[#6b7b92]/80",
  };
  return (
    <svg className={`pointer-events-none absolute ${className}`} viewBox="0 0 100 20" width="100%" height="100%" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M5,12 Q25,7 50,15 T95,12 M10,16 Q45,20 90,16" strokeWidth="1.5" strokeLinecap="round" className={toneClasses[tone]} />
    </svg>
  );
}

function StickyNote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center rounded-sm border border-[#e4dec9] bg-[#f2e7d3] p-4 text-center shadow-[0_8px_16px_rgba(75,65,53,0.06)] ${className}`}>
      <MaskingTape className="left-1/2 top-[-10px] h-6 w-12 -translate-x-1/2 rotate-[3deg]" tone="cream" />
      {children}
    </div>
  );
}

export function PaperTrailTemplate({ data, editable = false, onTextEdit, onImageEdit }: PaperTrailTemplateProps) {
  const accent = data.theme.accentColor;
  const themeStyle = {
    ["--accent" as string]: accent,
    ["--accent-soft" as string]: withAlpha(accent, "18"),
    ["--accent-line" as string]: withAlpha(accent, "40"),
    ["--ink" as string]: "#2f2924",
    ["--muted" as string]: "#655d56",
  } as CSSProperties;
  const heroAside = {
    statusLabel: data.heroAside?.statusLabel ?? "Case file open",
    profileLabel: data.heroAside?.profileLabel ?? "Field portrait",
    profileModeLabel: data.heroAside?.profileModeLabel ?? "Issue 01",
    detailLabel: data.heroAside?.detailLabel ?? "Margin notes",
    highlightItems: data.heroAside?.highlightItems ?? [],
    spotlightLabel: data.heroAside?.spotlightLabel ?? "Author's note",
    spotlightTitle: data.heroAside?.spotlightTitle ?? "",
    spotlightBody: data.heroAside?.spotlightBody ?? "",
    toolkitLabel: data.heroAside?.toolkitLabel ?? "Builder's note",
    toolkitBody: data.heroAside?.toolkitBody ?? "",
    logoText: data.heroAside?.logoText ?? "PT",
    sealText: data.heroAside?.sealText ?? "PT",
    aboutDocument: data.heroAside?.aboutDocument ?? "This layout is built to read like a collected working document rather than a dashboard or blog.",
    aboutDocumentNote: data.heroAside?.aboutDocumentNote ?? "documented with care",
    funFactsTitle: data.heroAside?.funFactsTitle ?? "Fun Facts",
    funFacts: data.heroAside?.funFacts ?? ["Chai > Coffee", "Indie hacker at heart", "Night owl", "Love sketching UI", "Always learning", ":)"],
  };
  const labels = {
    quickFactsLabel: data.templateLabels?.quickFactsLabel ?? "Case details",
    socialLinksLabel: data.templateLabels?.socialLinksLabel ?? "Reference links",
    aboutSkillsLabel: data.templateLabels?.aboutSkillsLabel ?? "Working style",
    locationLabel: data.templateLabels?.locationLabel ?? "Filed from",
    availabilityLabel: data.templateLabels?.availabilityLabel ?? "Availability",
    projectsLabel: data.templateLabels?.projectsLabel ?? "Selected work",
    projectsTitle: data.templateLabels?.projectsTitle ?? "Documented projects",
    skillsLabel: data.templateLabels?.skillsLabel ?? "Toolbox",
    experienceLabel: data.templateLabels?.experienceLabel ?? "Experience log",
    educationLabel: data.templateLabels?.educationLabel ?? "Education",
    heroNote1: data.templateLabels?.heroNote1 ?? "open to\ninternships",
    heroNote2: data.templateLabels?.heroNote2 ?? "currently building",
  };

  const renderText = ({
    path,
    value,
    className,
    as = "p",
    multiline = false,
    placeholder,
  }: {
    path: Array<string | number>;
    value: string;
    className?: string;
    as?: ElementType;
    multiline?: boolean;
    placeholder?: string;
  }) =>
    editable && onTextEdit ? (
      <EditableText value={value} onSave={(nextValue) => onTextEdit(path, nextValue)} className={className} as={as} multiline={multiline} placeholder={placeholder} />
    ) : (
      createElement(as, { className }, value)
    );

  const renderImage = (path: Array<string | number>, src: string, alt: string, className?: string) =>
    editable && onImageEdit ? (
      <EditableImage src={src} alt={alt} className={className} onChange={(nextValue) => onImageEdit(path, nextValue)} />
    ) : (
      <div className={`overflow-hidden rounded-[28px] border border-[var(--accent-line)] bg-[#efe6d8] ${className ?? ""}`}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-[#d7ccb9] bg-[linear-gradient(180deg,#f5efe4_0%,#efe6d8_100%)] text-[var(--ink)] shadow-[0_28px_85px_rgba(68,57,43,0.14)]" style={themeStyle}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.14),transparent_38%)]" />
        <div className="absolute left-[6%] top-[7%] h-28 w-28 rounded-full border border-[var(--accent-line)] opacity-35" />
        <div className="absolute right-[10%] top-[14%] h-20 w-20 rotate-12 rounded-[18px] border border-[#cbb89d] bg-[#f2e5cf]/60" />
        <div className="absolute left-[9%] top-[45%] h-[1px] w-[18%] bg-[#c8baa5]" />
        <div className="absolute right-[6%] top-[56%] h-16 w-16 rounded-full border border-[#9ca88f] opacity-30" />
        <div className="absolute right-[14%] bottom-[12%] h-24 w-24 rounded-full border border-[#cbb7a4]/60 opacity-30" />
        <div className="absolute left-[10%] bottom-[18%] h-16 w-28 -rotate-6 rounded-[10px] border border-[#dcccae]/70 bg-[#efe0bf]/45" />
        <span className="absolute right-[13%] top-[9%] font-mono text-[11px] uppercase tracking-[0.28em] text-[#796a5e]">archived</span>
        <span className="absolute right-[9%] bottom-[8%] rounded-full border border-[#ccb6a1]/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-[#8d6f60]">case file</span>
      </div>

      <div className="relative grid gap-6 p-4 sm:p-6 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-7 xl:p-7">
        <aside className="relative isolate self-start rounded-[28px] border border-[#d8ccb8] bg-[linear-gradient(180deg,#f7f1e7_0%,#eee3d1_100%)] p-5 shadow-[0_18px_34px_rgba(81,69,55,0.08)] xl:sticky xl:top-6">
          <div className="pointer-events-none absolute inset-x-3 bottom-[-10px] top-3 -z-10 rounded-[26px] border border-[#ded3c3] bg-[#f7f2e9]/75" />
          <div className="pointer-events-none absolute inset-x-4 bottom-[-18px] top-6 -z-20 rounded-[24px] border border-[#e4d8c7] bg-[#efe3d2]/75" />
          <div className="pointer-events-none absolute right-5 top-4 h-10 w-5 rounded-b-[10px] rounded-t-[4px] border border-[#b49384] bg-[#cda598]/40" />
          <Thumbtack className="left-6 top-[-7px]" tone="brass" />
          <MaskingTape className="right-10 top-5 h-6 w-16 -rotate-6" tone="cream" />
          <div className="flex items-center justify-between border-b border-[#ddd0bd] pb-4 pr-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--accent-line)] bg-[#fffaf2] font-serif text-xl font-semibold text-[var(--accent)]">
                {renderText({ path: ["heroAside", "logoText"], value: heroAside.logoText || "PT", as: "span" })}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#877768]">{heroAside.profileLabel || "Paper index"}</p>
                <p className="mt-1 text-sm font-medium text-[#3b332d]">{data.name}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="rounded-[20px] border border-[#d9ccb9] bg-[#fffaf3] px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">Edition</p>
              <p className="mt-2 text-sm text-[#61574f]">Documented portfolio dossier</p>
            </div>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <div key={section} className="flex items-center gap-3 rounded-[18px] border border-[#ddd2c1] bg-[#f8f3ea] px-3 py-3 text-sm text-[#4d443d]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a8979]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{section}</span>
                </div>
              ))}
            </nav>
          </div>
          <div className="relative mt-5 rounded-[22px] border border-[#d8ccb9] bg-[#f1e6d6] p-4">
            <MaskingTape className="left-6 top-[-11px] h-6 w-14 rotate-[7deg]" tone="rose" />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">{heroAside.statusLabel}</p>
            {renderText({ path: ["heroAside", "aboutDocument"], value: heroAside.aboutDocument, as: "p", className: "mt-3 text-sm leading-7 text-[#5f564f]" })}
            <p className="mt-3 text-[1.25rem] leading-none text-[#8c6b5d]" style={handwritingStyle}>{heroAside.aboutDocumentNote}</p>
          </div>
          
          <div className="mt-10 flex justify-center px-4 mb-6">
            <div className="relative w-full max-w-[200px] rounded-[2px] border border-[#e8d5a5] bg-[#f9e9ad] p-4 shadow-[2px_8px_16px_rgba(90,75,50,0.1)] rotate-[-2deg]">
              <PaperClip className="left-1/2 top-[-16px] -translate-x-1/2 rotate-[-5deg]" />
              <p className="text-xl font-bold text-[#6a5638]" style={handwritingStyle}>{heroAside.funFactsTitle}</p>
              <ul className="mt-2 space-y-1.5 text-base leading-tight text-[#6a5638]" style={handwritingStyle}>
                {(Array.isArray(heroAside.funFacts) ? heroAside.funFacts : (typeof heroAside.funFacts === 'object' && heroAside.funFacts !== null ? Object.values(heroAside.funFacts) : [])).map((fact, index, arr) => {
                  const isLast = index === arr.length - 1;
                  if (isLast && fact === ":)") {
                    return (
                      <div key={index} className="mt-2 flex justify-end">
                        <span className="text-base text-[#6a5638]">{renderText({ path: ["heroAside", "funFacts", index], value: fact, as: "span" })}</span>
                      </div>
                    );
                  }
                  return (
                    <li key={index}>• {renderText({ path: ["heroAside", "funFacts", index], value: fact, as: "span" })}</li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center mb-6">
            <WaxSealStamp className="relative mt-2 rotate-[5deg] self-end">
              {renderText({ path: ["heroAside", "sealText"], value: heroAside.sealText, as: "span" })}
            </WaxSealStamp>
          </div>
        </aside>

        <div className="grid gap-6">
          <section className="relative isolate overflow-visible rounded-[32px] border border-[#d8ccb7] bg-[linear-gradient(180deg,#fbf7f0_0%,#f5edde_100%)] p-5 shadow-[0_20px_45px_rgba(77,66,52,0.1)] sm:p-6 lg:p-7">
            <div className="pointer-events-none absolute inset-x-4 bottom-[-10px] top-4 -z-10 rounded-[32px] border border-[#ddd2c2] bg-[#f7f1e6]/80" />
            <div className="pointer-events-none absolute inset-x-6 bottom-[-18px] top-8 -z-20 rounded-[30px] border border-[#e4d7c7] bg-[#efe4d3]/78" />
            <div className="pointer-events-none absolute left-6 top-5 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d7a191]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#a5b39b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8294ab]" />
            </div>
            <DateStamp className="right-8 top-8" />
            <PaperClip className="left-6 top-[-10px] -rotate-[8deg]" />
            <Thumbtack className="right-28 top-[-7px]" tone="rose" />
            <MaskingTape className="right-36 top-8 h-7 w-20 rotate-[8deg]" tone="cream" />
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="pt-7 relative">

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">{renderText({ path: ["hero", "eyebrow"], value: data.hero.eyebrow, as: "span" })}</span>
                  <span className="rounded-full border border-[#d7cab5] bg-[#fff8ef] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7d6d60]">{renderText({ path: ["heroAside", "profileLabel"], value: heroAside.profileLabel, as: "span" })}</span>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="relative inline-block max-w-3xl pr-8">
                    {renderText({ path: ["hero", "name"], value: data.hero.name, as: "h2", className: "max-w-3xl font-serif text-5xl leading-none tracking-[-0.06em] text-[#302924] sm:text-6xl lg:text-[4.7rem]" })}
                    <PenStroke className="bottom-1 left-2 w-[78%] rotate-[0.8deg]" tone="rose" />
                  </div>
                  {renderText({ path: ["hero", "title"], value: data.hero.title, as: "p", className: "max-w-3xl text-lg leading-8 text-[#4a413b] sm:text-[1.35rem]", multiline: true })}
                  {renderText({ path: ["hero", "intro"], value: data.hero.intro, as: "p", className: "max-w-3xl text-sm leading-8 text-[var(--muted)] sm:text-base", multiline: true })}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <EditableLinkButton href={data.hero.socialsUrl} editable={editable} onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "socialsUrl"], nextValue) : undefined} variant="primary" accentColor={accent} editLabel="Work link">
                    {renderText({ path: ["hero", "socialsLabel"], value: data.hero.socialsLabel, as: "span" })}
                  </EditableLinkButton>
                  <EditableLinkButton href={data.hero.resumeUrl} editable={editable} onHrefSave={onTextEdit ? (nextValue) => onTextEdit(["hero", "resumeUrl"], nextValue) : undefined} variant="secondary" accentColor={accent} editLabel="Resume link">
                    {renderText({ path: ["hero", "resumeLabel"], value: data.hero.resumeLabel, as: "span" })}
                  </EditableLinkButton>
                </div>
                <div className="mt-7 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="relative rounded-[28px] border border-[#d8ccb8] bg-[#fffaf3] p-5 shadow-[0_14px_28px_rgba(75,65,53,0.08)]">
                    <Thumbtack className="left-5 top-[-7px]" tone="brass" />
                    <div className="pointer-events-none absolute right-5 top-[-10px] rounded-[10px] border border-[#cfb39f] bg-[#f3dfcf] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a5d50]">{heroAside.spotlightLabel}</div>
                    {renderText({ path: ["heroAside", "spotlightTitle"], value: heroAside.spotlightTitle, as: "h3", className: "font-serif text-[1.8rem] tracking-[-0.05em] text-[#302924]", multiline: true })}
                    {renderText({ path: ["heroAside", "spotlightBody"], value: heroAside.spotlightBody, as: "p", className: "mt-3 text-sm leading-7 text-[var(--muted)]", multiline: true })}
                  </div>
                  <div className="relative rounded-[28px] border border-[#d7cab5] bg-[#f2e6d4] p-5 shadow-[0_14px_28px_rgba(75,65,53,0.08)]">
                    <MaskingTape className="right-6 top-[-11px] h-6 w-16 -rotate-[12deg]" tone="beige" />
                    {renderText({ path: ["templateLabels", "quickFactsLabel"], value: labels.quickFactsLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                    <div className="mt-4 space-y-3 text-sm leading-7 text-[#5d544d]">
                      <div>
                        {renderText({ path: ["templateLabels", "locationLabel"], value: labels.locationLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[#877768]" })}
                        {renderText({ path: ["about", "location"], value: data.about.location, as: "p", className: "mt-1 text-sm font-medium text-[#3e362f]" })}
                      </div>
                      <div>
                        {renderText({ path: ["templateLabels", "availabilityLabel"], value: labels.availabilityLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[#877768]" })}
                        {renderText({ path: ["about", "availability"], value: data.about.availability, as: "p", className: "mt-1 text-sm leading-7 text-[#5f564f]", multiline: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-[30px] border border-[#d8ccb8] bg-[linear-gradient(180deg,#f8f1e5_0%,#f1e4d0_100%)] p-3 shadow-[0_18px_34px_rgba(75,65,53,0.1)]">
                  <div className="pointer-events-none absolute left-5 top-4 rounded-full border border-[#c7b199] bg-[#fff9f0] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7f6c5d]">photo</div>
                  <div className="pointer-events-none absolute right-6 top-[-12px] h-9 w-9 rotate-12 rounded-[8px] border border-[#9a948d] bg-[#edf0e7]" />
                  <PaperClip className="right-12 top-[-16px] rotate-[10deg]" />
                  <Thumbtack className="left-8 top-[-8px]" tone="sage" />
                  {renderImage(["hero", "profileImage"], data.hero.profileImage, `${data.hero.name} profile image`, "min-h-[360px]")}
                </div>
                <div className="relative rounded-[28px] border border-[#d9ccb9] bg-[#fff9f1] p-5 shadow-[0_14px_28px_rgba(75,65,53,0.08)]">
                  <div className="pointer-events-none absolute right-4 top-[-12px] rounded-[10px] border border-[#b98d7d] bg-[#efd1c8] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a5d50]">stamp</div>
                  <MaskingTape className="left-8 top-[-12px] h-7 w-20 -rotate-[7deg]" tone="cream" />
                  {renderText({ path: ["heroAside", "detailLabel"], value: heroAside.detailLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                  <div className="mt-4 grid gap-3">
                    {heroAside.highlightItems.map((item, index) => (
                      <div key={`papertrail-note-${index}`} className={`relative rounded-[20px] border border-[#ddd0be] px-4 py-3 text-sm leading-7 text-[#5a514b] shadow-[0_10px_18px_rgba(88,73,57,0.05)] ${noteCardTones[index % noteCardTones.length]}`}>
                        <PenStroke className="bottom-3 right-5 w-10 -rotate-[12deg]" tone={index % 2 === 0 ? "sage" : "ink"} />
                        {renderText({ path: ["heroAside", "highlightItems", index], value: item, as: "span" })}
                      </div>
                    ))}
                  </div>
                  <p className="pointer-events-none mt-4 text-right text-[1.25rem] leading-none text-[#8c6b5d]" style={handwritingStyle}>notes from the build</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative isolate rounded-[30px] border border-[#d8ccb8] bg-[#fffaf3] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
              <div className="pointer-events-none absolute inset-x-4 bottom-[-10px] top-4 -z-10 rounded-[28px] border border-[#dfd3c2] bg-[#f5eee4]/80" />
              <div className="pointer-events-none absolute left-6 top-[-12px] rounded-[10px] border border-[#a9b599] bg-[#e8efe2] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#657357]">note</div>
              <Thumbtack className="right-8 top-[-8px]" tone="rose" />
              <div>
                <div className="relative inline-block pr-8">
                  {renderText({ path: ["about", "heading"], value: data.about.heading, as: "h3", className: "font-serif text-4xl tracking-[-0.05em] text-[#302924]" })}
                  <PenStroke className="bottom-1 left-1 w-[72%] -rotate-[1deg]" tone="sage" />
                </div>
                {renderText({ path: ["about", "body"], value: data.about.body, as: "p", className: "mt-4 text-sm leading-8 text-[var(--muted)] sm:text-base", multiline: true })}
              </div>
            </div>
            <div className="space-y-5">
              <div className="relative rounded-[28px] border border-[#d8ccb9] bg-[#f2e7d7] p-5 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
                <div className="pointer-events-none absolute right-5 top-[-12px] rounded-[10px] border border-[#8094ad] bg-[#dfe8ef] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#566981]">ref</div>
                <PaperClip className="left-5 top-[-16px] -rotate-[7deg]" />
                {renderText({ path: ["templateLabels", "socialLinksLabel"], value: labels.socialLinksLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                <div className="mt-4 grid gap-3">
                  {data.socialLinks.map((link, index) => (
                    <div key={link.id} className="rounded-[20px] border border-[#d9ccb8] bg-[#fffaf2] p-4">
                      {renderText({ path: ["socialLinks", index, "label"], value: link.label, as: "p", className: "text-base font-semibold text-[#3a332c]" })}
                      {renderText({ path: ["socialLinks", index, "url"], value: link.url, as: "p", className: "mt-2 text-sm leading-7 text-[#6b625c]" })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-[28px] border border-[#d8ccb8] bg-[#fff7ec] p-5 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
                <MaskingTape className="right-6 top-[-11px] h-6 w-14 rotate-[10deg]" tone="rose" />
                {renderText({ path: ["templateLabels", "aboutSkillsLabel"], value: labels.aboutSkillsLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                {renderText({ path: ["heroAside", "toolkitLabel"], value: heroAside.toolkitLabel, as: "h4", className: "mt-3 font-serif text-2xl tracking-[-0.04em] text-[#302924]" })}
                {renderText({ path: ["heroAside", "toolkitBody"], value: heroAside.toolkitBody, as: "p", className: "mt-3 text-sm leading-7 text-[var(--muted)]", multiline: true })}
              </div>
            </div>
          </section>

          <section className="relative isolate rounded-[30px] border border-[#d8ccb8] bg-[#fbf7f1] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
            <div className="pointer-events-none absolute inset-x-4 bottom-[-10px] top-5 -z-10 rounded-[28px] border border-[#ded2c1] bg-[#f5eee3]/80" />
            <div className="pointer-events-none absolute inset-x-6 bottom-[-18px] top-8 -z-20 rounded-[26px] border border-[#e6dbc9] bg-[#eee2d0]/72" />
            <Thumbtack className="left-7 top-[-8px]" tone="brass" />
            <MaskingTape className="right-16 top-[-12px] h-7 w-20 rotate-[8deg]" tone="cream" />
            <div className="pointer-events-none absolute right-6 top-5 rounded-[12px] border border-[#ccb6a3] bg-[#f6ead8]/92 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a6b5b] shadow-[0_10px_18px_rgba(88,73,57,0.06)]">
              case files
            </div>
            <div>
              {renderText({ path: ["templateLabels", "projectsLabel"], value: labels.projectsLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
              <div className="relative mt-2 inline-block max-w-3xl pr-8">
                {renderText({ path: ["templateLabels", "projectsTitle"], value: labels.projectsTitle, as: "h3", className: "max-w-3xl font-serif text-4xl tracking-[-0.05em] text-[#302924]", multiline: true })}
                <PenStroke className="bottom-1 left-1 w-[58%] rotate-[1deg]" tone="rose" />
              </div>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {data.projects.map((project, index) => (
                <article key={project.id} className="relative overflow-visible rounded-[28px] border border-[#d8ccb8] bg-[#fffaf2] shadow-[0_16px_30px_rgba(75,65,53,0.07)]" style={{ transform: `rotate(${index % 2 === 0 ? -0.8 : 0.8}deg)` }}>
                  <div className="pointer-events-none absolute inset-x-3 bottom-[-10px] top-4 -z-10 rounded-[26px] border border-[#e0d5c5] bg-[#f3ebde]/80" />
                  <div className="pointer-events-none absolute left-5 top-4 rounded-[10px] border border-[#c9b39b] bg-[#efe2cf] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8d755f]">file {String(index + 1).padStart(2, "0")}</div>
                  <div className="pointer-events-none absolute right-5 top-[-10px] h-10 w-5 rounded-b-[10px] rounded-t-[4px] border border-[#8c8882] bg-[#ece9e2]" />
                  <PaperClip className="right-10 top-[-16px] rotate-[9deg]" />
                  <Thumbtack className="left-6 top-[-8px]" tone={index === 1 ? "sage" : index === 2 ? "ink" : "rose"} />
                  <MaskingTape className={`top-[-12px] h-7 w-16 ${index === 1 ? "right-20 -rotate-[8deg]" : "left-20 rotate-[9deg]"}`} tone={index === 2 ? "rose" : "cream"} />
                  <div className="p-3 pt-10">{renderImage(["projects", index, "image"], project.image, `${project.name} preview`, "min-h-[220px]")}</div>
                  <div className="space-y-4 px-5 pb-5">
                    <div className="relative inline-block pr-6">
                      {renderText({ path: ["projects", index, "name"], value: project.name, as: "h4", className: "font-serif text-[1.8rem] tracking-[-0.05em] text-[#302924]" })}
                      <PenStroke className="bottom-0 left-0 w-[75%] -rotate-[1deg]" tone={index === 1 ? "sage" : "ink"} />
                    </div>
                    {renderText({ path: ["projects", index, "summary"], value: project.summary, as: "p", className: "text-sm leading-7 text-[var(--muted)]", multiline: true })}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={`${project.id}-${tagIndex}`} className="rounded-[10px] border border-dashed px-3 py-1 text-xs font-medium text-[#564d46] shadow-[inset_0_-1px_0_rgba(255,255,255,0.4)]" style={{ borderColor: withAlpha(accent, "34"), backgroundColor: withAlpha(accent, "12") }}>
                          {renderText({ path: ["projects", index, "tags", tagIndex], value: tag, as: "span" })}
                        </span>
                      ))}
                    </div>
                    <div className="relative rounded-[20px] border border-[#d9ccb8] bg-[#f4ecdf] px-4 py-3">
                      <PenStroke className="bottom-3 right-4 w-11 rotate-[8deg]" tone="rose" />
                      {renderText({ path: ["projects", index, "linkLabel"], value: project.linkLabel, as: "p", className: "text-sm font-semibold text-[var(--accent)]" })}
                      {renderText({ path: ["projects", index, "url"], value: project.url, as: "p", className: "mt-1 text-xs leading-6 text-[#7c7269]" })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <div className="relative isolate rounded-[30px] border border-[#d8ccb8] bg-[#fffaf2] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
              <div className="pointer-events-none absolute inset-x-4 bottom-[-10px] top-4 -z-10 rounded-[28px] border border-[#dfd2c2] bg-[#f5ede2]/80" />
              <Thumbtack className="left-7 top-[-7px]" tone="rose" />
              {renderText({ path: ["templateLabels", "experienceLabel"], value: labels.experienceLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
              <div className="mt-5 space-y-4">
                {data.experience.map((item, index) => (
                  <article key={item.id} className="relative rounded-[24px] border border-[#d8ccb8] bg-[#f5edde] p-5">
                    <span className="pointer-events-none absolute left-5 top-6 h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_rgba(141,93,79,0.12)]" />
                    <div className="pl-7">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          {renderText({ path: ["experience", index, "role"], value: item.role, as: "h4", className: "text-lg font-semibold text-[#332c26]" })}
                          {renderText({ path: ["experience", index, "company"], value: item.company, as: "p", className: "mt-1 text-sm text-[#5f564f]" })}
                        </div>
                        {renderText({ path: ["experience", index, "period"], value: item.period, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[#7d726a]" })}
                      </div>
                      {renderText({ path: ["experience", index, "summary"], value: item.summary, as: "p", className: "mt-3 text-sm leading-7 text-[var(--muted)]", multiline: true })}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="grid gap-6">
              <div className="relative rounded-[30px] border border-[#d8ccb8] bg-[#fffaf2] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
                <PaperClip className="right-6 top-[-16px] rotate-[10deg]" />
                {renderText({ path: ["templateLabels", "skillsLabel"], value: labels.skillsLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                <div className="mt-5 grid gap-4">
                  {data.skills.map((group, groupIndex) => (
                    <div key={group.id} className="rounded-[24px] border border-[#d8ccb8] bg-[#f7f0e4] p-4">
                      {renderText({ path: ["skills", groupIndex, "title"], value: group.title, as: "h4", className: "text-lg font-semibold text-[#342d27]" })}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item, itemIndex) => (
                          <span key={`${group.id}-${itemIndex}`} className="rounded-[10px] border border-dashed border-[#d2c4af] bg-[#fffaf2] px-3 py-1.5 text-sm text-[#5d544d]">
                            {renderText({ path: ["skills", groupIndex, "items", itemIndex], value: item, as: "span" })}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-[30px] border border-[#d8ccb8] bg-[#fffaf2] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
                <MaskingTape className="left-8 top-[-11px] h-6 w-16 -rotate-[7deg]" tone="beige" />
                {renderText({ path: ["templateLabels", "educationLabel"], value: labels.educationLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                <div className="mt-5 grid gap-4">
                  {data.education.map((item, index) => (
                    <article key={item.id} className="rounded-[24px] border border-[#d8ccb8] bg-[#f3eadc] p-4">
                      {renderText({ path: ["education", index, "school"], value: item.school, as: "h4", className: "text-lg font-semibold text-[#332c26]" })}
                      {renderText({ path: ["education", index, "degree"], value: item.degree, as: "p", className: "mt-2 text-sm leading-7 text-[#5f564f]", multiline: true })}
                      {renderText({ path: ["education", index, "period"], value: item.period, as: "p", className: "mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7d726a]" })}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative isolate rounded-[32px] border border-[#d7cab7] bg-[linear-gradient(135deg,#faf5ed_0%,#f1e7d6_100%)] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.08)]">
            <div className="pointer-events-none absolute inset-x-4 bottom-[-10px] top-4 -z-10 rounded-[30px] border border-[#ddd1c1] bg-[#f6efe5]/78" />
            <Thumbtack className="left-7 top-[-8px]" tone="brass" />
            <MaskingTape className="right-16 top-[-12px] h-7 w-20 -rotate-[8deg]" tone="rose" />
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex rounded-full border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">contact sheet</div>
                <div className="relative mt-4 inline-block max-w-3xl pr-8">
                  {renderText({ path: ["contact", "heading"], value: data.contact.heading, as: "h3", className: "max-w-3xl font-serif text-4xl tracking-[-0.05em] text-[#302924]", multiline: true })}
                  <PenStroke className="bottom-1 left-1 w-[52%] rotate-[0.5deg]" tone="ink" />
                </div>
                {renderText({ path: ["contact", "message"], value: data.contact.message, as: "p", className: "mt-4 max-w-3xl text-sm leading-8 text-[var(--muted)] sm:text-base", multiline: true })}
                <div className="pointer-events-none mt-4 flex items-center gap-3">
                  <span className="text-[1.3rem] leading-none text-[#8c6b5d]" style={handwritingStyle}>open to internships</span>
                  <span className="block h-[2px] w-12 rotate-[10deg] rounded-full bg-[#7f9279]/55" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative rounded-[24px] border border-[#d8ccb8] bg-[#fffaf2] p-4">
                  <PaperClip className="right-5 top-[-15px] rotate-[8deg]" />
                  {renderText({ path: ["contact", "ctaLabel"], value: data.contact.ctaLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                  {renderText({ path: ["contact", "email"], value: data.contact.email, as: "p", className: "mt-3 text-lg font-semibold text-[#332c26]" })}
                </div>
                <div className="relative rounded-[24px] border border-[#d8ccb8] bg-[#f2e7d7] p-4">
                  <MaskingTape className="left-6 top-[-11px] h-6 w-14 -rotate-[8deg]" tone="cream" />
                  {renderText({ path: ["templateLabels", "socialLinksLabel"], value: labels.socialLinksLabel, as: "p", className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]" })}
                  <div className="mt-3 grid gap-2">
                    {data.socialLinks.map((link, index) => (
                      <div key={`contact-${link.id}`} className="flex flex-col gap-1 rounded-[18px] border border-[#d8ccb8] bg-[#fffaf3] px-3 py-3">
                        {renderText({ path: ["socialLinks", index, "label"], value: link.label, as: "span", className: "text-sm font-semibold text-[#39322c]" })}
                        {renderText({ path: ["socialLinks", index, "url"], value: link.url, as: "span", className: "text-xs leading-6 text-[#6c625b]" })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="relative rounded-[30px] border border-[#d8ccb8] bg-[#fffaf2] p-6 shadow-[0_18px_34px_rgba(75,65,53,0.06)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {renderText({ path: ["footer", "note"], value: data.footer.note, as: "p", className: "max-w-4xl text-sm leading-7 text-[var(--muted)]", multiline: true })}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">{data.footer.watermark}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
