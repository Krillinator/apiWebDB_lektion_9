export interface User {
  name: string
  email: string
  age: number
  roles: Roles[]
}

export interface Roles {
  name: String
  permissions: String
  authorities: String
}
