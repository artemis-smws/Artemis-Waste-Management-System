import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js";

type BarChartProps = {
  data: ChartData;
  options?: ChartOptions;
};

const BarChart: React.FC<BarChartProps> = ({ data, options = {} }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data,
      options,
    });
  }, [data, options]);

  return <canvas ref={canvasRef} />;
};


export default BarChart;