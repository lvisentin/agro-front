import * as Yup from "yup";

export const newPropertyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Por favor, digite seu nome."),
  description: Yup.string().required("Por favor, digite uma descrição."),
  size: Yup.number().required("Por favor, digite o tamanho da propriedade."),
});
