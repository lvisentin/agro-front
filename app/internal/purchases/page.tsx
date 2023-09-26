'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { GetPurchasesQuery } from '@/shared/graphql/queries/GetPurchases.query';
import { Purchase } from '@/shared/models/purchases/Purchases.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function PurchasesPage() {
  const { push } = useRouter();

  const { 
    loading, 
    data: { purchases } = {},
    refetch
  } = useQuery(GetPurchasesQuery);

  useEffect(() => {
    refetch();
  }, []);

  const fakeObj:Array<Purchase> = [
    {
      id: "2",
      product: "Dessecação",
      quantity: 123,
      total: 123,
      category: "string",
      description: "string",
      createdAt: "28/06/2000"
    },
    {
      id: "3",
      product: "Dessecação",
      quantity: 123,
      total: 123,
      category: "string",
      description: "string",
      createdAt: "29/06/2000"
    },
  ]

  const columns = [
    {
      field: 'description',
      name: 'Produto',
    },
    {
      field: 'category',
      name: 'Quantidade',
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
    {
      field: 'createdAt',
      name: 'Cadastrado em',
    },
  ];

  function goToNewPurchases() {
    push(PageRoutes.NewPurchases);
  }

  function goToPreview(purchase: Purchase) {
    push(`${PageRoutes.NewPurchases}/${purchase.id}`);
  }

  function deletePurchase(purchase: Purchase) {
    console.log('Purchase', purchase);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <AnimatedPage>
      <div className="purchases__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Compras</h2>

          <PrimaryButton onClick={goToNewPurchases}>
            <FontAwesomeIcon icon={faPlus} />
            Cadastrar compra
          </PrimaryButton>
        </div>

        {fakeObj?.length >= 0 ? (
          <DataTable 
            data={fakeObj} 
            columns={columns}
            handlePreviewClick={goToPreview}
            handleDeleteClick={deletePurchase}
          />
        ) : (
          <NoData message={'Não encontramos nenhuma compra cadastrada'} />
        )}

      </div>
    </AnimatedPage>
  );
}

export default PurchasesPage;
