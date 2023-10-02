'use client';

import PlotForm from '@/components/PlotForm/PlotForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreatePlotMutation } from '@/shared/graphql/mutations/CreatePlot.mutation';
import { Plot } from '@/shared/models/plots/Plots.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewPlotPage() {
  const router = useRouter();

  const [createPlot] = useMutation(CreatePlotMutation);

  function handleSubmit({ name, farmingType, size, propertyId }: Plot) {
    createPlot({
      variables: {
        input: {
          name,
          farmingType,
          size: Number(size),
          propertyId: Number(propertyId),
        },
      },
    })
      .then(() => {
        toast.success('Talhão criado com sucesso');
        router.push(PageRoutes.ListPlots);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente'));
  }

  function goBack() {
    router.push(PageRoutes.ListPlots);
  }

  return (
    <AnimatedPage>
      <div className="new__plot__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Cadastrar Talhão</h2>
            </div>

            <div className="card-body pt-2 pb-4">
              <PlotForm cancelFunction={goBack} submitFunction={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewPlotPage;
