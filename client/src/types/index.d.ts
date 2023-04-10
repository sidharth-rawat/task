export interface ISignup {
  userName: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
}
export interface IEmploye {
  userName: string,
  firstName: string,
  salary: number,
  desigation: string,
}
export interface  IDashboard extends IEmploye{}
export interface ILogin {
  userName: string,
  password: string
}
