'use client';

import ProductionForm from "@/components/ProductionForm/ProductionForm";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { CreateProductionMutation } from "@/shared/graphql/mutations/CreateProduction.mutation";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


function NewProductionPage() {
  const router = useRouter();

  const [CreateProduction, { loading }] = useMutation(CreateProductionMutation);

  function handleSubmit(values: any) {
    let formattedValue = '';

    if (values.price.includes(',')) {
      const splitted = values.price.split('R$')[1].split(',');
      formattedValue = `${splitted[0]}.${splitted[1]}`;
    } else {
      formattedValue = values.price.split('R$')[1];
    }
    CreateProduction({
      variables: {
        input: {
          plotId: Number(values.plotId),
          price: Number(formattedValue),
          quantity: Number(values.quantity),
          measurementUnit: values.measurementUnit,
          executionDate: values.executionDate
        }
      }
    })
      .then(() => {
        toast.success('Produtividade criada com sucesso', {containerId: 'default'});
        router.push(PageRoutes.ListProduction);
      })
      .catch(() => {
        toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'});
      });
  }

  function goBack() {
    router.push(PageRoutes.ListProduction);
  }

  return(
    <AnimatedPage>
      <div className="new__plot__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Cadastrar Produtividade</h2>
            </div>

            <div className="card-body pt-2 pb-4">
              <ProductionForm
                loading={loading}
                cancelFunction={goBack} 
                submitFunction={handleSubmit} 
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default NewProductionPage;
