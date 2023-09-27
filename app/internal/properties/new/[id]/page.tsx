'use client';

import PropertyForm from '@/components/PropertyForm/PropertyForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { UpdatePropertyMutation } from '@/shared/graphql/mutations/UpdateProperty.mutation';
import { GetPropertyByIdQuery } from '@/shared/graphql/queries/GetPropertyById.query';
import { Property } from '@/shared/models/properties/Properties.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
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

    updateProperty({ variables: variables }).then(() => {
      toast.success('Propriedade atualizada com sucesso.');
      router.push(PageRoutes.ListProperties);
    });
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
    <AnimatedPage>
      <div className="new__property__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Editar propriedade</h2>
            </div>
            <div className="card-body pt-2 pb-4">
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
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EditPropertyPage;
