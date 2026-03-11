import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";

type DoughnutChartProps = {
  data: { name: string; value: number }[];
  colors?: string[];
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string> & { payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
        <p className="text-xs text-gray-500 mb-1">{payload[0].name}</p>
        <p className="text-sm font-semibold font-mono" style={{ color: payload[0].payload.fill }}>
          {payload[0].value} kg
        </p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 px-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius="50%"
          outerRadius="80%"
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors?.[index % (colors?.length ?? 1)] ?? "#8884d8"}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;