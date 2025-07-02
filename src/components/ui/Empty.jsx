import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No text to convert", 
  message = "Paste or type your InPage-encoded text to get started",
  actionLabel = "Learn More",
  onAction 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="FileText" size={40} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md leading-relaxed">{message}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <ApperIcon name="Languages" size={16} />
          <span>Supports Sindhi & Urdu</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <ApperIcon name="Zap" size={16} />
          <span>Up to 20K characters</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <ApperIcon name="Shield" size={16} />
          <span>Privacy-first</span>
        </div>
      </div>
      
      {onAction && (
        <Button onClick={onAction} variant="outline" className="mt-6">
          <div className="flex items-center gap-2">
            <ApperIcon name="ExternalLink" size={16} />
            {actionLabel}
          </div>
        </Button>
      )}
    </motion.div>
  )
}

export default Empty