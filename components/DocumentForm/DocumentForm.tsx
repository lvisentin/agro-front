import { newDocumentValidationSchema } from '@/shared/validationSchemas/NewPlot.schema';
import { Formik } from 'formik';
import FileInput from '../FileInput/FileInput';
import LoadingButton from '../LoadingButton/LoadingButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import TextField from '../TextField/TextField';
import { DocumentFormProps } from './DocumentForm.model';

function DocumentForm({
  document,
  submitFunction,
  cancelFunction,
  loading = false,
}: DocumentFormProps) {
  return (
    <Formik
      initialValues={{
        name: document ? document.name : '',
        file: [],
      }}
      validationSchema={newDocumentValidationSchema}
      onSubmit={(values) => submitFunction(values)}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        touched,
        errors,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextField
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={touched.name ? errors.name : null}
            name="name"
            placeholder="Digite um nome..."
            label="Nome"
          />

          <FileInput
            value={undefined}
            errors={touched.file ? errors.file : null}
            name="file"
            placeholder="Escolha um arquivo..."
            label="Documento"
            onChange={(event) => {
              console.log(event.currentTarget.files)
              setFieldValue('file', event.currentTarget.files[0]);
            }}
          />

          <div className="card-footer flex items-center justify-end pt-8">
            <SecondaryButton
              type="button"
              onClick={cancelFunction}
              className="mr-3"
            >
              Cancelar
            </SecondaryButton>

            <LoadingButton
              loading={loading}
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              Salvar Documento
            </LoadingButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default DocumentForm;
