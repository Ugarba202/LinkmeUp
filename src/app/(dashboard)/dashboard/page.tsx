"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Plus, Activity, ExternalLink, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function DashboardHome() {
  const { profile, loading, initialized } = useAuth();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const supabase = createClient();

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Activity className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  // Safe fallback if profile is missing somehow
  if (!profile) return null;

  const stats = [
    { label: "Profile Views", value: profile.views, sub: "Total page visits" },
    { label: "Link Taps", value: profile.clicks, sub: "Total link interactions" },
    { label: "Active Links", value: profile.socialLinks.filter(l => l.isVisible).length, sub: "Connected platforms" },
  ];

  const handleCopyLink = () => {
    if (profile.publicUrl) {
      navigator.clipboard.writeText(profile.publicUrl);
      // Would add a toast notification here in a full implementation
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section matching mobile HomeScreen gradient card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#5B62F4] to-[#8187F7] rounded-3xl p-8 md:p-10 text-white mb-10 shadow-[0_10px_40px_-10px_rgba(91,98,244,0.4)]">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Elevate Your Digital<br />Identity
          </h1>
          <p className="text-white/90 max-w-md text-sm md:text-base mb-8">
            LinkMeUp lets you consolidate your Instagram, TikTok, and more into one single scan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => router.push("/dashboard/qr")}
              className="bg-white text-[#5B62F4] hover:bg-white/90 font-bold rounded-xl px-6"
            >
              Manage Your Pass
            </Button>
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold rounded-xl px-6"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Public Link
            </Button>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 translate-y-1/2 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight">Your Impact</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => {
            setIsRefreshing(true);
            setTimeout(() => setIsRefreshing(false), 800); // Simulate refresh
          }}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            className="bg-card border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Activity className="w-3 h-3 text-primary" />
              {stat.label}
            </p>
            <p className="text-4xl font-black text-gradient">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          <Card className="bg-card rounded-2xl border border-white/5 p-2 flex flex-col gap-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 rounded-xl text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/dashboard/socials")}
            >
              <Plus className="w-5 h-5 mr-3 text-primary" />
              Add New Connect
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 rounded-xl text-muted-foreground hover:text-foreground"
              onClick={() => window.open(profile.publicUrl || `/u/${profile.username}`, '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-3 text-primary" />
              Preview Public Profile
            </Button>
          </Card>
        </div>

        {/* Activity Feed Placeholder */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Recent Activity</h2>
          <Card className="bg-card rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center min-h-[148px] text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5 text-primary/60" />
            </div>
            <p className="text-sm font-medium text-foreground">Waiting for activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Stats and real-time scan events will appear here once you share your code.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
