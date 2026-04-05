"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { ArrowRight, PlayCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedMeshBackground } from "@/components/ui/AnimatedMeshBackground";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
};

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <AnimatedMeshBackground className="min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* Left Content */}
          <motion.div
            className="w-full lg:w-[55%] text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">Introducing LinkMeUp</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] font-extrabold tracking-tight mb-6">
              One Scan.{" "}
              <span className="text-gradient">All Your Socials.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed text-balance">
              Connect your social media. Generate a permanent QR code. Share it anywhere. Update anytime — your QR never changes.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <MagneticButton>
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold bg-primary hover:bg-primary-dark group shadow-glow w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 text-foreground w-full sm:w-auto">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Free forever", "No app needed to scan", "Works everywhere"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            className="w-full lg:w-[45%] flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Glow behind phone */}
              <motion.div
                className="absolute inset-0 bg-primary/25 blur-[100px] rounded-full scale-125 -z-10"
                animate={{ scale: [1.15, 1.3, 1.15], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="animate-float">
                <PhoneMockup className="shadow-2xl shadow-primary/10">
                  {/* App Screen Content */}
                  <div className="w-full h-full flex flex-col items-center pt-14 px-5">
                    {/* Profile Header */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light mb-3 ring-2 ring-primary/30 ring-offset-2 ring-offset-[#0a0a12]" />
                    <span className="text-gradient font-bold text-lg mb-1">@alexdesign</span>
                    <span className="text-[#8888a0] text-xs mb-5">Product Designer & Creator</span>

                    {/* QR Code */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-5">
                      <div className="w-36 h-36 bg-grid-pattern rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-light/20" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a12] rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary-light" />
                        </div>
                      </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="w-full space-y-2.5">
                      {[
                        { label: "Instagram", color: "bg-gradient-to-br from-pink-500 to-purple-500" },
                        { label: "TikTok", color: "bg-[#010101] border-white/20" },
                        { label: "LinkedIn", color: "bg-gradient-to-br from-blue-600 to-blue-500" },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className={cn(
                            "w-full py-3 rounded-xl text-center text-sm font-medium text-white shadow-sm",
                            s.color
                          )}
                        >
                          {s.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </PhoneMockup>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedMeshBackground>
  );
}
