/**
 * Text processing utilities for InPage to Unicode conversion
 */

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit the rate of function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to throttle
 * @returns {Function} The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Chunk text into smaller pieces for processing
 * @param {string} text - The text to chunk
 * @param {number} chunkSize - The size of each chunk
 * @returns {string[]} Array of text chunks
 */
export const chunkText = (text, chunkSize = 5000) => {
  const chunks = []
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize))
  }
  return chunks
}

/**
 * Count characters in text, excluding certain characters
 * @param {string} text - The text to count
 * @param {string[]} excludeChars - Characters to exclude from count
 * @returns {number} Character count
 */
export const countCharacters = (text, excludeChars = []) => {
  if (!text) return 0
  
  let count = 0
  for (const char of text) {
    if (!excludeChars.includes(char)) {
      count++
    }
  }
  return count
}

/**
 * Check if text contains RTL characters
 * @param {string} text - The text to check
 * @returns {boolean} True if text contains RTL characters
 */
export const hasRTLCharacters = (text) => {
  if (!text) return false
  
  // RTL character ranges
  const rtlRanges = [
    [0x0590, 0x05FF], // Hebrew
    [0x0600, 0x06FF], // Arabic
    [0x0750, 0x077F], // Arabic Supplement
    [0x08A0, 0x08FF], // Arabic Extended-A
    [0xFB1D, 0xFDFF], // Hebrew and Arabic Presentation Forms
    [0xFE70, 0xFEFF]  // Arabic Presentation Forms-B
  ]
  
  for (const char of text) {
    const charCode = char.charCodeAt(0)
    for (const [start, end] of rtlRanges) {
      if (charCode >= start && charCode <= end) {
        return true
      }
    }
  }
  
  return false
}

/**
 * Sanitize text for safe HTML display
 * @param {string} text - The text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text) return ''
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Format file size in bytes to human readable format
 * @param {number} bytes - The size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Calculate text statistics
 * @param {string} text - The text to analyze
 * @returns {Object} Text statistics
 */
export const getTextStats = (text) => {
  if (!text) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      lines: 0,
      paragraphs: 0
    }
  }
  
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim().split(/\s+/).filter(word => word.length > 0).length,
    lines: text.split('\n').length,
    paragraphs: text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length
  }
}

/**
 * Validate text input for conversion
 * @param {string} text - The text to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {Object} Validation result
 */
export const validateInput = (text, maxLength = 20000) => {
  const result = {
    isValid: true,
    errors: [],
    warnings: []
  }
  
  if (!text || text.trim().length === 0) {
    result.isValid = false
    result.errors.push('Text cannot be empty')
    return result
  }
  
  if (text.length > maxLength) {
    result.isValid = false
    result.errors.push(`Text exceeds maximum length of ${maxLength.toLocaleString()} characters`)
  }
  
  // Check for potentially problematic characters
  const controlChars = text.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g)
  if (controlChars) {
    result.warnings.push('Text contains control characters that may not convert properly')
  }
  
  return result
}

/**
 * Generate a preview of text (first N characters with ellipsis)
 * @param {string} text - The text to preview
 * @param {number} length - Maximum preview length
 * @returns {string} Text preview
 */
export const generatePreview = (text, length = 100) => {
  if (!text || text.length <= length) {
    return text || ''
  }
  
  return text.substring(0, length).trim() + '...'
}