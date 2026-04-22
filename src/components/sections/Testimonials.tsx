"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50,000+", label: "Downloads" },
  { value: "120+", label: "Universities" },
  { value: "500K+", label: "Connections Made" },
];

const testimonials = [
  {
    quote: "LinkMeUp has revolutionized how I connect with other developers and creators. Having one scan for all my social media is a huge time-saver.",
    name: "Usman Umar Garba",
    role: "Lead Developer & Tech Lead",
    avatar: "/images/ucee.jpeg",
  },
  {
    quote: "The analytics and ease of use in LinkMeUp are unmatched. It helped me grow my audience by keeping all my links in one place.",
    name: "Mubarak Abdullateef",
    role: "Full-Stack Engineer",
    avatar: "/images/Mubarak.jpeg",
  },
  {
    quote: "As a creator, I love how I can update my links instantly without changing my QR code. It's the most efficient tool for digital networking.",
    name: "Kamal Aliyu",
    role: "UI/UX Designer & Content Creator",
    avatar: "/images/kamal.jpeg",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[current];

  return (
    <section className="py-16 bg-surface" id="about">
      <div className="container mx-auto px-4 md:px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{s.value}</div>
              <p className="text-muted-foreground text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="text-6xl font-black text-primary/10 select-none mb-2">&ldquo;</div>

          <div className="min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-md md:text-lg leading-relaxed text-foreground/90 mb-6 text-balance italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-primary/20 ring-offset-2 ring-offset-surface bg-surface">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon" className="rounded-full border border-white/10 hover:bg-white/5" onClick={prev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-1.5 bg-white/10"}`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" className="rounded-full border border-white/10 hover:bg-white/5" onClick={next}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="mt-5 w-full max-w-xs mx-auto h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              key={`p-${current}-${paused}`}
              initial={{ width: "0%" }}
              animate={paused ? {} : { width: "100%" }}
              transition={paused ? {} : { duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
