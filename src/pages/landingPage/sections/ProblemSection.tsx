import { AlertTriangle, Clock, BarChart2 } from "lucide-react";

const stats = [
  { value: "21.4M", label: "Metric tons of solid waste (2020)", color: "text-[#8ecb6a]" },
  { value: "23M+", label: "Projected by 2025", color: "text-amber-400" },
  { value: "RA 9003", label: "Compliance still manual at most institutions", color: "text-[#93c5fd]" },
];

const painPoints = [
  {
    icon: Clock,
    title: "Manual & Time-Consuming",
    description:
      "Organizations rely on paper logs, manual data entry, and reactive collection schedules that waste staff time and inflate operational costs.",
  },
  {
    icon: AlertTriangle,
    title: "No Real-Time Visibility",
    description:
      "Without IoT monitoring, teams have zero insight into bin capacity until a bin is overflowing — causing complaints, hygiene issues, and emergency pickups.",
  },
  {
    icon: BarChart2,
    title: "Difficult Compliance Reporting",
    description:
      "Generating waste management reports under RA 9003 requires hours of manual data consolidation, increasing the risk of errors and missed deadlines.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Two-column intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          {/* Left — text */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-[#216604]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#216604]">
                The Problem
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] leading-tight">
              Waste management is still{" "}
              <span className="text-[#216604]">too manual</span>
            </h2>
            <p className="text-[#6b7280] text-lg leading-relaxed">
              Many institutions and organizations across the Philippines still depend on
              fragmented, reactive waste workflows — making oversight slow, compliance
              painful, and collection inefficient.
            </p>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 text-[#216604] font-bold text-sm no-underline group"
            >
              See how Artemis fixes this
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-1 gap-4">
            {stats.map((s) => (
              <div
                key={s.value}
                className="flex items-center gap-5 bg-[#f8f9f6] border border-gray-100 rounded-2xl px-6 py-5"
              >
                <span className={`text-3xl font-extrabold font-mono shrink-0 ${s.color}`}>
                  {s.value}
                </span>
                <span className="text-sm text-[#6b7280] leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-[#216604]/30 transition-all duration-300 space-y-4 overflow-hidden"
            >
              {/* Subtle accent line at top */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-[#216604]/20 group-hover:bg-[#216604]/60 transition-colors duration-300 rounded-full" />

              <div className="w-12 h-12 rounded-xl bg-[#216604]/10 flex items-center justify-center group-hover:bg-[#216604]/20 transition-colors duration-300">
                <point.icon className="w-5 h-5 text-[#216604]" />
              </div>
              <h3 className="text-base font-bold text-[#171717]">{point.title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
