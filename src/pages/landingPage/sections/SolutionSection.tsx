import { Truck, Database, TrendingUp, Recycle } from "lucide-react";

const comparisons = [
  {
    icon: Truck,
    area: "Waste Collection",
    old: "Blindly scheduled pickup — collections happen on a fixed calendar regardless of actual bin fill levels.",
    new: "Status-based, pre-planned collection — bins report their fill level in real time so teams only dispatch when needed.",
  },
  {
    icon: Database,
    area: "Data & Reporting",
    old: "Manual entry, manual cleaning, hours of document work just to produce a single compliance report.",
    new: "Automated data capture, instant visualizations, and on-demand report generation with one click.",
  },
  {
    icon: TrendingUp,
    area: "Forecasting",
    old: "Gut-feel estimates and historical guesswork require analysts to manually gather, clean, and train models on fragmented data.",
    new: "Artemis historical data powers automated forecasting models — no extra data pipeline required.",
  },
  {
    icon: Recycle,
    area: "Recycling",
    old: "Manual sorting by staff, requiring dedicated space and extra investment in segregation facilities.",
    new: "AI-assisted automated segregation identifies waste categories without manual intervention.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 px-6 bg-[#071205]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-[#8ecb6a]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8ecb6a]">
                The Artemis Difference
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              From reactive workflows to{" "}
              <span className="text-[#8ecb6a]">intelligent operations</span>
            </h2>
          </div>
          <p className="text-gray-400 text-base leading-relaxed lg:text-right">
            Artemis replaces every major manual touchpoint in waste management with
            automated, data-driven equivalents.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {comparisons.map((row) => (
            <div
              key={row.area}
              className="group bg-white/4 border border-white/8 rounded-2xl p-7 hover:bg-white/7 hover:border-[#8ecb6a]/20 transition-all duration-300 space-y-5"
            >
              {/* Icon + area label */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#216604]/30 flex items-center justify-center shrink-0 group-hover:bg-[#216604]/50 transition-colors duration-300">
                  <row.icon className="w-5 h-5 text-[#8ecb6a]" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  {row.area}
                </span>
              </div>

              {/* Before / After */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/3 rounded-xl px-4 py-3">
                  <span className="text-xs font-bold text-red-400/80 uppercase tracking-wider shrink-0 mt-0.5">Before</span>
                  <p className="text-gray-500 text-sm leading-relaxed">{row.old}</p>
                </div>
                <div className="flex items-start gap-3 bg-[#216604]/12 rounded-xl px-4 py-3">
                  <span className="text-xs font-bold text-[#8ecb6a] uppercase tracking-wider shrink-0 mt-0.5">After</span>
                  <p className="text-[#8ecb6a]/90 text-sm leading-relaxed">{row.new}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
