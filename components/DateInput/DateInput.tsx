'use client';

import { useState } from 'react';
import { DateInputProps } from './DateInput.model';

export default function DateInput({
  label,
  trailingIcon,
  leadingIcon,
  helperText,
  placeholder,
  className,
  onChange,
  onBlur,
  onKeyDown,
  value,
  name,
  errors,
  disabled,
}: DateInputProps) {
  const [toggleState, setToggleState] = useState(true);

  function toggleTrailingIcon() {
    setToggleState((prev) => !prev);
  }

  function renderTrailingIcon() {
    switch (trailingIcon?.type) {
      case 'default': {
        return <span>{trailingIcon.initialIcon} </span>;
      }
      case 'toggle': {
        return (
          <span>
            <label className={'swap'}>
              <input type={'checkbox'} onClick={toggleTrailingIcon} />
              {trailingIcon.initialIcon}
              {trailingIcon.secondIcon}
            </label>
          </span>
        );
      }
    }
  }

  return (
    <>
      <div className={`p-1 form-control ${className ? className : ''}`}>
        {label && (
          <label className="label">
            <h2 className="label-text font-bold text-lg">{label}</h2>
          </label>
        )}
        {leadingIcon || trailingIcon ? (
          <label className="not-prose input-group">
            {leadingIcon && <span>{leadingIcon}</span>}
            <input
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              value={value}
              name={name}
              type={toggleState && trailingIcon ? 'password' : 'text'}
              placeholder={placeholder}
              disabled={disabled}
              className={`input input-bordered rounded-sm flex-grow w-[inherit]`}
            />
            {renderTrailingIcon()}
          </label>
        ) : (
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            value={value}
            name={name}
            type={'date'}
            disabled={disabled}
            placeholder={placeholder}
            className={`input input-bordered flex-grow w-[inherit]`}
          />
        )}
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
}
