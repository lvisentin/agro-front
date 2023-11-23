'use client';

import ProductionForm from '@/components/ProductionForm/ProductionForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdateProductionMutation } from '@/shared/graphql/mutations/UpdateProduction.mutation';
import { GetProductionByIdQuery } from '@/shared/graphql/queries/GetProductionById.query';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import convertCurrency from '@/shared/utils/convertCurrency';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type PageProps = {
  params: {
    id: string;
  };
};

function EditProducitonPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const {
    loading,
    error,
    data: { production } = {},
  } = useQuery(GetProductionByIdQuery, { variables: { id: Number(id) } });

  const [updateProduction, { loading: updateLoading }] =
    useMutation(UpdateProductionMutation);

  function handleEdit(values: any) {
    const formattedPrice = values.price.replace('R$', '').replace(/\./g, '').replace(',', '.')

    const variables = {
      id: production.id,
      input: {
        plotId: Number(values.plotId),
        description: values.description,
        price: convertCurrency(values.price),
        quantity: Number(values.quantity),
        measurementUnit: values.measurementUnit,
        executionDate: values.executionDate
      },
    };

    updateProduction({ variables: variables })
      .then(() => {
        toast.success('Produtividade atualizada com sucesso.', {containerId: 'default'});
        router.push(PageRoutes.ListProduction);
      })
      .catch(() => {
        toast.error('Ocorreu um erro, tente novamente', {
          containerId: 'default',
        });
      });
  }

  function goBack() {
    router.push(PageRoutes.ListProduction);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'});
  }

  return (
    <AnimatedPage>
      <div className="new__production__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Editar Produção</h2>
            </div>

            <div className="card-body pt-2 pb-4">
              {production && (
                <ProductionForm
                  cancelFunction={goBack}
                  submitFunction={handleEdit}
                  production={production}
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

export default EditProducitonPage;
