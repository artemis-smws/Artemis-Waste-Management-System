import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

interface Bin {
  id: string;
  type: "Biodegradable" | "Recyclable" | "Residual" | "Infectious";
  organization: string;
  capacity: number;
  frequency: number;
}

const TYPE_COLORS: Record<string, { dot: string; bg: string; text: string }> = {
  Biodegradable: { dot: "#00cb6a", bg: "#f0fdf4", text: "#009e52" },
  Recyclable:    { dot: "#3b82f6", bg: "#eff6ff", text: "#1d4ed8" },
  Residual:      { dot: "#6b7280", bg: "#f9fafb", text: "#374151" },
  Infectious:    { dot: "#ef4444", bg: "#fef2f2", text: "#b91c1c" },
};

function getStatusLabel(capacity: number): { label: string; color: string; bg: string } {
  if (capacity >= 90) return { label: "Critical", color: "#b91c1c", bg: "#fef2f2" };
  if (capacity >= 75) return { label: "High",     color: "#d97706", bg: "#fffbeb" };
  if (capacity >= 50) return { label: "Medium",   color: "#2563eb", bg: "#eff6ff" };
  return              { label: "Low",             color: "#009e52", bg: "#f0fdf4" };
}

export default function BinStatusGrid() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [filter, setFilter] = useState<"All" | "Critical" | "High" | "Medium" | "Low">("All");

  useEffect(() => {
    useFetch("trashbin").then((res: any) => {
      if (Array.isArray(res)) setBins(res);
    });
  }, []);

  const criticalCount = bins.filter((b) => b.capacity >= 90).length;
  const highCount     = bins.filter((b) => b.capacity >= 75 && b.capacity < 90).length;

  const filtered = bins.filter((b) => {
    if (filter === "All") return true;
    const s = getStatusLabel(b.capacity);
    return s.label === filter;
  });

  const FILTERS = ["All", "Critical", "High", "Medium", "Low"] as const;

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Alert banner */}
      {(criticalCount > 0 || highCount > 0) && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
          <p className="text-sm text-red-700 m-0">
            <span className="font-semibold">{criticalCount} critical</span> and{" "}
            <span className="font-semibold">{highCount} high</span> capacity bins need attention.
          </p>
        </div>
      )}

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
              filter === f
                ? "bg-[#216604] text-white border-[#216604]"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#216604]/40 hover:text-[#216604]"
            }`}
          >
            {f}
            {f === "Critical" && criticalCount > 0 && (
              <span className="ml-1.5 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                {criticalCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 overflow-y-auto" style={{ maxHeight: "340px" }}>
        {filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
            <span className="text-3xl">🗑️</span>
            <p className="text-sm m-0">No bins match this filter.</p>
          </div>
        ) : (
          filtered.map((bin) => {
            const status = getStatusLabel(bin.capacity);
            const typeColor = TYPE_COLORS[bin.type] ?? TYPE_COLORS.Residual;
            const barWidth = `${bin.capacity}%`;
            return (
              <div
                key={bin.id}
                className="flex flex-col gap-2 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400">{bin.id}</span>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: status.color, backgroundColor: status.bg }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Location */}
                <p className="text-xs text-gray-600 m-0 leading-snug line-clamp-2">
                  {bin.organization.replace(/^[^-]+-\s*/, "")}
                </p>

                {/* Type badge */}
                <span
                  className="self-start text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ color: typeColor.text, backgroundColor: typeColor.bg }}
                >
                  {bin.type}
                </span>

                {/* Capacity bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Capacity</span>
                    <span className="font-semibold font-mono" style={{ color: status.color }}>
                      {bin.capacity}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: barWidth, backgroundColor: status.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary footer */}
      <div className="flex justify-between items-center text-xs text-gray-400 pt-1 border-t border-gray-100">
        <span>Showing {filtered.length} of {bins.length} bins</span>
        <div className="flex gap-3">
          {(["Critical","High","Medium","Low"] as const).map((lvl) => {
            const count = bins.filter((b) => getStatusLabel(b.capacity).label === lvl).length;
            const colors: Record<string, string> = {
              Critical: "#ef4444", High: "#f59e0b", Medium: "#3b82f6", Low: "#00cb6a"
            };
            return (
              <span key={lvl} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: colors[lvl] }} />
                {count}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
