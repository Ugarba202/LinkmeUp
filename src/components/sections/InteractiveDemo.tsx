"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { SiInstagram, SiTiktok, SiX, SiSpotify } from "react-icons/si";

export function InteractiveDemo() {
  const [username, setUsername] = useState("creative_dev");
  const [platforms, setPlatforms] = useState({ ig: true, tt: true, tw: false, sp: true });
  const [theme, setTheme] = useState(0);
  const themes = [
    { name: "Indigo", ring: "ring-indigo-500", accent: "text-indigo-400" },
    { name: "Emerald", ring: "ring-emerald-500", accent: "text-emerald-400" },
    { name: "Rose", ring: "ring-rose-500", accent: "text-rose-400" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
            Try it <span className="text-gradient">yourself</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Customize your profile and watch it update in real-time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto items-center lg:items-start">
          {/* Controls */}
          <div className="w-full lg:w-1/2 bg-card p-8 rounded-2xl border border-white/5 order-2 lg:order-1 space-y-8">
            {/* Username */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">linkmeup.com/</span>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-[110px] h-12 bg-background border-white/10 focus-visible:ring-primary text-foreground"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Platforms */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platforms</label>
              <div className="space-y-2.5">
                {[
                  { key: "ig" as const, name: "Instagram", icon: SiInstagram, color: "text-pink-500" },
                  { key: "tt" as const, name: "TikTok", icon: SiTiktok, color: "text-foreground" },
                  { key: "tw" as const, name: "X (Twitter)", icon: SiX, color: "text-foreground" },
                ].map((p) => (
                  <div key={p.key} className="flex items-center justify-between p-3 bg-background rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <p.icon className={`w-5 h-5 ${p.color}`} />
                      <span className="text-sm font-medium">{p.name}</span>
                    </div>
                    <Switch checked={platforms[p.key]} onCheckedChange={(v) => setPlatforms({ ...platforms, [p.key]: v })} />
                  </div>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Brand Color</label>
              <div className="flex gap-3">
                {[
                  { bg: "bg-indigo-500" },
                  { bg: "bg-emerald-500" },
                  { bg: "bg-rose-500" },
                ].map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTheme(i)}
                    className={`w-10 h-10 rounded-full ${t.bg} transition-all ${
                      theme === i ? "ring-2 ring-offset-2 ring-offset-background scale-110" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
            <PhoneMockup>
              <div className="w-full h-full flex flex-col pt-14 px-5">
                <div className="flex flex-col items-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light mb-3 ring-2 ${themes[theme].ring} ring-offset-2 ring-offset-[#0a0a12]`} />
                  <span className={`font-bold text-lg ${themes[theme].accent}`}>@{username || "username"}</span>
                  <span className="text-[#555566] text-xs mt-0.5">Your link-in-bio</span>
                </div>
                <div className="space-y-2.5 w-full">
                  {platforms.ig && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full py-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3 px-4">
                      <SiInstagram className="w-5 h-5 text-pink-500" /><span className="text-sm font-medium">Follow on Instagram</span>
                    </motion.div>
                  )}
                  {platforms.tt && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full py-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3 px-4">
                      <SiTiktok className="w-5 h-5" /><span className="text-sm font-medium">Watch on TikTok</span>
                    </motion.div>
                  )}
                  {platforms.tw && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full py-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3 px-4">
                      <SiX className="w-5 h-5" /><span className="text-sm font-medium">Follow on X</span>
                    </motion.div>
                  )}
                  {platforms.sp && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full py-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3 px-4">
                      <SiSpotify className="w-5 h-5 text-green-500" /><span className="text-sm font-medium">Listen on Spotify</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
