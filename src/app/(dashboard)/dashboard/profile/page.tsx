"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Camera, Loader2, Save, User, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ProfileFormData {
  fullName: string;
  username: string;
  bio: string;
}

export default function ProfileEditor() {
  const { profile, user, initialized } = useAuth();
  const { updateProfileData } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      username: "",
      bio: "",
    },
  });

  // Hydrate form when profile loads
  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || "",
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, reset]);

  if (!initialized) return null;
  if (!profile || !user) return null;

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMsg("");

    try {
      // Basic validation
      if (!data.username.trim() || !data.fullName.trim()) {
        throw new Error("Display Name and Username are required.");
      }
      
      const cleanUsername = data.username.toLowerCase().trim();
      
      // Simulate network
      await new Promise(r => setTimeout(r, 600));

      // Update Local State Mock
      updateProfileData({
        fullName: data.fullName,
        username: cleanUsername,
        bio: data.bio,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setErrorMsg("");

    try {
      // Mock File Upload latency
      await new Promise(r => setTimeout(r, 800));

      // Map local blob
      const localUrl = URL.createObjectURL(file);

      // Local State injection Mock
      updateProfileData({ avatarUrl: localUrl });
      
    } catch (err: any) {
      setErrorMsg("Failed to upload image. " + (err.message || ""));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your digital identity and public appearance.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Avatar Card */}
        <Card className="bg-card border-white/5 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full bg-card border-2 border-dashed border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              ) : profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Camera className="w-4 h-4 mr-2" />
                {profile.avatarUrl ? "Change picture" : "Upload picture"}
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. 5MB max.
              </p>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </Card>

        {/* Info Card */}
        <Card className="bg-card border-white/5 p-6 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Display Name
                </label>
                <Input
                  {...register("fullName")}
                  placeholder="Your full name"
                  className="h-12 bg-background border-white/10 focus-visible:ring-primary rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Username
                </label>
                <div className="flex items-center">
                  <span className="flex items-center justify-center h-12 px-4 bg-white/5 border border-r-0 border-white/10 rounded-l-xl text-muted-foreground text-sm">
                    linkmeup.app/u/
                  </span>
                  <Input
                    {...register("username")}
                    placeholder="username"
                    className="h-12 bg-background border-white/10 focus-visible:ring-primary rounded-r-xl rounded-l-none pl-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Bio
                  </label>
                </div>
                <textarea
                  {...register("bio")}
                  rows={4}
                  placeholder="Tell the world about yourself..."
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm font-semibold rounded-lg">
                {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <span className="flex items-center text-green-500 text-sm font-medium animate-in fade-in slide-in-from-left-2">
                    <CheckCircle className="w-4 h-4 mr-1.5" /> Saved successfully
                  </span>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-primary hover:bg-primary-dark font-bold rounded-xl px-6 h-11"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
