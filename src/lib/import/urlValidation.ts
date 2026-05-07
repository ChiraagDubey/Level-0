import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { WebsiteImportError } from "@/types/websiteImport";

const BLOCKED_HOSTNAMES = new Set(["localhost", "localhost.localdomain"]);
const BLOCKED_HOST_SUFFIXES = [".local", ".localdomain", ".internal", ".home", ".lan"];

function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase().replace(/\.$/, "");
}

function isBlockedHostname(hostname: string) {
  return BLOCKED_HOSTNAMES.has(hostname) || BLOCKED_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
}

function isPrivateIpv4Address(address: string) {
  const parts = address.split(".").map((segment) => Number(segment));

  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return true;
  }

  const [a, b] = parts;

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19))
  );
}

function isPrivateIpv6Address(address: string) {
  const normalized = address.toLowerCase();

  if (normalized === "::" || normalized === "::1") {
    return true;
  }

  if (normalized.startsWith("::ffff:")) {
    return isPrivateIpv4Address(normalized.slice(7));
  }

  return (
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb") ||
    normalized.startsWith("fec") ||
    normalized.startsWith("fed") ||
    normalized.startsWith("fee") ||
    normalized.startsWith("fef")
  );
}

export function isPrivateOrInternalIpAddress(address: string) {
  const ipVersion = isIP(address);

  if (ipVersion === 4) {
    return isPrivateIpv4Address(address);
  }

  if (ipVersion === 6) {
    return isPrivateIpv6Address(address);
  }

  return true;
}

export function validateWebsiteImportUrl(rawUrl: string) {
  const trimmedUrl = rawUrl.trim();

  if (!trimmedUrl) {
    throw new WebsiteImportError("Enter a website URL to import.", 400);
  }

  let url: URL;

  try {
    url = new URL(trimmedUrl);
  } catch {
    throw new WebsiteImportError("Enter a valid public website URL.", 400);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new WebsiteImportError("Only public http:// or https:// URLs are allowed.", 400);
  }

  if (url.username || url.password) {
    throw new WebsiteImportError("URLs with embedded credentials are not allowed.", 400);
  }

  const hostname = normalizeHostname(url.hostname);

  if (!hostname) {
    throw new WebsiteImportError("Enter a valid public website URL.", 400);
  }

  if (isBlockedHostname(hostname)) {
    throw new WebsiteImportError("Local and internal network URLs are not allowed.", 400);
  }

  const ipVersion = isIP(hostname);

  if (!ipVersion && !hostname.includes(".")) {
    throw new WebsiteImportError("Local and internal network URLs are not allowed.", 400);
  }

  if (ipVersion && isPrivateOrInternalIpAddress(hostname)) {
    throw new WebsiteImportError("Private, loopback, and internal IP addresses are not allowed.", 400);
  }

  return url;
}

export async function assertPublicResolvableUrl(rawUrl: string | URL) {
  const url = rawUrl instanceof URL ? validateWebsiteImportUrl(rawUrl.toString()) : validateWebsiteImportUrl(rawUrl);
  const hostname = normalizeHostname(url.hostname);

  if (isIP(hostname)) {
    return url;
  }

  let addresses: Awaited<ReturnType<typeof lookup>>;

  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new WebsiteImportError("Could not resolve that website host.", 400);
  }

  if (!addresses.length) {
    throw new WebsiteImportError("Could not resolve that website host.", 400);
  }

  if (addresses.some((entry) => isPrivateOrInternalIpAddress(entry.address))) {
    throw new WebsiteImportError("Private, loopback, and internal network hosts are not allowed.", 400);
  }

  return url;
}
