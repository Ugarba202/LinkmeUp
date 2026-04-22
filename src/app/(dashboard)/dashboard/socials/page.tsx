"use client";

import { useState, useCallback, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Eye, 
  EyeOff,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
  AtSign,
  Globe,
  ChevronRight,
  Settings2,
  Share2,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/stores/auth-store";
import { PLATFORMS, constructUrl } from "@/lib/constants";
import type { SocialPlatform, SocialLink } from "@/types/profile";
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
  other: Globe
};

export default function SocialLinksManager() {
  const { profile, user, initialized } = useAuth();
  const { updateSocialLinks } = useAuthStore();
  const [links, setLinks] = useState<SocialLink[]>(profile?.socialLinks || []);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | "other" | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [customName, setCustomName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (profile?.socialLinks) {
      setLinks(profile.socialLinks);
    }
  }, [profile]);

  if (!initialized || !profile || !user) return null;

  const detectPlatformFromUrl = (input: string) => {
    if (!input.includes(".")) return null;
    for (const [key, config] of Object.entries(PLATFORMS)) {
      if (config.baseUrl && input.toLowerCase().includes(config.baseUrl.split("//")[1].split("/")[0])) {
        return key as SocialPlatform;
      }
    }
    return null;
  };

  const handleInputUpdate = (val: string) => {
    setNewUsername(val);
    if (selectedPlatform === "other" || !selectedPlatform) {
      const detected = detectPlatformFromUrl(val);
      if (detected) setSelectedPlatform(detected);
    }
  };

  const handleToggleVisibility = async (link: SocialLink) => {
    const updatedLinks = links.map(l => l.id === link.id ? { ...l, isVisible: !l.isVisible } : l);
    setLinks(updatedLinks);
    updateSocialLinks(updatedLinks);
  };

  const handleDelete = async (id: string) => {
    const updatedLinks = links.filter(l => l.id !== id);
    setLinks(updatedLinks);
    updateSocialLinks(updatedLinks);
  };

  const handleAddLink = async () => {
    if (!selectedPlatform || !newUsername.trim()) return;
    setIsAdding(true);

    const isOther = selectedPlatform === "other";
    const mapped: SocialLink = {
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      platform: isOther ? "other" : selectedPlatform,
      username: isOther ? (customName || "Custom") : newUsername.trim(),
      url: isOther ? newUsername.trim() : constructUrl(selectedPlatform as SocialPlatform, newUsername.trim()),
      isVisible: true,
      sortOrder: links.length,
      createdAt: new Date()
    };

    const updatedLinks = [...links, mapped];
    setLinks(updatedLinks);
    updateSocialLinks(updatedLinks);
    
    setAddDialogOpen(false);
    setNewUsername("");
    setCustomName("");
    setSelectedPlatform(null);
    setIsAdding(false);
  };

  const availablePlatforms = Object.values(PLATFORMS);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 relative">
      
      {/* ─── AI-Premium Background Elements ─── */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* ─── Header Section ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]"
          >
            <Sparkles className="w-3 h-3" /> Identity Matrix
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
            Connected <span className="text-gradient">Signatures</span>.
          </h1>
        </div>

        <Button 
          onClick={() => setAddDialogOpen(true)}
          className="h-12 bg-white text-black hover:bg-white/90 font-black rounded-xl px-6 shadow-xl transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Connection
        </Button>
      </div>

      {/* ─── Links List ─── */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {links.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 border-dashed rounded-3xl p-12 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                 <LinkIcon className="w-6 h-6 text-white/20" />
              </div>
              <h3 className="text-xl font-black mb-1 tracking-tight">System Neutral</h3>
              <p className="text-white/30 text-xs max-w-[240px] font-medium leading-relaxed mb-6">
                Your profile is currently isolated. Connect your social footprints to begin broadcasting.
              </p>
              <Button 
                onClick={() => setAddDialogOpen(true)}
                variant="outline"
                className="h-10 px-6 rounded-lg border-white/10 text-[10px] font-black uppercase tracking-widest"
              >
                Initiate Connect
              </Button>
            </motion.div>
          ) : (
            links.sort((a, b) => a.sortOrder - b.sortOrder).map((link, i) => {
              const platformKey = link.platform as keyof typeof PLATFORMS | "other";
              const config = PLATFORMS[platformKey as keyof typeof PLATFORMS] || { displayName: link.username, color: "#6366f1" };
              const Icon = ICON_MAP[platformKey] || Globe;
              
              return (
                <motion.div
                  key={link.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative overflow-hidden rounded-[32px] border transition-all h-24 flex items-center ${
                    link.isVisible 
                      ? "bg-white/[0.03] backdrop-blur-3xl border-white/5 hover:border-white/10 shadow-lg" 
                      : "bg-white/[0.01] border-white/5 opacity-40 grayscale"
                  }`}
                >
                  {/* Status Indicator Bar */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-2"
                    style={{ backgroundColor: config.color }} 
                  />
                  
                  <div className="w-full px-4 flex items-center gap-4">
                    <div className="cursor-grab text-white/10 hover:text-white/40 active:cursor-grabbing p-1 transition-colors">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden bg-white/5 border border-white/5 shadow-inner"
                    >
                      <Icon className="w-5 h-5 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: config.color }} />
                      <div className="absolute inset-0 bg-inherit blur-lg opacity-40" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-base tracking-tight mb-0.5">
                        {link.platform === "other" ? link.username : config.displayName}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 truncate">
                        {link.url.replace("https://", "")}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <button
                        onClick={() => handleToggleVisibility(link)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          link.isVisible 
                            ? "bg-primary/10 text-primary border border-primary/20" 
                            : "bg-white/5 text-white/20 border border-white/5"
                        }`}
                      >
                        {link.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white/10 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* ─── Tips / Promotion Section ─── */}
      <Card className="p-6 bg-gradient-to-br from-white/[0.03] to-transparent border-white/5 rounded-3xl overflow-hidden relative group">
         <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-1000" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
               <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-lg font-black mb-1">Amplify Engagement</h4>
               <p className="text-white/30 text-xs font-medium leading-relaxed">
                 Profiles with integrated social signatures see a 40% higher conversion rate. Keep your links updated to maintain peak performance.
               </p>
            </div>
            <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 rounded-xl font-black uppercase tracking-widest text-[9px] active:scale-95 transition-all">
               Analyze Traffic <ChevronRight className="ml-2 w-3 h-3" />
            </Button>
         </div>
      </Card>

      {/* ─── Add Link Dialog ─── */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-[#050510] border-white/10 sm:max-w-md p-6 rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter mb-2">
              {selectedPlatform ? "Link Connection" : "Select Platform"}
            </DialogTitle>
          </DialogHeader>
          
          <AnimatePresence mode="wait">
            {!selectedPlatform ? (
              <motion.div 
                key="platform-select"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-2 gap-3 pt-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {availablePlatforms.map((p) => {
                  const Icon = ICON_MAP[p.key] || Globe;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPlatform(p.key)}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/10 transition-all gap-3 text-center h-24"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" style={{ color: p.color || "#fff" }} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{p.displayName}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setSelectedPlatform("other")}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed border-white/10 bg-transparent hover:border-primary/50 hover:bg-primary/5 transition-all gap-3 text-center h-24"
                >
                  <Plus className="w-6 h-6 text-white/20 group-hover:text-primary group-hover:scale-110 transition-all" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-primary transition-colors">Custom Link</span>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="config-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 pt-4"
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                  {(() => {
                    const Icon = ICON_MAP[selectedPlatform] || Globe;
                    const color = selectedPlatform === "other" ? "#6366f1" : (PLATFORMS[selectedPlatform as keyof typeof PLATFORMS]?.color || "#fff");
                    return (
                      <>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 z-10 bg-white/5 border border-white/5" style={{ color }}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-sm">{selectedPlatform === "other" ? "Custom Domain" : PLATFORMS[selectedPlatform as keyof typeof PLATFORMS]?.displayName}</p>
                          <button 
                            className="text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:brightness-125 transition-all"
                            onClick={() => setSelectedPlatform(null)}
                          >
                            Switch Protocol
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {selectedPlatform === "other" && (
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Display Label</label>
                     <Input
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. My Website"
                        className="h-12 bg-white/[0.04] border-white/5 focus-visible:ring-primary rounded-xl px-4 font-bold text-sm"
                     />
                   </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">
                    {selectedPlatform === "other" ? "System URL" : (PLATFORMS[selectedPlatform as keyof typeof PLATFORMS]?.handleHint || "Identifier")}
                  </label>
                  <div className="relative">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary opacity-40">
                        {selectedPlatform === "other" ? <Globe className="w-4 h-4" /> : <AtSign className="w-4 h-4" />}
                     </div>
                     <Input
                        autoFocus
                        value={newUsername}
                        onChange={(e) => handleInputUpdate(e.target.value)}
                        placeholder={selectedPlatform === "other" ? "https://..." : "username"}
                        className="pl-12 h-12 bg-white/[0.04] border-white/5 focus-visible:ring-primary rounded-xl px-4 font-bold text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                      />
                  </div>
                </div>

                <Button
                  onClick={handleAddLink}
                  disabled={!newUsername.trim() || isAdding}
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.2em] rounded-xl shadow-glow-sm transition-all active:scale-[0.98] text-[10px]"
                >
                  {isAdding ? "Finalizing..." : "Connect Identity"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
