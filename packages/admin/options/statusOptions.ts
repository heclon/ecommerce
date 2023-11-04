import { ProviderServiceRequestStatus } from '@prisma/prochoClient'

export const statusOptions = Object.keys(ProviderServiceRequestStatus).map((status) => ({
  value: status,
  label: status,
}))
