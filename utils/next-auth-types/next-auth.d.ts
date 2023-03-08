import { DefaultUser, Profile, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module "next-auth" {
  interface Session {
    refreshToken: string
    profile: Profile | undefined
    isNewUser: boolean | undefined
    token: JWT
    user: DefaultUser & {
      oauthId: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    refreshToken: string
    oauthId: string
    profile: Profile | undefined
    isNewUser: boolean | undefined
  }
}