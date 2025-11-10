// import NextAuth from 'next-auth'
// // import AppleProvider from 'next-auth/providers/apple'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import GoogleProvider from 'next-auth/providers/google'
// // import EmailProvider from 'next-auth/providers/email'
// import GithubProvider from 'next-auth/providers/github'
// // import mongoose from 'mongoose'
// import User from '@/models/User'
// import Payment from '@/models/Payment'
// import connectDB from '@/db/connectDb'

// export const authoptions = NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     })
//     // AppleProvider({
//     //   clientId: process.env.APPLE_ID,
//     //   clientSecret: process.env.APPLE_SECRET
//     // }),
//     // FacebookProvider({
//     //   clientId: process.env.FACEBOOK_ID,
//     //   clientSecret: process.env.FACEBOOK_SECRET
//     // }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_ID,
//     //   clientSecret: process.env.GOOGLE_SECRET
//     // }),
//     // // Passwordless / email sign in
//     // EmailProvider({
//     //   server: process.env.MAIL_SERVER,
//     //   from: 'NextAuth.js <no-reply@example.com>'
//     // }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (account.provider == 'github') {
//         await connectDB()  
//         // check if the user exist?
//         const currentUser =await  User.findOne({ email: email })
//         if (!currentUser) {
//          //create new user
//           const newUser = await User.create({
//             email: user.email,
//             username: user.email.split("@")[0],
//           })
//         }
//         return true 
//       }
//     },
//     async session({ session, user, token}){
//       const dbUser = await User.findOne({email: session.user.email})
//       console.log(dbUser)
//       session.user.name = dbUser.username
//       return session
//     },
//   }
// })
// export { authoptions as GET, authoptions as POST }
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import User from '@/models/User'
import connectDB from '@/db/connectDb'

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



