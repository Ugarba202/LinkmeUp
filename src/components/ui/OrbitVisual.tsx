"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  SiInstagram, 
  SiTiktok, 
  SiSpotify, 
  SiYoutube, 
  SiLinkedin, 
  SiX 
} from "react-icons/si";
import { QrCode } from "lucide-react";

interface OrbitItemProps {
  radius: number;
  speed: number;
  delay?: number;
  children: React.ReactNode;
  direction?: 1 | -1;
}

const OrbitItem = ({ radius, speed, delay = 0, children, direction = 1 }: OrbitItemProps) => {
  return (
    <motion.div
      className="absolute"
      animate={{
        rotate: direction * 360,
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
    >
      <motion.div
        className="absolute"
        animate={{
          rotate: -direction * 360,
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        style={{
          left: `calc(50% - 20px)`,
          top: -20,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export function OrbitVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center">
      
      {/* ─── Concentric Paths ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[150px] h-[150px] border border-white/40 rounded-full" />
        <div className="absolute w-[300px] h-[300px] border border-white/20 rounded-full" />
        <div className="absolute w-[450px] h-[450px] border border-white/10 rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      {/* ─── Central Core (Empty for Orbit focus) ─────────────────────────── */}
      <div className="relative z-20 w-16 h-16 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      {/* ─── Orbiting Elements ──────────────────────────────────────────────── */}
      
      {/* Inner Orbit: Social Icons */}
      <OrbitItem radius={75} speed={15}>
        <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary shadow-glow-sm">
          <SiInstagram className="w-5 h-5" />
        </div>
      </OrbitItem>
      <OrbitItem radius={75} speed={15} delay={-7.5}>
        <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-secondary shadow-glow-sm">
          <SiTiktok className="w-5 h-5" />
        </div>
      </OrbitItem>

      {/* Middle Orbit: Avatars */}
      <OrbitItem radius={150} speed={25} direction={-1}>
        <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-white/20 to-transparent shadow-xl">
           <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <img src="https://i.pravatar.cc/150?u=1" alt="" className="w-full h-full object-cover" />
           </div>
        </div>
      </OrbitItem>
      <OrbitItem radius={150} speed={25} delay={-8} direction={-1}>
        <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-primary/30 to-transparent shadow-xl">
           <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <img src="https://i.pravatar.cc/150?u=2" alt="" className="w-full h-full object-cover" />
           </div>
        </div>
      </OrbitItem>
      <OrbitItem radius={150} speed={25} delay={-16} direction={-1}>
        <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 shadow-glow-sm">
          <SiSpotify className="w-5 h-5" />
        </div>
      </OrbitItem>

      {/* Outer Orbit: Large Avatars & Icons */}
      <OrbitItem radius={225} speed={40}>
        <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-secondary/40 to-transparent shadow-2xl">
           <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <img src="https://i.pravatar.cc/150?u=3" alt="" className="w-full h-full object-cover" />
           </div>
        </div>
      </OrbitItem>
      <OrbitItem radius={225} speed={40} delay={-13}>
        <div className="w-12 h-12 rounded-xl glass-card-premium flex items-center justify-center text-primary shadow-glow-lg">
          <QrCode className="w-6 h-6" />
        </div>
      </OrbitItem>
      <OrbitItem radius={225} speed={40} delay={-26}>
        <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-primary/40 to-transparent shadow-2xl">
           <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <img src="https://i.pravatar.cc/150?u=4" alt="" className="w-full h-full object-cover" />
           </div>
        </div>
      </OrbitItem>

    </div>
  );
}
