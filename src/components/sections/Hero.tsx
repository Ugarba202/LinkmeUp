"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  SiInstagram,
  SiTiktok,
  SiX,
  SiLinkedin,
  SiYoutube,
  SiSpotify,
  SiGithub,
  SiTwitch,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { AnimatedMeshBackground } from "@/components/ui/AnimatedMeshBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const cyclingWords = ["All Your Socials.", "All Your Music.", "All Your Content.", "All Your Links."];

const platformIcons = [
  { icon: SiInstagram, label: "Instagram", color: "hover:text-pink-500" },
  { icon: SiTiktok, label: "TikTok", color: "hover:text-white" },
  { icon: SiX, label: "X", color: "hover:text-white" },
  { icon: SiLinkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: SiYoutube, label: "YouTube", color: "hover:text-red-500" },
  { icon: SiSpotify, label: "Spotify", color: "hover:text-green-500" },
  { icon: SiGithub, label: "GitHub", color: "hover:text-white" },
  { icon: SiTwitch, label: "Twitch", color: "hover:text-purple-400" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [username, setUsername] = useState("");

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  // Typing animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedMeshBackground>
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16"
      >
        {/* Interactive Focal Light */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-30"
          style={{
            background: useTransform(
              [springX, springY],
              ([x, y]: any) =>
                `radial-gradient(circle at ${(x as number) + 600}px ${(y as number) + 400}px, rgba(99, 102, 241, 0.15), transparent 500px)`
            ),
          }}
        />

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          {/* Announcement Chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-white/50 tracking-wide">
                We will be launching LinkMeUp soon
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] mb-8 max-w-5xl"
          >
            One QR.
            <br />
            {/* Cycling word with animation */}
            <span className="relative inline-block">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-gradient"
              >
                {cyclingWords[wordIndex]}
              </motion.span>
            </span>
            <br />
            <span className="text-white/15">Forever.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-white/35 max-w-xl mb-10 leading-relaxed"
          >
            Connect your entire digital presence into a single, permanent QR code.
            Update your links instantly. No reprinting, ever.
          </motion.p>

          {/* Username Claim CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-lg mb-6"
          >
            <div className="flex items-center gap-0 bg-white/[0.04] border border-white/10 rounded-full p-1.5 pl-6 backdrop-blur-xl hover:border-white/20 transition-colors focus-within:border-primary/40 focus-within:shadow-glow-sm">
              <span className="text-sm text-white/25 font-medium flex-shrink-0">linkmeup.app/</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder="yourname"
                className="flex-1 bg-transparent text-sm text-white font-semibold outline-none placeholder:text-white/15 min-w-0"
              />
              <MagneticButton>
                <Link href={`/signup${username ? `?u=${username}` : ""}`}>
                  <Button className="rounded-full px-6 h-10 text-sm font-bold bg-primary hover:bg-primary-dark shadow-glow transition-all whitespace-nowrap">
                    Claim Your Link
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <a href="#demo" className="text-xs text-white/25 hover:text-white/50 transition-colors font-medium">
              or see how it works ↓
            </a>
          </motion.div>

          {/* Phone Mockup — Centered */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative mb-12"
            style={{
              rotateX: useTransform(springY, [-300, 300], [3, -3]),
              rotateY: useTransform(springX, [-300, 300], [-3, 3]),
            }}
          >
            <PhoneMockup className="shadow-[0_40px_120px_-30px_rgba(99,102,241,0.35)]">
              <div className="w-full h-full flex flex-col pt-14 px-5">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border border-white/10 shadow-2xl relative bg-primary/20 p-0.5">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/40 to-primary-dark/30 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                  </div>
                  <span className="font-black text-lg tracking-tight text-primary-light">
                    @{username || "creative_dev"}
                  </span>
                  <span className="text-[#555566] text-xs mt-1 font-medium">Your link-in-bio</span>
                </div>

                <div className="space-y-2.5 w-full">
                  {[
                    { name: "Follow on Instagram", icon: SiInstagram, color: "text-pink-500/60" },
                    { name: "Watch on TikTok", icon: SiTiktok, color: "text-white/60" },
                    { name: "Listen on Spotify", icon: SiSpotify, color: "text-green-500/60" },
                  ].map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3 px-4 hover:bg-white/[0.07] transition-all duration-300 group cursor-pointer"
                    >
                      <link.icon className={`w-4.5 h-4.5 ${link.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-[12px] font-semibold tracking-tight">{link.name}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto mb-10 text-center">
                  <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary/40">
                      linkmeup.app/{username || "creative_dev"}
                    </span>
                  </div>
                </div>
              </div>
            </PhoneMockup>

            {/* Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </motion.div>

          {/* Platform Icons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {platformIcons.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06, type: "spring", stiffness: 200 }}
                className="group relative"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 ${p.color} hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300 cursor-pointer`}
                >
                  <p.icon className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedMeshBackground>
  );
}
