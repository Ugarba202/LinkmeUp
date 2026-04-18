import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "@/types/profile";
import type { SocialLink } from "@/types/profile";

interface AuthState {
  /** The current user profile, null if not authenticated */
  profile: Profile | null;
  /** Whether the auth state has been initialized */
  initialized: boolean;
  /** Whether authentication is currently loading */
  loading: boolean;

  // Actions
  setProfile: (profile: Profile | null) => void;
  updateProfileData: (data: Partial<Profile>) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  setInitialized: (initialized: boolean) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      initialized: false,
      loading: true,

      setProfile: (profile) => set({ profile }),
      updateProfileData: (data) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : null
      })),
      updateSocialLinks: (links) => set((state) => ({
        profile: state.profile ? { ...state.profile, socialLinks: links } : null
      })),
      setInitialized: (initialized) => set({ initialized }),
      setLoading: (loading) => set({ loading }),
      reset: () =>
        set({
          profile: null,
          initialized: false,
          loading: false,
        }),
    }),
    {
      name: "linkmeup-auth-storage", // unique name
    }
  )
);
