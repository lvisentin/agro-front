import * as Yup from 'yup';

export const newPropertyValidationSchema = Yup.object().shape({
  name: Yup.string().required('Digite um nome.'),
  description: Yup.string().required('Digite uma descrição.'),
  farmer: Yup.string().required('Digite um produto.'),
  size: Yup.number()
  .min(0, 'Valor não pode ser negativo.')
  .required('Digite o tamanho da propriedade.'),
});
