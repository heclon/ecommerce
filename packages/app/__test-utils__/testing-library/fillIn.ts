import { fireEvent } from '@testing-library/react'

const fillIn = (container: HTMLElement, name: string, value: string): void => {
  const field = container.querySelector(`*[name="${name}"`) as HTMLInputElement
  fireEvent.change(field, { target: { value } })
}

export default fillIn
