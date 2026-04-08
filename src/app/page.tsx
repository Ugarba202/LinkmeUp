import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <InteractiveDemo />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
