/**
 * Platform configuration constants.
 * 
 * IMPORTANT: Platform keys MUST match the Flutter SocialPlatform enum names exactly,
 * since both apps share the same Supabase database.
 * 
 * Source of truth: linkmeup_app/lib/domain/entities/social_link_entity.dart
 */

import type { SocialPlatform } from "@/types/profile";

export interface PlatformConfig {
  key: SocialPlatform;
  displayName: string;
  baseUrl: string | null;
  color: string;
  ctaLabel: string;
  handleHint: string;
}

export const PLATFORMS: Record<SocialPlatform, PlatformConfig> = {
  instagram: {
    key: "instagram",
    displayName: "Instagram",
    baseUrl: "https://instagram.com/",
    color: "#E1306C",
    ctaLabel: "Follow us",
    handleHint: "Username",
  },
  twitter: {
    key: "twitter",
    displayName: "X (Twitter)",
    baseUrl: "https://x.com/",
    color: "#000000",
    ctaLabel: "Follow us",
    handleHint: "Username",
  },
  linkedin: {
    key: "linkedin",
    displayName: "LinkedIn",
    baseUrl: "https://linkedin.com/in/",
    color: "#0A66C2",
    ctaLabel: "Connect",
    handleHint: "Username",
  },
  snapchat: {
    key: "snapchat",
    displayName: "Snapchat",
    baseUrl: "https://snapchat.com/add/",
    color: "#FFFC00",
    ctaLabel: "Follow us",
    handleHint: "Username",
  },
  whatsapp: {
    key: "whatsapp",
    displayName: "WhatsApp",
    baseUrl: "https://wa.me/",
    color: "#25D366",
    ctaLabel: "Message",
    handleHint: "Phone number (e.g. 2348000000000)",
  },
  tiktok: {
    key: "tiktok",
    displayName: "TikTok",
    baseUrl: "https://tiktok.com/@",
    color: "#000000",
    ctaLabel: "Follow us",
    handleHint: "Username",
  },
  youtube: {
    key: "youtube",
    displayName: "YouTube",
    baseUrl: "https://youtube.com/@",
    color: "#FF0000",
    ctaLabel: "Subscribe",
    handleHint: "Channel handle (without @)",
  },
  facebook: {
    key: "facebook",
    displayName: "Facebook",
    baseUrl: "https://facebook.com/",
    color: "#1877F2",
    ctaLabel: "Become a fan",
    handleHint: "Username",
  },
  discord: {
    key: "discord",
    displayName: "Discord",
    baseUrl: null,
    color: "#5865F2",
    ctaLabel: "Join Server",
    handleHint: "Invite link",
  },
  pinterest: {
    key: "pinterest",
    displayName: "Pinterest",
    baseUrl: "https://pinterest.com/",
    color: "#E60023",
    ctaLabel: "See Pins",
    handleHint: "Username",
  },
  reddit: {
    key: "reddit",
    displayName: "Reddit",
    baseUrl: "https://reddit.com/u/",
    color: "#FF4500",
    ctaLabel: "Join Subreddit",
    handleHint: "Username",
  },
  telegram: {
    key: "telegram",
    displayName: "Telegram",
    baseUrl: "https://t.me/",
    color: "#0088CC",
    ctaLabel: "Message",
    handleHint: "Username",
  },
  github: {
    key: "github",
    displayName: "GitHub",
    baseUrl: "https://github.com/",
    color: "#333333",
    ctaLabel: "View Projects",
    handleHint: "Username",
  },
  other: {
    key: "other",
    displayName: "Custom Link",
    baseUrl: null,
    color: "#3F51B5",
    ctaLabel: "Visit Link",
    handleHint: "Custom URL",
  },
};

/**
 * Constructs a fully qualified URL from a platform and handle.
 * Matches the Flutter app's constructUrl() logic exactly.
 */
export function constructUrl(platform: SocialPlatform, handle: string): string {
  const config = PLATFORMS[platform];
  if (!config.baseUrl) return handle;

  let cleanHandle = handle.trim();

  // Remove leading @
  if (cleanHandle.startsWith("@")) {
    cleanHandle = cleanHandle.substring(1);
  }

  // WhatsApp: remove + and spaces
  if (platform === "whatsapp") {
    cleanHandle = cleanHandle.replace(/[\s+]/g, "");
  }

  // If already a URL, return as-is
  if (cleanHandle.startsWith("http")) {
    return cleanHandle;
  }

  return `${config.baseUrl}${cleanHandle}`;
}

/**
 * Get a sorted list of all platform configs for UI rendering.
 */
export function getPlatformList(): PlatformConfig[] {
  return Object.values(PLATFORMS);
}

// ─── App Constants ───────────────────────────────────────────────────────────

export const APP_NAME = "LinkMeUp";
export const APP_URL = "https://linkmeup.app";
export const APP_DESCRIPTION =
  "One QR Code. All Your Socials. Forever.";

export const STORAGE_BUCKETS = {
  avatars: "avatars",
  banners: "banners",
  qrCodes: "qr-codes",
} as const;
