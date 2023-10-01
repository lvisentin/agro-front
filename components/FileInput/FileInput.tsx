import { FileInputProps } from './FileInput.model';

function FileInput({
  label,
  onChange,
  onKeyDown,
  onBlur,
  value,
  name,
  placeholder,
  disabled,
  id,
  className,
}: FileInputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="label p-0 mt-0">
          <span className="label-text">{label}</span>
        </label>
      )}

      <div className="form-control relative p-0">
        <input
          id={id}
          onChange={onChange}
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full mt-1"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={value}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default FileInput;
