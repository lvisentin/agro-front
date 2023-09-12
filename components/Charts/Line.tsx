import React, { useState, useEffect } from 'react';
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

const LineChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: ['Plantio', 'Opt 1', 'Opt 2'],
    datasets: [
      {
        fill: true,
        label: 'Lucos30d',
        data: [1, 10, 30],
        borderColor: ['blue', 'red', 'green'],
        backgroundColor: 'blue',
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState<any>({
    responsive: true,
    plugins: {
      legend: {
        position:  false,
      },
      title: {
        display: false,
      },
    },
  });

  return (
    <div className='col-span-1 w-full m-auto p-4 rounded-lg bg-white'>
      <p className='text-2xl font-semibold'>Lucros30d</p>
      <Line className='lg:h-[30vh] h-[30vh]' data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
