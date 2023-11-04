export const dayOfMonth = (year: number, month: number) => {
  if (year && month) {
    return Array.from({ length: getDaysInMonth(year, month) }).map((_day, index) => {
      const date = index + 1
      return {
        label: date.toString(),
        value: date.toString(),
      }
    })
  }
  return []
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}
