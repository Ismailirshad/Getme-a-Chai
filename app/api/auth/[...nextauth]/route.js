import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import User from '@/models/User.js'
import connectDB from '@/db/connectDb.js'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        await connectDB()

        const existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
        }

        return true
      }
      return false
    },

    async session({ session }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser.username
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }



