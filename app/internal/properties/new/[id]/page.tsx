'use client';

import PropertyForm from '@/components/PropertyForm/PropertyForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdatePropertyMutation } from '@/shared/graphql/mutations/EditProperty.mutation';
import { Property } from '@/shared/services/properties/Properties.model';
import { propertiesService } from '@/shared/services/properties/PropertiesService';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
type PageProps = {
  params: {
    id: string;
  };
};

function EditPropertyPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const [editProperty, { loading }] = useMutation(UpdatePropertyMutation);

  const { isLoading, data: { property } = {} } = useQuery(
    {
      queryKey: ['properties'],
      queryFn: () => propertiesService.getPropertyById(id),
    },
    { refetchOnMount: false }
  );

  function handleEdit(values: Property) {
    const variables = {
      property: { ...values, _id: property._id, ownerId: property.ownerId },
    };

    editProperty({
      variables,
    })
      .then((datatest) => {
        console.log('data', datatest);
      })
      .catch(() => {
        toast.error('Ocorrreu um erro, tente novamente!');
      });
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
        {property && (
          <PropertyForm
            cancelFunction={goBack}
            submitFunction={handleEdit}
            property={property}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

export default EditPropertyPage;
