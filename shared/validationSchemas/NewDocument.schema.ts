import * as Yup from 'yup';

export const newDocumentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Digite um nome.'),
  file: Yup.mixed().required('O arquivo é obrigatório.'),
});
