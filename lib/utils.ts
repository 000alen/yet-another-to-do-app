import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(input: string): string {
  if (!input) return "";

  // Normalize Unicode characters
  const normalized = input.normalize("NFKD")
    // Remove accents/diacritics
    .replace(/[\u0300-\u036f]/g, "")
    // Convert to lowercase
    .toLowerCase()
    // Trim whitespace
    .trim()
    // Replace non-alphanumeric characters with hyphens
    .replace(/[^a-z0-9]+/g, "-")
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "")
    // Limit length to prevent extremely long slugs
    .slice(0, 128);

  return normalized;
}

export function randomId() {
  return Math.random().toString(36).slice(2);
}

export function getBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_APP_DOMAIN &&
      !process.env.NEXT_PUBLIC_APP_DOMAIN.includes("localhost")
      ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://localhost:3000";

  return url;
}