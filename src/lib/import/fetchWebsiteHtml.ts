import { assertPublicResolvableUrl } from "@/lib/import/urlValidation";
import { WebsiteImportError } from "@/types/websiteImport";

const MAX_REDIRECTS = 5;
const REQUEST_TIMEOUT_MS = 8000;
const MAX_RESPONSE_BYTES = 1024 * 1024;

function isRedirectStatus(status: number) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

function isAllowedHtmlContentType(contentType: string) {
  const normalized = contentType.toLowerCase();
  return normalized.includes("text/html") || normalized.includes("application/xhtml+xml");
}

async function readResponseBodyWithLimit(response: Response, maxBytes: number) {
  if (!response.body) {
    throw new WebsiteImportError("The website returned an empty response.", 502);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let html = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      html += decoder.decode();
      return html;
    }

    totalBytes += value.byteLength;

    if (totalBytes > maxBytes) {
      throw new WebsiteImportError("That website is too large to import safely right now.", 413);
    }

    html += decoder.decode(value, { stream: true });
  }
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new WebsiteImportError("The website took too long to respond.", 504);
    }

    throw new WebsiteImportError("Could not fetch that website right now.", 502);
  } finally {
    clearTimeout(timeout);
  }
}

export interface FetchWebsiteHtmlResult {
  finalUrl: string;
  html: string;
}

export async function fetchWebsiteHtml(sourceUrl: string): Promise<FetchWebsiteHtmlResult> {
  let currentUrl = await assertPublicResolvableUrl(sourceUrl);

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const response = await fetchWithTimeout(currentUrl.toString());

    if (isRedirectStatus(response.status)) {
      const location = response.headers.get("location");

      if (!location) {
        throw new WebsiteImportError("The website returned an invalid redirect.", 502);
      }

      currentUrl = await assertPublicResolvableUrl(new URL(location, currentUrl).toString());
      continue;
    }

    if (!response.ok) {
      throw new WebsiteImportError(`The website could not be imported because it returned ${response.status}.`, 502);
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!isAllowedHtmlContentType(contentType)) {
      throw new WebsiteImportError("That URL did not return an HTML page.", 415);
    }

    const contentLengthHeader = response.headers.get("content-length");
    const contentLength = contentLengthHeader ? Number(contentLengthHeader) : Number.NaN;

    if (!Number.isNaN(contentLength) && contentLength > MAX_RESPONSE_BYTES) {
      throw new WebsiteImportError("That website is too large to import safely right now.", 413);
    }

    const html = await readResponseBodyWithLimit(response, MAX_RESPONSE_BYTES);

    return {
      finalUrl: currentUrl.toString(),
      html,
    };
  }

  throw new WebsiteImportError("The website redirected too many times.", 508);
}
