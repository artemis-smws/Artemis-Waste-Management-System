import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type PieChartProps = {
  data: { name: string; value: number }[];
  colors?: string[];
};

const PieChart: React.FC<PieChartProps> = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors?.[index % colors.length] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => [`${value}`, '']} />
        <Legend verticalAlign="bottom" height={36} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
