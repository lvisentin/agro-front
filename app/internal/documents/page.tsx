'use client';

import DocumentModal from '@/components/DocumentModal/DocumentModal';
import NewDocumentModal from '@/components/NewDocumentModal/NewDocumentModal';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { DeleteDocumentMutation } from '@/shared/graphql/mutations/DeleteDocument.mutation';
import { GetDocumentsQuery } from '@/shared/graphql/queries/GetDocuments.query';
import { Document } from '@/shared/models/documents/Documents.model';
import AnimatedPage from '@/shared/templates/AnimatedPage';
import { useMutation, useQuery } from '@apollo/client';
import {
  faEye,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import styles from './documents.module.scss';

function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>();
  const [deleteDocument] = useMutation(DeleteDocumentMutation);

  const {
    loading,
    error,
    data: { documents } = {},
    refetch,
  } = useQuery(GetDocumentsQuery);

  function handleDeleteDocumentClick(document: Document) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: `Gostaria de excluir o documento ${document.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDocument({ variables: { id: document.id } }).then(() =>
          refetch()
        );
      }
    });
  }

  function handeEditDocumentClick(selectedDocument: Document) {
    setSelectedDocument(selectedDocument);
    (
      document.getElementById('create_document_modal') as HTMLFormElement
    )?.showModal();
  }

  function openNewDocumentModal() {
    setSelectedDocument(undefined);
    (
      document.getElementById('create_document_modal') as HTMLFormElement
    )?.showModal();
  }

  function openDetailsModal(selectedDocument: Document) {
    setSelectedDocument(selectedDocument);
    (
      document.getElementById('document_details_modal') as HTMLFormElement
    )?.showModal();
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente', { containerId: 'default' });
  }

  if (documents) {
    console.log(documents);
  }

  return (
    <AnimatedPage>
      <div className="documents__wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Documentos</h2>

          <PrimaryButton onClick={openNewDocumentModal}>
            <FontAwesomeIcon icon={faPlus} />
            Novo documento
          </PrimaryButton>
        </div>

        <NewDocumentModal
          refetch={refetch}
          document={selectedDocument ? selectedDocument : undefined}
        />
        <DocumentModal document={selectedDocument ? selectedDocument : undefined} />

        <div className="documents__list mt-4 flex flex-wrap items-center justify-center gap-8">
          {documents?.length > 0 ? (
            documents?.map((document: Document, key: number) => (
              <div
                className={`${styles.document} document text-center w-fit cursor-pointer relative`}
                key={key}
              >
                <div
                  className={`${styles.backdrop} opacity-0 hover:opacity-100 backdrop-blur-md absolute top-0 left-0 rounded-md flex items-center justify-center`}
                >
                  <FontAwesomeIcon
                    className={`${styles.icon} mr-4`}
                    icon={faEye}
                    onClick={() => openDetailsModal(document)}
                  />

                  <FontAwesomeIcon
                    className={`${styles.icon} mr-4`}
                    icon={faTrash}
                    onClick={() => handleDeleteDocumentClick(document)}
                  />

                  <FontAwesomeIcon
                    className={`${styles.icon}`}
                    icon={faPencil}
                    onClick={() => handeEditDocumentClick(document)}
                  />
                </div>
                <Image
                  src={document.path}
                  alt={document.name}
                  className="mb-2 rounded-md"
                  width={150}
                  height={150}
                  onClick={() => openDetailsModal(document)}
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
