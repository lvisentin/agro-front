import * as Yup from 'yup';
import { ProductionMeasurementUnit } from '../models/production/Production.model';

export const newProductionValidationSchema = Yup.object().shape({
  plotId: Yup.number()
    .min(1, 'Selecione um talhão.')
    .required('Selecione um talhão.'),
  price: Yup.string().required('Digite um custo unitário.'),
  quantity: Yup.number()
    .min(0, 'Valor não pode ser negativo.')
    .typeError('Quantidade deve ser um número.')
    .required('Digite uma quantidade.'),
  measurementUnit: Yup.mixed<ProductionMeasurementUnit>()
  .oneOf(
    Object.values(ProductionMeasurementUnit),
    'Selecione uma unidade de medida.'
  )
  .required(),
  executionDate: Yup.date().required('Insira a data.'),
});
