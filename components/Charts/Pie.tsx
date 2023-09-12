import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, ] = useState<any>({
    labels: ['Plantio', 'Opt 1', 'Opt 2'],
    datasets: [
      {
        data: [15, 10, 20],
        borderColor: ['blue', 'red', 'green'],
        backgroundColor: ['blue', 'red', 'green'],
      },
    ],
  });

  const [chartOptions] = useState<any>({
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
  });

  return (
    <div className='col-span-1 w-full m-auto p-4 rounded-lg bg-white'>
      <p className='text-2xl font-semibold'>Operações</p>
      <Pie className='lg:h-[30vh] h-[30h]' data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
