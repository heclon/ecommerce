import fakeMoment from './fakeMoment'

// returns the same date regardless of timezone
export default (): Date => {
  return fakeMoment().toDate()
}
