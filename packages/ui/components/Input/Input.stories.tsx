import React from 'react'
import { Input, InputProps } from './Input'
import { Label } from '../'

export default {
  title: 'Components/Forms/Input',
  component: Input,
}

export const Primary = (args: InputProps): JSX.Element => (
  <form className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
    <div className="sm:col-span-3">
      <Label htmlFor="firstName">First name</Label>
      <div className="relative mt-1">
        <Input id="firstName" {...args} name="firstName" type="text" required />
      </div>
    </div>
  </form>
)
