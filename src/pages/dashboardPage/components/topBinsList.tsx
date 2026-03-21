import { useEffect, useState } from "react";
import fetchData from "../../../hooks/useFetch";

interface Bin {
  id: string;
  type: string;
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

function capacityColor(capacity: number) {
  if (capacity >= 90) return "#ef4444";
  if (capacity >= 75) return "#f59e0b";
  if (capacity >= 50) return "#3b82f6";
  return "#00cb6a";
}

export default function TopBinsList() {
  const [bins, setBins] = useState<Bin[]>([]);

  useEffect(() => {
    fetchData("trashbin").then((res: any) => {
      if (!Array.isArray(res)) return;
      const sorted = [...res].sort((a, b) => b.capacity - a.capacity).slice(0, 7);
      setBins(sorted);
    });
  }, []);

  if (bins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
        <span className="text-3xl">📊</span>
        <p className="text-sm m-0">No data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 w-full overflow-y-auto" style={{ maxHeight: "340px" }}>
      {bins.map((bin, index) => {
        const typeColor  = TYPE_COLORS[bin.type] ?? TYPE_COLORS.Residual;
        const capColor   = capacityColor(bin.capacity);
        const shortName  = bin.organization.replace(/^[^-]+-\s*/, "");
        const rankColors = ["#f59e0b", "#9ca3af", "#b45309"];

        return (
          <div
            key={bin.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
          >
            {/* Rank */}
            <div
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: index < 3 ? rankColors[index] : "#d1d5db" }}
            >
              {index + 1}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-700 m-0 truncate">{shortName}</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px]" style={{ color: capColor }}>
                  {bin.id}
                </span>
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{ color: typeColor.text, backgroundColor: typeColor.bg }}
                >
                  {bin.type}
                </span>
              </div>
            </div>

            {/* Capacity */}
            <div className="shrink-0 flex flex-col items-end gap-1">
              <span
                className="text-sm font-bold font-mono"
                style={{ color: capColor }}
              >
                {bin.capacity}%
              </span>
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${bin.capacity}%`, backgroundColor: capColor }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
