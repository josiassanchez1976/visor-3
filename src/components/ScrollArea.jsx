import React from 'react'

export default function ScrollArea({ className = '', children }) {
  return (
    <div className={`overflow-y-auto ${className}`}>{children}</div>
  )
}
