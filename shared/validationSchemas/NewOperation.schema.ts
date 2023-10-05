import * as Yup from 'yup';

export const newOperationValidationSchema = Yup.object().shape({
  description: Yup.string().required('Digite o nome da operação.'),
  plotId: Yup.number()
    .min(1, 'Selecione um talhão.')
    .required('Selecione um talhão.'),
  productId: Yup.number()
    .min(1, 'Selecione um produto.')
    .required('Selecione um produto.'),
  dosePerHecatare: Yup.number().min(1).required('Digite a quantidade.'),
  executionDate: Yup.date().required('Insira a data.'),
  // productCategory: Yup.string().required('Por favor, selecione a categoria.'),
  // unitCost: Yup.string().required('Por favor, digite o custo unitário.'),
  // hectareCost: Yup.string().required('Por favor, digite o custo por ha.'),
  // plotCost: Yup.string().required('Por favor, digite o custo por talhão.'),
  // measurementUnit: Yup.string().required('Por favor, digite a unidade por medida.'),
});
