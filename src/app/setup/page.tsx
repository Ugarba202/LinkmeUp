"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Loader2,
  QrCode,
  AtSign,
  Plus,
  Sparkles,
  CheckCircle,
  Link as LinkIcon,
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
  SiFacebook,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SocialPlatform } from "@/types/profile";
import { constructUrl, PLATFORMS } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/lib/stores/auth-store";

// ─── Platform UI Config ──────────────────────────────────────────────────────

const PLATFORM_LIST = [
  { key: "instagram" as SocialPlatform, name: "Instagram", icon: SiInstagram, color: "#E1306C" },
  { key: "tiktok" as SocialPlatform, name: "TikTok", icon: SiTiktok, color: "#ffffff" },
  { key: "twitter" as SocialPlatform, name: "X (Twitter)", icon: SiX, color: "#ffffff" },
  { key: "youtube" as SocialPlatform, name: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { key: "linkedin" as SocialPlatform, name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { key: "snapchat" as SocialPlatform, name: "Snapchat", icon: SiSnapchat, color: "#FFFC00" },
  { key: "whatsapp" as SocialPlatform, name: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
  { key: "github" as SocialPlatform, name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { key: "discord" as SocialPlatform, name: "Discord", icon: SiDiscord, color: "#5865F2" },
  { key: "facebook" as SocialPlatform, name: "Facebook", icon: SiFacebook, color: "#1877F2" },
];

const OTHER_PLATFORM = {
  key: "other" as SocialPlatform,
  name: "Custom Link",
  icon: LinkIcon,
  color: "#3F51B5",
};

interface ConnectedSocial {
  platform: SocialPlatform;
  username: string; // Used for "custom name" if platform is 'other'
  url?: string;     // Raw URL for 'other'
}

// ─── Main Setup Wizard ───────────────────────────────────────────────────────

export default function SetupWizardPage() {
  const router = useRouter();
  const { profile } = useAuth();
  const { updateProfileData, updateSocialLinks } = useAuthStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Socials State
  const [connectedSocials, setConnectedSocials] = useState<ConnectedSocial[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [dialogPlatform, setDialogPlatform] = useState<(typeof PLATFORM_LIST)[0] | typeof OTHER_PLATFORM | null>(null);
  const [dialogUsername, setDialogUsername] = useState("");
  const [customName, setCustomName] = useState("");

  // ─── Platform Detection ──────────────────────────────────────────────

  const detectPlatformFromUrl = (input: string) => {
    if (!input.includes(".")) return null;
    
    // Check standard platforms
    for (const p of PLATFORM_LIST) {
      const config = PLATFORMS[p.key];
      if (config.baseUrl && input.toLowerCase().includes(config.baseUrl.split("//")[1].split("/")[0])) {
        return p;
      }
    }
    return null;
  };

  const handleInputUpdate = (val: string) => {
    setDialogUsername(val);
    
    // Only auto-detect if we're currently in "other" or "initially empty"
    // so we don't annoy users who explicitly clicked a specific platform.
    if (dialogPlatform?.key === "other" || !dialogPlatform) {
      const detected = detectPlatformFromUrl(val);
      if (detected) {
        setDialogPlatform(detected);
      }
    }
  };

  // ─── Social Link Dialog ──────────────────────────────────────────────

  const openAddDialog = (platform: (typeof PLATFORM_LIST)[0] | typeof OTHER_PLATFORM) => {
    const existing = connectedSocials.find((s) => s.platform === platform.key);
    setDialogPlatform(platform);
    setDialogUsername(existing?.username ?? "");
    setCustomName(platform.key === "other" ? (existing?.username ?? "Custom") : "");
    setAddDialogOpen(true);
  };

  const saveSocialLink = () => {
    if (!dialogPlatform || !dialogUsername.trim()) return;
    
    const isOther = dialogPlatform.key === "other";
    
    setConnectedSocials((prev) => {
      // Remove any existing one for this platform
      const filtered = prev.filter((s) => s.platform !== dialogPlatform.key);
      
      const newEntry: ConnectedSocial = {
        platform: dialogPlatform.key,
        username: isOther ? (customName || "Custom") : dialogUsername.trim(),
        url: isOther ? dialogUsername.trim() : undefined,
      };

      return [...filtered, newEntry];
    });
    
    setAddDialogOpen(false);
    setDialogUsername("");
    setCustomName("");
  };

  // ─── Finish Setup ────────────────────────────────────────────────────

  const finishSetup = async () => {
    if (!profile) return;
    setIsSubmitting(true);

    try {
      if (connectedSocials.length > 0) {
        const links = connectedSocials.map((s, i) => ({
          id: Math.random().toString(),
          userId: profile.id,
          platform: s.platform,
          username: s.username,
          url: s.url || constructUrl(s.platform, s.username),
          isVisible: true,
          sortOrder: i,
          createdAt: new Date(),
        }));
        updateSocialLinks(links);
      }

      // Mark profile as completed
      updateProfileData({ profileCompleted: true });

      // Show generation ceremony
      setIsGenerating(true);
      await new Promise((r) => setTimeout(r, 3000));
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Progress ────────────────────────────────────────────────────────
  const progressPercent = 75;

  if (isGenerating) return <GenerationOverlay />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <button onClick={() => router.push("/signup")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-black text-gradient">LinkMeUp</span>
        <div className="w-5" /> {/* Spacer */}
      </header>

      {/* Progress */}
      <div className="px-6 pt-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Final Step
          </span>
          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
            Completing Profile
          </span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-lg mx-auto">
          <SocialsStep
            connectedSocials={connectedSocials}
            platformList={PLATFORM_LIST}
            otherPlatform={OTHER_PLATFORM}
            onAddClick={openAddDialog}
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-6 border-t border-white/5">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={finishSetup}
            disabled={isSubmitting}
            className="w-full h-16 rounded-3xl text-xl font-black bg-primary hover:bg-primary-dark shadow-glow transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <QrCode className="mr-3 w-6 h-6" />
                Generate My Pass
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4 font-bold flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Your profile is ready. Just add your handles!
          </p>
        </div>
      </div>

      {/* Add Social Link Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-card border-white/5 sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {dialogPlatform ? (
                <>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${dialogPlatform.color}15` }}
                  >
                    <dialogPlatform.icon
                      className="w-5 h-5"
                      style={{ color: dialogPlatform.color }}
                    />
                  </div>
                  {dialogPlatform.key === "other" ? "Add Custom Link" : `Connect ${dialogPlatform.name}`}
                </>
              ) : (
                "Connect Social"
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            
            {dialogPlatform?.key === "other" && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Platform Name
                </label>
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Portfolio"
                  className="h-12 bg-background border-white/10 focus-visible:ring-primary rounded-xl"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {(dialogPlatform && dialogPlatform.key === "other") ? "Username or Link" : "Username"}
              </label>
              <div className="relative mt-2">
                {(dialogPlatform && dialogPlatform.key !== "other") ? (
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                ) : (
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                )}
                <Input
                  autoFocus
                  value={dialogUsername}
                  onChange={(e) => handleInputUpdate(e.target.value)}
                  placeholder={
                    dialogPlatform
                      ? dialogPlatform.key !== "other"
                        ? PLATFORMS[dialogPlatform.key as SocialPlatform].handleHint
                        : "https://..."
                      : "your_username"
                  }
                  className="pl-10 h-12 bg-background border-white/10 focus-visible:ring-primary rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && saveSocialLink()}
                />
              </div>
            </div>
            <Button
              onClick={saveSocialLink}
              disabled={!dialogUsername.trim()}
              className="w-full h-12 bg-primary hover:bg-primary-dark rounded-xl font-bold"
            >
              <Check className="mr-2 w-4 h-4" />
              Save Connection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Socials List Component ─────────────────────────────────────────────────

function SocialsStep({
  connectedSocials,
  platformList,
  otherPlatform,
  onAddClick,
}: {
  connectedSocials: ConnectedSocial[];
  platformList: typeof PLATFORM_LIST;
  otherPlatform: typeof OTHER_PLATFORM;
  onAddClick: (platform: (typeof PLATFORM_LIST)[0] | typeof OTHER_PLATFORM) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3">
          Final Setup: Social Links
        </h1>
        <p className="text-muted-foreground text-lg">
          Add at least one link to show on your public profile and QR code.
        </p>
      </div>

      <div className="grid gap-3">
        {platformList.map((platform) => {
          const connected = connectedSocials.find(
            (s) => s.platform === platform.key
          );
          return (
            <motion.button
              key={platform.key}
              onClick={() => onAddClick(platform)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${
                connected
                  ? "border-primary/30 bg-primary/5"
                  : "border-white/5 bg-card/50 hover:border-white/20 hover:bg-card"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                style={{ backgroundColor: `${platform.color}15` }}
              >
                <platform.icon
                  className="w-6 h-6"
                  style={{ color: platform.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base">{platform.name}</p>
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    connected ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  {connected ? `@${connected.username}` : "Not connected"}
                </p>
              </div>
              {connected ? (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              ) : (
                <Plus className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              )}
            </motion.button>
          );
        })}

        {/* Custom Link Button */}
        <motion.button
          onClick={() => onAddClick(otherPlatform)}
          className="w-full flex items-center gap-4 p-5 rounded-2xl border border-dashed border-white/20 bg-transparent hover:border-primary/50 hover:bg-primary/5 transition-all text-left group mt-4"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
            <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base whitespace-nowrap">Add Custom Link</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50">
              Any other platform or URL
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}

// ─── Generation Overlay (final step) ─────────────────────────────────────────

function GenerationOverlay() {
  const [statusItems, setStatusItems] = useState([false, false, false]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStatusItems([true, false, false]), 800),
      setTimeout(() => setStatusItems([true, true, false]), 1600),
      setTimeout(() => setStatusItems([true, true, true]), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />

      {/* QR Animation */}
      <div className="relative w-40 h-40 mb-12 z-10">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(99,102,241,0.05)"
            strokeWidth="4"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#6366f1"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            style={{ pathLength: 0 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <QrCode className="w-16 h-16 text-primary shadow-glow" />
          </motion.div>
        </div>
      </div>

      <div className="space-y-4 max-w-xs w-full z-10">
        <StatusLine active={statusItems[0]} text="Encoding profile metrics" />
        <StatusLine active={statusItems[1]} text="Syncing social graph" />
        <StatusLine active={statusItems[2]} text="Generating secure pass" />
      </div>
    </motion.div>
  );
}

function StatusLine({ active, text }: { active: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-3 transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"}`}>
      <div className={`w-2 h-2 rounded-full ${active ? "bg-primary animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" : "bg-white/20"}`} />
      <span className={`text-sm font-bold tracking-wider uppercase ${active ? "text-white" : "text-white/40"}`}>
        {text}
      </span >
    </div >
  );
}
