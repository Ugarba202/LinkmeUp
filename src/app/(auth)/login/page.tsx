"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AtSign, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUsernameLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setError(null);

    const cleanUsername = username.toLowerCase().trim();
    const backendEmail = `${cleanUsername}@linkmeup.app`;

    try {
      await signIn(backendEmail, password);
      // Wait a tick for auth store to populate profile before routing
      // Middleware normally handles this, but client-side redirect helps feel instantaneous
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err: any) {
      setError(err.message || "Invalid login credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto"
      >
        <div className="text-center mb-10">
          <Link href="/">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/10 relative hover:border-primary/50 transition-colors">
              <img
                src="/images/logo.png"
                alt="LinkMeUp"
                className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-20%]"
              />
            </div>
          </Link>
          <h1 className="text-xl font-black tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-white/30 text-xs font-medium">
            Authorize access to your digital node.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-destructive">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleUsernameLogin} className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-40" />
              <Input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="identity_handle"
                className="pl-12 h-12 bg-white/[0.04] border-white/5 focus-visible:ring-primary rounded-xl px-4 font-bold text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">
                Password
              </label>
              <Link href="#" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-40" />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-12 h-12 bg-white/[0.04] border-white/5 focus-visible:ring-primary rounded-xl px-4 font-bold text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-glow-sm transition-all active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Entry"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
