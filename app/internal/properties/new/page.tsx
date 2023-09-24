'use client';

import PropertyForm from '@/components/PropertyForm/PropertyForm';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { CreatePropertyMutation } from '@/shared/graphql/mutations/CreateProperty.mutation';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewPropertyPage() {
  const router = useRouter();

  const [createProperty, { loading }] = useMutation(CreatePropertyMutation);

  function handleSubmit(values: {
    size: string;
    name: string;
    description: string;
  }) {
    createProperty({
      variables: {
        input: {
          ...values,
          size: Number(values.size),
        },
      },
    })
      .then(() => {
        toast.success('Propriedade criada com sucesso!');
      })
      .catch(() => {
        toast.error('Ocorreu um erro, tente novamente');
      });
  }

  function goBack() {
    router.push(PageRoutes.ListProperties);
  }

  return (
    <AnimatedPage>
      <div className="new__property__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <PropertyForm
            cancelFunction={goBack}
            submitFunction={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewPropertyPage;
