'use client';

import PropertyForm from '@/components/PropertyForm/PropertyForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdatePropertyMutation } from '@/shared/graphql/mutations/UpdateProperty.mutation';
import { GetPropertyByIdQuery } from '@/shared/graphql/queries/GetPropertyById.query';
import { Property } from '@/shared/services/properties/Properties.model';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type PageProps = {
  params: {
    id: string;
  };
};

function EditPropertyPage({ params: { id } }: PageProps) {
  const router = useRouter();

  const {
    loading,
    error,
    data: { property } = {},
  } = useQuery(GetPropertyByIdQuery, { variables: { id: Number(id) } });

  const [updateProperty, { loading: updateLoading }] = useMutation(
    UpdatePropertyMutation
  );

  function handleEdit(values: Property) {
    const variables = {
      id: property.id,
      input: {
        ...values,
      },
    };

    updateProperty({ variables: variables }).then(() =>
      toast.success('Propriedade atualizada com sucesso.')
    );
  }

  function goBack() {
    router.push(PageRoutes.ListProperties);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente');
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
            loading={loading || updateLoading}
          />
        )}
      </div>
    </div>
  );
}

export default EditPropertyPage;