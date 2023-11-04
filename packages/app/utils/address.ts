/**
 * Removes the street name and number from an address string, for stripping PII from address.
 * @param address
 * @returns address without the street name and number
 */
export const generateMaskedAddress = (address: string | null): string | null => {
  const splitAddress = address?.split(',') ?? []

  if (splitAddress.length > 2) {
    return splitAddress.slice(1).join(',').trim()
  }

  return address
}
