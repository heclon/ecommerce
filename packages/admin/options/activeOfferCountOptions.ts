export enum ActiveOfferCount {
  Zero = 'Zero',
  One = 'One',
  TwoOrMore = 'TwoOrMore',
}

export const activeOfferCountOptions = [
  { value: ActiveOfferCount.Zero, label: '0' },
  { value: ActiveOfferCount.One, label: '1' },
  { value: ActiveOfferCount.TwoOrMore, label: '2+' },
]
