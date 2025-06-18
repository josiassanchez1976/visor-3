import React from 'react'

export default function Button({ variant = 'default', className = '', ...props }) {
  const base = 'rounded-lg px-4 py-2 transition-all duration-200';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
