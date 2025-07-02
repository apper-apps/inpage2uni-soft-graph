import React, { forwardRef } from 'react'

const TextArea = forwardRef(({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  dir = 'ltr',
  readOnly = false,
  rows = 12,
  className = '',
  ariaDescribedBy,
  ...props 
}, ref) => {
  const baseClasses = 'conversion-textarea w-full'
  const classes = `${baseClasses} ${className}`
  
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dir={dir}
        readOnly={readOnly}
        rows={rows}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea