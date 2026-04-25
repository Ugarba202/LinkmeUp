import { useState } from "react";
import { 
  Settings2, 
  Moon, 
  Sun, 
  Monitor, 
  LogOut, 
  Trash2, 
  ShieldAlert,
  ChevronRight,
  LifeBuoy
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";

export function SettingsDialog({ children, open, onOpenChange }: { children?: React.ReactNode, open?: boolean, onOpenChange?: (o: boolean) => void }) {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"general" | "account">("general");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="bg-[#050510] border-white/10 sm:max-w-md p-0 rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
          <DialogTitle className="text-xl font-black flex items-center gap-2 relative z-10">
            <Settings2 className="w-5 h-5 text-primary" /> Configuration
          </DialogTitle>
          <div className="flex gap-4 mt-6 relative z-10">
            <button 
              onClick={() => setActiveTab("general")}
              className={`text-[10px] font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === "general" ? "border-primary text-white" : "border-transparent text-white/40 hover:text-white"}`}
            >
              General
            </button>
            <button 
              onClick={() => setActiveTab("account")}
              className={`text-[10px] font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === "account" ? "border-primary text-white" : "border-transparent text-white/40 hover:text-white"}`}
            >
              Account
            </button>
          </div>
        </div>

        <div className="p-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Theme Preference</h4>
                  <div className="grid grid-cols-3 gap-2">
                     <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                        <Monitor className="w-4 h-4 text-white/60" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">System</span>
                     </button>
                     <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-primary/30 bg-primary/10 transition-all">
                        <Moon className="w-4 h-4 text-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Dark</span>
                     </button>
                     <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-transparent opacity-50 cursor-not-allowed">
                        <Sun className="w-4 h-4 text-white/60" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Light</span>
                     </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Support</h4>
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                     <div className="flex items-center gap-3">
                        <LifeBuoy className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold">Help Center & FAQ</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "account" && (
              <motion.div 
                key="account"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[40px] pointer-events-none" />
                   <h4 className="flex items-center gap-2 text-red-400 font-black text-sm mb-1 relative z-10">
                     <ShieldAlert className="w-4 h-4" /> Danger Zone
                   </h4>
                   <p className="text-[10px] text-white/40 mb-4 font-bold relative z-10">
                     Deleting your account is permanent. All your data, analytics, and digital identity will be erased.
                   </p>
                   <Button variant="destructive" className="w-full h-10 text-[10px] uppercase font-black tracking-widest relative z-10">
                     <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Account
                   </Button>
                </div>

                <Button 
                  onClick={signOut}
                  variant="outline" 
                  className="w-full h-12 border-white/10 bg-transparent hover:bg-white/5 text-white/60 hover:text-white text-[10px] uppercase font-black tracking-widest"
                >
                   <LogOut className="w-3.5 h-3.5 mr-2" /> Terminate Session
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
