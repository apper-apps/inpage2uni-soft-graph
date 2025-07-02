import { useState, useCallback } from 'react'
import conversionService from '@/services/api/conversionService'

export const useConversion = () => {
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const convertText = useCallback(async (inputText) => {
    if (!inputText?.trim()) {
      setError('Please provide text to convert')
      return null
    }

    setIsConverting(true)
    setError(null)

    try {
      const conversionResult = await conversionService.convertText(inputText)
      setResult(conversionResult)
      return conversionResult
    } catch (err) {
      const errorMessage = err.message || 'Failed to convert text'
      setError(errorMessage)
      console.error('Conversion error:', err)
      return null
    } finally {
      setIsConverting(false)
    }
  }, [])

  const clearResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isConverting,
    error,
    result,
    convertText,
    clearResult,
    clearError
  }
}

export default useConversion