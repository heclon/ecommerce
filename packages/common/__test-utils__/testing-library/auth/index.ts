export type UserCredentials = { username: string; password: string }

export interface Authenticator {
  login: (credentials?: UserCredentials) => Promise<void>
  logout: () => Promise<void>
}
