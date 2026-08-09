"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{
    email?: string;
    display_name?: string;
    avatar_url?: string;
  } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push("/login");
        return;
      }

      // Fetch profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("user_id", authUser.id)
        .single();

      setUser({
        email: authUser.email,
        display_name: profile?.display_name,
        avatar_url: profile?.avatar_url,
      });
    }

    getUser();
  }, [supabase, router]);

  // Listen for auth state changes (logout, token refresh)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/login");
        }
        if (event === "SIGNED_IN" && session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name, avatar_url")
            .eq("user_id", session.user.id)
            .single();

          setUser({
            email: session.user.email,
            display_name: profile?.display_name,
            avatar_url: profile?.avatar_url,
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block relative">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} user={user} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-background border-r border-border z-50 md:hidden overflow-y-auto">
            <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} user={user} />
          </div>
        </>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
