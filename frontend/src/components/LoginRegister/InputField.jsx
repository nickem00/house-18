// src/components/LoginRegister/InputField.jsx
import React from 'react';

export default function InputField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="input-group">
      <input
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}
