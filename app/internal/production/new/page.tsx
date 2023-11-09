'use client';

import ProductionForm from "@/components/ProductionForm/ProductionForm";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import { useRouter } from 'next/navigation';


function NewProductionPage() {
  const router = useRouter();

  function handleSubmit() {
    console.log('teste');
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
              <ProductionForm cancelFunction={goBack} submitFunction={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default NewProductionPage;
