interface ICustomerToken {
  id: string
  phone: string
  status: CustomerStatus
}

interface ICustomerDecodedToken extends ICustomerToken {
  iat: number
  exp: number
}
interface ILoginCustomerFormData {
  email: string
  phone: string
  password: string
}
interface IRegisterCustomerFormData {
  name: string
  email: string
  phone: string
  password: string
  c_password: string
}
interface IEditCustomerFormData {
  name: string
  email: string
  gender: string
  birthdate: string
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export {
  ICustomerToken,
  ICustomerDecodedToken,
  ILoginCustomerFormData,
  IRegisterCustomerFormData,
  IEditCustomerFormData,
  Gender,
  CustomerStatus,
}
