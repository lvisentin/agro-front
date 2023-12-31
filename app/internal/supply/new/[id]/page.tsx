'use client';

import ProductForm from '@/components/ProductForm/ProductForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdateProductMutation } from '@/shared/graphql/mutations/UpdateProduct.mutation';
import { GetProductByIdQuery } from '@/shared/graphql/queries/GetProductById.query';

import AnimatedPage from '@/shared/templates/AnimatedPage';
import convertCurrency from '@/shared/utils/convertCurrency';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type PageProps = {
  params: {
    id: string;
  };
};

function EditProductPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const {
    loading,
    error,
    data: { product } = {},
  } = useQuery(GetProductByIdQuery, { variables: { id: Number(id) } });

  const [updateProduct, { loading: updateLoading }] = useMutation(
    UpdateProductMutation
  );

  function handleEdit(values: any) {
  
    const variables = {
      id: product.id,
      input: {
        ...values,
        quantity: Number(values.quantity),
        unitPrice: convertCurrency(values.unitPrice),
        minimumQuantity: Number(values.minimumQuantity),
        categoryId: Number(values.categoryId),
        propertyId: Number(values.propertyId),
      },
    };

    updateProduct({ variables: variables })
      .then(() => {
        toast.success('Propriedade atualizada com sucesso.', {
          containerId: 'default',
        });
        router.push(PageRoutes.ListProducts);
      })
      .catch(() =>
        toast.error('Ocorreu um erro, tente novamente', {
          containerId: 'default',
        })
      );
  }

  function goBack() {
    router.push(PageRoutes.ListProducts);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', { containerId: 'default' });
  }

  return (
    <AnimatedPage>
      <div className="new__property__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Editar produto</h2>
            </div>
            <div className="card-body pt-2 pb-4">
              {product && (
                <ProductForm
                  cancelFunction={goBack}
                  submitFunction={handleEdit}
                  product={product}
                  loading={loading || updateLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EditProductPage;
