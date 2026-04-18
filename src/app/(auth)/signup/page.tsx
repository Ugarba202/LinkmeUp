"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  Lock, 
  AtSign, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  User as UserIcon,
  Type,
  FileText,
  MoreHorizontal,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

export default function SignupPage() {
  const { signUp } = useAuth();
  
  // Credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile Info
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Status States
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Username Check ────────────────────────────────────────────────────────
  const checkUsername = useCallback(
    async (val: string) => {
      if (!val.trim()) {
        setIsUsernameValid(null);
        setUsernameError(null);
        setIsCheckingUsername(false);
        return;
      }

      if (!/^[a-zA-Z0-9_]{3,30}$/.test(val)) {
        setIsUsernameValid(false);
        setUsernameError("3-30 characters. Letters, numbers, underscores only.");
        setIsCheckingUsername(false);
        return;
      }

      setIsCheckingUsername(true);
      setUsernameError(null);
      setIsUsernameValid(null);

      // Mock backend check
      setTimeout(() => {
        setIsCheckingUsername(false);
        setIsUsernameValid(true);
        setUsernameError(null);
      }, 600);
    },
    []
  );

  const handleUsernameChange = (val: string) => {
    setUsername(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => checkUsername(val), 600);
  };

  // ─── Avatar Handling ───────────────────────────────────────────────────────
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ─── Submission ────────────────────────────────────────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !username || !fullName) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    if (isUsernameValid === false) return;
    
    setIsLoading(true);
    setSubmitError(null);

    const cleanUsername = username.toLowerCase().trim();
    // Supabase requires an email, so we generate a deterministic backend email
    const backendEmail = `${cleanUsername}@linkmeup.app`;

    try {
      await signUp(
        backendEmail, 
        password, 
        cleanUsername, 
        fullName.trim(), 
        bio.trim(), 
        avatarPreview || ""
      );
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const inputBaseStyles = "h-14 bg-card/50 border-white/5 rounded-2xl text-lg text-center focus-visible:ring-primary focus-visible:bg-card transition-all placeholder:text-muted-foreground/30";

  return (
    <div className="min-h-screen bg-background py-16 px-6 overflow-y-auto flex justify-center selection:bg-primary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg flex flex-col items-center"
      >
        <Link href="/" className="inline-block mb-12">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 relative hover:border-primary/50 transition-colors">
            <img
              src="/images/logo.png"
              alt="LinkMeUp"
              className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-20%]"
            />
          </div>
        </Link>
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Digital Identity
          </h1>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto font-medium">
            Set up your profile and pick a username to join the network.
          </p>
        </div>

        {submitError && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full mb-8 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-4 text-destructive"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-semibold leading-relaxed">{submitError}</p>
          </motion.div>
        )}

        <form onSubmit={handleSignup} className="w-full space-y-12 pb-20 flex flex-col items-center">
          
          {/* Avatar Upload - Centered */}
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden bg-background group-hover:border-primary/50 transition-all shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
                ) : (
                  <UserIcon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <div className="absolute bottom-1 right-1 p-2.5 rounded-full bg-primary text-white shadow-lg group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange} 
              />
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full">
              Add Profile Picture
            </span>
          </div>

          {/* SECTION: Identity Fields */}
          <div className="w-full space-y-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase flex items-center justify-center">
                Full Name
              </label>
              <Input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Doe"
                className={inputBaseStyles}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase flex items-center justify-center">
                Short Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a little bit about yourself..."
                rows={3}
                className="w-full bg-card/50 border border-white/5 rounded-2xl px-6 py-4 text-xl text-foreground text-center placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card resize-none transition-all font-medium"
              />
            </div>
          </div>

          {/* SECTION: Credentials */}
          <div className="w-full space-y-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase flex items-center justify-center">
                Pick a Username
              </label>
              <div className="relative">
                <Input
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="traveler_x"
                  className={`${inputBaseStyles} ${
                    isUsernameValid === true 
                      ? 'border-green-500/30' 
                      : isUsernameValid === false || usernameError 
                        ? 'border-red-500/30' 
                        : ''
                  } font-bold tracking-tight`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                  {isCheckingUsername ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : isUsernameValid === true ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : isUsernameValid === false ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : null}
                </div>
              </div>
              <div className="min-h-[1.5rem] flex justify-center">
                <AnimatePresence mode="wait">
                  {usernameError ? (
                    <motion.p 
                      key="error"
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-500 text-[11px] font-bold"
                    >
                      {usernameError}
                    </motion.p>
                  ) : isUsernameValid === true ? (
                    <motion.p 
                      key="success"
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -5 }}
                      className="text-green-500 text-[11px] font-bold"
                    >
                      {username} is available!
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase flex items-center justify-center">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputBaseStyles} ${!showPassword ? 'tracking-[0.5em]' : ''} placeholder:tracking-normal`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* SECTION: Live Preview - Center Aligned per Sketch */}
          <div className="w-full space-y-6 pt-10">
            <div className="flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white text-black px-5 py-1.5 rounded-sm shadow-glow select-none">
                Live Preview
              </span>
            </div>
            
            <motion.div 
              layout
              className="bg-white rounded-[40px] p-8 flex flex-col items-center gap-6 text-black shadow-[0_30px_80px_rgba(0,0,0,0.4)] w-full border border-black/5"
            >
              <div className="flex items-center gap-5 w-full">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden ring-4 ring-gray-50 flex-shrink-0">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserIcon className="w-9 h-9 text-gray-200" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                   <h3 className="font-black text-xl leading-none truncate mb-2">
                    {fullName || "John Doe"}
                   </h3>
                   <p className="text-gray-400 text-sm font-bold leading-snug line-clamp-2">
                    {bio || "Your short biography will highlight your personality and style."}
                   </p>
                   {/* Social Preview Dots */}
                   <div className="flex gap-2 mt-4 scale-110 origin-left">
                     <div className="w-3.5 h-3.5 rounded-full bg-[#E1306C]" />
                     <div className="w-3.5 h-3.5 rounded-full bg-[#000000]" />
                     <div className="w-3.5 h-3.5 rounded-full bg-[#0077B5]" />
                     <div className="w-3.5 h-3.5 rounded-full bg-[#6366F1]" />
                   </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-full text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full pt-10 flex flex-col items-center">
            <Button
              type="submit"
              disabled={isLoading || isUsernameValid === false || !username || !fullName}
              className="w-full h-20 rounded-[40px] text-2xl font-black bg-primary hover:bg-primary-dark shadow-glow transition-all active:scale-[0.98] py-8"
            >
              {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Continue to Final Step"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-12 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-black tracking-tight">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
