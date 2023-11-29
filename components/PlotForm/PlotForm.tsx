import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { newPlotValidationSchema } from '@/shared/validationSchemas/NewPlot.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
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

  const formik = useFormik({
    initialValues: {
      name: plot ? plot.name : '',
      farmingType: plot ? plot.farmingType : '',
      size: plot ? plot.size : 0,
      propertyId: plot ? plot.propertyId : 0,
    },
    validationSchema: newPlotValidationSchema,
    onSubmit: (values) => submitFunction(values),
  });

  function getProperty(item: any) {
    if (!item) {
      return;
    }

    formik.values.propertyId = item?.id || 0;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
        <TextField
          value={formik.values.name}
          disabled={loading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.name ? formik.errors.name : null}
          name="name"
          placeholder="Nome"
          label="Nome"
        />
        <TextField
          value={formik.values.farmingType}
          disabled={loading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.farmingType ? formik.errors.farmingType : null}
          name="farmingType"
          placeholder="Cultura agrícola"
          label="Cultura agrícola"
        />
        <TextField
          value={formik.values.size}
          disabled={loading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.size ? formik.errors.size : null}
          name="size"
          type="number"
          placeholder="Tamanho do talhão"
          label="Tamanho do talhão (ha)"
        />

        <SelectField
          options={properties?.length > 0 ? properties : []}
          value={formik.values.propertyId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.propertyId ? formik.errors.propertyId : null}
          disabled={getPropertiesLoading || loading}
          name="propertyId"
          placeholder="Selecione uma propriedade"
          label="Propriedade"
        ></SelectField>
      </div>

      <div className="card-footer flex items-center justify-end py-4">
        <SecondaryButton
          type="button"
          onClick={cancelFunction}
          className="mr-3"
        >
          Cancelar
        </SecondaryButton>

        <PrimaryButton
          type="submit"
          onClick={formik.handleSubmit}
          disabled={formik.values.size <= 0 || !formik.isValid || !formik.dirty}
        >
          Salvar Talhão
        </PrimaryButton>
      </div>
    </form>
  );
}

export default PlotForm;
