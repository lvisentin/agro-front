'use client';

import DocumentModal from '@/components/DocumentModal/DocumentModal';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { GetDocumentsQuery } from '@/shared/graphql/queries/GetDocuments.query';
import { Document } from '@/shared/models/documents/Documents.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { toast } from 'react-toastify';

function DocumentsPage() {
  function openModal() {
    (
      document.getElementById('create_document_modal') as HTMLFormElement
    )?.showModal();
  }

  const {
    loading,
    error,
    data: { documents } = {},
  } = useQuery(GetDocumentsQuery);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente');
  }

  return (
    <AnimatedPage>
      <div className="documents__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Documentos</h2>

          <PrimaryButton onClick={openModal}>
            <FontAwesomeIcon icon={faPlus} />
            Novo documento
          </PrimaryButton>
        </div>

        <DocumentModal />

        <div className="documents__list mt-4 flex flex-wrap items-center justify-center gap-8">
          {documents.length > 0 ? (
            documents?.map((document: Document, key: number) => (
              <div
                className={`document text-center w-fit cursor-pointer`}
                key={key}
              >
                <Image
                  src={document.path}
                  alt={document.name}
                  className="mb-2 rounded-md"
                  width={150}
                  height={150}
                />
                <span className={`document__name`}>{document.name}</span>
              </div>
            ))
          ) : (
            <NoData message={'Não encontramos nenhum documento cadastrado'} />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default DocumentsPage;
