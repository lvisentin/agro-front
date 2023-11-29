import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { PieChartProps } from './PieChartProps.model';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartCustomProps extends PieChartProps {
  chartOptions: any[];
}

export default function PieChart({
  title,
  chartOptions: pChartOptions,
}: PieChartCustomProps) {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [hasValues, setHasValues] = useState(false);
  
  function getRandomColors(times: number) {
    return Array(times).fill(
      `#${Math.floor(Math.random() * 16777215).toString(16)}`
    );
  }

  useEffect(() => {
    const labels = pChartOptions.map((opt) => opt.category.name);
    const values = pChartOptions.map((opt) => opt.usage);
    const colors = getRandomColors(values.length);
    const hval = values.reduce((acc, val) => (acc += val), 0);
    setHasValues(hval);

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          borderColor: colors,
          backgroundColor: colors,
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
  }, [pChartOptions]);

  return (
    <div className="card w-94 bg-white rounded-lg shadow-md">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="md:col-span-1 lg:h-[40vh] h-[20vh] p-4 flex items-center justify-center">
          {hasValues ? (
            <Doughnut data={chartData} options={chartOptions} />
          ) : (
            'Nenhuma operação foi cadastrada'
          )}
        </div>
      </div>
    </div>
  );
}
