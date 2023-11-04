export enum CreatedAt {
  LessThanWeekAgo = 'lessThanWeekAgo',
  OneWeekAgo = 'oneWeekAgo',
  TwoWeeksAgo = 'twoWeeksAgo',
  ThreeWeeksAgo = 'threeWeeksAgo',
  FourWeeksAgo = 'fourWeeksAgo',
  MoreThan5WeeksAgo = 'moreThan5WeeksAgo',
}

export const createdAtOptions = [
  { value: CreatedAt.LessThanWeekAgo, label: 'Less than a Week ago' },
  { value: CreatedAt.OneWeekAgo, label: '1 Week ago' },
  { value: CreatedAt.TwoWeeksAgo, label: '2 Weeks ago' },
  { value: CreatedAt.ThreeWeeksAgo, label: '3 Weeks ago' },
  { value: CreatedAt.FourWeeksAgo, label: '4 Weeks ago' },
  { value: CreatedAt.MoreThan5WeeksAgo, label: '5+ Weeks ago' },
]
