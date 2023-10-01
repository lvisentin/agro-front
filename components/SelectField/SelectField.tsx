import { SelectFieldProps } from './SelectField.model';

function SelectField(props: SelectFieldProps) {
  return (
    <div className="form-control relative">
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
        {props.options?.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <label
        className={`label-text relative h-5 py-1 ${
          props.errors ? 'opacity-1' : 'opacity-0'
        }`}
      >
        <span className={`label-text-alt error text-error absolute`}>
          {props.errors ? props.errors : ''}
        </span>
      </label>
    </div>
  );
}

export default SelectField;
