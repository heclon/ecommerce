export const RelationshipType = {
  Nominee: 'Nominee',
  Participant: 'Participant',
  SupportCoordinator: 'SupportCoordinator',
  Other: 'Other',
}

export const RelationshipSubType = {
  Parent: 'Parent',
  SpousePartner: 'SpousePartner',
  FamilyMember: 'FamilyMember',
  Guardian: 'Guardian',
  Friend: 'Friend',
  OtherFamily: 'OtherFamily',
  SupportWorker: 'SupportWorker',
  Provider: 'Provider',
  Lac: 'Lac',
  Other: 'Other',
}

export const relationshipTypeOptions = [
  { value: RelationshipType.Participant, label: 'I am the participant' },
  { value: RelationshipType.Nominee, label: "I am the participant's official NDIS nominee or appointed guardian" },
  { value: RelationshipType.SupportCoordinator, label: "I am the participant's support coordinator" },
  { value: RelationshipType.Other, label: 'I have some other relationship to the participant' },
]

export const nomineeSubTypeOptions = [
  { value: RelationshipSubType.Parent, label: 'I am a parent and nominee' },
  { value: RelationshipSubType.SpousePartner, label: 'I am a spouse/partner and nominee' },
  { value: RelationshipSubType.FamilyMember, label: 'I am another family member and nominee' },
  { value: RelationshipSubType.Guardian, label: 'I am a legal guardian and nominee' },
  { value: RelationshipSubType.Other, label: 'Other' },
]

export const otherSubTypeOptions = [
  { value: RelationshipSubType.OtherFamily, label: 'I am a family member (not an official NDIS nominee)' },
  { value: RelationshipSubType.Friend, label: 'I am a friend/other contact (not an official NDIS nominee)' },
  { value: RelationshipSubType.SupportWorker, label: 'I am a support worker (not an official NDIS nominee)' },
  { value: RelationshipSubType.Provider, label: 'I am a provider (not an official NDIS nominee)' },
  { value: RelationshipSubType.Lac, label: 'I am an LAC (not an official NDIS nominee)' },
  { value: RelationshipSubType.Other, label: 'Other' },
]
