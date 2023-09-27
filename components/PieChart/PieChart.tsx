import React, { useState, useEffect } from 'react';
import { PieChartProps } from './PieChartProps.model';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ title }: PieChartProps) {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Plantio', 'Opt 1', 'Opt 2'],
      datasets: [
        {
          data: [15, 10, 20],
          borderColor: ['blue', 'red', 'green'],
          backgroundColor: ['blue', 'red', 'green'],
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <div className="card w-94 bg-white rounded-lg shadow-md">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="md:col-span-1 lg:h-[40vh] h-[20vh] p-4">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
