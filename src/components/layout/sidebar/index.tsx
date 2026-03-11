import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import auth from "../../../services/firebase";
import { deleteCookie } from "../../../utils/cookies";
import {
  LayoutDashboard,
  MapPin,
  Trash2,
  Database,
  LogOut,
  Leaf,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface NavItem {
  name: string;
  route: string;
  icon: React.ReactNode;
  disable?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Maps",
    route: "/maps",
    icon: <MapPin size={18} />,
  },
  {
    name: "Data",
    route: "/data",
    icon: <Database size={18} />,
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleSignOut = async () => {
    auth.signOut();
    deleteCookie();
    navigate("/login");
  };

  const isActive = (route: string) => location.pathname === route;

  return (
    <aside
      id="Sidebar"
      className={`flex flex-col h-screen py-6 transition-all duration-300 relative z-50 ${
        isCollapsed ? "w-[80px] px-2" : "w-[280px] px-3"
      }`}
      style={{
        background: "linear-gradient(180deg, #0b1a09 0%, #132611 40%, #1a3312 100%)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.35)",
      }}
    >
      {/* ── Logo & Toggle ── */}
      <div className={`flex items-center mb-8 ${isCollapsed ? "justify-center" : "justify-between px-3"}`} id="Project-Logo">
        {!isCollapsed && (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 no-underline"
          >
            <img
              src="./assets/logo/artemis-brand1.png"
              className="w-[140px] h-auto object-contain"
              alt="Artemis Logo"
            />
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center justify-center shrink-0"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* ── Nav label ── */}
      {!isCollapsed && (
        <p
          className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest select-none"
          style={{ color: "#62A944", opacity: 0.7 }}
        >
          Navigation
        </p>
      )}

      {/* ── Nav Links ── */}
      <nav className={`flex flex-col gap-1 flex-1 ${isCollapsed ? "px-1" : ""}`} id="Lists">
        {navItems
          .filter((item) => !item.disable)
          .map((item) => {
            const active = isActive(item.route);
            return (
              <Link
                key={item.name}
                to={item.route}
                title={isCollapsed ? item.name : undefined}
                className={`group relative flex items-center rounded-lg no-underline transition-all duration-200 ${
                  isCollapsed ? "justify-center py-2.5 px-0" : "gap-3 px-3 py-2.5"
                }`}
                style={
                  active
                    ? {
                        background: "rgba(98,169,68,0.18)",
                        color: "#8ecb6a",
                      }
                    : {
                        color: "rgba(255,255,255,0.72)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.72)";
                  }
                }}
              >
                {/* Active indicator bar */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                    style={{ background: "#62A944" }}
                  />
                )}

                {/* Icon */}
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200"
                  style={
                    active
                      ? { background: "rgba(98,169,68,0.25)", color: "#8ecb6a" }
                      : { color: "inherit" }
                  }
                >
                  {item.icon}
                </span>

                {/* Label */}
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            );
          })}
      </nav>

      {/* ── Divider ── */}
      <div
        className={`my-4 h-px ${isCollapsed ? "mx-2" : "mx-3"}`}
        style={{ background: "rgba(98,169,68,0.18)" }}
      />

      {/* ── Bottom section: branding pill + sign out ── */}
      <div className={`flex flex-col gap-3 ${isCollapsed ? "px-0 items-center w-full" : "px-1"}`}>
        {/* Sign out */}
        <button
          type="button"
          onClick={handleSignOut}
          title={isCollapsed ? "Sign Out" : undefined}
          className={`group flex items-center rounded-lg font-medium text-sm border-none cursor-pointer transition-all duration-200 ${
            isCollapsed ? "justify-center p-2.5 w-full" : "gap-3 w-full px-3 py-2.5"
          }`}
          style={{
            background: "rgba(162,17,17,0.25)",
            color: "rgba(255,255,255,0.8)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(162,17,17,0.55)";
            (e.currentTarget as HTMLElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(162,17,17,0.25)";
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.8)";
          }}
        >
          <span
            className="flex items-center justify-center w-8 h-8 rounded-md shrink-0"
            style={{ background: "rgba(162,17,17,0.35)" }}
          >
            <LogOut size={16} />
          </span>
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
