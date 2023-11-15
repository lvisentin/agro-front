'use client';

import ReportForm from '@/components/ReportForm/ReportForm';
import { httpClient } from '@/shared/models/httpClient/HttpClient';
import { Report } from '@/shared/models/reports/reports.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { toast } from 'react-toastify';

export default function Reports() {
  function handleSubmit(values: Report) {
    
    let apiUrl = `https://api.gesrural.com.br/analytics/reports/performance?plotId=${values.plotId}&propertyId=${values.propertyId}&startDate=${values.startDate}&endDate=${values.endDate}`;

    if (values.comment) {
      apiUrl += `&comment=${values.comment}`;
    }

    return httpClient
    .getPdf(apiUrl)
    .then(blobData => {

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blobData);
      downloadLink.download = 'relatorio.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success('Relatório gerado com sucesso', { containerId: 'default' });
    })
    .catch(() => {
      toast.error('Ocorreu um erro, tente novamente', {
        containerId: 'default',
      });
    });
  }

  return (
    <AnimatedPage>
      <div className="new__production__wrapper">
        <div className="prose flex justify-between w-full max-w-full"></div>

        <div className="page__content">
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-title px-6 py-4">
              <h2 className="prose-h2">Cadastrar Produtividade</h2>
            </div>

            <div className="card-body pt-2 pb-4">
              <ReportForm
                submitFunction={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
