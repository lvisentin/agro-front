'use client';

import DataTable from '@/components/DataTable/DataTable';
import DeleteButton from '@/components/DeleteButton/DeleteButton';
import EditButton from '@/components/EditButton/EditButton';
import { Purchase } from '@/shared/services/purchases/Purchases.model';
import { purchasesService } from '@/shared/services/purchases/PurchasesService';
import { useQuery } from 'react-query';

function PurchasesPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchasesService.fetchPurchasesList(),
  });

  const columns = [
    {
      field: 'description',
      name: 'Descrição',
    },
    {
      field: 'category',
      name: 'Categoria',
    },
    {
      field: 'total',
      name: 'Valor',
      transformData: (data: Purchase) =>
        `${data.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="purchases__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Compras</h2>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default PurchasesPage;
