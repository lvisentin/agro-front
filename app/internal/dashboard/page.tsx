'use client';

import InfoCard from '@/components/InfoCard/InfoCard';
import { GetAnalyticsQuery } from '@/shared/graphql/queries/GetAnalytics.query';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

export default function Home() {
  const {
    loading,
    data: { analyticsDashboard } = {},
    error,
  } = useQuery(GetAnalyticsQuery);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente');
  }

  return (
    <AnimatedPage>
      <main>
        <h1 className="font-semibold text-4xl mb-4">Bom dia, Lucas!</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-1 mb-5">
          <InfoCard
            title="Operações no último mês"
            text={analyticsDashboard.operationsCount}
            color="green"
          />
          <InfoCard
            title="Talhões"
            text={analyticsDashboard.plotsCount}
            color="green"
          />
          <InfoCard
            title="Total gasto no último mês"
            text={analyticsDashboard.totalSpent.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
            color="green"
          />
        </div>

        {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2 p-1 mb-5">
          <PieChart title={'Operações'} />
          <PieChart title={'Saídas'} />
          <LineChart title={'Lucros30d'} />
        </div> */}
      </main>
    </AnimatedPage>
  );
}
