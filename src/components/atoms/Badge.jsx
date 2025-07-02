import React from 'react'

const Badge = ({ 
  children, 
  variant = 'info', 
  size = 'sm',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium'
  
  const variants = {
    info: 'status-badge',
    error: 'error-badge',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
  }
  
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge