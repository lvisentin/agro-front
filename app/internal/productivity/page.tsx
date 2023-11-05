'use client';

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';

function ProductivityPage() {
  const { push } = useRouter();

  function goToNewProductivity() {
    push(PageRoutes.NewProductivity);
  }

  return (
    <AnimatedPage>
      <div className="productivity_wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Produtividade</h2>

          <PrimaryButton onClick={goToNewProductivity}>
              <FontAwesomeIcon icon={faPlus} />
              Novo relatório
          </PrimaryButton>
        </div>

        <div className="filter">
          <div className="flex items-center gap-4">
            {/* <SelectField
              name="plots"
            ></SelectField> */}
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default ProductivityPage;
