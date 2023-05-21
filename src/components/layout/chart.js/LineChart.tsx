
import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js";

type LineChartProps = {
  data: ChartData;
  options?: ChartOptions;
};

const LineChart: React.FC<LineChartProps> = ({ data, options = {}}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    new Chart(ctx, {
      type: "line",
      data,
      options,
    });
  }, [data, options]);

  return <canvas ref={canvasRef}/>;
};

export default LineChart;