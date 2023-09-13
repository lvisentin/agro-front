import { ChangeEvent, FocusEvent } from "react";

export interface SelectFieldProps {
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
  name: string;
  placeholder: string;
  label?: string;
  onChange?: (e: ChangeEvent<any>) => any;
  onBlur?: (e: FocusEvent<any, Element>) => any;
  value: any;
  defaultValue?: any;
  errors?: any;
}

export interface SelectOption {
  value: any;
  label: string;
}
