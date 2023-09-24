import TextField from '../TextField/TextField';
import { DateInputProps } from './DateInput.model';


function DateInput(props: DateInputProps) {
  return (
    <TextField
      {...props}
      type={'date'}
    />
  );
}

export default DateInput;
