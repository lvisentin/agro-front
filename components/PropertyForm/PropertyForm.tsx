'use client';

import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import TextField from '@/components/TextField/TextField';
import { newPropertyValidationSchema } from '@/shared/validationSchemas/NewProperty.schema';
import { useFormik } from 'formik';
import LoadingButton from '../LoadingButton/LoadingButton';
import { PropertyFormProps } from './PropertyForm.model';

function PropertyForm({
  property,
  submitFunction,
  cancelFunction,
  loading = false,
}: PropertyFormProps) {

  const formik = useFormik({
    initialValues: {
      name: property ? property.name : '',
      description: property ? property.description : '',
      farmer: property ? property.farmer : '',
      size: property ? property.size : 0,
    },
    validationSchema: newPropertyValidationSchema,
    onSubmit: (values) => submitFunction(values)
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
        <TextField
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.name ? formik.errors.name : null}
          name="name"
          disabled={loading}
          placeholder="Nome"
          label="Nome"
        />

        <TextField
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.description ? formik.errors.description : null}
          name="description"
          disabled={loading}
          placeholder="Descrição"
          label="Descrição"
        />

        <TextField
          value={formik.values.farmer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.farmer ? formik.errors.farmer : null}
          name="farmer"
          disabled={loading}
          placeholder="Produtor"
          label="Produtor"
        />

        <TextField
          value={formik.values.size}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.size ? formik.errors.size : null}
          type='number'
          name="size"
          disabled={loading}
          placeholder="Tamanho da propriedade"
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
          onClick={formik.handleSubmit}
          disabled={formik.values.size <= 0 || !formik.isValid || !formik.dirty}
        >
          Salvar Propriedade
        </LoadingButton>
      </div>
    </form>
  );
}

export default PropertyForm;
