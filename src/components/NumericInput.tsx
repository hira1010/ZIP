import React from 'react';

type NumericInputProps = {
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
};

export function NumericInput({ 
  value, 
  onChange, 
  min, 
  max, 
  placeholder,
  className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
}: NumericInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    if (newValue === '') {
      onChange('');
      return;
    }

    const numValue = parseInt(newValue, 10);
    if (min !== undefined && numValue < min) return;
    if (max !== undefined && numValue > max) return;
    
    onChange(newValue);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}