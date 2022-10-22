export interface UserProfile {
  name?: string
  score: number
  avatar?: string
  loggedIn: boolean
}

export interface UserInput {
  name?: string
  email: string
  password: string
}
