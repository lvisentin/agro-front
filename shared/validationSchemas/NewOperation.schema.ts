import * as Yup from 'yup';

export const newOperationValidationSchema = Yup.object().shape({
  description: Yup.string().required('Digite o nome da operação.'),
  plotId: Yup.number()
    .min(1, 'Selecione um talhão.')
    .required('Selecione um talhão.'),
  productId: Yup.number()
    .min(1, 'Selecione um produto.')
    .required('Selecione um produto.'),
  dosePerHecatare: Yup.number()
    .min(0, 'Valor não pode ser negativo.')
    .required('Digite a dose.'),
  executionDate: Yup.date().required('Insira a data.'),
});
