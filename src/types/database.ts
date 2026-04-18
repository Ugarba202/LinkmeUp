/**
 * Supabase Database Types
 * 
 * IMPORTANT: These types MUST match the exact column names used by the
 * Flutter mobile app's toMap()/fromMap() methods. Both apps share the
 * same Supabase database.
 * 
 * Source of truth: linkmeup_app/lib/domain/entities/
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      social_links: {
        Row: SocialLinkRow;
        Insert: SocialLinkInsert;
        Update: SocialLinkUpdate;
      };
      analytics: {
        Row: AnalyticsRow;
        Insert: AnalyticsInsert;
        Update: never;
      };
    };
  };
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export interface ProfileRow {
  id: string;
  full_name: string;
  username: string | null;
  country: string;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string;
  public_url: string | null;
  profile_completed: boolean;
  email: string;
  phone_number: string;
  views: number;
  clicks: number;
  is_qr_generated: boolean;
  qr_generated_at: string | null;
  created_at: string;
}

export interface ProfileInsert {
  id: string;
  full_name?: string;
  username?: string | null;
  country?: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string;
  public_url?: string | null;
  profile_completed?: boolean;
  email?: string;
  phone_number?: string;
  views?: number;
  clicks?: number;
  is_qr_generated?: boolean;
  qr_generated_at?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  full_name?: string;
  username?: string | null;
  country?: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string;
  public_url?: string | null;
  profile_completed?: boolean;
  email?: string;
  phone_number?: string;
  views?: number;
  clicks?: number;
  is_qr_generated?: boolean;
  qr_generated_at?: string | null;
}

// ─── Social Links ────────────────────────────────────────────────────────────

export interface SocialLinkRow {
  id: string;
  user_id: string;
  platform: string;
  username: string;
  url: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface SocialLinkInsert {
  id?: string;
  user_id: string;
  platform: string;
  username: string;
  url: string;
  is_visible?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface SocialLinkUpdate {
  platform?: string;
  username?: string;
  url?: string;
  is_visible?: boolean;
  sort_order?: number;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface AnalyticsRow {
  id: string;
  user_id: string;
  event_type: "view" | "click";
  created_at: string;
}

export interface AnalyticsInsert {
  user_id: string;
  event_type: "view" | "click";
}
