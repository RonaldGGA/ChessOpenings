// lib/auth-utils.ts
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { redirect } from 'next/navigation'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/signin')
  }
  
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  
  // Aquí puedes agregar lógica de roles si necesitas
  // if (user.role !== 'admin') {
  //   redirect('/unauthorized')
  // }
  
  return user
}