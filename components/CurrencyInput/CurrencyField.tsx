import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { CurrencyFieldProps } from './CurrencyField.model';

const defaultMaskOptions = {
  prefix: 'R$',
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
}: CurrencyFieldProps) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return (
    <>
      <div className={`form-control ${className ? className : ''}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <MaskedInput
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={value}
          name={name}
          type={type || 'text'}
          disabled={disabled}
          placeholder={placeholder}
          className={`input input-bordered rounded-sm flex-grow w-[inherit]`}
          mask={currencyMask}
        />
        {helperText && (
          <label className={'label-text'}>
            <span className={`label-text-alt`}>{helperText}</span>
          </label>
        )}
        {errors && (
          <label className={'label-text'}>
            <span className={`label-text-alt error text-error`}>{errors}</span>
          </label>
        )}
      </div>
    </>
  );
};

export default CurrencyField;
