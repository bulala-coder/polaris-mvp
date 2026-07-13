export function normalizeMarketSymbol(input: string): string {
  const trimmedInput = input.trim()

  if (trimmedInput === '') {
    return ''
  }

  const upperInput = trimmedInput.toUpperCase()

  if (upperInput.includes('.')) {
    return upperInput
  }

  if (/^\d{4,6}[A-Z]?$/.test(upperInput)) {
    return `${upperInput}.TW`
  }

  return upperInput
}
