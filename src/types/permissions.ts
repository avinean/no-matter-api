export enum Action {
  GET = 'read',
  POST = 'add',
  PUT = 'edit',
  DELETE = 'delete',
}

export enum Resource {
  user = 'user',
  service = 'service',
  material = 'material',
  materialTransaction = 'material-transaction',
  client = 'client',
  businessObject = 'business-object',
  business = 'business',
  booking = 'booking',
  profile = 'profile',
  role = 'role',
  order = 'order',
}
