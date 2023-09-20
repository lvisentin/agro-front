import { httpClient } from '@/shared/models/httpClient/HttpClient';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DocumentForm from '../DocumentForm/DocumentForm';

function DocumentModal() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function onDocumentCreate(values: any) {
    setLoading(true);
    setError(false);

    const formData = new FormData();
    formData.append('filename', values.name);
    formData.append('file', values.file);

    httpClient
      .postFormData('http://localhost:3000/file/upload', formData)
      .then(() => {
        toast.success('Documento criado');
        closeModal();
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
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

export default DocumentModal;
