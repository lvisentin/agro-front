'use client';

import InfoCard from '@/components/InfoCard/InfoCard';
import PieChart from '@/components/PieChart/PieChart';
import SelectField from '@/components/SelectField/SelectField';
import { GetAnalyticsQuery } from '@/shared/graphql/queries/GetAnalytics.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const { loading: getPropertiesLoading, data: { properties } = {} } =
    useQuery(GetPropertiesQuery);

  const {
    loading,
    error,
    refetch,
    data: { analyticsDashboard } = {},
  } = useQuery(GetAnalyticsQuery);

  // TODO: colocar isso num service
  const [userData, setUserData] = useState<any>(null);
  const [selectedProperty, setSelectedProperty] = useState(0);

  function handlePropertyChange(e: any) {
    setSelectedProperty(e.target.value);

    if (!e.target.value) {
      refetch({ propertyId: undefined });
      return;
    }''

    refetch({ propertyId: Number(e.target.value) });
  }

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('userData')!);
    if (localData) {
      setUserData(localData);
    }

    refetch({ propertyId: Number(selectedProperty) });
  }, [selectedProperty, refetch]);

  useEffect(() => {
    if (properties && properties.length > 0) {
      setSelectedProperty((properties[0].id));
    }
  }, [properties]);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', { containerId: 'default' });
  }

  return (
    <AnimatedPage>
      <div className="analytics_wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Olá, {userData?.name}!</h2>
        </div>
        <div className="filter">
          <div className="flex items-center gap-4">
            <SelectField
              name="property"
              options={properties}
              value={selectedProperty}
              onChange={handlePropertyChange}
              disabled={getPropertiesLoading}
              placeholder="Selecione uma propriedade"
              label="Filtrar por propriedade"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 p-1 mb-5">
          {[
            {
              title: 'Operações no último mês',
              text: analyticsDashboard?.operationsCount,
              color: 'green',
            },
            {
              title: 'Custo por talhão',
              text: analyticsDashboard?.plotsCount,
              color: 'green',
            },
            {
              title: 'Custo total / ha',
              text: analyticsDashboard?.costPerHectare?.toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL',
                }
              ),
              color: 'green',
            },
            {
              title: 'Total gasto no último mês',
              text: analyticsDashboard?.totalSpent?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
              color: 'green',
            },
            {
              title: 'ROI',
              text: analyticsDashboard?.roi ? `${analyticsDashboard?.roi?.toFixed(2)}%` :"N/A" ,
              color: 'green',
            },
          ].map((item, index) => (
            <InfoCard
              key={index}
              title={item.title}
              text={item.text}
              color={item.color}
            />
          ))}
        </div>
        {analyticsDashboard && (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2 p-1 mb-5">
            <PieChart
              title={'Produtos utilizados'}
              chartOptions={analyticsDashboard.productUsageByCategory}
            />
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
