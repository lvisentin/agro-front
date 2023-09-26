'use client';

import PurcharseForm from '@/components/PurchaseForm/PurchaseForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useRouter } from 'next/navigation';

function NewPurhcasePage() {
  const router = useRouter();

  function createProduct() {
    console.log('createProduct');
  }

  function goBack() {
    router.push(PageRoutes.ListPurchases);
  }

  return (
    <AnimatedPage>
      <div className="new__purchase__wrapper">
        <div className="page__content">
          <PurcharseForm
            submitFunction={createProduct}
            cancelFunction={goBack}
            pageTitle="Nova Compra"
          />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewPurhcasePage;
