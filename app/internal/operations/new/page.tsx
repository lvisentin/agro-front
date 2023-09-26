'use client';

import OperationForm from '@/components/OperationForm/OperationForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreatePlotMutation } from '@/shared/graphql/mutations/CreatePlot.mutation';
import { Operation } from '@/shared/models/operations/Operations.model';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewOperationPage() {
  const router = useRouter();

  const [createOperation] = useMutation(CreatePlotMutation);

  function handleSubmit({
    name,
    date,
    product,
    costPerPlot,
    costPerHa,
    unityCost,
    productType,
    unity,
    dose,
    plot,
  }: Operation) {
    createOperation({
      variables: {
        input: {
          name,
          date,
          product,
          costPerPlot: Number(costPerPlot),
          costPerHa: Number(costPerHa),
          unityCost: Number(unityCost),
          productType,
          unity: Number(unity),
          dose: Number(dose),
          plot,
        },
      },
    }).then(() => {
      toast.success('Operação criado com sucesso');
      router.push(PageRoutes.ListOperations);
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