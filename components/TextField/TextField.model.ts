import { ChangeEvent, FocusEvent, KeyboardEventHandler, ReactNode } from 'react';

interface TrailingIconProps {
  type: 'default' | 'toggle';
  initialIcon?: ReactNode;
  secondIcon?: ReactNode;
}

export interface TextFieldProps {
  label?: string;
  helperText?: string;
  placeholder: string;
  leadingIcon?: ReactNode;
  trailingIcon?: TrailingIconProps;
  className?: string;
  onChange?: (e: ChangeEvent<any>) => any;
  onBlur?: (e: FocusEvent<any, Element>) => any;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  value?: any;
  name: string;
  disabled?: boolean;
  errors?: any;
}
