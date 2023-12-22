export interface User {
  name: string
  email: string
  age: number
  roles: Role[]
}

export interface Role {
  name: string
  permissions: string
  authorities: string
}
