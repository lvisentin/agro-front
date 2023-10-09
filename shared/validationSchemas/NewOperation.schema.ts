import * as Yup from 'yup';

export const newOperationValidationSchema = Yup.object().shape({
  description: Yup.string().required('Por favor, digite o nome da operaçao.'),
  plot: Yup.string().min(1, 'Por favor, escolha o talhão.').required('Por favor, escolha o talhão.'),
  productId: Yup.number().min(1, 'Por favor,  escolha o produto.').required('Por favor,  escolha o produto.'),
  dosePerHecatare: Yup.number().min(1).required('Por favor, digite a quantidade.'),
  executionDate: Yup.date().required('Por favor, insira a data.'),
  // productCategory: Yup.string().required('Por favor, selecione a categoria.'),
  // unitCost: Yup.string().required('Por favor, digite o custo unitário.'),
  // hectareCost: Yup.string().required('Por favor, digite o custo por ha.'),
  // plotCost: Yup.string().required('Por favor, digite o custo por talhão.'),
  // measurementUnit: Yup.string().required('Por favor, digite a unidade por medida.'),
});
