"use client";

import { useEffect, useRef, useState } from "react";
import { savePortfolioDraft } from "@/app/actions/portfolios";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import type { ColorPreset } from "@/lib/colorPresets";
import { downloadPortfolioZip } from "@/lib/exportZip";
import { PORTFOLIO_IMAGE_BUCKET, createPortfolioImageObjectPath } from "@/lib/portfolioImageStorage";
import { clonePortfolioData, findPortfolioBlobUrls } from "@/lib/portfolios";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getTemplateDefinition } from "@/lib/templates";
import { updateField } from "@/lib/updateField";
import type { PortfolioData } from "@/types/portfolio";

function revokeObjectUrls(source: Record<string, string>) {
  Object.values(source).forEach((url) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
}

export function EditorShell({
  portfolioId,
  selectedTemplateId,
  initialPortfolioData,
  initialDraftTitle,
  currentUserId,
  isSavedDraft = false,
}: {
  portfolioId?: string;
  selectedTemplateId?: string;
  initialPortfolioData?: PortfolioData;
  initialDraftTitle?: string;
  currentUserId?: string;
  isSavedDraft?: boolean;
}) {
  const templateDefinition = getTemplateDefinition(selectedTemplateId);
  const { metadata, defaultData, TemplateComponent, exportSupported, exportNote } = templateDefinition;
  const objectUrlsRef = useRef<Record<string, string>>({});
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => clonePortfolioData(initialPortfolioData ?? defaultData));
  const [isExporting, setIsExporting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [imageUploadStatus, setImageUploadStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [imageUploadMessage, setImageUploadMessage] = useState<string | null>(null);
  const [uploadingImageCount, setUploadingImageCount] = useState(0);
  const [draftTitle, setDraftTitle] = useState(initialDraftTitle ?? `${metadata.name} Draft`);
  const isUploadingImage = uploadingImageCount > 0;

  useEffect(() => {
    return () => {
      revokeObjectUrls(objectUrlsRef.current);
    };
  }, []);

  useEffect(() => {
    revokeObjectUrls(objectUrlsRef.current);
    objectUrlsRef.current = {};
    setPortfolio(clonePortfolioData(initialPortfolioData ?? defaultData));
    setIsExporting(false);
    setSaveStatus("idle");
    setSaveMessage(null);
    setImageUploadStatus("idle");
    setImageUploadMessage(null);
    setUploadingImageCount(0);
    setDraftTitle(initialDraftTitle ?? `${metadata.name} Draft`);
  }, [defaultData, initialDraftTitle, initialPortfolioData, metadata.name, metadata.id]);

  const markDraftChanged = () => {
    setSaveStatus((current) => (current === "saved" ? "idle" : current === "error" ? "idle" : current));
    setSaveMessage((current) => (current ? null : current));
  };

  const handleTextEdit = (path: Array<string | number>, value: string) => {
    markDraftChanged();
    setPortfolio((current) => updateField(current, path, value));
  };

  const handleImageEdit = async (path: Array<string | number>, file: File) => {
    const pathKey = path.join(".");

    if (!isSavedDraft || !portfolioId) {
      const objectUrl = URL.createObjectURL(file);
      const previousUrl = objectUrlsRef.current[pathKey];

      if (previousUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previousUrl);
      }

      markDraftChanged();
      objectUrlsRef.current[pathKey] = objectUrl;
      setPortfolio((current) => updateField(current, path, objectUrl));
      return;
    }

    if (!currentUserId) {
      setImageUploadStatus("error");
      setImageUploadMessage("Image upload is unavailable because the current user session could not be resolved.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const objectPath = createPortfolioImageObjectPath(currentUserId, portfolioId, path, file);

    markDraftChanged();
    setImageUploadStatus("uploading");
    setImageUploadMessage("Uploading image to Supabase Storage...");
    setUploadingImageCount((current) => current + 1);

    try {
      const { error: uploadError } = await supabase.storage.from(PORTFOLIO_IMAGE_BUCKET).upload(objectPath, file, {
        upsert: false,
        contentType: file.type || undefined,
      });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(PORTFOLIO_IMAGE_BUCKET).getPublicUrl(objectPath);

      if (!publicUrl) {
        throw new Error("Failed to generate a public URL for the uploaded image.");
      }

      markDraftChanged();
      setPortfolio((current) => updateField(current, path, publicUrl));
      setImageUploadStatus("idle");
      setImageUploadMessage(null);
    } catch (error) {
      setImageUploadStatus("error");
      setImageUploadMessage(
        error instanceof Error ? `Image upload failed: ${error.message}` : "Image upload failed. Please try again.",
      );
    } finally {
      setUploadingImageCount((current) => Math.max(0, current - 1));
    }
  };

  const handleAccentColorChange = (preset: ColorPreset) => {
    markDraftChanged();
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

  const handleSave = async () => {
    if (!isSavedDraft || !portfolioId) {
      return;
    }

    if (isUploadingImage) {
      setSaveStatus("error");
      setSaveMessage("Wait for image uploads to finish before saving.");
      return;
    }

    const blobUrls = findPortfolioBlobUrls(portfolio);

    if (blobUrls.length > 0) {
      setSaveStatus("error");
      setSaveMessage("Local image previews cannot be saved yet. Remove replaced local images before saving.");
      return;
    }

    setSaveStatus("saving");
    setSaveMessage(null);

    const result = await savePortfolioDraft(portfolioId, portfolio, draftTitle);

    if (result.status === "error") {
      setSaveStatus("error");
      setSaveMessage(result.message);
      return;
    }

    setDraftTitle(result.title);
    setSaveStatus("saved");
    setSaveMessage("Changes saved to Supabase.");
  };

  return (
    <main className="shell py-8">
      <div className="grid gap-6">
        <EditorToolbar
          templateName={metadata.name}
          accentColor={portfolio.theme.accentColor}
          onAccentColorChange={handleAccentColorChange}
          onSave={isSavedDraft ? handleSave : undefined}
          onExport={handleExport}
          saveStatus={saveStatus}
          saveMessage={saveMessage}
          isUploadingImage={isUploadingImage}
          imageUploadStatus={imageUploadStatus}
          imageUploadMessage={imageUploadMessage}
          mode={isSavedDraft ? "saved" : "local"}
          isExporting={isExporting}
          exportSupported={exportSupported}
          exportNote={exportNote}
        />

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="panel h-fit p-5 xl:sticky xl:top-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/45">Editing guide</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-black/65">
              {isSavedDraft ? (
                <p>This draft loads from Supabase, supports manual save, and uploads replaced images to Storage.</p>
              ) : null}
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
