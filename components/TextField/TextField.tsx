'use client';

import { TextFieldProps } from '@/components/TextField/TextField.model';
import { useState } from 'react';

export default function TextField({
  label,
  trailingIcon,
  leadingIcon,
  helperText,
  placeholder,
  className,
  onChange,
  onBlur,
  onKeyDown,
  type,
  value,
  name,
  errors,
  disabled,
}: TextFieldProps) {
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
      <div className={`form-control relative ${className ? className : ''}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
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
            type={type || 'text'}
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
}
