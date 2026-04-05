import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import phoneMockup1 from "@/assets/phone-mockup-1.png";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-primary/30 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={phoneMockup1}
                alt="LinkMeUp App"
                className="w-64 mx-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/3 text-center lg:text-left"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Ready to Simplify
              <br />
              <span className="gradient-text">Your Connections?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Join thousands of students and professionals who've already upgraded their networking game. Download LinkMeUp today — it's free!
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-2xl hover:opacity-90 transition-opacity"
              >
                <FaApple size={28} />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="font-semibold text-lg">App Store</div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-2xl hover:opacity-90 transition-opacity"
              >
                <FaGooglePlay size={24} />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="font-semibold text-lg">Google Play</div>
                </div>
              </motion.a>
            </div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 text-muted-foreground text-sm"
            >
              ✓ No credit card required &nbsp;•&nbsp; ✓ Free forever plan &nbsp;•&nbsp; ✓ Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
