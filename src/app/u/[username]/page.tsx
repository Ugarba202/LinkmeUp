"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, 
  ChevronRight, 
  QrCode, 
  User, 
  ExternalLink,
  ArrowUpRight,
  Triangle
} from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { PLATFORMS } from "@/lib/constants";
import type { SocialLink, Profile } from "@/types/profile";

// Mock data for sample profile when testing
const SAMPLE_PROFILE: Profile = {
  id: "sample-id",
  username: "johndoe",
  fullName: "John Doe",
  bio: "Digital Creator | UI/UX Designer | Building the future of social networking. Check out my links below!",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
  profileCompleted: true,
  socialLinks: [
    { id: "1", userId: "sample", platform: "instagram", username: "johndoe", url: "https://instagram.com/johndoe", isVisible: true, sortOrder: 0, createdAt: new Date() },
    { id: "2", userId: "sample", platform: "tiktok", username: "johndoe", url: "https://tiktok.com/@johndoe", isVisible: true, sortOrder: 1, createdAt: new Date() },
    { id: "3", userId: "sample", platform: "github", username: "johndoe", url: "https://github.com/johndoe", isVisible: true, sortOrder: 2, createdAt: new Date() },
    { id: "4", userId: "sample", platform: "youtube", username: "@johndoe", url: "https://youtube.com/@johndoe", isVisible: true, sortOrder: 3, createdAt: new Date() },
  ],
  views: 1250,
  clicks: 432,
  createdAt: new Date(),
  country: "US",
  bannerUrl: null,
  publicUrl: "https://linkmeup.app/u/johndoe",
  email: "john@example.com",
  phoneNumber: "+1234567890",
  isQrGenerated: true,
  qrGeneratedAt: new Date()
};

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

export default function PublicProfilePage() {
  const params = useParams();
  const { profile: activeProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"links" | "qr">("links");

  const username = params.username as string;

  // Decision logic for which profile to show
  const displayProfile = useMemo(() => {
    if (activeProfile && activeProfile.username?.toLowerCase() === username.toLowerCase()) {
      return activeProfile;
    }
    return SAMPLE_PROFILE;
  }, [activeProfile, username]);

  if (!displayProfile) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[30%] bg-indigo-500/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-xl mx-auto px-6 pt-16">
        
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative mb-6"
          >
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-primary via-indigo-500 to-blue-500">
              <div className="w-full h-full rounded-full bg-black p-1">
                {displayProfile.avatarUrl ? (
                  <img 
                    src={displayProfile.avatarUrl} 
                    alt={displayProfile.fullName} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/20 -m-3"
            />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-black mb-1 tracking-tight"
          >
            {displayProfile.fullName}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-bold text-lg mb-4"
          >
            @{displayProfile.username}
          </motion.p>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground leading-relaxed max-w-sm"
          >
            {displayProfile.bio}
          </motion.p>
        </section>

        {/* Action Buttons (Floating) */}
        <div className="flex justify-center gap-4 mb-12">
          <Button 
            className="h-12 w-12 rounded-full bg-white text-black hover:bg-white/90 shadow-xl flex items-center justify-center shrink-0"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: displayProfile.fullName,
                  text: displayProfile.bio,
                  url: window.location.href,
                });
              }
            }}
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button 
            className="h-12 px-6 rounded-full bg-card border border-white/10 hover:bg-white/5 font-bold shadow-xl flex items-center gap-2"
          >
             Say Hello
          </Button>
        </div>

        {/* Links Section */}
        <section className="space-y-4 mb-20">
          <AnimatePresence mode="popLayout">
            {displayProfile.socialLinks
              .filter(l => l.isVisible)
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((link, index) => {
                const config = PLATFORMS[link.platform];
                const Icon = ICON_MAP[link.platform] || ExternalLink;
                
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center p-4 bg-card hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-all h-[72px]"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-primary/20 transition-all"
                      style={{ backgroundColor: `${config?.color || '#5B62F4'}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: config?.color || '#fff' }} />
                    </div>
                    
                    <div className="flex-1 ml-4 overflow-hidden pr-8">
                      <p className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">
                        {config?.displayName || link.platform}
                      </p>
                      <p className="text-xs text-muted-foreground truncate opacity-70">
                        {link.username}
                      </p>
                    </div>

                    <div className="absolute right-4 text-muted-foreground group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.a>
                );
              })}
          </AnimatePresence>

          {/* Fallback if no links */}
          {displayProfile.socialLinks.filter(l => l.isVisible).length === 0 && (
            <div className="text-center py-10 text-muted-foreground italic">
              No links shared yet.
            </div>
          )}
        </section>

        {/* Brand Footer */}
        <footer className="mt-auto pt-10 pb-8 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity">
              <Triangle className="w-3 h-3 text-primary fill-primary rotate-180" />
              <span>POWERED BY LINKMEUP</span>
            </div>
            <a 
              href="/" 
              className="text-xs font-black uppercase tracking-[3px] py-2 px-4 rounded-full border border-white/5 bg-white/5 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              Get Your Digital Pass
            </a>
          </motion.div>
        </footer>

      </main>

    </div>
  );
}
