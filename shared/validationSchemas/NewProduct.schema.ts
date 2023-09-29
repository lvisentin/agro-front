import * as Yup from 'yup';

export const newProductValidationSchema = Yup.object().shape({
  code: Yup.string().required('Por favor, digite o código do produto.'),
  name: Yup.string().required('Por favor,digite o nome do produto.'),
  categoryId: Yup.string().required('Por favor, selecione uma categoria.'),
  propertyId: Yup.string().required('Por favor, selecione uma propriedade.'),
  measurementUnit: Yup.string().required('Por favor, selecione uma unidade de medida.'),
  quantity: Yup.number()
    .typeError('Quantidade deve ser um número')
    .required('Por favor, digite uma quantidade.'),
  unitPrice: Yup.number()
  .typeError('Custo unitário deve ser um número')
  .required('Por favor, digite uma custo unitário.'),
  minimumQuantity: Yup.number()
    .typeError('Quantidade mínima em estoque deve ser um número')
    .required('Por favor, digite quantidade mínima em estoque.'),
});
