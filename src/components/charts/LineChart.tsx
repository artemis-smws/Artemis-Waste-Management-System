import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

type LineChartProps = {
  data: { name: string; value: number }[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-[#216604] font-mono">
          {payload[0].value} kg
        </p>
      </div>
    );
  }
  return null;
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#216604" stopOpacity={0.18} />
            <stop offset="95%" stopColor="#216604" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="value"
          stroke="#216604"
          strokeWidth={2.5}
          fill="url(#wasteGradient)"
          dot={{ r: 3, fill: "#216604", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#216604", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;