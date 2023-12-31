import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { CurrencyFieldProps } from './CurrencyField.model';


const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyField = ({
  maskOptions,
  label,
  placeholder,
  className,
  onChange,
  onBlur,
  onKeyDown,
  type,
  value,
  name,
  errors,
  helperText,
  disabled,
  leadingIcon
}: CurrencyFieldProps) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return (
    <>
      <div className={`form-control relative ${className ? className : ''}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        {value?.length > 0 && leadingIcon && (
          <span className="flex absolute bottom-8 left-4">
            {leadingIcon && <span>{leadingIcon}</span>}
          </span>
        )}
        <MaskedInput
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={value}
          name={name}
          type={'text'}
          disabled={disabled}
          placeholder={placeholder}
          className={`input input-bordered rounded-sm flex-grow w-[inherit] ${value?.length > 0 ? 'pl-9': ''}`}
          mask={currencyMask}
        />
        {helperText && (
          <label className={'label-text'}>
            <span className={`label-text-alt`}>{helperText}</span>
          </label>
        )}
        <label
          className={`label-text relative h-5 py-1 ${
            errors ? 'opacity-1' : 'opacity-0'
          }`}
        >
          <span className={`label-text-alt error text-error absolute`}>
            {errors ? errors : ''}
          </span>
        </label>
      </div>
    </>
  );
};

export default CurrencyField;
