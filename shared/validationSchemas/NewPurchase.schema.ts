import * as Yup from 'yup';

export const NewPurchaseValidationSchema = Yup.object().shape({
  description: Yup.string().required('Digite uma descrição.'),
  propertyId: Yup.number()
    .min(1, 'Selecione uma propriedade.')
    .required('Selecione uma propriedade.'),
});
