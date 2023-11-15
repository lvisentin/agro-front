import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { newReportValidationSchema } from '@/shared/validationSchemas/NewReport.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import DateInput from '../DateInput/DateInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SelectField from '../SelectField/SelectField';
import TextArea from '../TextArea/TextArea';
import { ReportFormProps } from './ReportForm.modal';
function ReportForm({
  submitFunction,
  loading = false,
}: ReportFormProps) {
  const {
    loading: getPropertiesLoading,
    error: propertyError,
    data: { properties } = {},
  } = useQuery(GetPropertiesQuery);

  const {
    loading: getPlotsLoading,
    error: plotError,
    data: { plots } = {},
  } = useQuery(GetPlotsQuery);

  const formik = useFormik({
    initialValues: {
      plotId: 0,
      propertyId: 0,
      comment: '',
      startDate: new Date(),
      endDate: new Date()
    },
    validationSchema: newReportValidationSchema,
    onSubmit: (values) => submitFunction(values),
  });

  if (propertyError || plotError) {
    toast.error('Ocorreu um erro, tente novamente', { containerId: 'default' });
  }

  const isSubmitDisabled = !formik.dirty || !formik.isValid;


  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
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
        />

        <SelectField
          options={plots?.length > 0 ? plots : []}
          value={formik.values.plotId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.plotId ? formik.errors.plotId : null}
          disabled={getPlotsLoading || loading}
          name="plotId"
          placeholder="Selecione um talhão"
          label="Talhão"
        />

        <DateInput
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.startDate ? formik.errors.startDate : null
          }
          name="startDate"
          placeholder="Data de abertura"
          label="De"
        />


        <DateInput
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.endDate ? formik.errors.endDate : null
          }
          name="endDate"
          placeholder="Data de fechamento"
          label="Até "
        />
      </div>

      <div>
        <TextArea
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.comment
              ? formik.errors.comment
              : null
          }
          name="comment"
          placeholder="Comentário"
          label="Comentário (Opcional)"
        />
      </div>

      <div className="card-footer flex items-center justify-end p-4">
        <PrimaryButton
          type="submit"
          disabled={isSubmitDisabled}
          onClick={formik.handleSubmit}
        >
          Gerar relatório
        </PrimaryButton>
      </div>
    </form>
  );
}

export default ReportForm;
