'use client';

import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import TextField from '@/components/TextField/TextField';
import { newPropertyValidationSchema } from '@/shared/validationSchemas/NewProperty.schema';
import { Formik } from 'formik';
import { PropertyFormProps } from './PropertyForm.model';

function PropertyForm({
  property,
  submitFunction,
  cancelFunction,
}: PropertyFormProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl rounded-md">
      <div className="card-title px-6 py-4">
        <h2 className="prose-h2">Cadastrar propriedade</h2>
      </div>
      <div className="card-body pt-2 pb-4">
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
            dirty,
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
                  placeholder="Digite um nome..."
                  label="Nome"
                />

                <TextField
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.description ? errors.description : null}
                  name="description"
                  placeholder="Digite uma descrição..."
                  label="Descrição"
                />

                <TextField
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.size ? errors.size : null}
                  name="size"
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

                <PrimaryButton
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isValid || !dirty}
                >
                  Salvar Propriedade
                </PrimaryButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PropertyForm;
