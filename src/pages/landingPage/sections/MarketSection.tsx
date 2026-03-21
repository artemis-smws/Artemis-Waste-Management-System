import { Building2, ShoppingBag, Landmark } from "lucide-react";

const markets = [
  {
    icon: Building2,
    label: "Universities & Schools",
    description:
      "Manage waste across multiple buildings and departments. Support compliance reporting for CHED and DENR requirements. Monitor bins in real time across sprawling campuses.",
    iconClass: "text-[#216604]",
    iconBg: "bg-[#216604]/10",
    tagClass: "text-[#216604] bg-[#216604]/10",
    accentClass: "bg-[#216604]",
    tag: "Initial deployment: Batangas State University",
  },
  {
    icon: ShoppingBag,
    label: "Commercial Establishments",
    description:
      "Reduce operational waste management costs in malls, hotels, and commercial complexes. Automate collection routing and get live alerts when bins need service.",
    iconClass: "text-[#3b82f6]",
    iconBg: "bg-[#3b82f6]/10",
    tagClass: "text-[#3b82f6] bg-[#3b82f6]/10",
    accentClass: "bg-[#3b82f6]",
    tag: "Retail · Hospitality · F&B",
  },
  {
    icon: Landmark,
    label: "Institutions & LGUs",
    description:
      "Give local governments and public agencies real-time insight into waste infrastructure. Generate compliance data and reports with minimal manual effort.",
    iconClass: "text-amber-500",
    iconBg: "bg-amber-500/10",
    tagClass: "text-amber-600 bg-amber-500/10",
    accentClass: "bg-amber-500",
    tag: "Public Sector · Government · Compliance",
  },
];

export default function MarketSection() {
  return (
    <section id="market" className="py-24 px-6 bg-[#071205]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-5">
          <div className="flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-[#8ecb6a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8ecb6a]">
              Who It's For
            </span>
            <span className="block w-8 h-px bg-[#8ecb6a]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Built for{" "}
            <span className="text-[#8ecb6a]">institutions that mean business</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Artemis is focused on the Philippines first, with a growing Asia-Pacific
            opportunity in commercial and institutional solid waste management.
          </p>
        </div>

        {/* Market cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {markets.map((m) => (
            <div
              key={m.label}
              className="group bg-white/4 border border-white/8 rounded-2xl p-7 hover:bg-white/7 hover:border-white/15 transition-all duration-300 flex flex-col gap-5 overflow-hidden relative"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${m.accentClass} opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />

              <div className={`w-12 h-12 rounded-xl ${m.iconBg} flex items-center justify-center`}>
                <m.icon className={`w-6 h-6 ${m.iconClass}`} />
              </div>

              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-white">{m.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{m.description}</p>
              </div>

              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${m.tagClass}`}>
                {m.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="bg-[#216604] rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8ecb6a]">
              Early Implementation
            </p>
            <h3 className="text-xl md:text-2xl font-bold">
              Artemis is already being deployed at Batangas State University
            </h3>
            <p className="text-green-100/80 text-sm max-w-xl">
              Our initial rollout at BatStateU gives us hands-on data and operational
              experience to scale across the Philippines and the broader Asia-Pacific region.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-white text-[#216604] font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors no-underline text-sm shadow-lg"
          >
            Join the Pilot
          </a>
        </div>
      </div>
    </section>
  );
}
