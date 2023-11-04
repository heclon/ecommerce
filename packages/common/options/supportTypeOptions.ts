import sortBy from 'lodash.sortby'
export interface WishlistItem {
  name: string
  number: string
}

export interface WishlistItemSynthetic extends WishlistItem {
  available?: boolean
}
export interface WishlistCategory {
  name: string
  number: number
  items: WishlistItemSynthetic[]
}

export interface OptionType<TL = string, TV = string> {
  label: TL
  value: TV
}

const wishable: WishlistCategory[] = [
  {
    number: 15,
    name: 'Improved Daily Living',
    items: [
      { name: 'Occupational Therapy', number: '15_056_0128_1_3' },
      { name: 'Nursing', number: '15_400_0114_1_3' },
      { name: 'Therapy assistant', number: '15_052_0128_1_3' },
      { name: 'Psychology', number: '15_054_0128_1_3' },
      { name: 'Speech Pathology', number: '15_056_0128_1_3' },
      { name: 'Physiotherapy', number: '15_055_0128_1_3' },
      { name: 'Exercise Physiology', number: '15_200_0126_1_3' },
      { name: 'Dietitian', number: '15_062_0128_3_3' },
      { name: 'Music Therapist', number: '15_615_0128_1_3' },
      { name: 'Art Therapist', number: '15_610_0128_1_3' },
      { name: 'Play Therapist', number: '15_056_0128_1_3' },
      { name: 'Functional Capacity Assessment', number: '15_056_0128_1_3' },
      { name: 'Assistive Technology Assessment', number: '15_056_0128_1_3' },
      { name: 'Counselling', number: '15_043_0128_1_3' },
      { name: 'Training for carers & parents', number: '15_038_0117_1_3' },
      {
        name: 'Assistance with decision making, daily planning and budgeting',
        number: '15_035_0106_1_3',
      },
      { name: 'Individual skills development for living independently', number: '15_037_0117_1_3' },
      { name: 'Specialised driver training', number: '15_046_0129_1_3' },
      { name: 'Social Work', number: '15_621_0128_1_3' },
      {
        name: 'Early childhood intervention',
        number: 'early_childhood_intervention',
        available: false,
      },
    ],
  },
  {
    number: 1,
    name: 'Assistance with Daily Activities',
    items: [
      { name: 'Support workers to assist with personal activities', number: '01_011_0107_1_1' },
      { name: 'Nursing', number: '01_600_0114_1_1' },
      { name: 'Respite', number: '01_058_0115_1_1' },
      { name: 'Podiatrist', number: '01_663_0128_1_3' },
      { name: 'Cleaning', number: '01_020_0120_1_1' },
      { name: 'Preparation of meals', number: '01_022_0120_1_1', available: false },
      { name: 'Gardening', number: '01_019_0120_1_1' },
      { name: 'Professional Organiser', number: '01_400_0104_1_1' },
    ],
  },
  {
    number: 4,
    name: 'Assistance with social and community participation',
    items: [{ name: 'Support worker to access social and community activities one on one', number: '04_104_0125_6_1' }],
  },
  {
    number: 11,
    name: 'Improved Relationships',
    items: [
      { name: 'Positive Behaviour Support', number: '11_022_0110_7_3' },
      { name: 'Individual social skills development', number: '11_024_0117_7_3' },
    ],
  },
  {
    number: 9,
    name: 'Increased Social & Community Participation',
    items: [
      { name: 'Individual skills development and training', number: '09_009_0117_6_3' },
      { name: 'Art Class', number: '09_007_0117_6_3' },
      { name: 'Mentoring', number: '07_003_0117_8_3' },
      { name: 'Peer support', number: '07_003_0117_8_3' },
    ],
  },
  {
    number: 12,
    name: 'Improved health and wellbeing',
    items: [
      { name: 'Dietitian', number: '12_025_0128_3_3' },
      { name: 'Exercise physiology', number: '12_027_0128_1_3' },
      { name: 'Personal training', number: '12_029_0126_3_3' },
    ],
  },
  {
    number: 7,
    name: 'Support Coordination',
    items: [
      { name: 'Support Coordinator', number: '07_001_0106_8_3' },
      { name: 'Specialist Support Coordinator', number: '07_004_0132_8_3' },
    ],
  },
]

export const allSupportOptions: OptionType[] = sortBy(
  wishable.flatMap((w) =>
    w.items
      .filter((s) => s.available ?? true)
      .map((item) => ({
        label: item.name,
        value: `${item.number}|${item.name}`,
      }))
  ),
  ['label', 'value']
)

export const supportTypeOptions = [
  ...new Map(allSupportOptions.map((item) => [item.label.toLowerCase(), item])).values(),
]

export default wishable

export const items: WishlistItem[] = wishable.flatMap((w) => w.items)
