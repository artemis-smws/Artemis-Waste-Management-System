import React from "react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type LineChartProps = {
  data: { name: string; value: number }[];
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="value" stroke="grey" dot={{r: 3}} strokeWidth={2} />
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{fill: '#666', fontSize: 12}} tickLine={false} axisLine={false} />
        <YAxis tick={{fill: '#666', fontSize: 12}} tickLine={false} axisLine={false} />
        <Tooltip formatter={(value: any) => [`${value} kg`, 'Weight']} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;