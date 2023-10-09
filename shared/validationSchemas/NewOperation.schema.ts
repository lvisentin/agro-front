import * as Yup from 'yup';

export const newOperationValidationSchema = Yup.object().shape({
  description: Yup.string().required('Digite o nome da operação.'),
  plot: Yup.string()
    .required('Selecione um talhão.'),
  productId: Yup.number()
    .min(1, 'Selecione um produto.')
    .required('Selecione um produto.'),
  dosePerHecatare: Yup.number().min(1).required('Digite a quantidade.'),
  executionDate: Yup.date().required('Insira a data.'),
});
