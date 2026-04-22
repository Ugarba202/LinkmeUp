"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Camera, 
  Loader2, 
  Save, 
  User, 
  CheckCircle,
  AtSign,
  Type,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Globe,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || "",
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, reset]);

  if (!initialized || !profile || !user) return null;

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMsg("");

    try {
      if (!data.username.trim() || !data.fullName.trim()) {
        throw new Error("Display Name and Username are required.");
      }
      
      const cleanUsername = data.username.toLowerCase().trim();
      await new Promise(r => setTimeout(r, 800));

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
      await new Promise(r => setTimeout(r, 1000));
      const localUrl = URL.createObjectURL(file);
      updateProfileData({ avatarUrl: localUrl });
    } catch (err: any) {
      setErrorMsg("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 relative">
      
      {/* ─── AI-Premium Background Elements ─── */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* ─── Header ─── */}
      <div className="flex flex-col gap-2">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]"
        >
          <Settings2 className="w-3 h-3" /> Identity Configuration
        </motion.div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
           Profile <span className="text-primary">Essence</span>.
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr,380px] gap-12 items-start">
        
        {/* ─── Left: Form ─── */}
        <div className="space-y-8">
          <Card className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-12">
              
              {/* Profile Header (Avatar Integration) */}
              <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-8">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-primary/50 to-secondary/50 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                    <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center overflow-hidden relative border border-white/5">
                       {isUploading ? (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-20 backdrop-blur-sm">
                           <Loader2 className="w-6 h-6 animate-spin text-primary" />
                           <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Processing</span>
                        </div>
                      ) : null}
                      
                      {profile.avatarUrl ? (
                        <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-white/10" />
                      )}
                      
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2 backdrop-blur-[2px]"
                      >
                         <Camera className="w-6 h-6 text-white" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Replace</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-3">
                   <h3 className="text-2xl font-black tracking-tight">Visual Identity</h3>
                   <p className="text-white/30 text-xs font-bold leading-relaxed max-w-[280px]">
                     Upload a high-fidelity signature image. This appears on your QR Pass and Public Profile.
                   </p>
                   <Button 
                    type="button"
                    variant="ghost" 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:text-primary-light hover:bg-primary/5 font-black h-auto p-0 text-[10px] uppercase tracking-widest"
                   >
                     New Capture <ArrowRight className="ml-2 w-3 h-3" />
                   </Button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">
                     <Type className="w-3 h-3" /> Full Identity
                   </label>
                   <Input 
                     {...register("fullName")}
                     className="h-12 bg-white/[0.04] border-white/5 focus-visible:ring-primary rounded-xl px-4 text-sm font-bold transition-all" 
                     placeholder="Digital Entity"
                   />
                </div>
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">
                     <AtSign className="w-3 h-3" /> Unique Handle
                   </label>
                   <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 text-sm font-black uppercase tracking-widest pointer-events-none">
                        u/
                      </span>
                      <Input 
                        {...register("username")}
                        className="pl-12 h-12 bg-white/[0.04] border-white/5 focus-visible:ring-primary rounded-xl px-4 text-sm font-bold transition-all" 
                        placeholder="handle"
                      />
                   </div>
                </div>
              </div>

              <div className="space-y-3">
                 <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">
                   <FileText className="w-3 h-3" /> Public Bio
                 </label>
                 <textarea 
                   {...register("bio")}
                   className="w-full min-h-[140px] bg-white/[0.04] border border-white/5 focus:ring-2 focus:ring-primary rounded-2xl px-5 py-5 text-sm font-bold leading-relaxed text-white placeholder:text-white/10 outline-none transition-all"
                   placeholder="Describe your essence in the digital space..."
                 />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 ">
                 {errorMsg && (
                    <p className="text-red-500 font-bold text-[10px] uppercase tracking-widest bg-red-500/10 px-6 py-3 rounded-2xl flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4" /> {errorMsg}
                    </p>
                 )}
                 <div className="flex-1" />
                 
                 <div className="flex items-center gap-8">
                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.span 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 text-green-500 font-black text-[10px] uppercase tracking-[0.4em]"
                        >
                           <CheckCircle className="w-4 h-4" /> Sync Ready
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <Button 
                      type="submit"
                      disabled={isSaving}
                      className="h-12 px-10 bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-glow-sm min-w-[180px] active:scale-[0.98] transition-all"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Sync"}
                    </Button>
                 </div>
              </div>

            </form>
          </Card>
        </div>

        {/* ─── Right: Side Info ─── */}
        <div className="space-y-8">
           <Card className="p-6 bg-gradient-to-br from-white/[0.02] to-transparent border-white/5 rounded-3xl relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-1000" />
              <h4 className="text-base font-black mb-4 flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-primary" /> Authority Control
              </h4>
              <p className="text-white/30 text-xs font-bold leading-relaxed mb-10">
                Your profile is broadcast as <span className="text-white">Public</span>. Anyone accessing your token can view your digital pass.
              </p>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                       <Globe className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest leading-none">Global Index</span>
                    </div>
                    <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full shadow-glow-sm" />
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                       <Smartphone className="w-4 h-4 text-white/20 group-hover:text-secondary transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest leading-none">Discovery Badge</span>
                    </div>
                    <div className="w-10 h-5 bg-secondary/20 rounded-full relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-secondary rounded-full shadow-glow-sm" />
                    </div>
                 </div>
              </div>
           </Card>

           <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 border-dashed text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-4 group-hover:animate-pulse" />
              <h4 className="text-xs font-black mb-2 uppercase tracking-widest">Growth Matrix</h4>
              <p className="text-[9px] text-white/20 font-bold leading-relaxed">
                Consistency is key. Maintain a synchronized identity across all platforms to optimize your digital discovery.
              </p>
           </div>
        </div>

      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleAvatarUpload}
      />
    </div>
  );
}
