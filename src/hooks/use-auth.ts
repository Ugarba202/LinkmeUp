"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Profile } from "@/types/profile";

/**
 * Hook for managing authentication state.
 * MOCKED FOR FRONTEND TESTING: Disconnected from backend entirely.
 */
export function useAuth() {
  const router = useRouter();
  const { profile, setProfile, setLoading, loading, initialized, setInitialized } = useAuthStore();
  const [user, setUser] = useState<{ id: string } | null>(null);

  // Mock Initialization
  useEffect(() => {
    // If we want it to act like they just opened the app, we set initialized to true.
    const timer = setTimeout(() => {
      setLoading(false);
      setInitialized(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [setLoading, setInitialized]);

  const signUp = useCallback(async (
    email: string, 
    pass: string, 
    username?: string,
    fullName?: string,
    bio?: string,
    avatarUrl?: string
  ) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    // Mock local profile creation
    const mockId = Math.random().toString(36).substring(7);
    setUser({ id: mockId });
    
    const newProfile: Profile = {
      id: mockId,
      username: username ?? "",
      fullName: fullName ?? "",
      bio: bio ?? "",
      avatarUrl: avatarUrl ?? "",
      profileCompleted: false,
      socialLinks: [],
      views: 0,
      clicks: 0,
      createdAt: new Date(),
      country: "US",
      bannerUrl: "",
      publicUrl: username ? `https://linkmeup.app/u/${username}` : null,
      email: email,
      phoneNumber: "",
      isQrGenerated: false,
      qrGeneratedAt: null
    };
    
    // Set mock cookie for middleware bypass
    document.cookie = "linkmeup-mock-session=true; path=/; max-age=3600";
    
    setProfile(newProfile);
    setLoading(false);
    
    // Jump straight to setup (which will now show Socials only)
    router.push("/setup");
  }, [router, setLoading, setProfile]);

  const signIn = useCallback(async (email: string, pass: string) => {
     setLoading(true);
     await new Promise((r) => setTimeout(r, 800));

     const mockId = Math.random().toString(36).substring(7);
     setUser({ id: mockId });
     
     // Extract "username" from the derived test email 
     const username = email.split("@")[0];

     const mockProfile: Profile = {
       id: mockId,
       username: username,
       fullName: "Test User",
       bio: "This is a frontend test mode.",
       avatarUrl: "",
       profileCompleted: true,
       socialLinks: [],
       views: 120,
       clicks: 45,
       createdAt: new Date(),
       country: "US",
       bannerUrl: "",
       publicUrl: `https://linkmeup.app/u/${username}`,
       email: email,
       phoneNumber: "",
       isQrGenerated: true,
       qrGeneratedAt: new Date()
     };

     // Set mock cookie for middleware bypass
     document.cookie = "linkmeup-mock-session=true; path=/; max-age=3600";

     setProfile(mockProfile);
     setLoading(false);
     
     // Return data mock
     return { user: { id: mockId } };
  }, [setLoading, setProfile]);

  const signOut = useCallback(async () => {
    // Clear mock cookie
    document.cookie = "linkmeup-mock-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    setUser(null);
    setProfile(null);
    router.push("/");
  }, [router, setProfile]);

  return {
    user,
    profile,
    loading,
    initialized,
    signUp,
    signIn,
    signOut,
  };
}
