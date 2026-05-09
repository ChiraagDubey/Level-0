"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  createImportedPortfolioDraftAction,
  type CreateImportedDraftActionState,
} from "@/app/actions/portfolios";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import type { TemplateGalleryEntry } from "@/lib/templates";
import type {
  ImportedPortfolioPreviewData,
  ResumeImportApiResponse,
  ResumeImportExtractedData,
} from "@/types/import";

const INITIAL_ACTION_STATE: CreateImportedDraftActionState = {
  status: "idle",
  message: null,
};

function getDefaultTemplateId(templates: TemplateGalleryEntry[]) {
  return templates.find((template) => template.id === "simple-starter")?.id ?? templates[0]?.id ?? "";
}

function pushUniqueWarning(list: string[], message: string) {
  if (!list.includes(message)) {
    list.push(message);
  }
}

function deriveResumeWarnings(data: ResumeImportExtractedData) {
  const warnings = [...data.warnings];

  if (data.socialLinks.length === 0) {
    pushUniqueWarning(warnings, "No recognizable social profile links were detected.");
  }

  if (data.projects.length === 0) {
    pushUniqueWarning(warnings, "Could not confidently detect projects.");
  }

  return warnings;
}

function mapResumeImportToPreview(data: ResumeImportExtractedData): ImportedPortfolioPreviewData {
  return {
    ...data,
    warnings: deriveResumeWarnings(data),
  };
}

function CreateImportedDraftButton() {
  const { pending } = useFormStatus();
  const [isLocked, setIsLocked] = useState(false);
  const lockTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pending) {
      setIsLocked(false);
    }
  }, [pending]);

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current !== null) {
        window.clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  const isDisabled = pending || isLocked;

  return (
    <button
      type="submit"
      onClick={() => {
        if (isDisabled) {
          return;
        }

        lockTimeoutRef.current = window.setTimeout(() => {
          setIsLocked(true);
          lockTimeoutRef.current = null;
        }, 0);
      }}
      disabled={isDisabled}
      className="inline-flex w-full items-center justify-center rounded-full border border-secondary bg-secondary px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-70"
    >
      {isDisabled ? "Creating draft..." : "Create Draft"}
    </button>
  );
}

export function ImportWebsiteCard({
  isSignedIn,
  templates,
}: {
  isSignedIn: boolean;
  templates: TemplateGalleryEntry[];
}) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileLabel, setResumeFileLabel] = useState("");
  const [scanState, setScanState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [scanError, setScanError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<ImportedPortfolioPreviewData | null>(null);
  const [rawImportData, setRawImportData] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState(getDefaultTemplateId(templates));
  const [createDraftState, createDraftAction] = useActionState(createImportedPortfolioDraftAction, INITIAL_ACTION_STATE);
  const signInHref = `/?redirect=${encodeURIComponent("/dashboard")}`;
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) ?? templates[0] ?? null;
  const isBusy = scanState === "loading";
  const warnings = previewData?.warnings ?? [];

  const socialUrls = new Set((previewData?.socialLinks ?? []).map((item) => item.url.toLowerCase()));
  const nonSocialLinks = previewData
    ? previewData.links.filter((link, index, links) => {
        const normalized = link.toLowerCase();
        return !socialUrls.has(normalized) && links.findIndex((entry) => entry.toLowerCase() === normalized) === index;
      })
    : [];

  function resetPreview() {
    setScanState("idle");
    setScanError(null);
    setPreviewData(null);
    setRawImportData("");
  }

  async function handleResumeScan() {
    if (!isSignedIn || isBusy) {
      return;
    }

    if (!resumeFile) {
      resetPreview();
      setScanState("error");
      setScanError("Choose a PDF resume to import.");
      return;
    }

    const isPdf = resumeFile.type === "application/pdf" || resumeFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      resetPreview();
      setScanState("error");
      setScanError("Only PDF resume files are supported right now.");
      return;
    }

    setScanState("loading");
    setScanError(null);
    setPreviewData(null);
    setRawImportData("");

    try {
      const formData = new FormData();
      formData.set("file", resumeFile);

      const response = await fetch("/api/import/resume", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as ResumeImportApiResponse;

      if (result.status === "error") {
        setScanState("error");
        setScanError(result.message);
        return;
      }

      setPreviewData(mapResumeImportToPreview(result.data));
      setRawImportData(JSON.stringify(result.data));
      setScanState("success");
      setSelectedTemplateId((currentValue) =>
        templates.some((template) => template.id === currentValue) ? currentValue : getDefaultTemplateId(templates),
      );
    } catch {
      setScanState("error");
      setScanError("Could not import that resume right now.");
    }
  }

  const previewSourceValue = previewData?.sourceFileName || "Unnamed resume";
  const previewKey = previewData ? `resume:${previewData.sourceFileName}:${selectedTemplateId}` : selectedTemplateId;

  return (
    <section className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 sm:p-5">
      <div className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">Build from your resume</p>
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-on-background">PDF import is coming soon.</h3>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-outline-variant bg-white px-4 py-6 sm:px-5">
        <div className="max-w-2xl space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">Coming soon</p>
          <p className="text-sm leading-7 text-on-surface-variant">
            Resume PDF upload and auto-import are temporarily hidden while the experience is being revised.
          </p>
          <p className="text-sm leading-7 text-on-surface-variant">
            The rest of the dashboard stays available. No changes were made to the underlying PDF import/parsing code.
          </p>
        </div>
      </div>
    </section>
  );
}
