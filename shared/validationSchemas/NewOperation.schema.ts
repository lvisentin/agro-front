import * as Yup from 'yup';

export const newOperationValidationSchema = Yup.object().shape({
  name: Yup.string().required('Por favor, digite seu nome.'),
});
