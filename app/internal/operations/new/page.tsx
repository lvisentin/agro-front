'use client';

import OperationForm from '@/components/OperationForm/OperationForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreateOperationMutation } from '@/shared/graphql/mutations/CreateOperation.mutation';
import { Operation } from '@/shared/models/operations/Operations.model';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewOperationPage() {
  const router = useRouter();

  const [createOperation, { loading }] = useMutation(CreateOperationMutation);

  function handleSubmit({
    description,
    plotId,
    productId,
    dosePerHecatare,
    executionDate,
  }: Operation) {
    console.log(plotId);
    createOperation({
      variables: {
        input: {
          description,
          plotId: Number(plotId),
          productId,
          dosePerHecatare: Number(dosePerHecatare),
          executionDate,
        },
      },
    })
      .then(() => {
        toast.success('Operação criado com sucesso', {containerId: 'default'});
        router.push(PageRoutes.ListOperations);
      })
      .catch((err) => {
        if (err.message === 'Not enough quantity') {
          toast.error('Quantidade insuficiente', {containerId: 'default'});
        }
      });
  }

  function goBack() {
    router.push(PageRoutes.ListOperations);
  }

  return (
    <div className="new__operation__wrapper">
      <div className="prose flex justify-between w-full max-w-full"></div>

      <div className="page__content">
        <div className="card w-full bg-base-100 shadow-xl rounded-md">
          <div className="card-title px-6 py-4">
            <h2 className="prose-h2">Cadastrar Operação</h2>
          </div>
          <div className="card-body pt-2 pb-4">
            <OperationForm
              loading={loading}
              cancelFunction={goBack}
              submitFunction={handleSubmit}
              confirmBtn="Salvar operação"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOperationPage;
