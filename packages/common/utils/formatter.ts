/** Removes the street name and number from an address string, for striping PII from address.*/
export const generateMaskedAddress = (address: string): string => {
  const splitAddress: string[] = address.split(',')

  if (splitAddress.length > 2) {
    return splitAddress.slice(1).join(',').trim()
  }

  return address
}
