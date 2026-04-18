/**
 * Application-level types for Profile and Social Links.
 * These map to the database rows but use camelCase for TS ergonomics.
 */

import type { ProfileRow, SocialLinkRow } from "./database";

// ─── Social Platform Enum ────────────────────────────────────────────────────
// Must match the Flutter SocialPlatform enum exactly (lowercase names)

export const SOCIAL_PLATFORMS = [
  "instagram",
  "twitter",
  "linkedin",
  "snapchat",
  "whatsapp",
  "tiktok",
  "youtube",
  "facebook",
  "discord",
  "pinterest",
  "reddit",
  "telegram",
  "github",
  "other",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  fullName: string;
  username: string | null;
  country: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string;
  publicUrl: string | null;
  profileCompleted: boolean;
  email: string;
  phoneNumber: string;
  views: number;
  clicks: number;
  isQrGenerated: boolean;
  qrGeneratedAt: Date | null;
  createdAt: Date;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  id: string;
  userId: string;
  platform: SocialPlatform;
  username: string;
  url: string;
  isVisible: boolean;
  sortOrder: number;
  createdAt: Date;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

export function profileFromRow(
  row: ProfileRow,
  links: SocialLinkRow[] = []
): Profile {
  return {
    id: row.id,
    fullName: row.full_name,
    username: row.username,
    country: row.country,
    avatarUrl: row.avatar_url,
    bannerUrl: row.banner_url,
    bio: row.bio,
    publicUrl: row.public_url,
    profileCompleted: row.profile_completed,
    email: row.email,
    phoneNumber: row.phone_number,
    views: row.views,
    clicks: row.clicks,
    isQrGenerated: row.is_qr_generated,
    qrGeneratedAt: row.qr_generated_at
      ? new Date(row.qr_generated_at)
      : null,
    createdAt: new Date(row.created_at),
    socialLinks: links.map(socialLinkFromRow),
  };
}

export function socialLinkFromRow(row: SocialLinkRow): SocialLink {
  return {
    id: row.id,
    userId: row.user_id,
    platform: row.platform as SocialPlatform,
    username: row.username,
    url: row.url,
    isVisible: row.is_visible,
    sortOrder: row.sort_order,
    createdAt: new Date(row.created_at),
  };
}

export function profileToUpdate(profile: Partial<Profile>) {
  const update: Record<string, unknown> = {};
  if (profile.fullName !== undefined) update.full_name = profile.fullName;
  if (profile.username !== undefined) update.username = profile.username;
  if (profile.country !== undefined) update.country = profile.country;
  if (profile.avatarUrl !== undefined) update.avatar_url = profile.avatarUrl;
  if (profile.bannerUrl !== undefined) update.banner_url = profile.bannerUrl;
  if (profile.bio !== undefined) update.bio = profile.bio;
  if (profile.publicUrl !== undefined) update.public_url = profile.publicUrl;
  if (profile.profileCompleted !== undefined)
    update.profile_completed = profile.profileCompleted;
  if (profile.email !== undefined) update.email = profile.email;
  if (profile.phoneNumber !== undefined)
    update.phone_number = profile.phoneNumber;
  return update;
}
