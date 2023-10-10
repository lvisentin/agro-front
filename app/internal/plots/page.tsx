'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import SelectField from '@/components/SelectField/SelectField';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { DeletePlotMutation } from '@/shared/graphql/mutations/DeletePlot.mutation';
import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { Plot } from '@/shared/models/plots/Plots.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation, useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function PlotsPage() {
  const { push } = useRouter();
  const [deletePlot] = useMutation(DeletePlotMutation);
  const [selectedProperty, setSelectedProperty] = useState<Number>(0);
  const { loading: getPropertiesLoading, data: { properties } = {} } =
    useQuery(GetPropertiesQuery);

  const {
    loading,
    error,
    data: { plots } = {},
    refetch,
  } = useQuery(GetPlotsQuery, {notifyOnNetworkStatusChange: true});

  const columns = [
    {
      field: 'id',
      name: 'Código',
    },
    {
      field: 'property',
      name: 'Propriedade',
      transformData: (plot: Plot) => plot.property?.name,
    },
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'farmingType',
      name: 'Cultura agrícola',
    },
    {
      field: 'size',
      name: 'Tamanho',
      transformData: (data: Plot) => `${data.size}ha`,
    },
  ];

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!selectedProperty) {
      refetch({ propertyId: undefined });
      return;
    }

    refetch({
      propertyId: Number(selectedProperty),
    });
  }, [selectedProperty, refetch]);

  function handleDelete(plot: Plot) {
    deletePlot({ variables: { id: plot.id } })
      .then(() => {
        toast.success('Talhão deletado com sucesso', {
          containerId: 'default',
        });
        refetch();
      })
      .catch(() =>
        toast.success('Ocorreu um erro, tente novamente', {
          containerId: 'default',
        })
      );
  }

  function clearFilter() {
    setSelectedProperty(0);
  }

  function goToNewPlot() {
    push(PageRoutes.NewPlot);
  }

  function goToEdit(plot: Plot) {
    push(`${PageRoutes.NewPlot}/${plot.id}`);
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', { containerId: 'default' });
  }

  return (
    <AnimatedPage>
      <div className="plots__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Talhões</h2>

          <PrimaryButton onClick={goToNewPlot}>
            <FontAwesomeIcon icon={faPlus} />
            Novo talhão
          </PrimaryButton>
        </div>

        <div className="filter">
          <div className="flex items-center gap-4">
            <SelectField
              name="property"
              options={properties}
              value={selectedProperty}
              onChange={(e) => {
                setSelectedProperty(e.target.value);
              }}
              disabled={getPropertiesLoading}
              placeholder="Selecione uma propriedade"
              label="Filtrar por propriedade"
            />
            <SecondaryButton
              type="button"
              onClick={clearFilter}
              className="mt-4"
            >
              Limpar filtro
            </SecondaryButton>
          </div>
        </div>
        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : plots?.length > 0 ? (
          <DataTable
            data={plots}
            columns={columns}
            handleEditClick={goToEdit}
            handleDeleteClick={handleDelete}
          />
        ) : (
          <NoData message={'Não encontramos nenhum talhão cadastrada'} />
        )}
      </div>
    </AnimatedPage>
  );
}

export default PlotsPage;
