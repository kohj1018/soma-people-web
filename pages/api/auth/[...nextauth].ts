import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
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