"use client";

import { useRef, useState } from "react";
import {
  Download,
  Copy,
  Check,
  QrCode as QrIcon,
  Share2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Info
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="max-w-3xl mx-auto space-y-12 pb-20 relative">

      {/* ─── AI-Premium Background Elements ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* ─── Header ─── */}
      <div className="flex flex-col items-center text-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-secondary font-black uppercase tracking-[0.3em] text-[10px]"
        >

        </motion.div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
          Your <span className="text-secondary">Digital</span> Identity Pass.
        </h1>
      </div>

      <div className="flex flex-col items-center gap-12">

        {/* ─── Simplified Hero Preview (No Container) ─── */}
        <div className="flex flex-col items-center justify-center space-y-6 w-full relative">
          <motion.div
            ref={qrRef}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-white rounded-2xl shadow-[0_25px_80px_-20px_rgba(99,102,241,0.2)] mb-4 cursor-pointer relative"
          >
            <QRCodeSVG
              value={publicUrl}
              size={220}
              level="H"
              fgColor="#6366f1"
              includeMargin={false}
            />
          </motion.div>

          <div className="text-center relative z-10 w-full flex flex-col items-center space-y-2 px-4">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white/90">
              Here is your code <span className="text-secondary">!!</span>
            </h3>
            <p className="text-xs md:text-sm font-bold text-white/40 leading-relaxed max-w-[280px]">
              Scan this unique QR Code to view my full digital identity.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap gap-3 justify-center w-full pt-4">
            <Button
              onClick={() => downloadQR("png")}
              className="h-12 px-6 rounded-xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5 mr-2" /> Download Image
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              className="h-12 px-6 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 mr-2 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
              {copied ? "Copied!" : "Copy URL"}
            </Button>
          </div>
        </div>

        {/* ─── Secondary Info & Options ─── */}
        <div className="w-full max-w-sm space-y-10">
          {/* Mobile Awareness Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h4 className="font-black text-[11px] mb-1 uppercase tracking-widest">Permanent Token</h4>
              <p className="text-[10px] text-white/30 font-medium leading-relaxed">
                This QR code encodes your permanent user ID. Update your links anytime—your printed QR will **never** need to be changed.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center overflow-hidden border border-white/5">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="text-2xl font-black text-white/20">{profile.fullName?.[0]}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black tracking-tight">{profile.fullName}</h4>
              <p className="text-secondary text-xs font-black uppercase tracking-widest">@{profile.username}</p>
            </div>
          </div>

          {/* Additional Tips */}
          <div className="p-6 text-center">
            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
              Secure • Encrypted • Forever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
