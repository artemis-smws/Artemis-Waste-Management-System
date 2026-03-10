import { useContext, useEffect, useState } from "react";
import { BsGraphDownArrow, BsGraphUpArrow, BsDashLg } from "react-icons/bs";
import { WasteDataContext } from "../../../context/wasteDataContext";
import TimestampToString from "../utils/timestampToString";
import findHighest from "../utils/findHighest";
import findLowest from "../utils/findLowest";
import calculateOverallAverage from "../utils/calculateOverallAverge";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  date?: string;
  colorClass: string;
  borderClass?: string;
  accentColor: string;
}

function StatItem({ icon, label, value, date, colorClass, borderClass, accentColor }: StatItemProps) {
  return (
    <div className={`group flex flex-col items-center justify-center gap-1 flex-1 px-8 py-4 ${borderClass ?? ""} hover:bg-gray-50/50 transition-colors duration-300 relative overflow-hidden`}>
      <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${colorClass}`}>
        <span className="transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300">{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className={`text-3xl font-bold font-mono tracking-tight ${colorClass} group-hover:scale-105 transition-transform duration-300`}
      >
        {value}
      </div>
      {date && (
        <div className="text-xs text-gray-400 mt-0.5">{date}</div>
      )}
      {/* Subtle background glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
      {/* Accent bar */}
      <div
        className="mt-3 h-0.5 w-12 rounded-full opacity-40 group-hover:w-16 group-hover:opacity-100 transition-all duration-300"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}

export default function OverviewCard() {
  const [highest_weight, setHighest] = useState({ weight: 0, day: "" });
  const [lowest_weight, setLowest] = useState({ weight: 0, day: "" });
  const [average, setAverage] = useState(0);

  const contextData = useContext(WasteDataContext);
  useEffect(() => {
    if (Array.isArray(contextData)) {
      const temp_highest: any = findHighest(contextData);
      const temp_lowest: any = findLowest(contextData);
      const temp_average: number = calculateOverallAverage(contextData);
      setHighest({
        weight: temp_highest.overall_weight,
        day: TimestampToString(temp_highest.createdAt),
      });
      setLowest({
        weight: temp_lowest.overall_weight,
        day: TimestampToString(temp_lowest.createdAt),
      });
      setAverage(temp_average);
    }
  }, [contextData]);

  const highestVal =
    highest_weight.weight <= 0 && highest_weight.day === ""
      ? "N/A"
      : `${highest_weight.weight} kg`;
  const lowestVal =
    lowest_weight.weight <= 0 && highest_weight.day === ""
      ? "N/A"
      : `${lowest_weight.weight} kg`;
  const averageVal = average <= 0 ? "N/A" : `${average.toPrecision(4)} kg`;

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-6 flex divide-x divide-gray-100/50 overflow-hidden">
      <StatItem
        icon={<BsGraphUpArrow />}
        label="Highest"
        value={highestVal}
        date={highest_weight.day || undefined}
        colorClass="text-red-500"
        accentColor="#ef4444"
      />
      <StatItem
        icon={<BsDashLg />}
        label="Average"
        value={averageVal}
        colorClass="text-gray-500"
        accentColor="#6b7280"
      />
      <StatItem
        icon={<BsGraphDownArrow />}
        label="Lowest"
        value={lowestVal}
        date={lowest_weight.day || undefined}
        colorClass="text-[#00cb6a]"
        accentColor="#00cb6a"
      />
    </div>
  );
}
