'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { GetProductsQuery } from '@/shared/graphql/queries/GetProducts.query';
import { Product } from '@/shared/models/products/Products.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function SupplyPage() {
  const { push } = useRouter();

  const {
    loading,
    error,
    data: { products } = {},
    refetch,
  } = useQuery(GetProductsQuery);

  function goToNewPage() {
    push(PageRoutes.NewProduct);
  }

  useEffect(() => {
    refetch();
  }, []);

  const columns = [
    {
      field: 'code',
      name: 'Código',
    },
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'category',
      name: 'Categoria',
      transformData: (product: Product) => product.category.name,
    },
    {
      field: 'quantity',
      name: 'Qtd em estoque',
    },
    {
      field: 'minimumQuantity',
      name: 'Qtd mínima em estoque',
    },
  ];

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente');
  }

  if (products) {
    console.log('products', products);
  }

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

        {products?.length > 0 ? (
          <DataTable data={products} columns={columns} />
        ) : (
          <NoData message={'Não encontramos nenhum produto cadastrado'} />
        )}
      </div>
    </AnimatedPage>
  );
}

export default SupplyPage;
