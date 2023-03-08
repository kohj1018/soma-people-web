import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'

export default NextAuth({
  cookies: {  // Apple의 callBackUrl 버그 해결을 위해 추가
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "None",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
      authorization: {  // Apple의 callBackUrl 버그 해결을 위해 추가
        params: {
          scope: "name email",
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
        token.email = user.email
        token.name = user.name
        token.account = account
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.oauthId = token.oauthId
        session.user.email = token.email
        session.user.name = token.name
      }
      if (token) {
        session.refreshToken = token.refreshToken
        session.account = token.account
      }
      return session
    },
    async redirect({ url, baseUrl }) {  // Apple의 callBackUrl 버그 해결을 위해 추가 (Google 로그인 막히는 문제 해결)

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`

      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url

      // return baseUrl

      return url  // 바로 url 넘겨줌으로써 Google 로그인도 허용
    },
  },
  pages: {
    signIn: '/auth/signIn'
  }
  // debug: false
})