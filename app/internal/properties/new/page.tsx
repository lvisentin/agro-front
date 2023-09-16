'use client';

import PropertyForm from '@/components/PropertyForm/PropertyForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { useRouter } from 'next/navigation';

function NewPropertyPage() {
  const router = useRouter();
  
  function createProperty() {
    console.log('createProperty');
  }

  function goBack() {
    router.push(PageRoutes.ListProperties);
  }

  return (
    <div className="new__property__wrapper">
      <div className="prose flex justify-between w-full max-w-full"></div>

      <div className="page__content">
        <PropertyForm cancelFunction={goBack} submitFunction={createProperty} />
      </div>
    </div>
  );
}

export default NewPropertyPage;
