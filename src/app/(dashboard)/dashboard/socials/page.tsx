"use client";

import { useState, useCallback } from "react";
import { Copy, Plus, Trash2, GripVertical, Check, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/stores/auth-store";
import { PLATFORMS, constructUrl } from "@/lib/constants";
import type { SocialPlatform, SocialLink } from "@/types/profile";
import { SiInstagram, SiTiktok, SiX, SiYoutube, SiLinkedin, SiSnapchat, SiWhatsapp, SiGithub, SiDiscord, SiFacebook } from "react-icons/si";

// Local quick reference for platform icons (matches setup wizard)
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
  other: LinkIcon // default imported directly if needed
};

// Fallback icon
function LinkIcon(props: any) {
  return <div {...props}><div className="w-full h-full bg-primary/20 rounded-full" /></div>;
}

export default function SocialLinksManager() {
  const { profile, user, initialized } = useAuth();
  const { updateSocialLinks } = useAuthStore();
  const [links, setLinks] = useState<SocialLink[]>(profile?.socialLinks || []);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Sync state if profile changes fundamentally (e.g. initial load)
  // In a real app we'd use use-realtime hook or manual invalidate
  if (!initialized || !profile || !user) return null;

  const handleToggleVisibility = async (link: SocialLink) => {
    const updatedLinks = links.map(l => l.id === link.id ? { ...l, isVisible: !l.isVisible } : l);
    // Optimistic update
    setLinks(updatedLinks);
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 400));
    updateSocialLinks(updatedLinks);
  };

  const handleDelete = async (id: string) => {
    const updatedLinks = links.filter(l => l.id !== id);
    // Optimistic update
    setLinks(updatedLinks);
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 400));
    updateSocialLinks(updatedLinks);
  };

  const handleAddLink = async () => {
    if (!selectedPlatform || !newUsername.trim()) return;
    setIsAdding(true);

    try {
      const order = links.length;
      const url = constructUrl(selectedPlatform, newUsername.trim());
      
      // Mock Insert
      const mapped: SocialLink = {
        id: Math.random().toString(36).substring(7),
        userId: user.id,
        platform: selectedPlatform,
        username: newUsername.trim(),
        url: url,
        isVisible: true,
        sortOrder: order,
        createdAt: new Date()
      };

      const updatedLinks = [...links, mapped];
      setLinks(updatedLinks);
      updateSocialLinks(updatedLinks);

      setLinks([...links, mapped]);
      setAddDialogOpen(false);
      setNewUsername("");
      setSelectedPlatform(null);
    } catch (err) {
      console.error("Failed to add link:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const availablePlatforms = Object.values(PLATFORMS);

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Social Links</h1>
          <p className="text-muted-foreground">
            Manage the links that appear on your public profile.
          </p>
        </div>

        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-dark font-bold rounded-xl h-11 shrink-0">
              <Plus className="w-4 h-4 mr-2" /> Add New Connect
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-white/5 sm:max-w-md max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Social Connection</DialogTitle>
            </DialogHeader>
            {!selectedPlatform ? (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {availablePlatforms.map((p) => {
                  const Icon = ICON_MAP[p.key] || LinkIcon;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPlatform(p.key)}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-background hover:border-primary/50 hover:bg-primary/5 transition-all gap-3"
                    >
                      <Icon className="w-6 h-6" style={{ color: p.color || "#fff" }} />
                      <span className="text-sm font-semibold">{p.displayName}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-background border border-white/5">
                  {(() => {
                    const Icon = ICON_MAP[selectedPlatform] || LinkIcon;
                    const color = PLATFORMS[selectedPlatform]?.color || "#fff";
                    return <Icon className="w-5 h-5 shrink-0" style={{ color }} />;
                  })()}
                  <span className="font-semibold">{PLATFORMS[selectedPlatform]?.displayName}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto h-7 text-xs"
                    onClick={() => setSelectedPlatform(null)}
                  >
                    Change
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {PLATFORMS[selectedPlatform]?.handleHint || "Username or URL"}
                  </label>
                  <Input
                    autoFocus
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder={PLATFORMS[selectedPlatform]?.handleHint || "your_handle"}
                    className="h-12 bg-background border-white/10"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddLink();
                    }}
                  />
                </div>

                <Button
                  onClick={handleAddLink}
                  disabled={!newUsername.trim() || isAdding}
                  className="w-full h-12 bg-primary font-bold rounded-xl"
                >
                  {isAdding ? "Adding..." : "Save Connection"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {links.length === 0 ? (
          <Card className="bg-card border-white/5 p-10 flex flex-col items-center justify-center text-center rounded-2xl border-dashed">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-primary/60" />
            </div>
            <h3 className="text-lg font-bold mb-1">No links added yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Your public profile is looking a bit empty. Add some social links so people can connect with you.
            </p>
            <Button onClick={() => setAddDialogOpen(true)} variant="outline" className="border-white/10">
              Add your first link
            </Button>
          </Card>
        ) : (
          links.sort((a, b) => a.sortOrder - b.sortOrder).map((link) => {
            const config = PLATFORMS[link.platform];
            const Icon = ICON_MAP[link.platform] || LinkIcon;
            
            return (
              <Card 
                key={link.id} 
                className={`bg-card border p-4 flex items-center gap-4 rounded-xl transition-all ${
                  link.isVisible ? 'border-white/10' : 'border-white/5 opacity-60'
                }`}
              >
                <div className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing p-1 hidden sm:block">
                  <GripVertical className="w-5 h-5" />
                </div>
                
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${config?.color || '#5B62F4'}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: config?.color || '#fff' }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base truncate">{config?.displayName || link.platform}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.url}
                  </p>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleVisibility(link)}
                    className={link.isVisible ? 'text-primary hover:text-primary-dark hover:bg-primary/10' : 'text-muted-foreground'}
                    title={link.isVisible ? "Hide link" : "Show link"}
                  >
                    {link.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(link.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Delete link"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
