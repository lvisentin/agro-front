'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import OperationDetailModal from '@/components/OperationDetailModal/OperationDetailModal';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { DeleteOperationMutation } from '@/shared/graphql/mutations/DeleteOperation.mutation';
import { GetOperationsQuery } from '@/shared/graphql/queries/GetOperations.query';
import { Operation } from '@/shared/models/operations/Operations.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import convertDateToGMT3 from '@/shared/utils/convertDateToGMT3';
import { useMutation, useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function OperationsPage() {
  const { push } = useRouter();
  const {
    loading,
    error,
    data: { operations } = {},
    refetch,
  } = useQuery(GetOperationsQuery);
  const [deleteOperation] = useMutation(DeleteOperationMutation);
  const [selectedOperation, setSelectedOperation] = useState(null);
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
      transformData: (data: Operation) => {
        return convertDateToGMT3(data.executionDate);
      },
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

  useEffect(() => {
    refetch();
  }, []);

  function goToNewOperation() {
    push(PageRoutes.NewOperations);
  }

  function handleDelete(operation: Operation) {
    deleteOperation({ variables: { id: operation.id } })
      .then(() => {
        toast.success('Operação deletada com sucesso', {
          containerId: 'default',
        });
        refetch();
      })
      .catch(() =>
        toast.error('Ocorreu um erro, tente novamente', {
          containerId: 'default',
        })
      );
  }

  function showModal(test: any) {
    console.log('test', test);
    setSelectedOperation(test);
    (
      document.getElementById('operation_details_modal') as HTMLFormElement
    ).showModal();
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', { containerId: 'default' });
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

        <OperationDetailModal operation={selectedOperation || undefined} />

        {operations?.length > 0 ? (
          <DataTable
            data={operations}
            columns={columns}
            handleDeleteClick={handleDelete}
            handlePreviewClick={showModal}
          />
        ) : (
          <NoData message={'Não encontramos nenhuma operação cadastrada'} />
        )}
      </div>
    </AnimatedPage>
  );
}

export default OperationsPage;
