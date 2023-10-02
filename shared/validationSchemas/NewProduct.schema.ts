import * as Yup from 'yup';
import { ProductMeasurementUnit } from '../models/products/Products.model';

export const newProductValidationSchema = Yup.object().shape({
  code: Yup.string().required('Por favor, digite o código do produto.'),
  name: Yup.string().required('Por favor,digite o nome do produto.'),
  categoryId: Yup.number()
    .min(1, 'Selecione uma categoria')
    .required('Por favor, selecione uma categoria.'),
  propertyId: Yup.number()
    .min(1, 'Selecione uma propriedade')
    .required('Por favor, selecione uma propriedade.'),
  measurementUnit: Yup.mixed<ProductMeasurementUnit>()
    .oneOf(
      Object.values(ProductMeasurementUnit),
      'Selecione uma unidade de medida'
    )
    .required(),
  quantity: Yup.number()
    .typeError('Quantidade deve ser um número')
    .required('Por favor, digite uma quantidade.'),
  unitPrice: Yup.string().required('Por favor, digite uma custo unitário.'),
  minimumQuantity: Yup.number()
    .typeError('Quantidade mínima em estoque deve ser um número')
    .required('Por favor, digite quantidade mínima em estoque.'),
});
