import { Mask } from 'react-text-mask';
import { TextFieldProps } from '../TextField/TextField.model';

export interface CurrencyFieldProps extends TextFieldProps {
  maskOptions?: Mask;
}
