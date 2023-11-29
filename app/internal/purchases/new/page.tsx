'use client';

import PurcharseForm from '@/components/PurchaseForm/PurchaseForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreatePurchaseMutation } from '@/shared/graphql/mutations/CreatePurchase.mutation';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import convertCurrency from '@/shared/utils/convertCurrency';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewPurhcasePage() {
  const router = useRouter();

  const [CreatePurchase, { loading }] = useMutation(CreatePurchaseMutation);

  function handleSubmit(values: any, prods: any) {
    const productsToGql = prods.map((prod: any) => ({
      productId: Number(prod.productId),
      amountPerUnit: Number(prod.amountPerUnit),
      unitPrice: convertCurrency(prod.unitPrice),
      units: Number(prod.units),
    }));

    CreatePurchase({
      variables: {
        input: {
          propertyId: Number(values.propertyId),
          description: values.description,
          products: productsToGql,
        },
      },
    })
      .then(() => {
        toast.success('Compra criada com sucesso', {containerId: 'default'});
        router.push(PageRoutes.ListPurchases);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'}));
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
            loading={loading}
            pageTitle="Nova Compra"
          />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewPurhcasePage;
