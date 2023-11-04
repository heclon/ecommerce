export enum STATE_STATUS {
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ACTIVE = 'active',
}

export const stateStatus = [
  { name: 'New South Wales', code: 'NSW', status: STATE_STATUS.PENDING },
  { name: 'Queensland', code: 'QLD', status: STATE_STATUS.INACTIVE },
  { name: 'Western Australia', code: 'WA', status: STATE_STATUS.ACTIVE },
  { name: 'South Australia', code: 'SA', status: STATE_STATUS.INACTIVE },
  { name: 'Victoria', code: 'VIC', status: STATE_STATUS.INACTIVE },
  { name: 'Tasmania', code: 'TAS', status: STATE_STATUS.INACTIVE },
  { name: 'Northern Territory', code: 'NT', status: STATE_STATUS.INACTIVE },
  { name: 'Australian Capital Territory', code: 'ACT', status: STATE_STATUS.INACTIVE },
]
