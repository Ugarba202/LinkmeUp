"use client";

import { useRef, useState } from "react";
import { Download, Copy, Check, QrCode as QrIcon, Share2, Printer, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function QRPage() {
  const { profile, user, initialized } = useAuth();
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!initialized || !profile || !user) return null;

  const publicUrl = `https://linkmeup.app/u/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = (format: "svg" | "png") => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `linkmeup-${profile.username}-qr.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 1024;
        canvas.height = 1024;
        ctx?.drawImage(img, 0, 0, 1024, 1024);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `linkmeup-${profile.username}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-black tracking-tight mb-3">Your Digital Pass</h1>
        <p className="text-muted-foreground text-lg">
          Share your unique QR code with the world and grow your network instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* QR Preview Card */}
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-card border-white/5 shadow-2xl rounded-3xl relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div 
                  ref={qrRef}
                  className="p-6 bg-white rounded-2xl shadow-inner mb-6 transition-transform duration-500 group-hover:scale-[1.02]"
                >
                  <QRCodeSVG
                    value={publicUrl}
                    size={240}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "/images/logo.png",
                      x: undefined,
                      y: undefined,
                      height: 48,
                      width: 48,
                      excavate: true,
                    }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-1">{profile.fullName}</h3>
                <p className="text-primary font-semibold text-lg mb-4">@{profile.username}</p>
                
                <div className="w-full h-px bg-white/5 mb-6" />
                
                <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                  <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {publicUrl.replace("https://", "")}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className="ml-2 hover:text-primary transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          <Card className="p-6 bg-primary/5 border-primary/20 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-base">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                Add this QR code to your email signature or print it on your business cards for instant access.
              </p>
            </div>
          </Card>
        </div>

        {/* Actions & Customization */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Download Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => downloadQR("png")}
                className="h-16 rounded-2xl bg-card border border-white/10 hover:bg-white/5 hover:border-primary/50 text-foreground flex flex-col gap-1 items-center justify-center transition-all group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">PNG Image</span>
              </Button>
              <Button 
                onClick={() => downloadQR("svg")}
                className="h-16 rounded-2xl bg-card border border-white/10 hover:bg-white/5 hover:border-primary/50 text-foreground flex flex-col gap-1 items-center justify-center transition-all group"
              >
                <QrIcon className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">SVG Vector</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Share Link</h3>
            <div className="flex gap-4">
              <Button 
                onClick={handleCopy}
                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-dark font-bold shadow-glow"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy URL"}
              </Button>
              <Button 
                variant="outline"
                className="h-12 w-12 rounded-xl border-white/10 shrink-0"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline"
                className="h-12 w-12 rounded-xl border-white/10 shrink-0"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-card border-white/5 rounded-3xl border-dashed relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <h3 className="text-lg font-bold mb-2">Need a custom design?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Our Pro plan allows you to change QR colors, shapes, and add your brand logo directly to the center.
              </p>
              <Button variant="outline" className="rounded-xl border-primary/30 text-primary hover:bg-primary/5">
                Unlock Custom QR
              </Button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}
