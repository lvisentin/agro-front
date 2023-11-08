
export interface PurcharseFormProps {
  // report?: Report;
  submitFunction: (values: any, prods: any) => void;
  cancelFunction: () => void;
  disabled?: boolean;
}
