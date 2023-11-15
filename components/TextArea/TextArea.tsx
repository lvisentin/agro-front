'use client';

import { TextAreaProps } from "./TextArea.model";

export default function TextArea({
  id,
  label,
  helperText,
  placeholder,
  className,
  onChange,
  onClick,
  onBlur,
  value,
  name,
  disabled,
  errors,
}: TextAreaProps) {
  return (
    <>
      <div className={`form-control relative ${className ? className : ''}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}

        <label className="not-prose input-group">
          <textarea
            id={id}
            onChange={onChange}
            onClick={onClick}
            onBlur={onBlur}
            value={value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className={`textarea input-bordered rounded-sm flex-grow w-[inherit]`}
          />

          {errors && (
            <label className={`label-text relative h-5 py-1 opacity-${errors ? '1' : '0'}`}>
              <span className={`label-text-alt error text-error absolute`}>
                {errors ? errors : ''}
              </span>
            </label>
          )}
        </label>

        {helperText && (
          <label className={'label-text'}>
            <span className={`label-text-alt`}>{helperText}</span>
          </label>
        )}
      </div>
    </>

  );
}