'use client';

import InfoCard from '@/components/InfoCard/InfoCard';
import LineChart from '@/components/LineChart/LineChart';
import PieChart from '@/components/PieChart/PieChart';
import AnimatedPage from '@/shared/templates/AnimatedPage';

export default function Home() {
  return (
    <AnimatedPage>
      <main>
        <h1 className="font-semibold text-4xl mb-4">Bom dia, Lucas!</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-1 mb-5">
          <InfoCard title="Entradas" text="$21" value="+11.01%" color="green" />
          <InfoCard title="Entradas" text="$21" value="+11.01%" color="red" />
          <InfoCard title="Entradas" text="590" value="+11.01%" />
        </div>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2 p-1 mb-5">
          <PieChart title={'Operações'} />
          <PieChart title={'Saídas'} />
          <LineChart title={'Lucros30d'} />
        </div>
      </main>
    </AnimatedPage>
  );
}
