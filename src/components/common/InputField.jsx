// InputField.js
import React from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const InputField = ({ type, name, labelname, onChange,placeholder, value, onBlur, error, showPassword, onTogglePassword, showConfirmPassword, onToggleConfirmPassword ,classname }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelname}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          className={classname}
          placeholder={placeholder}
        />
        {(name === 'password' || name === 'confirmPassword') && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
            onClick={name === 'password' ? onTogglePassword : onToggleConfirmPassword}
          >
            {name === 'password' ? (showPassword ? <IoMdEyeOff /> : <IoMdEye />) : (showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />)}
          </button>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
