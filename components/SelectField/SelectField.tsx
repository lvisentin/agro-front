import { SelectFieldProps } from './SelectField.model';

function SelectField(props: SelectFieldProps) {
  return (
    <div className="form-control">
      {props.label && (
        <label className="label">
          <span className="label-text">{props.label}</span>
        </label>
      )}
      <select
        disabled={props.disabled}
        {...props}
        className={`select select-bordered  w-full max-w-xs ${props.className}`}
      >
        <option disabled value={0}>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.errors && (
        <label className={'label-text'}>
          <span className={`label-text-alt error text-error`}>
            {props.errors}
          </span>
        </label>
      )}
    </div>
  );
}

export default SelectField;
