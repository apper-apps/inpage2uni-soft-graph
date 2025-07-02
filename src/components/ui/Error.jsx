import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong during conversion", 
  onRetry, 
  details 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg border border-red-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" size={32} className="text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Conversion Error</h3>
      <p className="text-gray-600 text-center mb-4 max-w-md">{message}</p>
      
      {details && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 max-w-md">
          <p className="text-sm text-red-700 font-mono">{details}</p>
        </div>
      )}
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <div className="flex items-center gap-2">
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </div>
        </Button>
      )}
    </motion.div>
  )
}

export default Error