'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { DeletePlotMutation } from '@/shared/graphql/mutations/DeletePlot.mutation';
import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { Plot } from '@/shared/models/plots/Plots.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation, useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function PlotsPage() {
  const { push } = useRouter();
  const [deletePlot] = useMutation(DeletePlotMutation);

  const {
    loading,
    error,
    data: { plots } = {},
    refetch,
  } = useQuery(GetPlotsQuery);

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    {
      field: 'id',
      name: 'Código',
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

  function handleDelete(plot: Plot) {
    deletePlot({ variables: { id: plot.id } })
      .then(() => {
        toast.success('Talhão deletado com sucesso', {containerId: 'default'});
        refetch();
      })
      .catch(() => toast.success('Ocorreu um erro, tente novamente', {containerId: 'default'}));
  }

  function goToNewPlot() {
    push(PageRoutes.NewPlot);
  }

  function goToEdit(plot: Plot) {
    push(`${PageRoutes.NewPlot}/${plot.id}`);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'});
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
        {plots?.length > 0 ? (
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
