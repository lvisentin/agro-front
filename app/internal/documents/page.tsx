'use client';

import { GetDocumentsQuery } from '@/shared/graphql/queries/GetDocuments.query';
import { Document } from '@/shared/models/documents/Documents.model';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styles from './documents.module.scss';
function DocumentsPage() {
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
    <div className="documents__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Documentos</h2>
      </div>

      <div className="documents__list mt-4 flex flex-wrap items-center gap-8">
        {documents?.map((document: Document, key: number) => (
          <div
            className={`${styles.document} document text-center w-fit cursor-pointer`}
            key={key}
          >
            <Image
              src={document.url}
              alt={document.name}
              className="mb-2 rounded-md"
              width={150}
              height={150}
            />
            <span className={`document__name`}>{document.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;
