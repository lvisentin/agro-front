'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
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
    data: { operations } = {},
    refetch,
  } = useQuery(GetOperationsQuery);

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    {
      field: 'id',
      name: 'Código',
    },
    {
      field: 'description',
      name: 'Operação',
    },
    {
      field: 'executionDate',
      name: 'Data da operação',
      transformData: (data: Operation) =>  new Date(data.executionDate).toLocaleDateString('pt-BR'),
    },
    {
      field: 'product',
      name: 'Produto',
      transformData: (data: Operation) => data.product?.name,
    },
    {
      field: 'totalCost',
      name: 'Custo Total',
      transformData: (data: Operation) =>
        `${data.totalCost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  function goToNewOperation() {
    push(PageRoutes.NewOperations);
  }

  function deleteOperation(operation: Operation) {
    console.log('Operation', operation);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <AnimatedPage>
      <div className="operations__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Operações</h2>

          <PrimaryButton onClick={goToNewOperation}>
            <FontAwesomeIcon icon={faPlus} />
            Nova operação
          </PrimaryButton>
        </div>

        {operations?.length >= 0 ? (
          <DataTable
            data={operations}
            columns={columns}
            handleDeleteClick={deleteOperation}
          />
        ) : (
          <NoData message={'Não encontramos nenhuma operação cadastrada'} />
        )}
      </div>
    </AnimatedPage>
  );
}

export default OperationsPage;
