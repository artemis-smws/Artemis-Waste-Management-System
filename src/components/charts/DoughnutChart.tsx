import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type DoughnutChartProps = {
  data: { name: string; value: number }[];
  colors?: string[];
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors?.[index % colors.length] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => [`${value} kg`, 'Weight']} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;