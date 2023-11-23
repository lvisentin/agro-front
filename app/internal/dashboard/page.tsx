'use client';

import InfoCard from '@/components/InfoCard/InfoCard';
import PieChart from '@/components/PieChart/PieChart';
import SelectField from '@/components/SelectField/SelectField';
import { GetAnalyticsQuery } from '@/shared/graphql/queries/GetAnalytics.query';
import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const {
    loading,
    error,
    refetch,
    data: { analyticsDashboard } = {},
  } = useQuery(GetAnalyticsQuery);

  const { loading: getPropertiesLoading, data: { properties } = {} } =
    useQuery(GetPropertiesQuery);

  const { loading: getPlotsLoading, data: { plots } = {}, refetch: refetchPlots} = 
    useQuery(GetPlotsQuery);
    
  const [userData, setUserData] = useState<any>(null);
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [selectedPlot, setSelectedPlot] = useState(0);


  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('userData')!);
    if (localData) {
      setUserData(localData);
    }
  }, []);

  useEffect(() => {
    if (!getPropertiesLoading && properties && properties.length > 0 && selectedProperty === 0) {
      setSelectedProperty(properties[0].id);
    }
  }, [getPropertiesLoading, properties, selectedProperty]);

  useEffect(() => {
    if (!getPlotsLoading && plots && plots.length > 0 && selectedPlot === 0) {
      setSelectedPlot(plots[0].id);
    }
  }, [getPlotsLoading, plots, selectedPlot]);

  useEffect(() => {
    if (!selectedProperty) {
      refetchPlots({ propertyId: undefined });
      return;
    }

    refetchPlots({
      propertyId: Number(selectedProperty),
    });
  }, [selectedProperty, refetchPlots]);

  useEffect(() => {
    refetch();
  }, [])

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'});
  }

  return (
    <AnimatedPage>
      <div className="analytics_wrapper">
       <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Olá, {userData?.name}!</h2>
        </div>
        <div className='filter'>
          <div className='flex items-center gap-4'>
            <SelectField
              name="property"
              options={properties}
              value={selectedProperty}
              onChange={(e) => {
                setSelectedPlot(0)
                setSelectedProperty(e.target.value);
              }}
              disabled={getPropertiesLoading}
              placeholder="Selecione uma propriedade"
              label="Filtrar por propriedade"
            />

            <SelectField
              options={plots?.length > 0 ? plots : []}
              value={selectedPlot}
              onChange={(e) => {
                setSelectedPlot(e.target.value);
              }}
              name="plotId"
              disabled={!selectedProperty || getPlotsLoading || loading}
              placeholder="Selecione um talhão"
              label="Filtrar por talhão"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-1 mb-5">
          {[
            {
              title: "Operações no último mês",
              text: analyticsDashboard?.operationsCount,
              color: "green",
            },
            {
              title: "Custo por talhão",
              text: analyticsDashboard?.plotsCount,
              color: "green",
            },
            {
              title: "Custo total / ha",
              text: analyticsDashboard?.costPerHectare,
              color: "green",
            },
            {
              title: "Total gasto no último mês",
              text: analyticsDashboard?.totalSpent?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
              color: "green",
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

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2 p-1 mb-5">
          <PieChart title={'Talhão'} />
        </div>
      </div>
    </AnimatedPage>
  );
}
