import * as Yup from 'yup';

export const newReportValidationSchema = Yup.object().shape({
  propertyId: Yup.number().required('Selecione uma propriedade'),
  plotId: Yup.number().required('Selecione um talhão'),
  startDate: Yup.date().required('Insira a data.').max(new Date(), 'Data incorreta'),
  endDate: Yup.date()
  .required('Campo obrigatório')
  .when(['startDate'], (startDate, schema) => {
    return schema
      .min(startDate, 'Data incorreta')
      .max(new Date(), 'Data incorreta');
  }),
});
