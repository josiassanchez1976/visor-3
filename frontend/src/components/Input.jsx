import React, { forwardRef } from 'react'

const Input = forwardRef(function Input(props, ref) {
  return (
    <input
      ref={ref}
      className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
      {...props}
    />
  )
})

export default Input
