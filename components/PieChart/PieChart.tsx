import React, { useState, useEffect } from 'react';
import { PieChartProps } from "./PieChartProps.model";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({title}: PieChartProps) {

  const [chartData, setChartData] = useState<any>({
    datasets: [],
  })

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
    })

    setChartOptions({
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false
        },
      },
      maintainAspectRatio: false,
      responsive: true,
  })
  }, [])

  return (
    <div className='col-span-1 w-full m-auto p-4 rounded-lg bg-white'>
      <p className='text-2xl font-semibold'>{title}</p>
      <Pie className='w-auto' data={chartData} options={chartOptions} />
    </div>
  );
}
