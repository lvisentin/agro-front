'use client';

import { Purchase } from '@/shared/models/purchases/Purchases.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';

function PurchasesPage() {
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ['purchases'],
  //   queryFn: () => purchasesService.fetchPurchasesList(),
  // });

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

  // if (isLoading) {
  //   return <span className="loading loading-spinner loading-lg"></span>;
  // }

  return (
    <AnimatedPage>
      <div className="purchases__wrapper">
        <div className="prose">
          <h2 className="prose-h2">Compras</h2>
        </div>
        {/* <DataTable data={data} columns={columns} /> */}
      </div>
    </AnimatedPage>
  );
}

export default PurchasesPage;
