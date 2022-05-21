export default interface User {
  _id?: any | null,
  username?: string | null,
  email?: string,
  password?: string,
  firstname?: string,
  lastname?: string,
  roles?: Array<string>
}