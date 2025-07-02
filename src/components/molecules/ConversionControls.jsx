import React from 'react'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'

const ConversionControls = ({ 
  onConvert, 
  onClear, 
  onCopy,
  isConverting = false, 
  hasInput = false,
  hasOutput = false 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
      <div className="flex items-center gap-3">
        <Button
          onClick={onConvert}
          disabled={!hasInput || isConverting}
          size="lg"
          className="min-w-[140px]"
        >
          {isConverting ? (
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ApperIcon name="Loader2" size={20} />
              </motion.div>
              Converting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ApperIcon name="ArrowRight" size={20} />
              Convert
            </div>
          )}
        </Button>
        
        {hasInput && (
          <Button
            onClick={onClear}
            variant="outline"
            size="md"
            disabled={isConverting}
          >
            <div className="flex items-center gap-2">
              <ApperIcon name="X" size={16} />
              Clear
            </div>
          </Button>
        )}
      </div>
      
      {hasOutput && (
        <Button
          onClick={onCopy}
          variant="secondary"
          size="md"
          disabled={isConverting}
        >
          <div className="flex items-center gap-2">
            <ApperIcon name="Copy" size={16} />
            Copy Result
          </div>
        </Button>
      )}
    </div>
  )
}

export default ConversionControls