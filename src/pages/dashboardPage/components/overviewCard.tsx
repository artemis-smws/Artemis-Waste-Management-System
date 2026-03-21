import { useContext, useEffect, useState } from "react";
import {
  BsGraphDownArrow,
  BsGraphUpArrow,
  BsDashLg,
  BsTrash,
  BsExclamationTriangle,
  BsRecycle,
} from "react-icons/bs";
import { WasteDataContext } from "../../../context/wasteDataContext";
import TimestampToString from "../utils/timestampToString";
import findHighest from "../utils/findHighest";
import findLowest from "../utils/findLowest";
import calculateOverallAverage from "../utils/calculateOverallAverge";
import fetchData from "../../../hooks/useFetch";

interface StatItemProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly value: string;
  readonly date?: string;
  readonly colorClass: string;
  readonly accentColor: string;
  readonly sub?: string;
}

const ACCENT_CLASSES: Record<string, { bar: string; glow: string }> = {
  "#216604": { bar: "bg-[#216604]",  glow: "group-hover:bg-[#216604]"  },
  "#ef4444": { bar: "bg-red-400",    glow: "group-hover:bg-red-400"    },
  "#6b7280": { bar: "bg-gray-400",   glow: "group-hover:bg-gray-400"   },
  "#00cb6a": { bar: "bg-[#00cb6a]",  glow: "group-hover:bg-[#00cb6a]"  },
  "#009e52": { bar: "bg-[#009e52]",  glow: "group-hover:bg-[#009e52]"  },
  "#f59e0b": { bar: "bg-amber-400",  glow: "group-hover:bg-amber-400"  },
};

function StatItem({ icon, label, value, date, colorClass, accentColor, sub }: StatItemProps) {
  const accent = ACCENT_CLASSES[accentColor] ?? { bar: "bg-gray-400", glow: "group-hover:bg-gray-400" };
  return (
    <div className="group flex flex-col items-center justify-center gap-1 flex-1 px-5 py-4 border-r border-gray-100/50 last:border-r-0 hover:bg-gray-50/50 transition-colors duration-300 relative overflow-hidden min-w-0">
      <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${colorClass}`}>
        <span className="transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </div>
      <div className={`text-2xl font-bold font-mono tracking-tight ${colorClass} group-hover:scale-105 transition-transform duration-300`}>
        {value}
      </div>
      {date && <div className="text-xs text-gray-400 mt-0.5">{date}</div>}
      {sub  && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none ${accent.glow}`} />
      <div className={`mt-3 h-0.5 w-12 rounded-full opacity-40 group-hover:w-16 group-hover:opacity-100 transition-all duration-300 ${accent.bar}`} />
    </div>
  );
}

interface WeightDay { weight: number; day: string }

function diversionColor(rate: number): string {
  if (rate >= 60) return "text-[#009e52]";
  if (rate >= 40) return "text-amber-500";
  return "text-red-500";
}

function diversionAccent(rate: number): string {
  if (rate >= 60) return "#009e52";
  if (rate >= 40) return "#f59e0b";
  return "#ef4444";
}

export default function OverviewCard() {
  const [highest,       setHighest]       = useState<WeightDay>({ weight: 0, day: "" });
  const [lowest,        setLowest]        = useState<WeightDay>({ weight: 0, day: "" });
  const [average,       setAverage]       = useState(0);
  const [totalWeight,   setTotalWeight]   = useState(0);
  const [binsMonitored, setBinsMonitored] = useState(0);
  const [criticalBins,  setCriticalBins]  = useState(0);
  const [diversionRate, setDiversionRate] = useState(0);

  const contextData = useContext(WasteDataContext);

  useEffect(() => {
    if (!Array.isArray(contextData) || contextData.length === 0) return;

    const tempHighest: any = findHighest(contextData);
    const tempLowest:  any = findLowest(contextData);

    setHighest({ weight: tempHighest.overall_weight, day: TimestampToString(tempHighest.createdAt) });
    setLowest ({ weight: tempLowest.overall_weight,  day: TimestampToString(tempLowest.createdAt)  });
    setAverage(calculateOverallAverage(contextData));

    let tw = 0;
    let td = 0;
    contextData.forEach((item: any) => {
      tw += item.overall_weight         ?? 0;
      td += (item.overall_biodegradable ?? 0) + (item.overall_recyclable ?? 0);
    });
    setTotalWeight(tw);
    setDiversionRate(tw > 0 ? (td / tw) * 100 : 0);
  }, [contextData]);

  useEffect(() => {
    fetchData("trashbin").then((res: any) => {
      if (!Array.isArray(res)) return;
      setBinsMonitored(res.length);
      setCriticalBins(res.filter((b: any) => b.capacity >= 90).length);
    });
  }, []);

  const highestVal   = highest.weight <= 0 && highest.day === "" ? "N/A" : `${highest.weight} kg`;
  const lowestVal    = lowest.weight  <= 0 && highest.day === "" ? "N/A" : `${lowest.weight} kg`;
  const averageVal   = average      <= 0 ? "N/A" : `${average.toPrecision(4)} kg`;
  const totalVal     = totalWeight  <= 0 ? "N/A" : `${totalWeight.toFixed(1)} kg`;
  const diversionVal = diversionRate <= 0 ? "N/A" : `${diversionRate.toFixed(1)}%`;
  const criticalColor  = criticalBins > 0 ? "text-red-500"   : "text-[#009e52]";
  const criticalAccent = criticalBins > 0 ? "#ef4444"        : "#009e52";

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-6 flex flex-wrap divide-x divide-gray-100/50 overflow-hidden">
      <StatItem
        icon={<BsTrash />}
        label="Total Waste"
        value={totalVal}
        sub="selected period"
        colorClass="text-[#216604]"
        accentColor="#216604"
      />
      <StatItem
        icon={<BsGraphUpArrow />}
        label="Peak Day"
        value={highestVal}
        date={highest.day || undefined}
        colorClass="text-red-500"
        accentColor="#ef4444"
      />
      <StatItem
        icon={<BsDashLg />}
        label="Daily Avg"
        value={averageVal}
        colorClass="text-gray-500"
        accentColor="#6b7280"
      />
      <StatItem
        icon={<BsGraphDownArrow />}
        label="Lowest Day"
        value={lowestVal}
        date={lowest.day || undefined}
        colorClass="text-[#00cb6a]"
        accentColor="#00cb6a"
      />
      <StatItem
        icon={<BsRecycle />}
        label="Diversion Rate"
        value={diversionVal}
        sub="bio + recyclable"
        colorClass={diversionColor(diversionRate)}
        accentColor={diversionAccent(diversionRate)}
      />
      <StatItem
        icon={<BsExclamationTriangle />}
        label="Critical Bins"
        value={criticalBins === 0 ? "None" : `${criticalBins}`}
        sub={`of ${binsMonitored} monitored`}
        colorClass={criticalColor}
        accentColor={criticalAccent}
      />
    </div>
  );
}
