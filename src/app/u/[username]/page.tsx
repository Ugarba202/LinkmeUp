"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Settings2, 
  Share2, 
  Check, 
  QrCode as QrIcon, 
  Smartphone, 
  ChevronRight,
  ShieldCheck,
  Star,
  ExternalLink,
  Save,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth-store";
import { PLATFORMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  SiInstagram, 
  SiTiktok, 
  SiX, 
  SiYoutube, 
  SiLinkedin, 
  SiSnapchat, 
  SiWhatsapp, 
  SiGithub, 
  SiDiscord, 
  SiFacebook 
} from "react-icons/si";
import { generateVCard } from "@/lib/utils/vcard";

const ICON_MAP: Record<string, any> = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  twitter: SiX,
  youtube: SiYoutube,
  linkedin: SiLinkedin,
  snapchat: SiSnapchat,
  whatsapp: SiWhatsapp,
  github: SiGithub,
  discord: SiDiscord,
  facebook: SiFacebook,
};

export default function PublicProfile({ params }: { params: { username: string } }) {
  const { profile, getProfileByUsername } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      await getProfileByUsername(params.username);
      setLoading(false);
    };
    loadProfile();
  }, [params.username, getProfileByUsername]);

  if (loading) return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 text-center">
       <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-black tracking-tight">Signal Lost.</h1>
          <p className="text-white/40">The profile you're looking for doesn't exist or has been disconnected.</p>
          <Button variant="outline" className="rounded-xl border-white/10" onClick={() => window.location.href = '/'}>
            Return Home
          </Button>
       </div>
    </div>
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddContact = () => {
    generateVCard({
      fullName: profile.fullName,
      username: profile.username || "user",
      bio: profile.bio || "Digital ID Card",
      publicUrl: window.location.href
    });
  };

  return (
    <main className="min-h-screen bg-[#050510] text-white overflow-x-hidden selection:bg-secondary/30">
      
      {/* ─── AI-Premium Mesh Background ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/15 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[440px] mx-auto px-6 pt-16 pb-32 flex flex-col items-center">
        
        {/* ─── Avatar Hub ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 group"
        >
          <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
          <div className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 p-1 relative overflow-hidden backdrop-blur-xl">
             {profile.avatarUrl ? (
               <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover rounded-[36px]" />
             ) : (
               <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center rounded-[36px]">
                 <span className="text-4xl font-black">{profile.fullName?.[0]}</span>
               </div>
             )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
            <ShieldCheck className="w-5 h-5 text-secondary" />
          </div>
        </motion.div>

        {/* ─── Identity Stack ─── */}
        <div className="text-center space-y-3 mb-12">
           <motion.h1 
             className="text-4xl font-black tracking-tighter"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
           >
             {profile.fullName}
           </motion.h1>
           <motion.div 
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
           >
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">@</span>
             <span className="text-xs font-black uppercase tracking-widest text-secondary">{profile.username}</span>
           </motion.div>
           {profile.bio && (
             <motion.p 
               className="text-white/40 font-medium px-4 max-w-[320px] mx-auto leading-relaxed"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
             >
               {profile.bio}
             </motion.p>
           )}
        </div>

        {/* ─── Primary Actions ─── */}
        <motion.div 
          className="flex gap-3 w-full mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={handleAddContact}
            className="flex-1 h-16 rounded-3xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.15em] text-[11px] shadow-glow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            Add to Contacts <Save className="w-4 h-4" />
          </Button>
          <Button 
            onClick={handleShare}
            className={`h-16 w-16 rounded-3xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all active:scale-95 ${copied ? 'bg-green-500/20 text-green-500 border-green-500/20' : 'bg-white/5 text-white'}`}
          >
             {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          </Button>
        </motion.div>

        {/* ─── Digital Pass Section ─── */}
        <div className="w-full space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between px-2 mb-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Digital Identity Pass</span>
            <div className="h-px w-32 bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="grid gap-3">
            {profile.socialLinks?.filter(l => l.isVisible).map((link, i) => {
              const platform = link.platform as keyof typeof PLATFORMS | "other";
              const config = PLATFORMS[platform as keyof typeof PLATFORMS] || { color: "#6366f1" };
              const Icon = ICON_MAP[platform] || Globe;
              
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (i * 0.1) }}
                  className="group relative h-20 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[28px] flex items-center px-6 transition-all hover:bg-white/[0.06] hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98]"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full bg-white/5 group-hover:bg-primary transition-all scale-y-0 group-hover:scale-y-100" />
                  
                  <div className="w-12 h-12 rounded-[18px] bg-white/5 flex items-center justify-center mr-5 border border-white/5">
                     <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: config.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                      {link.platform === "other" ? link.username : config.displayName}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                     <ChevronRight className="w-4 h-4 text-white/30" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ─── Footer Branding ─── */}
        <motion.div 
          className="mt-20 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
              <div className="h-px w-8 bg-white/5" />
              Powering Connections
              <div className="h-px w-8 bg-white/5" />
           </div>
           
           <div className="px-6 py-4 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md flex items-center gap-3 group cursor-pointer hover:bg-white/[0.05] transition-all" onClick={() => window.location.href = '/'}>
              <div className="w-8 h-8 bg-white text-black rounded-xl flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000">
                 <QrIcon className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                 Get your <span className="text-secondary">Free</span> pass
              </p>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
