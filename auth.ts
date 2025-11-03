// lib/auth.ts
import  NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from './lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/newuser',
    error: '/auth/error',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Partial<Record<'email' | 'password', unknown>>) {
        // Coerce unknowns to strings to satisfy the provider type
        const email = typeof credentials?.email === 'string' ? credentials.email : (credentials?.email ? String(credentials.email) : '')
        const password = typeof credentials?.password === 'string' ? credentials.password : (credentials?.password ? String(credentials.password) : '')

        if (!email || !password) {
          return null
        }

        try {
          // Buscar usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
          })

          if (!user || !user.password) {
            return null
          }

          //Verificar contraseña
          const isPasswordValid = await bcrypt.compare(
            password, 
            user.password
          )
          // const isPasswordValid = password === user.password // Temporal hasta implementar bcrypt

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // ✅ Permitir signIn para todos los providers
      console.log('SignIn callback:', { user, account, profile });
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Permite URLs relativas
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Permite URLs del mismo dominio
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      
      // Buscar usuario en la base de datos para mantener la sesión actualizada
      if (token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
        })

        if (dbUser) {
          token.id = dbUser.id
          token.name = dbUser.name
          token.email = dbUser.email
          token.picture = dbUser.image
        }
      }

      return token
    },
  },
  events: {
    async signIn(message) {
      console.log('User signed in', message);
    },
    async signOut(message) {
      console.log('User signed out', message);
    },
    async createUser(message) {
      console.log('User created', message);
    },
    async linkAccount(message) {
      console.log('Account linked', message);
    },
  },
  debug: process.env.NODE_ENV === 'development', // ✅ Activar debug en desarrollo
})