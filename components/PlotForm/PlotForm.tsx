import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectFieldWithFilter from '../SelectFieldWithFilter/SelectFieldWithFilter';
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
      propertyName: plot ? plot.propertyName : '',
      propertyId: plot ? plot.propertyId : 0,
    },
    onSubmit: (values) => submitFunction(values),
  })

  function getProperty(item: any) {
    if (!item) {
      return
    }

    formik.values.propertyId = item?.id || 0
  }

  if (plot?.propertyId && properties) {
    const hasProperty = properties.find(
      (property :any) => property.id === Number(plot.propertyId)
    )
    formik.values.propertyName = hasProperty.name || ''
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
          placeholder="Digite um nome..."
          label="Nome"
        />
        <TextField
          value={formik.values.farmingType}
          disabled={loading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.farmingType ? formik.errors.farmingType : null}
          name="farmingType"
          placeholder="Digite a cultura agrícola do talhão..."
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
          placeholder="Digite o tamanho..."
          label="Tamanho do talhão (ha)"
        />

        <SelectFieldWithFilter
          options={properties?.length > 0 ? properties : []}
          value={formik.values.propertyName}
          onChange={(e) => {
            getProperty(e)
          }}
          onBlur={formik.handleBlur}
          errors={formik.touched.propertyId ? formik.errors.propertyId : null}
          disabled={getPropertiesLoading}
          name="propertyId"
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
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || !formik.dirty}
        >
          Salvar Talhão
        </PrimaryButton>
      </div>
    </form>
  );
}

export default PlotForm;
