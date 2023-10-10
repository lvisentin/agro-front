'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { DeletePurchaseMutation } from '@/shared/graphql/mutations/DeletePurchase.mutation';
import { GetPurchasesQuery } from '@/shared/graphql/queries/GetPurchases.query';
import { Purchase } from '@/shared/models/purchases/Purchases.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation, useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function PurchasesPage() {
  const { push } = useRouter();

  const {
    loading,
    data: { purchases } = {},
    refetch,
  } = useQuery(GetPurchasesQuery);

  const [deletePurchase] = useMutation(DeletePurchaseMutation);

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    {
      field: 'description',
      name: 'Descrição',
    },
    {
      field: 'property',
      name: 'Propriedade',
      transformData: (purchase: any) => purchase.property.name,
    },
    {
      field: 'totalCost',
      name: 'Valor',
      transformData: (data: any) =>
        `${data.totalCost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  function goToNewPurchases() {
    push(PageRoutes.NewPurchases);
  }

  function goToPreview(purchase: Purchase) {
    push(`${PageRoutes.NewPurchases}/${purchase.id}`);
  }

  function handleDelete(purchase: Purchase) {
    console.log('Purchase', purchase);
    deletePurchase({
      variables: {
        id: purchase.id,
      },
    })
      .then(() => {toast.success('Deletado com sucesso'); refetch()})
      .catch(() => toast.success('Ocorreu um erro, tente novamente'));
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

        {purchases?.length > 0 ? (
          <DataTable
            data={purchases}
            columns={columns}
            handlePreviewClick={goToPreview}
            handleDeleteClick={handleDelete}
          />
        ) : (
          <NoData message={'Não encontramos nenhuma compra cadastrada'} />
        )}
      </div>
    </AnimatedPage>
  );
}

export default PurchasesPage;
