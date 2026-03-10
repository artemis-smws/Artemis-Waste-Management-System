import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

type BarChartProps = {
  data: any[];
  bars: { dataKey: string; fill: string; stackId?: string }[];
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 min-w-[140px]">
        <p className="text-xs font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: p.fill }} />
              <span className="text-gray-500">{p.dataKey}</span>
            </span>
            <span className="font-mono font-medium text-[#171717]">{p.value} kg</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-1 px-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const BarChart: React.FC<BarChartProps> = ({ data, bars }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }} barSize={28}>
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "Inter, sans-serif" }}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "Inter, sans-serif" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v} kg`}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
        {bars.map((bar, index) => {
          const isFirst = index === 0;
          const isLast = index === bars.length - 1;
          return (
            <Bar
              key={`bar-${index}`}
              dataKey={bar.dataKey}
              stackId={bar.stackId}
              fill={bar.fill}
              radius={isLast ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          );
        })}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;