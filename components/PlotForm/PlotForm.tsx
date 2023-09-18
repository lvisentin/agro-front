import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { newPlotValidationSchema } from '@/shared/validationSchemas/NewPlot.schema';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import TextField from '../TextField/TextField';
import { PlotFormProps } from './PlotForm.model';
function PlotForm({
  plot,
  submitFunction,
  cancelFunction,
  loading = false,
}: PlotFormProps) {
  const {
    loading: getPropertiesLoading,
    error,
    data: { properties } = {},
  } = useQuery(GetPropertiesQuery);

  return (
    <div className="card w-full bg-base-100 shadow-xl rounded-md">
      <div className="card-title px-6 py-4">
        <h2 className="prose-h2">Cadastrar Talhão</h2>
      </div>
      <div className="card-body pt-2 pb-4">
        <Formik
          initialValues={{
            name: plot ? plot.name : '',
            description: plot ? plot.description : '',
            size: plot ? plot.size : 0,
            propertyId: plot ? plot.propertyId : 0,
          }}
          validationSchema={newPlotValidationSchema}
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
                  label="Tamanho do talhão (ha)"
                />

                <SelectField
                  name="propertyId"
                  disabled={getPropertiesLoading}
                  options={properties?.length > 0 ? properties : []}
                  value={values.propertyId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.propertyId ? errors.propertyId : null}
                  placeholder="Selecione uma propriedade"
                  label="Propriedade"
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
                  Salvar Talhão
                </PrimaryButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PlotForm;
