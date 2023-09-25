import * as Yup from 'yup';

export const NewPurchaseValidationSchema = Yup.object().shape({
  description: Yup.string().required('Por favor, digite uma descrição.'),
});
