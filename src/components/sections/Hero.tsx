"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { 
  SiInstagram as Instagram, 
  SiLinkedin as Linkedin, 
  SiX as Twitter, 
  SiYoutube as Youtube,
  SiInstagram,
  SiTiktok,
  SiSpotify
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { AnimatedMeshBackground } from "@/components/ui/AnimatedMeshBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const floatingIcons = [
  { icon: Instagram, x: -180, y: -120, delay: 0.1, color: "text-pink-500/40" },
  { icon: Linkedin, x: 200, y: -80, delay: 0.3, color: "text-blue-500/40" },
  { icon: Twitter, x: -150, y: 140, delay: 0.5, color: "text-sky-400/40" },
  { icon: Youtube, x: 180, y: 100, delay: 0.7, color: "text-red-500/40" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <AnimatedMeshBackground>
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Content Side */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                  <div className="w-5 h-5 rounded-md overflow-hidden relative border border-primary/20">
                    <img src="/images/logo.png" alt="" className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-20%]" />
                  </div>
                  We will be launching LinkMeUp soon
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                  One QR. <br />
                  <span className="text-gradient">All Your Socials.</span> <br />
                  <span className="text-white/40">Forever.</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Connect your entire digital presence into a single, permanent QR code.
                  Update your links instantly. No reprinting, ever.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                  <MagneticButton>
                    <Link href="/signup">
                      <Button size="lg" className="rounded-full px-8 h-16 text-lg font-bold bg-primary hover:bg-primary-dark shadow-glow transition-all">
                        Get Started Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </MagneticButton>
                  <a href="#demo">
                    <Button variant="ghost" className="text-lg font-semibold hover:bg-white/5 h-16 rounded-full px-8">
                      View Demo
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Visual Side (Dynamic Phone Mockup) */}
            <div className="flex-1 relative">
              <motion.div
                className="relative z-10 flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  rotateX: useTransform(springY, [-300, 300], [5, -5]),
                  rotateY: useTransform(springX, [-300, 300], [-5, 5]),
                }}
              >
                <PhoneMockup className="hover:shadow-glow-lg transition-shadow duration-700">
                  <div className="w-full h-full flex flex-col pt-14 px-5">
                    <div className="flex flex-col items-center mb-10">
                      <div className="w-20 h-20 rounded-[2rem] overflow-hidden mb-6 border border-white/10 shadow-2xl relative bg-secondary">
                         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                         {/* Profile Image Placeholder */}
                         <div className="w-full h-full flex items-center justify-center">
                           <div className="w-10 h-10 rounded-full border-2 border-primary/30" />
                         </div>
                      </div>
                      <span className="font-black text-2xl tracking-tight text-primary-light">@creative_dev</span>
                      <span className="text-[#555566] text-sm mt-1 font-medium">Your link-in-bio</span>
                    </div>

                    <div className="space-y-3 w-full">
                      {[
                        { name: "Follow on Instagram", icon: SiInstagram, color: "hover:text-pink-500" },
                        { name: "Watch on TikTok", icon: SiTiktok, color: "hover:text-white" },
                        { name: "Listen on Spotify", icon: SiSpotify, color: "hover:text-green-500" },
                      ].map((link, i) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className={`w-full py-3.5 rounded-2xl bg-[#12121e] border border-white/5 flex items-center gap-4 px-5 group cursor-not-allowed ${link.color} transition-all duration-300`}
                        >
                          <link.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                          <span className="text-[13px] font-bold tracking-tight">{link.name}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Fixed floating banner inside phone */}
                    <div className="mt-auto mb-10 text-center">
                       <div className="inline-block px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary/50">linkmeup.app/creative_dev</span>
                       </div>
                    </div>
                  </div>
                </PhoneMockup>
              </motion.div>

              {/* Floating Icons with independent parallax */}
              {floatingIcons.map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`absolute z-0 ${item.color}`}
                  style={{
                    left: "50%",
                    top: "50%",
                    x: useTransform(springX, (value) => item.x + value * (0.05 * (idx + 1))),
                    y: useTransform(springY, (value) => item.y + value * (0.05 * (idx + 1))),
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                >
                  <div className="p-4 glass-card rounded-2xl">
                    <item.icon className="w-6 h-6" />
                  </div>
                </motion.div>
              ))}

              {/* Glowing effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
            </div>

          </div>
        </div>
      </section>
    </AnimatedMeshBackground>
  );
}
