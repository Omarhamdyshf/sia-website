import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections";
import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function PublicLayout() {
  // Force dark mode for main website
  const setTheme = useThemeStore((s) => s.setTheme);
  useEffect(() => { setTheme('dark'); }, [setTheme]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
