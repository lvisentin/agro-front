import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { newReportValidationSchema } from '@/shared/validationSchemas/NewReport.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
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
  const [selectedPlot, setSelectedPlot] = useState<Number>(0);
  const [selectedProperty, setSelectedProperty] = useState<Number>(0);

  const {
    loading: getPropertiesLoading,
    error: propertyError,
    data: { properties } = {},
    refetch
  } = useQuery(GetPropertiesQuery, { notifyOnNetworkStatusChange: true });

  const {
    loading: getPlotsLoading,
    error: plotError,
    data: { plots } = {},
    refetch: refetchPlots,
  } = useQuery(GetPlotsQuery, { notifyOnNetworkStatusChange: true });

  useEffect(() => {
    if (!selectedProperty) {
      refetchPlots({ propertyId: undefined });
      return;
    }

    refetchPlots({
      propertyId: Number(selectedProperty),
    });
  }, [selectedProperty, refetch]);

  useEffect(() => {
    if (!selectedPlot) {
      refetch({ plotId: undefined });
      return;
    }

    refetch({
      plotId: Number(selectedPlot),
    });
  }, [selectedPlot, refetch]);

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
          value={selectedProperty}
          onChange={(e) => {
            setSelectedPlot(0);
            setSelectedProperty(e.target.value);
            formik.values.propertyId = e.target.value
          }}
          name="propertyId"
          disabled={getPropertiesLoading}
          placeholder="Selecione uma propriedade"
          label="Filtrar por propriedade"
        />

        <SelectField
          options={plots?.length > 0 ? plots : []}
          value={selectedPlot}
          onChange={(e) => {
            setSelectedPlot(e.target.value);
            formik.values.plotId = e.target.value
          }}
          name="plotId"
          disabled={!selectedProperty || getPlotsLoading}
          placeholder="Selecione um talhão"
          label="Filtrar por talhão"
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
          label="Até"
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
