"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { MagneticButton } from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Features", href: "#features" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 glass-effect shadow-lg shadow-black/20"
          : "py-5 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-gradient">LinkMeUp</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <MagneticButton>
            <Link href="/signup">
              <Button className="rounded-full px-6 bg-primary hover:bg-primary-dark text-white shadow-glow transition-all">
                Get Started
              </Button>
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-white/5">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-[#0a0a12] border-l border-white/5 p-0">
              <div className="flex flex-col h-full p-8">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-2xl font-black text-gradient">LinkMeUp</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-white/5"><X size={22} /></Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto pb-8 space-y-3">
                  <Link href="/signup" className="block">
                    <Button className="w-full rounded-full py-6 text-lg bg-primary hover:bg-primary-dark shadow-glow">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full rounded-full py-6 text-lg border-white/10 bg-white/5 hover:bg-white/10">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
