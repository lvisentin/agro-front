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
    farmer: string;
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
        toast.success('Propriedade criada com sucesso!', {containerId: 'default'});
        router.push(PageRoutes.ListProperties);
      })
      .catch(() => {
        toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'});
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
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Cadastrar propriedade</h2>
            </div>

            <div className="card-body pt-2 pb-4">
              <PropertyForm
                cancelFunction={goBack}
                submitFunction={handleSubmit}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NewPropertyPage;
