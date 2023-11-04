import { GenderPronoun } from '@prisma/client'

export const genderPronouns = [
  {
    value: GenderPronoun.SheOrHer,
    label: 'She/Her',
  },
  {
    value: GenderPronoun.HeOrHim,
    label: 'He/Him',
  },
  {
    value: GenderPronoun.TheyOrThem,
    label: 'They/Them',
  },
  {
    value: GenderPronoun.PreferNotToSay,
    label: 'I prefer not to say',
  },
]
