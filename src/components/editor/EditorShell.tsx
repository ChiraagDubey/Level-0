"use client";

import { useEffect, useRef, useState } from "react";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import type { ColorPreset } from "@/lib/colorPresets";
import { downloadPortfolioZip } from "@/lib/exportZip";
import { getTemplateDefinition } from "@/lib/templates";
import { updateField } from "@/lib/updateField";
import type { PortfolioData } from "@/types/portfolio";

function clonePortfolioData(source: PortfolioData) {
  return JSON.parse(JSON.stringify(source)) as PortfolioData;
}

function revokeObjectUrls(source: Record<string, string>) {
  Object.values(source).forEach((url) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
}

export function EditorShell({ selectedTemplateId }: { selectedTemplateId?: string }) {
  const templateDefinition = getTemplateDefinition(selectedTemplateId);
  const { metadata, defaultData, TemplateComponent, exportSupported, exportNote } = templateDefinition;
  const objectUrlsRef = useRef<Record<string, string>>({});
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => clonePortfolioData(defaultData));
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    return () => {
      revokeObjectUrls(objectUrlsRef.current);
    };
  }, []);

  useEffect(() => {
    revokeObjectUrls(objectUrlsRef.current);
    objectUrlsRef.current = {};
    setPortfolio(clonePortfolioData(defaultData));
    setIsExporting(false);
  }, [defaultData, metadata.id]);

  const handleTextEdit = (path: Array<string | number>, value: string) => {
    setPortfolio((current) => updateField(current, path, value));
  };

  const handleImageEdit = (path: Array<string | number>, value: string) => {
    const pathKey = path.join(".");
    const previousUrl = objectUrlsRef.current[pathKey];

    if (previousUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previousUrl);
    }

    objectUrlsRef.current[pathKey] = value;
    setPortfolio((current) => updateField(current, path, value));
  };

  const handleAccentColorChange = (preset: ColorPreset) => {
    setPortfolio((current) => {
      const withAccentColor = updateField(current, ["theme", "accentColor"], preset.value);
      return updateField(withAccentColor, ["theme", "accentName"], preset.name);
    });
  };

  const handleExport = async () => {
    if (!exportSupported) {
      return;
    }

    try {
      setIsExporting(true);
      await downloadPortfolioZip(portfolio, metadata.id);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="shell py-8">
      <div className="grid gap-6">
        <EditorToolbar
          templateName={metadata.name}
          accentColor={portfolio.theme.accentColor}
          onAccentColorChange={handleAccentColorChange}
          onExport={handleExport}
          isExporting={isExporting}
          exportSupported={exportSupported}
          exportNote={exportNote}
        />

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="panel h-fit p-5 xl:sticky xl:top-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Editing guide</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-black/65">
              <p>Click any mapped text in the preview to edit it with an input or textarea.</p>
              <p>Click an image to replace it with a local PNG, JPG, JPEG, or WEBP file.</p>
              <p>Hover the Resume and Socials buttons to edit their destination links without leaving the preview.</p>
              <p>Accent color presets update buttons, highlights, badges, borders, and the contact panel.</p>
              <p>The preview footer keeps the free-tier watermark: Built with LEVEL 0.</p>
            </div>
          </aside>

          <section className="min-w-0">
            <TemplateComponent data={portfolio} editable onTextEdit={handleTextEdit} onImageEdit={handleImageEdit} />
          </section>
        </div>
      </div>
    </main>
  );
}
