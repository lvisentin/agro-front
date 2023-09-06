import { TextFieldProps } from "../TextField/TextField.model";

export interface PhoneInputProps extends TextFieldProps {
  mask: string;
  maskChar: string;
}
