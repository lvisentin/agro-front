import React, { useState, useEffect } from 'react';
import { LineChartProps } from './LineChartProps.model';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart({ title }: LineChartProps) {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          fill: true,
          label: 'lucros30d',
          data: [1, 10, 30, 100, 110, 310],
          borderColor: '#4339F2',
          backgroundColor: '#DAD7FE',
        },
      ],
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        },
      },
    });
  }, []);

  return (
    <div className="card w-94 bg-white rounded-lg shadow-md">
      <div className="card-body relative">
        <h2 className="card-title">{title}</h2>
        <div className=" lg:h-[40vh] h-[30vh] flex align-center justify-center lg:pt-12">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
