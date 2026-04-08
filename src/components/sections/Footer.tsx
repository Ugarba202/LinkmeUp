"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { SiInstagram, SiX, SiLinkedin, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedMeshBackground } from "@/components/ui/AnimatedMeshBackground";

const links = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Demo", href: "#demo" },
    { name: "Changelog", href: "#" },
  ],
  Company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  Resources: [
    { name: "Help Center", href: "#" },
    { name: "API", href: "#" },
    { name: "Status", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

const socials = [
  { name: "X", icon: SiX, href: "#" },
  { name: "Instagram", icon: SiInstagram, href: "#" },
  { name: "LinkedIn", icon: SiLinkedin, href: "#" },
  { name: "GitHub", icon: SiGithub, href: "#" },
];

export function Footer() {
  return (
    <>
      {/* CTA */}
      <AnimatedMeshBackground className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance">
              Ready to simplify your{" "}
              <span className="text-gradient">social presence</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto text-balance">
              Join 50,000+ creators sharing smarter. Get your permanent QR code in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold bg-primary hover:bg-primary-dark group shadow-glow w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedMeshBackground>

      {/* Footer */}
      <footer className="bg-[#050510] border-t border-white/5 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 rounded-lg overflow-hidden relative border border-white/10 group-hover:border-primary/50 transition-colors">
                  <img src="/images/logo.png" alt="" className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-20%]" />
                </div>
                <span className="text-xl font-black tracking-tighter text-gradient">LinkMeUp</span>
              </div>
              <p className="text-sm text-[#555566] leading-relaxed max-w-xs">
                One QR code for all your social links. Share smarter.
              </p>
            </div>

            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#555566] mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {items.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-sm text-[#8888a0] hover:text-foreground transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-white/5 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold text-sm mb-1">Stay in the loop</h4>
                <p className="text-xs text-[#555566]">Product updates and tips. No spam.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  placeholder="you@email.com"
                  className="bg-white/5 border-white/10 text-foreground placeholder:text-[#555566] h-10 rounded-full px-4 md:w-56"
                />
                <Button className="rounded-full h-10 px-5 bg-primary hover:bg-primary-dark">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#555566] flex items-center gap-1">
              &copy; {new Date().getFullYear()} LinkMeUp. Made with <Heart className="w-3 h-3 fill-red-500 text-red-500" />
            </p>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="text-[#555566] hover:text-foreground transition-colors" aria-label={s.name}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
