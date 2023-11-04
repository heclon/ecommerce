import { PlanManagementCategory } from '@prisma/prochoClient'

const planManagedOther = 'Plan Managed - Other'

export const planManagementCategoryOptions = [
  { value: PlanManagementCategory.ProChoParticipant, label: `Plan managed by Provider Choice` },
  { value: PlanManagementCategory.AnotherPlanManager, label: 'Plan managed by someone else' },
  { value: PlanManagementCategory.SelfManaged, label: 'Self managed' },
  { value: PlanManagementCategory.AgencyManaged, label: 'Agency managed' },
  { value: 'Unsure', label: 'Unsure' },
]

export const planManagementCategoryAdminOptions = [
  { value: PlanManagementCategory.AgencyManaged, label: 'Agency Managed' },
  { value: PlanManagementCategory.Anonymous, label: planManagedOther },
  { value: PlanManagementCategory.AnotherPMRegisterForProCho, label: planManagedOther },
  { value: PlanManagementCategory.AnotherPlanManager, label: planManagedOther },
  { value: PlanManagementCategory.NoPlan, label: 'No Plan' },
  { value: PlanManagementCategory.ProChoParticipant, label: 'Provider Choice' },
  { value: PlanManagementCategory.RegisterForProCho, label: planManagedOther },
  { value: PlanManagementCategory.SelfManaged, label: 'Self Managed' },
  { value: PlanManagementCategory.Unsure, label: 'Unsure' },
]
