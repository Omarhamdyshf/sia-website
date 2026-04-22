import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Bell, LogOut, Shield, ShieldOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InvestorTopbarProps {
  isAdmin?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export function InvestorTopbar({ isAdmin, onLogin, onLogout }: InvestorTopbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sia-investor-session");
    navigate("/");
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Investor Portal
        </span>
        {isAdmin && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded" style={{ backgroundColor: "var(--accent)", color: "#1a1a1a" }}>
            Admin
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Admin toggle button */}
        <button
          onClick={isAdmin ? onLogout : onLogin}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all"
          style={{
            borderColor: isAdmin ? "var(--accent)" : "var(--border)",
            color: isAdmin ? "var(--accent)" : "var(--text-secondary)",
            backgroundColor: isAdmin ? "var(--accent-glow)" : "transparent",
          }}
          title={isAdmin ? "Exit admin mode" : "Enter admin mode"}
        >
          {isAdmin ? <ShieldOff className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
          {isAdmin ? "Exit Admin" : "Admin"}
        </button>
        <ThemeToggle />
        <button
          className="p-2 rounded-lg transition-colors text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg transition-colors text-[var(--text-secondary)] hover:text-danger hover:bg-[var(--surface-hover)]"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
