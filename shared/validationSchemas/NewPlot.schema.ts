import * as Yup from 'yup';

export const newPlotValidationSchema = Yup.object().shape({
  name: Yup.string().required('Digite seu nome.'),
  description: Yup.string().required('Digite uma descrição.'),
  size: Yup.number().required('Digite o tamanho da propriedade.'),
});
