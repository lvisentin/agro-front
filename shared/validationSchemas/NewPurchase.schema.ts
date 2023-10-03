import * as Yup from 'yup';

export const NewPurchaseValidationSchema = Yup.object().shape({
  description: Yup.string().required('Por favor, digite uma descrição.'),
  propertyId: Yup.number()
    .min(1, 'Selecione uma propriedade')
    .required('Por favor, selecione uma propriedade.'),
});
