'use client';

import { m } from 'framer-motion';

interface AnimatedInputProps {
  type?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function AnimatedInput({
  type = 'text',
  name,
  id,
  value,
  onChange,
  placeholder,
  required,
  className = '',
}: AnimatedInputProps) {
  return (
    <m.input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 ${className}`}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    />
  );
}