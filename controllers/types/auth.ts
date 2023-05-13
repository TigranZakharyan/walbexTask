export interface RegistrationBody {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginBody {
  email: string;
  password: string
}