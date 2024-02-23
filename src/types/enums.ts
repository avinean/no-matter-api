export enum ContactType {
  phone = 'phone',
  email = 'email',
}

export enum MaterialTransactionType {
  increase = 'increase',
  decrease = 'decrease',
  revert = 'revert',
  consume = 'consume',
  transfer = 'transfer',
  adjust = 'adjust',
}

export enum ConfirmationStatus {
  new = 'new',
  updated = 'updated',
  approved = 'approved',
  rejected = 'rejected',
}

export enum OrderStatus {
  new = 'new',
  partiallyPaid = 'partiallyPaid',
  paid = 'paid',
  rejected = 'rejected',
}

export enum Sex {
  male = 'male',
  female = 'female',
}

export enum ProfileRelationshipType {
  friend = 'friend',
  family = 'family',
  colleague = 'colleague',
  other = 'other',
}

export enum ServiceType {
  service = 'service',
  product = 'product',
}
