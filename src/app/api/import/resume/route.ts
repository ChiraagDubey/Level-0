import { NextResponse } from "next/server";
import { extractResumeText } from "@/lib/import/resume/extractResumeText";
import { parseResumeContent } from "@/lib/import/resume/parseResumeContent";
import {
  ResumeImportError,
  type ResumeImportApiResponse,
} from "@/types/import";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function createErrorResponse(message: string, status: number) {
  return NextResponse.json<ResumeImportApiResponse>(
    {
      status: "error",
      message,
    },
    { status },
  );
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return createErrorResponse("Upload a PDF file to import.", 400);
    }

    if (!isPdfFile(file)) {
      return createErrorResponse("Only PDF resume files are supported right now.", 400);
    }

    if (file.size <= 0) {
      return createErrorResponse("The uploaded PDF is empty.", 400);
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return createErrorResponse("That PDF is too large to import. Use a file smaller than 5 MB.", 413);
    }

    const buffer = await file.arrayBuffer();
    const { text } = await extractResumeText(buffer);
    const data = parseResumeContent(text, file.name);

    return NextResponse.json<ResumeImportApiResponse>({
      status: "success",
      data,
    });
  } catch (error) {
    if (error instanceof ResumeImportError) {
      return createErrorResponse(error.message, error.statusCode);
    }

    return createErrorResponse("Could not import that resume right now.", 500);
  }
}
