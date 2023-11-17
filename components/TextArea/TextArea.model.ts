import {
  ChangeEvent,
  FocusEvent,
} from 'react';

export interface TextAreaProps {
id?: string;
label?: string,
helperText?: string;
placeholder: string;
className?: string;
onChange?: (e: ChangeEvent<any>) => any;
onClick?: (e: ChangeEvent<any>) => any;
onBlur?: (e: FocusEvent<any, Element>) => any;
value?: any;
name: string;
disabled?: boolean;
errors?: any;
}
