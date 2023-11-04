class StateService {
  static getStateFromAddress(address: string | undefined | null): string {
    if (!address) return ''

    // Ref: https://simple.wikipedia.org/wiki/States_and_territories_of_Australia
    const stateMatches = address.match(/\b(?:NSW|QLD|SA|TAS|VIC|WA|ACT|NT|JBT)\b/)
    return (stateMatches && stateMatches[0]) || ''
  }
}

export default StateService
