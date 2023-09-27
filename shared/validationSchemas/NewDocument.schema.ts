import * as Yup from 'yup';

export const newDocumentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Por favor, digite seu nome.'),
  file: Yup.mixed().required('File is required'),
});
