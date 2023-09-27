'use client';

import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import TextField from '@/components/TextField/TextField';
import { newPropertyValidationSchema } from '@/shared/validationSchemas/NewProperty.schema';
import { Formik } from 'formik';
import LoadingButton from '../LoadingButton/LoadingButton';
import { PropertyFormProps } from './PropertyForm.model';

function PropertyForm({
  property,
  submitFunction,
  cancelFunction,
  loading = false,
}: PropertyFormProps) {
  return (
    <Formik
      initialValues={{
        name: property ? property.name : '',
        description: property ? property.description : '',
        size: property ? property.size : 0,
      }}
      validationSchema={newPropertyValidationSchema}
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
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
            <TextField
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.name ? errors.name : null}
              name="name"
              disabled={loading}
              placeholder="Digite um nome..."
              label="Nome"
            />

            <TextField
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.description ? errors.description : null}
              name="description"
              disabled={loading}
              placeholder="Digite uma descrição..."
              label="Descrição"
            />

            <TextField
              value={values.size}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.size ? errors.size : null}
              name="size"
              disabled={loading}
              placeholder="Digite o tamanho..."
              label="Tamanho da propriedade (ha)"
            />
          </div>

          <div className="card-footer flex items-center justify-end p-4">
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
              Salvar Propriedade
            </LoadingButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default PropertyForm;
