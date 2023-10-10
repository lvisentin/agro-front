import * as Yup from 'yup';

export const newPropertyValidationSchema = Yup.object().shape({
  name: Yup.string().required('Digite seu nome.'),
  description: Yup.string().required('Digite uma descrição.'),
  farmer: Yup.string().required('Digite uma descrição.'),
  size: Yup.number()
  .min(1, 'Digite o tamanho da propriedade.')
  .required('Digite o tamanho da propriedade.'),
});
