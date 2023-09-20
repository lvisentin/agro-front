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
}: FileInputProps) {
  return (
    <>
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <div className="form-control p-1">
        <input
          onChange={onChange}
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full mt-2"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={value}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </>
  );
}

export default FileInput;
