'use client';

import PropertyForm from '@/components/PropertyForm/PropertyForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { propertiesService } from '@/shared/services/properties/PropertiesService';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

type PageProps = {
  params: {
    id: string;
  };
};

function EditPropertyPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const { isLoading, data: {property} = {} } = useQuery({
    queryKey: ['properties'],
    queryFn: () => propertiesService.getPropertyById(id),
  });

  if(property) {
    console.log(property)
  }

  function createProperty() {
    console.log('createProperty');
  }

  function goBack() {
    router.push(PageRoutes.ListProperties);
  }

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="new__property__wrapper">
      <div className="prose flex justify-between w-full max-w-full"></div>

      <div className="page__content">
        <PropertyForm
          cancelFunction={goBack}
          submitFunction={createProperty}
          property={property}
        />
      </div>
    </div>
  );
}

export default EditPropertyPage;
