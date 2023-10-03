'use client';

import PurcharseForm from '@/components/PurchaseForm/PurchaseForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreatePurchaseMutation } from '@/shared/graphql/mutations/CreatePurchase.mutation';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewPurhcasePage() {
  const router = useRouter();

  const [CreatePurchase] = useMutation(CreatePurchaseMutation);

  function handleSubmit(values: any, prods: any) {
    console.log(values, prods);

    const productsToGql = prods.map((prod: any) => ({
      productId: Number(prod.productId),
      amountPerUnit: Number(prod.unitPrice.split('R$')[1]),
      units: Number(prod.amountPerUnit),
    }));

    CreatePurchase({
      variables: {
        input: {
          propertyId: Number(values.propertyId),
          description: values.description,
          products: productsToGql
        },
      },
    })
      .then(() => {
        toast.success('Compra criada com sucesso');
        router.push(PageRoutes.ListPurchases);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente'));
  }

  function goBack() {
    router.push(PageRoutes.ListPurchases);
  }

  return (
    <AnimatedPage>
      <div className="new__purchase__wrapper">
        <div className="page__content">
          <PurcharseForm
            submitFunction={handleSubmit}
            cancelFunction={goBack}
            pageTitle="Nova Compra"
          />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewPurhcasePage;
