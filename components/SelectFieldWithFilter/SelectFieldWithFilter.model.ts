import { FocusEvent } from 'react';

export interface SelectFieldWithFilterProps {
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
  name: string;
  placeholder: string;
  label?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: FocusEvent<any, Element>) => any;
  value: any;
  defaultValue?: any;
  errors?: any;
  ref?: any;
  id?: string;
}

export interface SelectOption {
  id: any;
  name: string;
}
