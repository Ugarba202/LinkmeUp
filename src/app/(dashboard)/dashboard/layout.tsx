"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  User, 
  Link as LinkIcon, 
  QrCode, 
  BarChart, 
  Menu, 
  LogOut,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/socials", label: "Social Links", icon: LinkIcon },
  { href: "/dashboard/qr", label: "My QR Code", icon: QrCode },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reusable Navigation Component
  const Navigation = () => (
    <>
      <div className="flex items-center gap-2 mb-10 px-2 lg:px-0 mt-8 lg:mt-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 relative group-hover:border-primary/50 transition-colors">
            <img
              src="/images/logo.png"
              alt="LinkMeUp"
              className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-20%]"
            />
          </div>
          <span className="text-xl font-black text-gradient">LinkMeUp</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-2 text-sm flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "opacity-70"}`} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        {/* User Card */}
        {profile && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-white/5">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden flex-shrink-0">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary/50" />
                </div>
              )}
            </div>
            <div className="min-w-0 pr-2">
              <p className="text-sm font-bold text-foreground truncate">
                {profile.fullName || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{profile.username || "setup_pending"}
              </p>
            </div>
          </div>
        )}

        {/* Upgrade & Logout */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/10 transition-colors">
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => signOut()}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row font-sans">
      
      {/* ─── Mobile Header ──────────────────────────────────────────────────────── */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden relative">
            <img src="/images/logo.png" alt="Logo" className="w-[140%] h-[140%] object-cover absolute top-[-20%] left-[-20%]" />
          </div>
          <span className="text-lg font-black text-gradient tracking-tight">LinkMeUp</span>
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/5">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-background border-white/10 p-6 flex flex-col">
            <Navigation />
          </SheetContent>
        </Sheet>
      </header>

      {/* ─── Desktop Sidebar ────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[280px] border-r border-white/5 bg-card/30 min-h-screen p-6 sticky top-0">
        <Navigation />
      </aside>

      {/* ─── Main Content ───────────────────────────────────────────────────────── */}
      <main className="flex-1 min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto relative z-10 w-full">
          {children}
        </div>
      </main>

    </div>
  );
}
