import * as Yup from 'yup';

export const newProductValidationSchema = Yup.object().shape({
  name: Yup.string().required('Por favor, digite seu nome.'),
  category: Yup.string().required('Por favor, selecione uma categoria.'),
  quantity: Yup.number()
    .typeError('Quantitade deve ser um número')
    .required('Por favor, digite uma quantidade.'),
  minQuantity: Yup.number()
    .typeError('Quantitade mínima deve ser um número')
    .required('Por favor, digite uma quantidade mínima.'),
  unitCost: Yup.number()
    .typeError('Custo unitário deve ser um número')
    .required('Por favor, digite um custo unitário mínimo.'),
});
