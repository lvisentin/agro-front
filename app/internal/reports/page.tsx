'use client';

import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

export default function Reports() {
  const { push } = useRouter();

  function goToNewReport() {
    push(PageRoutes.newReport);

  }

  return (
    <AnimatedPage>
      <div className="reports_wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h1 className="font-semibold text-4xl mb-4">Relatórios</h1>

          <PrimaryButton onClick={goToNewReport}>
              <FontAwesomeIcon icon={faPlus} />
              Novo relatório
          </PrimaryButton>
        </div>
      </div>
    </AnimatedPage>
  );
}
