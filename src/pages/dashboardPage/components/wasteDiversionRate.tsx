import { useContext, useEffect, useState } from "react";
import { WasteDataContext } from "../../../context/wasteDataContext";

export default function WasteDiversionRate() {
  const contextData = useContext(WasteDataContext);
  const [rate, setRate]     = useState(0);
  const [diverted, setDiverted] = useState(0);
  const [total, setTotal]   = useState(0);

  useEffect(() => {
    if (!Array.isArray(contextData) || contextData.length === 0) return;
    let totalWeight = 0, divertedWeight = 0;
    contextData.forEach((item: any) => {
      totalWeight    += item.overall_weight          ?? 0;
      divertedWeight += (item.overall_biodegradable  ?? 0)
                      + (item.overall_recyclable     ?? 0);
    });
    setTotal(totalWeight);
    setDiverted(divertedWeight);
    setRate(totalWeight > 0 ? (divertedWeight / totalWeight) * 100 : 0);
  }, [contextData]);

  // SVG radial gauge — inverted-U (bottom-left → top → bottom-right), 210° sweep
  //
  // SVG circle starts drawing at 3 o'clock (0°) and goes clockwise.
  // strokeDashoffset shifts the dash start counter-clockwise (positive = CCW).
  //
  // We want the arc to start at 225° from 3 o'clock (bottom-left) and sweep
  // 210° clockwise to 75° (bottom-right).
  //
  // offset = (225 / 360) * circumference  →  pushes the dash start to 225°
  const size        = 160;
  const cx          = size / 2;
  const cy          = size / 2 + 16; // nudge center down so top arc sits in view
  const r           = 60;
  const stroke      = 12;
  const circumference = 2 * Math.PI * r;

  const arcDeg      = 210;
  const arcLength   = circumference * (arcDeg / 360);
  const filledArc   = arcLength * (rate / 100);
  const startOffset = circumference * (225 / 360);

  // Color thresholds
  const color =
    rate >= 60 ? "#00cb6a" :
    rate >= 40 ? "#f59e0b" : "#ef4444";

  const label =
    rate >= 60 ? "Excellent" :
    rate >= 40 ? "Moderate"  : "Needs Improvement";

  const residualPct = total > 0 ? ((total - diverted) / total) * 100 : 0;

  // Crop viewBox to just the top portion — removes dead space below the arc ends
  const viewH = cy + stroke;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center py-2">
      {/* Radial gauge */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={viewH} viewBox={`0 0 ${size} ${viewH}`}>
          {/* Background track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset={startOffset}
            strokeLinecap="round"
          />
          {/* Filled arc — grows left → right */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={`${filledArc} ${circumference - filledArc}`}
            strokeDashoffset={startOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }}
          />
          {/* Center text */}
          <text x={cx} y={cy - 10} textAnchor="middle" fontSize="22" fontWeight="700" fontFamily="monospace" fill={color}>
            {rate.toFixed(1)}%
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Inter, sans-serif">
            diversion rate
          </text>
        </svg>
      </div>

      {/* Status label */}
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ color, backgroundColor: color + "18" }}
      >
        {label}
      </span>

      {/* Breakdown */}
      <div className="w-full flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#00cb6a" }} />
            <span className="text-gray-500">Diverted (Bio + Recyclable)</span>
          </div>
          <span className="font-semibold font-mono text-gray-700">{diverted.toFixed(1)} kg</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block bg-gray-400" />
            <span className="text-gray-500">Residual / Infectious</span>
          </div>
          <span className="font-semibold font-mono text-gray-700">{(total - diverted).toFixed(1)} kg</span>
        </div>

        {/* Stacked bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1 flex">
          <div
            className="h-full rounded-l-full transition-all duration-700"
            style={{ width: `${rate}%`, backgroundColor: color }}
          />
          <div
            className="h-full rounded-r-full bg-gray-300 transition-all duration-700"
            style={{ width: `${residualPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
