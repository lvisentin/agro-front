import React, { useEffect, useRef, useState } from 'react';
import { SelectFieldWithFilterProps } from './SelectFieldWithFilter.model';

function SelectFieldWithFilter(props: SelectFieldWithFilterProps) {
  const [filter, setFilter] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<any>();
  const selectFieldRef = useRef<any>(null);

  useEffect(() => {
    props.value ? setFilter(props.value) : '';

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [props.value]);

  const handleClickOutside = (event: any) => {
    if (
      selectFieldRef.current &&
      !selectFieldRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props && props.onChange) {
      props.onChange(e);
    }
    const filterText = e.target.value.toLowerCase();
    setFilter(filterText);

    setTimeout(() => {
      const filteredOptions = props.options.filter((option) =>
        option.name.toLowerCase().includes(filterText)
      );

      setFilteredOptions(filteredOptions);
      setShowOptions(true);
    }, 200);
  };

  const handleSelectOption = (option: any) => {
    setFilter(option.name);
    setShowOptions(false);
    if (props && props.onChange) {
      props.onChange(option);
    }
  };

  return (
    <div className="form-control" ref={selectFieldRef}>
      {props.label && (
        <label className="label">
          <span className="label-text">{props.label}</span>
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          className={`input input-bordered w-full max-w-xs ${props.className}`}
          value={filter}
          id={props.id}
          onChange={handleFilterChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onClick={() => {
            if (!showOptions) {
              setShowOptions(true);
              setFilteredOptions(props.options);
            }
          }}
        />
        {showOptions && (
          <div className="fixed max-w-xs z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredOptions?.map((option: any) => (
              <div
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {props.errors && (
        <label className={'label-text font-zinc-200'}>
          <span className={`label-text-alt error text-error`}>
            {props.errors}
          </span>
        </label>
      )}
    </div>
  );
}

export default SelectFieldWithFilter;
