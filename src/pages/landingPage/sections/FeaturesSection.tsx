import {
  Map as MapIcon,
  Bell,
  Route,
  Smartphone,
  FileBarChart,
  MapPin,
  TrendingUp,
  Bot,
  Globe,
  Languages,
  Moon,
  UserCheck,
} from "lucide-react";

const featureGroups = [
  {
    title: "Monitoring",
    tag: "Real-time",
    tagClass: "text-[#216604] bg-[#216604]/10",
    iconClass: "text-[#216604]",
    borderClass: "border-[#216604]/20 hover:border-[#216604]/50",
    dotClass: "bg-[#216604]",
    features: [
      { icon: MapIcon, text: "Real-time bin status on map" },
      { icon: MapPin, text: "GPS-aware bin locations" },
      { icon: Bell, text: "Instant full-bin alerts" },
      { icon: Globe, text: "Remote monitoring from anywhere" },
    ],
  },
  {
    title: "Operations",
    tag: "Field",
    tagClass: "text-[#3b82f6] bg-[#3b82f6]/10",
    iconClass: "text-[#3b82f6]",
    borderClass: "border-[#3b82f6]/20 hover:border-[#3b82f6]/50",
    dotClass: "bg-[#3b82f6]",
    features: [
      { icon: Route, text: "In-house route optimization" },
      { icon: Smartphone, text: "Mobile waste data input" },
      { icon: Bell, text: "Mobile collection notifications" },
      { icon: UserCheck, text: "Guest mode for students & staff" },
    ],
  },
  {
    title: "Intelligence",
    tag: "AI-powered",
    tagClass: "text-amber-600 bg-amber-500/10",
    iconClass: "text-amber-500",
    borderClass: "border-amber-500/20 hover:border-amber-500/50",
    dotClass: "bg-amber-500",
    features: [
      { icon: FileBarChart, text: "On-demand compliance reports" },
      { icon: TrendingUp, text: "Historical analytics dashboards" },
      { icon: Bot, text: "AI-powered forecasting" },
      { icon: TrendingUp, text: "Automated data visualization" },
    ],
  },
  {
    title: "Accessibility",
    tag: "Inclusive",
    tagClass: "text-emerald-600 bg-emerald-500/10",
    iconClass: "text-emerald-500",
    borderClass: "border-emerald-500/20 hover:border-emerald-500/50",
    dotClass: "bg-emerald-500",
    features: [
      { icon: Languages, text: "English & Tagalog UI" },
      { icon: Moon, text: "Dark mode support" },
      { icon: Smartphone, text: "Mobile-first field workflows" },
      { icon: UserCheck, text: "Role-based access control" },
    ],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-[#216604]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216604]">
                Platform Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
              Built for{" "}
              <span className="text-[#216604]">smarter waste operations</span>
            </h2>
          </div>
          <p className="text-[#6b7280] text-base leading-relaxed lg:text-right">
            Every capability is designed around your operational needs — from field
            monitoring to executive reporting.
          </p>
        </div>

        {/* Feature group cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureGroups.map((group) => (
            <div
              key={group.title}
              className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-5 ${group.borderClass}`}
            >
              {/* Title + tag */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#171717]">{group.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${group.tagClass}`}>
                    {group.tag}
                  </span>
                </div>
                <div className={`h-0.5 w-8 rounded-full ${group.dotClass}`} />
              </div>

              {/* Feature list */}
              <ul className="space-y-3">
                {group.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <f.icon className={`w-4 h-4 mt-0.5 shrink-0 ${group.iconClass}`} />
                    <span className="leading-snug">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
