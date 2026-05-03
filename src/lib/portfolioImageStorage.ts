export const PORTFOLIO_IMAGE_BUCKET = "portfolio-images";

function toKebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

function sanitizeStorageSegment(segment: string | number) {
  if (typeof segment === "number") {
    return String(segment);
  }

  const normalized = toKebabCase(segment);
  return normalized.length > 0 ? normalized : "field";
}

function inferFileExtension(file: File) {
  const fileNameParts = file.name.split(".");
  const explicitExtension = fileNameParts.length > 1 ? fileNameParts.at(-1)?.toLowerCase() : null;

  if (explicitExtension && /^[a-z0-9]+$/.test(explicitExtension)) {
    return explicitExtension;
  }

  if (file.type === "image/jpeg") {
    return "jpg";
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  return "bin";
}

function createRandomSuffix() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  }

  return Math.random().toString(36).slice(2, 14);
}

export function createPortfolioImageObjectPath(
  userId: string,
  portfolioId: string,
  fieldPath: Array<string | number>,
  file: File,
) {
  const safeFieldPath = fieldPath.map((segment) => sanitizeStorageSegment(segment)).join("/");
  const fileName = `${Date.now()}-${createRandomSuffix()}.${inferFileExtension(file)}`;

  return `${userId}/${portfolioId}/${safeFieldPath}/${fileName}`;
}
