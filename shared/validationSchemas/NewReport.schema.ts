import * as Yup from 'yup';

export const newReportValidationSchema = Yup.object().shape({
  propertyId: Yup.number().required('Selecione uma propriedade.'),
  plotId: Yup.number().required('Selecione um talhão.'),
  startDate: Yup.date()
    .required('Insira uma data.')
    .test('startDate', 'Data inicial exede a final.', function (
      startDate
    ) {
      const endDate = this.parent.endDate;
      return !startDate || !endDate || new Date(startDate) <= new Date(endDate);
    }),
  endDate: Yup.date()
    .required('Insira uma data.')
    .test('endDate', 'Data final inferior a inicial.', function (
      endDate
    ) {
      const startDate = this.parent.startDate;
      return !endDate || !startDate || new Date(endDate) >= new Date(startDate);
    }),
});
