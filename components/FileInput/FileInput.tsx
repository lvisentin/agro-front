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
}: FileInputProps) {
  return (
    <>
      {label && (
        <label className="label pb-0 mt-2">
          <span className="label-text">{label}</span>
        </label>
      )}

      <div className="form-control p-1">
        <input
          id={id}
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
