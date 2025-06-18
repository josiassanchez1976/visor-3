import React from 'react'

export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 text-gray-700 hover:shadow-xl transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
