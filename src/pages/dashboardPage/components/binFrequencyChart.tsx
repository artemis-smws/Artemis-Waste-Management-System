import { useEffect, useState } from "react";
import BarChart from "../../../components/charts/BarChart";
import fetchData from "../../../hooks/useFetch";

const bars = [{ dataKey: "Avg Collections/Week", fill: "#216604" }];

const BUILDING_RE = /- ([A-Z]+(?:\s+[A-Z]+)?)\s/;

export default function BinFrequencyChart() {
  const [chartData, setChartData] = useState<{ name: string; "Avg Collections/Week": number }[]>([]);

  useEffect(() => {
    fetchData("trashbin").then((res: any) => {
      if (!Array.isArray(res)) return;

      // Group frequency totals by building abbreviation
      const grouped: Record<string, { total: number; count: number }> = {};
      res.forEach((bin: any) => {
        // Extract building abbreviation from organization string, e.g. "Alangilan - CICS Building …" → "CICS"
        const match = BUILDING_RE.exec(bin.organization as string);
        const key   = match ? match[1] : (bin.organization as string).split("-")[1]?.trim().split(" ")[0] ?? "Other";
        if (!grouped[key]) grouped[key] = { total: 0, count: 0 };
        grouped[key].total += bin.frequency ?? 0;
        grouped[key].count += 1;
      });

      const data = Object.entries(grouped)
        .map(([name, { total, count }]) => ({
          name,
          "Avg Collections/Week": Number.parseFloat((total / count).toFixed(1)),
        }))
        .sort((a, b) => b["Avg Collections/Week"] - a["Avg Collections/Week"]);

      setChartData(data);
    });
  }, []);

  return <BarChart data={chartData} bars={bars} />;
}
