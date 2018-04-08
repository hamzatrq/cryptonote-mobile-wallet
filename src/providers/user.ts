export interface User {
  success: boolean,
  token: string,
  user: {
    id: string,
    email: string,
    address: string
  }
}
