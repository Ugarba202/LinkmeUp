"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is the QR code really permanent?", a: "Yes! Your QR code is tied to your unique LinkMeUp profile URL, not your social handles directly. You can change any of your connected links at any time and the same QR code will always point to the latest version." },
  { q: "Which platforms can I connect?", a: "We support 50+ platforms including Instagram, TikTok, X, LinkedIn, YouTube, Spotify, Snapchat, GitHub, Discord, Telegram, WhatsApp, and many more. You can also add any custom URL." },
  { q: "Can I change my username later?", a: "Absolutely. You can update your LinkMeUp username once every 30 days on the free plan, unlimited changes with Pro. Your QR code will automatically redirect." },
  { q: "Do people need an app to scan?", a: "No app is needed. Anyone can scan your QR with their phone's native camera and they'll be taken directly to your profile in the browser. Works on every modern smartphone." },
  { q: "How is this different from Linktree?", a: "LinkMeUp is mobile-first with a permanent QR code as the core feature. Unlike Linktree, your QR never changes even when your links do. We also offer deep linking, richer analytics, and a more modern interface." },
  { q: "Is there a free version?", a: "Yes! The free tier includes up to 3 social links, a basic QR code, 7-day analytics history, and a standard profile page. No credit card required." },
  { q: "Can I use LinkMeUp for my business?", a: "Yes. Teams and businesses can reach out for custom enterprise plans that include branded QR codes, team analytics dashboards, and centralized management of multiple profiles." },
];

export function FAQ() {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">Everything you need to know.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="bg-card border border-white/5 rounded-xl px-5 overflow-hidden data-[state=open]:shadow-glow-sm transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 text-sm">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
