import React from 'react'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const ConversionStats = ({ 
  inputLength = 0, 
  unmappedCount = 0, 
  conversionTime = 0,
  showTime = false 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      <div className="flex items-center gap-2">
        <ApperIcon name="FileText" size={16} className="text-gray-600" />
        <Badge variant="info">
          {inputLength.toLocaleString()} characters
        </Badge>
      </div>
      
      {unmappedCount > 0 && (
        <div className="flex items-center gap-2">
          <ApperIcon name="AlertTriangle" size={16} className="text-orange-500" />
          <Badge variant="error">
            {unmappedCount} unmapped
          </Badge>
        </div>
      )}
      
      {showTime && conversionTime > 0 && (
        <div className="flex items-center gap-2">
          <ApperIcon name="Clock" size={16} className="text-gray-600" />
          <Badge variant="success">
            {conversionTime}ms
          </Badge>
        </div>
      )}
    </div>
  )
}

export default ConversionStats