'use client';

import ProductionForm from "@/components/ProductionForm/ProductionForm";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { CreateProductionMutation } from "@/shared/graphql/mutations/CreateProduction.mutation";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import convertCurrency from "@/shared/utils/convertCurrency";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


function NewProductionPage() {
  const router = useRouter();

  const [CreateProduction, { loading }] = useMutation(CreateProductionMutation);

  function handleSubmit(values: any) {
    CreateProduction({
      variables: {
        input: {
          plotId: Number(values.plotId),
          description: values.description,
          price: convertCurrency(values.price),
          quantityPerHectare : Number(values.quantity),
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
      <div className="new__production__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Cadastrar Produção</h2>
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
