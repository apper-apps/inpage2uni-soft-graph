import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import TextArea from '@/components/atoms/TextArea'
import ConversionStats from '@/components/molecules/ConversionStats'
import ConversionControls from '@/components/molecules/ConversionControls'
import conversionService from '@/services/api/conversionService'
import ApperIcon from '@/components/ApperIcon'

const ConversionInterface = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const [conversionStats, setConversionStats] = useState({
    unmappedCount: 0,
    conversionTime: 0
  })
  
  const outputRef = useRef(null)
  const liveRegionRef = useRef(null)

  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to convert')
      return
    }

    setIsConverting(true)
    const startTime = performance.now()

    try {
      const result = await conversionService.convertText(inputText)
      const endTime = performance.now()
      const conversionTime = Math.round(endTime - startTime)

      setOutputText(result.convertedText)
      setConversionStats({
        unmappedCount: result.unmappedChars.length,
        conversionTime
      })

      // Announce conversion completion to screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `Conversion completed. ${result.unmappedChars.length} unmapped characters found.`
      }

      toast.success(`Text converted successfully in ${conversionTime}ms`)
    } catch (error) {
      console.error('Conversion error:', error)
      toast.error('Failed to convert text. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setConversionStats({ unmappedCount: 0, conversionTime: 0 })
    toast.info('Text cleared')
  }

  const handleCopy = async () => {
    if (!outputText) {
      toast.error('No text to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(outputText)
      toast.success('Text copied to clipboard')
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      if (outputRef.current) {
        outputRef.current.select()
        outputRef.current.setSelectionRange(0, 99999)
        document.execCommand('copy')
        toast.success('Text copied to clipboard')
      } else {
        toast.error('Failed to copy text')
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-custom-blue to-blue-600 rounded-full">
            <ApperIcon name="Languages" size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-custom-blue to-blue-600 bg-clip-text text-transparent">
            InPage2Uni
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Convert legacy InPage-encoded Sindhi/Urdu text to standard Unicode format. 
          Fast, accurate, and privacy-focused - all processing happens in your browser.
        </p>
      </motion.div>

      {/* Conversion Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ApperIcon name="FileInput" size={20} className="text-custom-blue" />
              <h2 className="text-xl font-semibold text-gray-800">InPage Text Input</h2>
            </div>
            
            <TextArea
              label="Paste or type your InPage-encoded text here"
              placeholder="آپ کا متن یہاں لکھیں یا پیسٹ کریں..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              dir="rtl"
              className="arabic-text"
              rows={12}
              ariaDescribedBy="input-stats"
            />
            
            <div id="input-stats" className="mt-3">
              <ConversionStats 
                inputLength={inputText.length} 
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ApperIcon name="FileOutput" size={20} className="text-custom-green" />
              <h2 className="text-xl font-semibold text-gray-800">Unicode Output</h2>
            </div>
            
            <TextArea
              ref={outputRef}
              label="Converted Unicode text will appear here"
              placeholder="Converted text will appear here after conversion..."
              value={outputText}
              readOnly
              dir="ltr"
              className="arabic-text bg-gray-50"
              rows={12}
              ariaDescribedBy="output-stats"
            />
            
            <div id="output-stats" className="mt-3">
              <ConversionStats 
                inputLength={outputText.length}
                unmappedCount={conversionStats.unmappedCount}
                conversionTime={conversionStats.conversionTime}
                showTime={outputText.length > 0}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <ConversionControls
            onConvert={handleConvert}
            onClear={handleClear}
            onCopy={handleCopy}
            isConverting={isConverting}
            hasInput={inputText.length > 0}
            hasOutput={outputText.length > 0}
          />
        </div>

        {/* Features */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-custom-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Zap" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Process up to 20,000 characters in under 200ms</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-custom-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy First</h3>
            <p className="text-gray-600">All processing happens locally in your browser</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-custom-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Target" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Accurate</h3>
            <p className="text-gray-600">Handles ligatures, diacritics, and complex scripts</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Screen Reader Live Region */}
      <div 
        ref={liveRegionRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />
    </div>
  )
}

export default ConversionInterface