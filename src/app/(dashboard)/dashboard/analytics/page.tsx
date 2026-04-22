"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer2, 
  QrCode,
  ArrowUpRight,
  Globe,
  Calendar
} from "lucide-react";
import { Card } from "@/components/ui/card";

const STATS = [
  { label: "Total Reach", value: "2,842", change: "+12.5%", icon: Users, color: "#6366f1" },
  { label: "QR Scans", value: "842", change: "+8.2%", icon: QrCode, color: "#a855f7" },
  { label: "Link Clicks", value: "1,205", change: "+24.1%", icon: MousePointer2, color: "#ec4899" },
  { label: "Conversion", value: "42.4%", change: "+5.4%", icon: TrendingUp, color: "#22c55e" },
];

const PLATFORMS = [
  { name: "Instagram", clicks: 452, percent: 38, color: "#E1306C" },
  { name: "TikTok", clicks: 312, percent: 26, color: "#ffffff" },
  { name: "YouTube", clicks: 198, percent: 16, color: "#FF0000" },
  { name: "Twitter", clicks: 142, percent: 12, color: "#ffffff" },
  { name: "Other", clicks: 101, percent: 8, color: "#6366f1" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]"
          >
            <BarChart3 className="w-3 h-3" /> Intelligence Matrix
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
            Identity <span className="text-primary">Performance</span>.
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="h-10 px-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Calendar className="w-3.5 h-3.5" /> Last 30 Days
           </div>
        </div>
      </div>

      {/* ─── Top Stats ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 bg-white/[0.02] backdrop-blur-3xl border-white/5 rounded-2xl relative overflow-hidden group hover:bg-white/[0.04] transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-3">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h4 className="text-xl font-black tracking-tight">{stat.value}</h4>
                <span className="text-[10px] font-black text-green-500 flex items-center">
                  {stat.change} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ─── Charts Section ─── */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Activity Visualization (Placeholder) */}
        <Card className="lg:col-span-2 p-6 bg-white/[0.02] border-white/5 rounded-3xl relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <TrendingUp className="w-3.5 h-3.5 text-primary" /> Traffic Flux
              </h4>
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />)}
              </div>
           </div>
           
           <div className="h-48 flex items-end gap-2 px-2">
              {[40, 65, 45, 90, 55, 75, 40, 85, 60, 45, 70, 95, 50, 65].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + (i * 0.05), duration: 1 }}
                  className="flex-1 bg-gradient-to-t from-primary/5 via-primary/20 to-primary/40 rounded-t-sm relative group"
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {Math.round(h * 2.5)}
                   </div>
                </motion.div>
              ))}
           </div>
           <div className="flex justify-between mt-4 px-2 text-[9px] font-black text-white/10 uppercase tracking-widest">
              <span>01 Oct</span>
              <span>15 Oct</span>
              <span>30 Oct</span>
           </div>
        </Card>

        {/* Platform Breakdown */}
        <Card className="p-6 bg-white/[0.02] border-white/5 rounded-3xl relative overflow-hidden">
           <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-6">
              <Globe className="w-3.5 h-3.5 text-secondary" /> Sources
           </h4>
           
           <div className="space-y-5">
              {PLATFORMS.map((p, i) => (
                <div key={p.name} className="space-y-1.5">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                      <span className="text-white/40">{p.name}</span>
                      <span>{p.clicks} <span className="text-white/20">clicks</span></span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${p.percent}%` }}
                        transition={{ delay: 1 + (i * 0.1), duration: 1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[9px] text-white/20 font-black uppercase tracking-widest text-center leading-relaxed">
                 Top performing node: <span className="text-white/60">Instagram</span>
              </p>
           </div>
        </Card>

      </div>
    </div>
  );
}
