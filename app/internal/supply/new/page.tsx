'use client';

import ProductForm from '@/components/ProductForm/ProductForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreateProductMutation } from '@/shared/graphql/mutations/CreateProduct.mutation';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import convertCurrency from '@/shared/utils/convertCurrency';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewProductPage() {
  const router = useRouter();

  const [createProduct, { loading }] = useMutation(CreateProductMutation);

  function handleSubmit(values: any) {
    
    createProduct({
      variables: {
        input: {
          ...values,
          quantity: Number(values.quantity),
          unitPrice: convertCurrency(values.unitPrice),
          minimumQuantity: Number(values.minimumQuantity),
          categoryId: Number(values.categoryId),
          propertyId: Number(values.propertyId),
        },
      },
    })
      .then(() => {
        toast.success('Produto criado com sucesso!', {containerId: 'default'});
        router.push(PageRoutes.ListProducts);
      })
      .catch(() => {
        toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'});
      });
  }

  function goBack() {
    router.push(PageRoutes.ListProducts);
  }

  return (
    <AnimatedPage>
      <div className="new__product__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Cadastrar produto</h2>
            </div>

            <div className="card-body pt-2 pb-4">
              <ProductForm
                loading={loading}
                cancelFunction={goBack}
                submitFunction={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewProductPage;
