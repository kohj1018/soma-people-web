import { DefaultUser, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module "next-auth" {
  interface Session {
    refreshToken: string
    account: any
    user: DefaultUser & {
      oauthId: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    refreshToken: string
    oauthId: string
    account: any
  }
}