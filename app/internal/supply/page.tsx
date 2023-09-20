'use client';

import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

function SupplyPage() {
  const { push } = useRouter();

  function goToNewPage() {
    push(PageRoutes.NewProduct);
  }
  const columns = [
    {
      field: '_id',
      name: 'Código',
    },
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'category',
      name: 'Categoria',
    },
    {
      field: 'quantity',
      name: 'Qtd em estoque',
    },
    {
      field: 'minQuantity',
      name: 'Qtd mínima em estoque',
    },
  ];

  // if (isLoading) {
  //   return <span className="loading loading-spinner loading-lg"></span>;
  // }

  return (
    <AnimatedPage>
      <div className="supply__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Estoque</h2>

          <PrimaryButton onClick={goToNewPage}>
            <FontAwesomeIcon icon={faPlus} />
            Novo produto
          </PrimaryButton>
        </div>
        {/* <DataTable data={data} columns={columns} /> */}
      </div>
    </AnimatedPage>
  );
}

export default SupplyPage;
