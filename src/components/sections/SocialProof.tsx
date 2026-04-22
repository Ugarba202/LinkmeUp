"use client";

import React from "react";
import { SiInstagram, SiTiktok, SiX, SiLinkedin, SiYoutube, SiSpotify, SiTwitch, SiSnapchat } from "react-icons/si";

const platforms = [
  { name: "Instagram", icon: SiInstagram },
  { name: "TikTok", icon: SiTiktok },
  { name: "X", icon: SiX },
  { name: "LinkedIn", icon: SiLinkedin },
  { name: "YouTube", icon: SiYoutube },
  { name: "Spotify", icon: SiSpotify },
  { name: "Twitch", icon: SiTwitch },
  { name: "Snapchat", icon: SiSnapchat },
];

export function SocialProof() {
  return (
    <section className="py-12 bg-surface border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by 50,000+ creators and professionals
        </p>
      </div>

      <div className="relative mask-edges">
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {[...platforms, ...platforms].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-3 px-10 opacity-20 hover:opacity-100 grayscale transition-all duration-500 cursor-pointer flex-shrink-0"
            >
              <p.icon className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
