import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'

export default NextAuth({
  cookies: {  // Apple의 callBackUrl 버그 해결을 위해 추가
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: false,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      authorization: {  // Apple의 callBackUrl 버그 해결을 위해 추가
        params: {
          scope: "name",
          response_mode: "form_post",
          response_type: "code",
        },
      },
    })
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.refreshToken = account.refresh_token as string
      }
      if (user) {
        token.oauthId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.oauthId = token.oauthId
      }
      if (token) {
        session.refreshToken = token.refreshToken
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signIn'
  }
  // debug: false
})