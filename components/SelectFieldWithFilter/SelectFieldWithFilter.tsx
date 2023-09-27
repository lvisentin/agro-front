import React, { useEffect, useState } from 'react';
import { SelectFieldWithFilterProps } from './SelectFieldWithFilter.model';

function SelectFieldWithFilter(props: SelectFieldWithFilterProps) {
  const [filter, setFilter] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<any>()

  useEffect(() => {
    props.value ? setFilter(props.value) : ''

    console.log(props);
  }, []);


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    const filteredOptions = props.options.filter( option => option.name.includes(e.target.value))

    setFilteredOptions(filteredOptions)
    setShowOptions(true);
  };

  const handleSelectOption = (option: any) => {
    setFilter(option.name);
    setShowOptions(false);
    if (props && props.onChange) {
      props.onChange(option);
    }
  };

    return (
    <div className="form-control">
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
          onChange={handleFilterChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
        {showOptions && (
          <div className="fixed max-w-xs z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredOptions?.map((option: any) => (
              <div
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption(option)}
              >
                #{option.id} - {option.name}
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