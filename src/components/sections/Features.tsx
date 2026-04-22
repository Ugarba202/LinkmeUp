"use client";

import React from "react";
import { motion } from "framer-motion";
import { QrCode, Zap, Globe2, Smartphone, BarChart3 } from "lucide-react";

export function Features() {
  return (
    <section className="py-16 bg-surface" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="text-gradient">share your world</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A powerful toolkit designed to put your entire social footprint into one scan.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {/* Large: Permanent QR */}
          <motion.div
            className="lg:col-span-2 bg-card rounded-2xl p-8 border border-white/5 card-hover group relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex-1">
              <QrCode className="w-10 h-10 text-primary mb-5" />
              <h3 className="text-xl font-bold mb-3 tracking-tight">Permanent QR Code</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Print it on your business card. Tattoo it. It works forever, even when your handles change.
              </p>
            </div>
            <div className="w-full md:w-56 h-56 bg-background rounded-xl border border-white/5 relative flex items-center justify-center overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-mesh opacity-40" />
              <div className="relative bg-card p-3 rounded-lg shadow-lg rotate-[-3deg] group-hover:rotate-0 transition-all duration-500 border border-white/10">
                <div className="w-28 h-28 bg-gradient-to-br from-primary/30 to-primary-light/20 rounded bg-grid-pattern" />
              </div>
              <div className="absolute -bottom-2 right-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full rotate-6 shadow-glow-sm">
                NEVER EXPIRES
              </div>
            </div>
          </motion.div>

          {/* Small: Real-Time Updates */}
          <motion.div
            className="bg-card rounded-2xl p-8 border border-white/5 card-hover group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
          >
            <Zap className="w-10 h-10 text-accent mb-5" />
            <h3 className="text-lg font-bold mb-2 tracking-tight">Real-Time Updates</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Change your Instagram? Your QR updates instantly everywhere. No reprinting.
            </p>
          </motion.div>

          {/* Small: All Platforms */}
          <motion.div
            className="bg-card rounded-2xl p-8 border border-white/5 card-hover group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.15 }}
          >
            <Globe2 className="w-10 h-10 text-success mb-5" />
            <h3 className="text-lg font-bold mb-2 tracking-tight">All Platforms</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Support for 50+ social networks, websites, and payment links.
            </p>
          </motion.div>

          {/* Small: Deep Linking */}
          <motion.div
            className="bg-card rounded-2xl p-8 border border-white/5 card-hover group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <Smartphone className="w-10 h-10 text-primary-light mb-5" />
            <h3 className="text-lg font-bold mb-2 tracking-tight">Deep Linking</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Opens links directly in native apps — not clunky in-app browsers.
            </p>
          </motion.div>

          {/* Large: Analytics */}
          <motion.div
            className="lg:col-span-2 bg-card rounded-2xl p-8 border border-white/5 card-hover group grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.25 }}
          >
            <div>
              <BarChart3 className="w-10 h-10 text-primary mb-5" />
              <h3 className="text-xl font-bold mb-3 tracking-tight">Premium Analytics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                See exactly who scanned your code, which links they clicked, and where they came from.
              </p>
            </div>
            <div className="h-44 md:h-auto bg-background rounded-xl p-5 border border-white/5 flex items-end justify-between gap-1.5 relative overflow-hidden">
              {[35, 55, 40, 75, 50, 90, 65].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-sm opacity-70"
                  style={{ height: `${h}%`, transformOrigin: "bottom" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.08, type: "spring" }}
                />
              ))}
              <div className="absolute bottom-2 left-3">
                <span className="text-[11px] font-semibold text-primary">+340 scans today</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
