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
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Editar Talhão</h2>
            </div>

            <div className="card-body pt-2 pb-4">
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
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EditPlotPage;
