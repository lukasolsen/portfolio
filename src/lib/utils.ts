import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLinkExternal(url: string) {
  try {
    const linkUrl = new URL(url, window.location.href);
    return linkUrl.origin !== window.location.origin;
  } catch {
    return false;
  }
}
