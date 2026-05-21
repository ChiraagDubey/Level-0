import "server-only";

import path from "node:path";
import { pathToFileURL } from "node:url";
import { ResumeImportError } from "@/types/import";

const MIN_ALPHA_CHARACTERS = 40;
const MIN_TEXT_LENGTH = 80;

function normalizeExtractedText(value: string) {
  return value
    .replace(/\r/g, "")
    .replace(/\u0000/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export interface ExtractResumeTextResult {
  text: string;
  pageCount: number;
}

interface PdfExtractionAttempt {
  label: string;
  options: Record<string, unknown>;
}

function getStandardFontDataUrl() {
  const standardFontsPath = path.join(process.cwd(), "node_modules", "pdfjs-dist", "standard_fonts");
  const fileUrl = pathToFileURL(standardFontsPath).href;
  return fileUrl.endsWith("/") ? fileUrl : `${fileUrl}/`;
}

function logResumeImportDebug(event: string, details: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.error("[resume-import]", event, details);
}

async function extractResumeTextWithAttempt(
  pdfData: Uint8Array,
  attempt: PdfExtractionAttempt,
): Promise<ExtractResumeTextResult> {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = getDocument({
    data: pdfData,
    useWorkerFetch: false,
    stopAtErrors: false,
    disableFontFace: true,
    ...attempt.options,
  });

  let document: Awaited<typeof loadingTask.promise> | null = null;

  try {
    document = await loadingTask.promise;
    const pageTexts: string[] = [];

    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      try {
        const page = await document.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ("str" in item && typeof item.str === "string" ? item.str : ""))
          .join(" ")
          .replace(/[ \t]{2,}/g, " ")
          .trim();

        if (pageText) {
          pageTexts.push(pageText);
        }
      } catch (error) {
        logResumeImportDebug("page-text-extraction-failed", {
          attempt: attempt.label,
          fileBytes: pdfData.byteLength,
          pageNumber,
          errorName: error instanceof Error ? error.name : "UnknownError",
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const text = normalizeExtractedText(pageTexts.join("\n\n"));
    const alphaCharacters = (text.match(/[A-Za-z]/g) ?? []).length;

    if (text.length < MIN_TEXT_LENGTH || alphaCharacters < MIN_ALPHA_CHARACTERS) {
      throw new ResumeImportError(
        "That PDF could not be read as text. Scanned or image-only resumes are not supported yet.",
        422,
      );
    }

    return {
      text,
      pageCount: document.numPages,
    };
  } finally {
    if (document) {
      try {
        await document.destroy();
      } catch (error) {
        logResumeImportDebug("pdf-destroy-failed", {
          attempt: attempt.label,
          fileBytes: pdfData.byteLength,
          errorName: error instanceof Error ? error.name : "UnknownError",
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      }
    } else {
      try {
        await loadingTask.destroy();
      } catch (error) {
        logResumeImportDebug("pdf-loading-task-destroy-failed", {
          attempt: attempt.label,
          fileBytes: pdfData.byteLength,
          errorName: error instanceof Error ? error.name : "UnknownError",
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }
}

export async function extractResumeText(buffer: ArrayBuffer): Promise<ExtractResumeTextResult> {
  const pdfData = new Uint8Array(buffer);
  const attempts: PdfExtractionAttempt[] = [
    {
      label: "standard-fonts",
      options: {
        useSystemFonts: true,
        standardFontDataUrl: getStandardFontDataUrl(),
      },
    },
    {
      label: "minimal",
      options: {},
    },
  ];
  let lastResumeImportError: ResumeImportError | null = null;
  let lastError: unknown = null;

  for (const attempt of attempts) {
    try {
      return await extractResumeTextWithAttempt(pdfData, attempt);
    } catch (error) {
      if (error instanceof ResumeImportError) {
        lastResumeImportError = error;
        continue;
      }

      lastError = error;
      logResumeImportDebug("pdf-text-extraction-attempt-failed", {
        attempt: attempt.label,
        fileBytes: pdfData.byteLength,
        errorName: error instanceof Error ? error.name : "UnknownError",
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }
  }

  if (lastResumeImportError) {
    throw lastResumeImportError;
  }

  logResumeImportDebug("pdf-text-extraction-failed", {
    fileBytes: pdfData.byteLength,
    errorName: lastError instanceof Error ? lastError.name : "UnknownError",
    errorMessage: lastError instanceof Error ? lastError.message : String(lastError),
  });

  throw new ResumeImportError("That PDF could not be read or parsed.", 422);
}