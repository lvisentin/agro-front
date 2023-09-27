import { CreateDocumentMutation } from '@/shared/graphql/mutations/CreateDocument.mutation';
import { httpClient } from '@/shared/models/httpClient/HttpClient';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DocumentForm from '../DocumentForm/DocumentForm';
import { NewDocumentModalProps } from './NewDocumentModal.model';

function NewDocumentModal({ refetch }: NewDocumentModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [createDocument] = useMutation(CreateDocumentMutation);

  async function onDocumentCreate({
    file,
    name,
  }: {
    file: File;
    name: string;
  }) {
    setLoading(true);
    setError(false);

    uploadFile(file, name)
      .then(({ fileName, path }: { fileName: string; path: string }) => {
        console.log(fileName, path);
        saveFilePath(fileName, path);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente'))
      .finally(() => setLoading(false));
  }

  function saveFilePath(fileName: string, path: string) {
    createDocument({
      variables: {
        input: {
          name: fileName,
          path,
        },
      },
    })
      .then(() => {
        toast.success('Documento criado');
        refetch();
        closeModal();
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente'));
  }

  function uploadFile(file: File, name: string) {
    const formData = new FormData();
    formData.append('filename', name);
    formData.append('file', file);
    console.log(name);
    return httpClient
      .postFormData('https://api.gesrural.com.br/file/upload', formData)
      .then((response: any) => {
        console.log(response);
        return {
          path: response.url,
          fileName: name,
        };
      });
  }

  function closeModal() {
    (
      document.getElementById('create_document_modal') as HTMLFormElement
    ).close();
  }

  return (
    <dialog id="create_document_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Novo documento</h3>

        <div className="modal-body">
          {error ? (
            <p className="text-red-500 error mt-4 text-center">
              Algo errado aconteceu, tente novamente
            </p>
          ) : (
            ''
          )}
          <DocumentForm
            submitFunction={onDocumentCreate}
            cancelFunction={closeModal}
            loading={loading}
          />
        </div>
      </div>
    </dialog>
  );
}

export default NewDocumentModal;
