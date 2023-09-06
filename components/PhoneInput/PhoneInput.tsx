import TextField from '../TextField/TextField';
import { PhoneInputProps } from './PhoneInput.model';
import { KeyboardEvent } from 'react';

function phoneMaskBrazil(event: KeyboardEvent) {
  var key = event.key;
  var element = event.target;
  var isAllowed = /\d|Backspace|Tab/;
  if(!isAllowed.test(key)) event.preventDefault();
  var inputValue = element.value;
  inputValue = inputValue.replace(/\D/g,'');
  inputValue = inputValue.replace(/(^\d{2})(\d)/,'($1) $2');
  inputValue = inputValue.replace(/(\d{4,5})(\d{4}$)/,'$1-$2');
  
  element.value = inputValue;
}

function PhoneInput(props: PhoneInputProps) {
  return (
    <TextField {...props} onKeyDown={(e) => phoneMaskBrazil(e)}/>
  );
}

export default PhoneInput;
