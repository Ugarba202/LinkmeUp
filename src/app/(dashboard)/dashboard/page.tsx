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
  Share2,
  TrendingUp,
  Layout,
  Link as LinkIcon,
  Scan
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardHome() {
  const { profile, loading, initialized } = useAuth();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Activity className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  if (!profile) return null;

  const stats = [
    { 
      label: "Profile Views", 
      value: profile.views, 
      sub: "Total page visits",
      icon: User,
      color: "#6366f1"
    },
    { 
      label: "Link Taps", 
      value: profile.clicks, 
      sub: "Engagement rate",
      icon: TrendingUp,
      color: "#10b981"
    },
    { 
      label: "Active Links", 
      value: profile.socialLinks.filter(l => l.isVisible).length, 
      sub: "Connected socials",
      icon: LinkIcon,
      color: "#f59e0b"
    },
  ];

  const handleCopyLink = () => {
    if (profile.publicUrl) {
      navigator.clipboard.writeText(profile.publicUrl);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* ─── Premium Hero Section ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-[#0F1021] rounded-[32px] p-8 md:p-12 text-white border border-white/5 shadow-2xl"
      >
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex-1 max-w-lg">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-primary mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Dashboard
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-[1.1] tracking-tight">
              Elevate Your <span className="text-gradient">Digital</span><br />Identity
            </h1>
            <p className="text-white/50 text-base md:text-lg mb-8 font-medium">
              Consolidate your digital world into one high-fidelity scan. Share your profile and track your impact in real-time.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button
                onClick={() => router.push("/dashboard/qr")}
                className="h-14 bg-white text-black hover:bg-white/90 font-black rounded-2xl px-8 shadow-xl transition-all active:scale-95"
              >
                <QrCode className="mr-3 w-5 h-5" />
                Manage Your Pass
              </Button>
              <Button
                onClick={() => router.push("/scan")}
                className="h-14 bg-primary text-white hover:brightness-110 font-black rounded-2xl px-8 shadow-glow transition-all active:scale-95"
              >
                <Scan className="w-5 h-5 mr-3" />
                Scan Profile
              </Button>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="h-14 border-white/10 bg-white/5 text-white hover:bg-white/10 font-black rounded-2xl px-8 transition-all"
              >
                <Copy className="w-5 h-5 mr-3" />
                Copy Profile Link
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
             <div className="w-48 h-48 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 flex items-center justify-center p-6 shadow-glow">
                <QrCode className="w-full h-full text-white/20" />
             </div>
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-4 -right-4 p-4 bg-primary rounded-2xl shadow-xl"
             >
                <TrendingUp className="w-6 h-6 text-white" />
             </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ─── Stats Grid ─── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Performance Metrics
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest"
            onClick={() => {
              setIsRefreshing(true);
              setTimeout(() => setIsRefreshing(false), 800);
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <Card className="bg-[#0F1021]/50 backdrop-blur-xl border-white/5 p-8 rounded-[32px] overflow-hidden transition-all group-hover:border-primary/30">
                <div 
                  className="absolute -right-6 -bottom-6 w-32 h-32 blur-[60px] opacity-20 rounded-full transition-all group-hover:opacity-40"
                  style={{ backgroundColor: stat.color }}
                />
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-4xl font-black mb-1 group-hover:translate-x-1 transition-transform">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{stat.label}</p>
                  <p className="text-xs text-white/20 font-medium">{stat.sub}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Quick Actions & Feed ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="font-black text-lg tracking-tight">Management Console</h3>
          <div className="grid grid-cols-2 gap-4">
            <ActionCard 
              icon={Plus} 
              title="Add Links" 
              desc="Add new socials"
              color="#6366f1"
              onClick={() => router.push("/dashboard/socials")}
            />
            <ActionCard 
              icon={ExternalLink} 
              title="Live View" 
              desc="Preview profile"
              color="#10b981"
              onClick={() => window.open(`/u/${profile.username}`, '_blank')}
            />
            <ActionCard 
              icon={Layout} 
              title="Pass Style" 
              desc="Customize look"
              color="#f59e0b"
              onClick={() => router.push("/dashboard/profile")}
            />
            <ActionCard 
              icon={Settings} 
              title="Settings" 
              desc="Account config"
              color="#ec4899"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <h3 className="font-black text-lg tracking-tight text-center md:text-left">Global Activity</h3>
          <Card className="bg-[#0F1021]/50 backdrop-blur-xl rounded-[32px] border border-white/5 p-10 flex flex-col items-center justify-center min-h-[220px] text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-primary/40" />
            </div>
            <p className="text-lg font-black mb-2">Awaiting Tractions</p>
            <p className="text-sm text-white/30 font-medium max-w-[280px]">
              Global scan events and real-time interaction metrics will appear here.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="group flex flex-col items-center text-center p-6 bg-[#0F1021]/50 backdrop-blur-xl border border-white/5 rounded-[32px] hover:border-white/10 hover:bg-white/[0.04] transition-all active:scale-[0.98]"
    >
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <p className="font-black text-[15px] mb-1">{title}</p>
      <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">{desc}</p>
    </button>
  );
}
