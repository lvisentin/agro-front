import * as Yup from 'yup';

export const newPlotValidationSchema = Yup.object().shape({
  name: Yup.string().required('Digite um nome.'),
  farmingType: Yup.string().required('Digite a cultura agrícula.'),
  size: Yup.number()
  .min(0, 'Valor não pode ser negativo.')
  .required('Digite o tamanho do talhão.'),
  propertyId: Yup.number()
    .min(1, 'Selecione uma propriedade.')
    .required('Selecione uma propriedade.'),
});
