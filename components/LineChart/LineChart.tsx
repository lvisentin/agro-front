import React, { useState, useEffect } from 'react';
import { LineChartProps } from "./LineChartProps.model";
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

export default function PieChart({title}: LineChartProps) {

  const [chartData, setChartData] = useState<any>({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({});


  useEffect(() => {
    setChartData({
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          fill: true,
          label: false,
          data: [1, 10, 30, 100, 110, 310],
          borderColor: '#4339F2',
          backgroundColor: '#DAD7FE',
        },
      ],
    })

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position:  false,
        },
        title: {
          display: false,
        },
      },
  })
  }, [])

  return (
    <div className='col-span-1 w-full m-auto p-4 rounded-lg bg-white'>
      <p className='text-2xl font-semibold'>{title}</p>
      <Line className='w-auto' data={chartData} options={chartOptions} />
    </div>
  );
}
