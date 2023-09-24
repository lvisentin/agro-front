'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import OperationFormModal from '@/components/OperarionFormModal/OperarionFormModal';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { GetOperationsQuery } from '@/shared/graphql/queries/GetOperations.query';
import { Operation } from '@/shared/models/operations/Operations.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function OperationsPage() {
  const { push } = useRouter();

  const {
    loading,
    error,
    data: { operations } = {},
    refetch,
  } = useQuery(GetOperationsQuery);

  useEffect(() => {
    refetch();
  }, []);


  const columns = [
    {
      field: '_id',
      name: 'Código',
    },
    {
      field: 'name',
      name: 'Operação',
    },
    {
      field: 'date',
      name: 'Data',
    },
    {
      field: 'product',
      name: 'Produto',
    },
    {
      field: 'costPerPlot',
      name: 'Valor',
      transformData: (data: Operation) =>
        `${data.costPerPlot.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  function goToNewOperation() {
    push(PageRoutes.NewOperations);
  }

  function goToEdit(operation: Operation) {
    push(`${PageRoutes.NewOperations}/${operation._id}`);
  }

  function deleteOperation(operation: Operation) {
    console.log('Operation', operation);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  function openModal() {
    (
      document.getElementById('operation_details_modal') as HTMLFormElement
    )?.showModal();
  }

  return (
    <AnimatedPage>
      <div className="operations__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Propriedades</h2>

          <PrimaryButton onClick={goToNewOperation}>
            <FontAwesomeIcon icon={faPlus} />
            Nova operação
          </PrimaryButton>
        </div>

        <OperationFormModal />

        {operations?.length >= 0 ? (
          <DataTable
            data={operations}
            columns={columns}
            handleEditClick={goToEdit}
            handleDeleteClick={deleteOperation}
            handlePreviewClick={openModal}
          />
        ) : (
          <NoData message={'Não encontramos nenhuma operação cadastrada'} />
        )}
      </div>
    </AnimatedPage>
  );
}

export default OperationsPage;
