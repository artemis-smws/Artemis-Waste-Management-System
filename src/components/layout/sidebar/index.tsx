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
    name: "Trash Bins",
    route: "/bin",
    icon: <Trash2 size={18} />,
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

  const handleSignOut = async () => {
    auth.signOut();
    deleteCookie();
    navigate("/login");
  };

  const isActive = (route: string) => location.pathname === route;

  return (
    <aside
      id="Sidebar"
      className="flex flex-col h-screen min-w-[280px] max-w-[280px] py-6 px-3"
      style={{
        background: "linear-gradient(180deg, #0b1a09 0%, #132611 40%, #1a3312 100%)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.35)",
      }}
    >
      {/* ── Logo ── */}
      <div className="flex justify-center items-center px-3 mb-8" id="Project-Logo">
        <Link
          to="/dashboard"
          reloadDocument
          className="flex items-center gap-2 no-underline w-full"
        >
          <img
            src="./assets/logo/artemis-brand1.png"
            className="w-[90%] h-auto object-contain"
            alt="Artemis Logo"
          />
        </Link>
      </div>

      {/* ── Nav label ── */}
      <p
        className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest select-none"
        style={{ color: "#62A944", opacity: 0.7 }}
      >
        Navigation
      </p>

      {/* ── Nav Links ── */}
      <nav className="flex flex-col gap-1 flex-1" id="Lists">
        {navItems
          .filter((item) => !item.disable)
          .map((item) => {
            const active = isActive(item.route);
            return (
              <Link
                key={item.name}
                to={item.route}
                reloadDocument
                className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline transition-all duration-200"
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
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
      </nav>

      {/* ── Divider ── */}
      <div
        className="my-4 mx-3 h-px"
        style={{ background: "rgba(98,169,68,0.18)" }}
      />

      {/* ── Bottom section: branding pill + sign out ── */}
      <div className="flex flex-col gap-3 px-1">
        {/* Eco badge */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: "rgba(33,102,4,0.35)" }}
        >
          <Leaf size={14} style={{ color: "#62A944" }} />
          <span className="text-xs font-medium" style={{ color: "#8ecb6a" }}>
            Smart Waste Management
          </span>
        </div>

        {/* Sign out */}
        <button
          type="button"
          onClick={handleSignOut}
          className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium text-sm border-none cursor-pointer transition-all duration-200"
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
            className="flex items-center justify-center w-8 h-8 rounded-md"
            style={{ background: "rgba(162,17,17,0.35)" }}
          >
            <LogOut size={16} />
          </span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
