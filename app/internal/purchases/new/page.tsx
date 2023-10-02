'use client';

import PurcharseForm from '@/components/PurchaseForm/PurchaseForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreatePurchaseMutation } from '@/shared/graphql/mutations/CreatePurchase.mutation';
import { Purchase } from '@/shared/models/purchases/Purchases.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewPurhcasePage() {
  const router = useRouter();

  const [CreatePurchase] = useMutation(CreatePurchaseMutation);

  function handleSubmit({
    propertyId,
    description,
    code,
    amountPerUnit,
    units
  }: Purchase) {
    CreatePurchase({
      variables: {
        input: {
          propertyId,
          description,
          products: [
            {
              code,
              amountPerUnit,
              units
            }
          ]
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
