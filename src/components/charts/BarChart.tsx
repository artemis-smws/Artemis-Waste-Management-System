import React from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type BarChartProps = {
  data: any[];
  bars: { dataKey: string; fill: string; stackId?: string }[];
};

const BarChart: React.FC<BarChartProps> = ({ data, bars }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{fontSize: 12, fill: '#666'}} axisLine={false} tickLine={false} />
        <YAxis tick={{fontSize: 12, fill: '#666'}} axisLine={false} tickLine={false} />
        <Tooltip formatter={(value: any) => [`${value}`, '']} />
        <Legend verticalAlign="bottom" height={36} />
        {bars.map((bar, index) => (
          <Bar key={`bar-${index}`} dataKey={bar.dataKey} stackId={bar.stackId} fill={bar.fill} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;