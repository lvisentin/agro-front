'use client';

import PlotForm from '@/components/PlotForm/PlotForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdatePlotMutation } from '@/shared/graphql/mutations/UpdatePlot.mutation';
import { GetPlotByIdQuery } from '@/shared/graphql/queries/GetPlotById.query';
import { Plot } from '@/shared/models/plots/Plots.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type PageProps = {
  params: {
    id: string;
  };
};

function EditPlotPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const {
    loading,
    error,
    data: { plot } = {},
  } = useQuery(GetPlotByIdQuery, { variables: { id: Number(id) } });

  const [updatePlot, { loading: updateLoading }] =
    useMutation(UpdatePlotMutation);

  function handleEdit(values: Plot) {
    const variables = {
      id: plot.id,
      input: {
        ...values,
      },
    };

    updatePlot({ variables: variables }).then(() => {
      toast.success('Propriedade atualizada com sucesso.');
      router.push(PageRoutes.ListPlots);
    });
  }

  function goBack() {
    router.push(PageRoutes.ListPlots);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente');
  }

  return (
    <AnimatedPage>
      <div className="new__property__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          {plot && (
            <PlotForm
              cancelFunction={goBack}
              submitFunction={handleEdit}
              plot={plot}
              loading={loading || updateLoading}
            />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EditPlotPage;
