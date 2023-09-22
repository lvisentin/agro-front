'use client';

import OperationForm from '@/components/OperationForm/OperarionForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdateOperationMutation } from '@/shared/graphql/mutations/UpdateOperations.mutation';
import { GetOperationByIdQuery } from '@/shared/graphql/queries/GetOperationById.query';
import { Operation } from '@/shared/models/operations/Operations.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type PageProps = {
  params: {
    id: string;
  };
};

function EditOperationPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const {
    loading,
    error,
    data: { operation } = {},
  } = useQuery(GetOperationByIdQuery, { variables: { id: Number(id) } });

  const [updateOperation, { loading: updateLoading }] =
    useMutation(UpdateOperationMutation);

  function handleEdit(values: Operation) {
    const variables = {
      id: operation.id,
      input: {
        ...values,
      },
    };

    updateOperation({ variables: variables }).then(() => {
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
          {operation && (
            <OperationForm
              cancelFunction={goBack}
              submitFunction={handleEdit}
              operation={operation}
              loading={loading || updateLoading}
              confirmBtn='Salvar operação'
            />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EditOperationPage;
