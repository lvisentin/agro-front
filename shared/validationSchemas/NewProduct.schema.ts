import * as Yup from 'yup';
import { ProductMeasurementUnit } from '../models/products/Products.model';

export const newProductValidationSchema = Yup.object().shape({
  // code: Yup.string().required('Por favor, digite o código do produto.'),
  name: Yup.string().required('Digite o nome do produto.'),
  categoryId: Yup.number()
    .min(1, 'Selecione uma categoria.')
    .required('Selecione uma categoria.'),
  propertyId: Yup.number()
    .min(1, 'Selecione uma propriedade.')
    .required('Selecione uma propriedade.'),
  measurementUnit: Yup.mixed<ProductMeasurementUnit>()
    .oneOf(
      Object.values(ProductMeasurementUnit),
      'Selecione uma unidade de medida.'
    )
    .required(),
  quantity: Yup.number()
    .min(0, 'Valor não pode ser negativo.')
    .typeError('Quantidade deve ser um número.')
    .required('Digite uma quantidade.'),
  unitPrice: Yup.string().required('Digite uma custo unitário.'),
  minimumQuantity: Yup.number()
    .min(0, 'Valor não pode ser negativo.')
    .typeError('Quantidade mínima em estoque deve ser um número')
    .required('Digite quantidade mínima em estoque.'),
});
