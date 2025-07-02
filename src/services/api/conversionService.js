import mappingData from '@/services/mockData/inPageMappings.json'

const CONVERSION_DELAY = 50 // Realistic delay for processing

class ConversionService {
  constructor() {
    this.mappings = this.initializeMappings()
  }

  initializeMappings() {
    const mappings = new Map()
    
    // Load mappings from JSON data
    if (mappingData && mappingData.mappings) {
      mappingData.mappings.forEach(mapping => {
        mappings.set(mapping.inPageChar, {
          unicode: mapping.unicodeChar,
          type: mapping.type,
          description: mapping.description
        })
      })
    }
    
    return mappings
  }

  async convertText(inputText) {
    // Simulate processing delay
    if (CONVERSION_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, CONVERSION_DELAY))
    }

    const startTime = performance.now()
    const result = this.processText(inputText)
    const endTime = performance.now()

    return {
      originalText: inputText,
      convertedText: result.convertedText,
      unmappedChars: result.unmappedChars,
      timestamp: Date.now(),
      stats: {
        processingTime: Math.round(endTime - startTime),
        totalChars: inputText.length,
        mappedChars: inputText.length - result.unmappedChars.length,
        unmappedCount: result.unmappedChars.length
      }
    }
  }

  processText(text) {
    let convertedText = ''
    const unmappedChars = []
    const unmappedSet = new Set()

    // Process text character by character
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const mapping = this.mappings.get(char)

      if (mapping) {
        convertedText += mapping.unicode
      } else {
        // Check if it's already a Unicode character (basic Latin, Arabic, etc.)
        const charCode = char.charCodeAt(0)
        if (this.isValidUnicodeChar(charCode)) {
          convertedText += char
        } else {
          // Wrap unmapped character in a span for highlighting
          convertedText += `<span class="unmapped-char" title="Unmapped character: ${char}">${char}</span>`
          
          if (!unmappedSet.has(char)) {
            unmappedChars.push({
              char: char,
              position: i,
              charCode: charCode
            })
            unmappedSet.add(char)
          }
        }
      }
    }

    return {
      convertedText,
      unmappedChars
    }
  }

  isValidUnicodeChar(charCode) {
    // Basic Latin (0-127)
    if (charCode <= 127) return true
    
    // Arabic block (1536-1791)
    if (charCode >= 1536 && charCode <= 1791) return true
    
    // Arabic Supplement (1872-1919)
    if (charCode >= 1872 && charCode <= 1919) return true
    
    // Arabic Extended-A (2208-2303)
    if (charCode >= 2208 && charCode <= 2303) return true
    
    // Common punctuation and symbols
    if (charCode >= 8192 && charCode <= 8303) return true
    
    // Mathematical operators
    if (charCode >= 8704 && charCode <= 8959) return true
    
    return false
  }

  // Get mapping statistics
  getMappingStats() {
    const stats = {
      totalMappings: this.mappings.size,
      basicChars: 0,
      ligatures: 0,
      diacritics: 0,
      numerals: 0,
      punctuation: 0
    }

    this.mappings.forEach(mapping => {
      switch (mapping.type) {
        case 'basic':
          stats.basicChars++
          break
        case 'ligature':
          stats.ligatures++
          break
        case 'diacritic':
          stats.diacritics++
          break
        case 'numeral':
          stats.numerals++
          break
        case 'punctuation':
          stats.punctuation++
          break
      }
    })

    return stats
  }
}

const conversionService = new ConversionService()
export default conversionService