import { FundsAvailabilityOption } from '@prisma/prochoClient'

export const fundsAvailabilityOptions = [
  { value: FundsAvailabilityOption.Yes, label: 'Yes' },
  { value: FundsAvailabilityOption.No, label: 'No' },
  { value: FundsAvailabilityOption.Unsure, label: 'Unsure' },
]
