"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, 
  Plus, 
  Activity, 
  ExternalLink, 
  RefreshCw, 
  QrCode, 
  User, 
  Settings, 
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Share2,
  Check,
  Layout,
  Link as LinkIcon
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SettingsDialog } from "@/components/ui/settings-dialog";

export default function DashboardHome() {
  const { profile, loading, initialized } = useAuth();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!initialized || loading) {
    return (
      <div className="space-y-12 pb-20 w-full animate-pulse pt-4">
        {/* Skeleton Header */}
        <section className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10" />
          <div className="space-y-3">
            <div className="w-20 h-2 bg-white/5 rounded-full" />
            <div className="w-48 h-8 bg-white/10 rounded-full" />
          </div>
        </section>
        
        {/* Skeleton Hero */}
        <section className="space-y-6">
          <div className="w-64 h-10 bg-white/5 rounded-full" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8">
             <div className="h-[240px] rounded-[32px] bg-white/[0.03] border border-white/5" />
             <div className="grid grid-cols-1 gap-4">
                <div className="h-[72px] rounded-3xl bg-white/[0.02] border border-white/5" />
                <div className="h-[72px] rounded-3xl bg-white/[0.02] border border-white/5" />
                <div className="h-[72px] rounded-3xl bg-white/[0.02] border border-white/5" />
             </div>
          </div>
        </section>
      </div>
    );
  }

  if (!profile) return null;

  const stats = [
    { label: "Reach", value: profile.views, icon: User, color: "#6366f1" },
    { label: "Taps", value: profile.clicks, icon: TrendingUp, color: "#10b981" },
    { label: "Links", value: profile.socialLinks.filter(l => l.isVisible).length, icon: LinkIcon, color: "#f59e0b" },
  ];

  const handleCopyLink = () => {
    if (profile.publicUrl) {
      navigator.clipboard.writeText(profile.publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12 pb-20 relative">
      
      {/* ─── AI-Premium Background Elements ─── */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      
      {/* ─── Heading & Welcome ─── */}
      <section className="flex flex-col md:flex-row md:items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-white/10 p-1 flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
          <div className="w-full h-full rounded-[14px] overflow-hidden bg-card border border-white/5 relative">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <User className="w-6 h-6 text-primary/40" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-primary flex items-center justify-center border-4 border-background shadow-lg">
            <Check className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <div className="space-y-0.5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[9px]"
          >
          
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
            Welcome, <span className="text-gradient">{profile.fullName?.split(' ')[0] || 'User'}</span>.
          </h1>
        </div>
      </section>

      {/* ─── Hero Action Section ─── */}
      <section className="relative">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-6">
          Manage your <span className="text-gradient">Permanent</span> Pass.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8">
          {/* Main Link Card */}
          <Card className="bg-white/[0.03] backdrop-blur-3xl border-white/5 p-6 md:p-8 rounded-[32px] relative overflow-hidden flex flex-col justify-between min-h-[240px]">
             <div className="relative z-10">
                <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-6">Your Primary Link</p>
                <div className="flex flex-col gap-1">
                   <h2 className="text-2xl md:text-3xl font-black break-all group cursor-pointer" onClick={handleCopyLink}>
                     linkmeup.app/u/<span className="text-primary">{profile.username}</span>
                   </h2>
                </div>
             </div>

             <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  onClick={handleCopyLink}
                  className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied" : "Copy Link"}
                </Button>
                <Button 
                  onClick={() => router.push("/dashboard/qr")}
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs"
                >
                  <QrCode className="w-4 h-4 mr-2" /> View QR Pass
                </Button>
             </div>
             
             {/* Background Graphic */}
             <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-5 pointer-events-none">
                <QrCode className="w-64 h-64 text-white" />
             </div>
          </Card>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4">
             {stats.map((stat, i) => (
               <Card key={stat.label} className="bg-white/[0.02] border-white/5 p-4 rounded-3xl flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/5">
                      <stat.icon className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-0.5">{stat.label}</p>
                      <p className="text-lg font-black tracking-tight">{stat.value}</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3 h-3 text-primary" />
                  </div>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Management Console ─── */}
      <section className="space-y-6">
        <h3 className="font-black text-lg tracking-tight px-2 flex items-center gap-2">
           <Layout className="w-5 h-5 text-primary" /> Management Console
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard 
            icon={Plus} 
            title="Add Links" 
            desc="Connect Socials"
            color="#6366f1"
            onClick={() => router.push("/dashboard/socials")}
          />
          <ActionCard 
            icon={ExternalLink} 
            title="Live Preview" 
            desc="Your profile"
            color="#10b981"
            onClick={() => window.open(`/u/${profile.username}`, '_blank')}
          />
          <ActionCard 
            icon={Palette} 
            title="Style" 
            desc="Visual Pass"
            color="#f59e0b"
            onClick={() => router.push("/dashboard/profile")}
          />
          <ActionCard 
            icon={Settings} 
            title="Settings" 
            desc="Config"
            color="#ec4899"
            onClick={() => setSettingsOpen(true)}
          />
        </div>
      </section>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}

function Palette({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}

function ActionCard({ icon: Icon, title, desc, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="group flex flex-col items-start p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-white/10 hover:bg-white/[0.04] transition-all active:scale-[0.98] text-left"
    >
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <p className="font-black text-sm mb-0.5">{title}</p>
      <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30">{desc}</p>
    </button>
  );
}
