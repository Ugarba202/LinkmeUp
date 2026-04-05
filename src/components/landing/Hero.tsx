import { motion } from "framer-motion";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import phoneMockup1 from "@/assets/phone-mockup-1.png";
import phoneMockup2 from "@/assets/phone-mockup-2.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Free to use • No ads</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              One Scan.
              <br />
              <span className="gradient-text">All Your Socials.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Stop giving out 10 different usernames. Share all your social profiles with a single QR code that anyone can scan.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
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

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start">
              <div>
                <div className="font-display text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-bold gradient-text">4.9★</div>
                <div className="text-sm text-muted-foreground">App Rating</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="font-display text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            {/* Main Phone */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="relative">
                <Image
                  src={phoneMockup1}
                  alt="LinkMeUp App showing QR code"
                  className="w-64 sm:w-80 h-auto drop-shadow-2xl"
                />
                <div className="absolute inset-0 glow rounded-3xl" />
              </div>
            </motion.div>

            {/* Secondary Phone */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 sm:right-8 top-20 z-0"
            >
              <Image
                src={phoneMockup2}
                alt="LinkMeUp App showing social profiles"
                className="w-48 sm:w-64 h-auto drop-shadow-xl opacity-90"
              />
            </motion.div>

            {/* Animated QR Code Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -left-4 sm:left-0 bottom-10 glass-card p-4 animate-pulse-glow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm-4 2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm0-2h1v1h-1v-1zm0-2h1v1h-1v-1z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Scan to Connect</div>
                  <div className="text-xs text-muted-foreground">Instant sharing</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <HiChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
