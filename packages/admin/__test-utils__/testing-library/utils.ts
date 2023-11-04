import open from 'open'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openPlaygroundUrl = async (screen: any) => {
  const mystring = screen.logTestingPlaygroundURL()
  open(mystring)
}
