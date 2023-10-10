import { CreateDocumentMutation } from '@/shared/graphql/mutations/CreateDocument.mutation';
import { EditDocumentMutation } from '@/shared/graphql/mutations/EditDocument.mutation';
import { httpClient } from '@/shared/models/httpClient/HttpClient';
import { newDocumentValidationSchema } from '@/shared/validationSchemas/NewDocument.schema';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import FileInput from '../FileInput/FileInput';
import LoadingButton from '../LoadingButton/LoadingButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import TextField from '../TextField/TextField';
import { NewDocumentModalProps } from './NewDocumentModal.model';

function NewDocumentModal({
  document: currentDocument,
  refetch,
}: NewDocumentModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [createDocument] = useMutation(CreateDocumentMutation);
  const [editDocument, { loading: editLoading }] =
    useMutation(EditDocumentMutation);

  const formik = useFormik({
    initialValues: {
      name: currentDocument ? currentDocument.name : '',
      file: [],
    },
    validationSchema: newDocumentValidationSchema,
    onSubmit: (values) => {
      if (!currentDocument) {
        onDocumentCreate(values);
      } else {
        editDocument({
          variables: {
            id: currentDocument.id,
            input: {
              name: formik.values.name,
            },
          },
        }).then(() => {
          toast.success('Documento criado', { containerId: 'default' });
          closeModal();
          refetch();
        });
      }
    },
  });

  
  useEffect(() => {
    if (currentDocument) {
      formik.setFieldValue('name', currentDocument.name);
    }
  }, [currentDocument]);

  async function onDocumentCreate({ file, name }: any) {
    setLoading(true);
    setError(false);

    uploadFile(file, name)
      .then(({ fileName, path }: { fileName: string; path: string }) => {
        saveFilePath(fileName, path);
      })
      .catch(() => {
        toast.error('Ocorreu um erro com o servidor.', {
          containerId: 'modal',
        });
      }).finally(() => setLoading(false));
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
        toast.success('Documento criado', { containerId: 'default' });
        formik.resetForm();
        refetch();
        closeModal();
      })
      .catch(() => {
        toast.error('Ocorreu um erro, tente novamente', {
          containerId: 'modal',
        });
      });
  }

  function uploadFile(file: any, name: any) {
    const formData = new FormData();
    formData.append('filename', name);
    formData.append('file', file);
    return httpClient
      .postFormData('https://api.gesrural.com.br/file/upload', formData)
      .then((response: any) => {
        return {
          path: response.url,
          fileName: name,
        };
      })
      .catch((err) => {
        throw err;
      });
  }

  function closeModal() {
    if (currentDocument) {
      formik.setFieldValue('file', null);
      (document.getElementById('fileInput') as any).value = null;
    }

    formik.resetForm();
    (
      document.getElementById('create_document_modal') as HTMLFormElement
    ).close();
  }

  return (
    <dialog id="create_document_modal" className="modal">
      <ToastContainer
        enableMultiContainer
        containerId={'modal'}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />

      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {currentDocument ? 'Editar ' : 'Novo '} documento
        </h3>

        <div className="modal-body">
          {error ? (
            <p className="text-red-500 error mt-4 text-center">
              Algo errado aconteceu, tente novamente
            </p>
          ) : (
            ''
          )}
          <form onSubmit={formik.handleSubmit} className="flex flex-col">
            <TextField
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.touched.name ? formik.errors.name : null}
              name="name"
              placeholder="Nome"
              label="Nome"
            />

            <FileInput
              id="fileInput"
              value={undefined}
              errors={formik.touched.file ? formik.errors.file : null}
              name="file"
              placeholder="Arquivo"
              className={`${currentDocument ? 'hidden' : 'visible'} mt-2 p-0`}
              label="Documento"
              disabled={loading}
              onChange={(event) => {
                formik.setFieldValue('file', event.currentTarget.files[0]);
              }}
            />

            <div className="card-footer flex items-center justify-end pt-8">
              <SecondaryButton
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="mr-3"
              >
                Cancelar
              </SecondaryButton>

              <LoadingButton
                loading={loading || editLoading}
                type="submit"
                onClick={formik.handleSubmit}
                disabled={!formik.isValid || !formik.dirty}
              >
                Salvar Documento
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default NewDocumentModal;
