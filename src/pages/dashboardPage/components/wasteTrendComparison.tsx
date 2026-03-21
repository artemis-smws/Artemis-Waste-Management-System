import { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { WasteDataContext } from "../../../context/wasteDataContext";
import fetchData from "../../../hooks/useFetch";

interface DataPoint {
  name: string;
  Current: number;
  Previous: number | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 min-w-[160px]">
      <p className="text-xs font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500">{p.name}</span>
          </span>
          <span className="font-mono font-medium text-[#171717]">
            {p.value != null ? `${p.value} kg` : "—"}
          </span>
        </div>
      ))}
    </div>
  );
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-1 px-2">
      {payload.map((entry: any, i: number) => (
        <li key={i} className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default function WasteTrendComparison() {
  const currentData = useContext(WasteDataContext);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [deltaKg, setDeltaKg]     = useState<number | null>(null);
  const [deltaPct, setDeltaPct]   = useState<number | null>(null);

  useEffect(() => {
    // Fetch the previous period (30 days) to compare against current (7 days) window
    fetchData("waste/latest/30days", "30days").then((prev: any) => {
      if (!Array.isArray(currentData) || currentData.length === 0) return;
      if (!Array.isArray(prev) || prev.length === 0) return;

      // Build a map of day-label → weight for the previous period
      const prevMap: Record<string, number> = {};
      prev.forEach((item: any) => {
        const parts = (item.id as string).split("-");
        const dayLabel = `${parts[0]}-${parts[1]}`;
        prevMap[dayLabel] = item.overall_weight ?? 0;
      });

      // Current period points (oldest → newest)
      const points: DataPoint[] = [...currentData].reverse().map((item: any) => {
        const parts = (item.id as string).split("-");
        const dayLabel = `${parts[0]}-${parts[1]}`;
        return {
          name: dayLabel,
          Current: item.overall_weight ?? 0,
          Previous: prevMap[dayLabel] ?? null,
        };
      });

      setChartData(points);

      // Delta KPIs
      const currentTotal  = currentData.reduce((s: number, d: any) => s + (d.overall_weight ?? 0), 0);
      const matchedPrev   = points
        .filter((p) => p.Previous != null)
        .reduce((s, p) => s + (p.Previous as number), 0);

      if (matchedPrev > 0) {
        const diff = currentTotal - matchedPrev;
        setDeltaKg(diff);
        setDeltaPct((diff / matchedPrev) * 100);
      }
    });
  }, [currentData]);

  const isUp   = deltaKg !== null && deltaKg > 0;
  const isDown = deltaKg !== null && deltaKg < 0;

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      {/* Delta badge */}
      {deltaKg !== null && (
        <div className="flex items-center gap-2 self-end">
          <span
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: isUp ? "#fef2f2" : "#f0fdf4",
              color: isUp ? "#b91c1c" : "#009e52",
            }}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{Math.abs(deltaKg).toFixed(1)} kg ({Math.abs(deltaPct ?? 0).toFixed(1)}%)</span>
            <span className="font-normal text-gray-400">vs prev period</span>
          </span>
        </div>
      )}

      {/* Chart */}
      <div className="flex-1 min-h-0" style={{ minHeight: "240px" }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={240}>
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "Inter, sans-serif" }}
              tickLine={false}
              axisLine={false}
              dy={6}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "Inter, sans-serif" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v} kg`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
            <Line
              type="monotone"
              dataKey="Current"
              stroke="#216604"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#216604", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Previous"
              stroke="#9ca3af"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
