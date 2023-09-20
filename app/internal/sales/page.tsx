'use client';

import { Sale } from '@/shared/models/sales/Sales.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';

function SalesPage() {
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
      transformData: (data: Sale) =>
        `${data.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  // if (isLoading) {
  //   return <span className="loading loading-spinner loading-lg"></span>;
  // }

  return (
    <AnimatedPage>
      <div className="sales__wrapper">
        <div className="prose">
          <h2 className="prose-h2">Vendas</h2>
        </div>
        {/* <DataTable data={data} columns={columns} /> */}
      </div>
    </AnimatedPage>
  );
}

export default SalesPage;
