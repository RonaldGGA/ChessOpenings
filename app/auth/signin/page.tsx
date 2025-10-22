// app/auth/signin/page.tsx - VERSIÓN CON DEBUG
'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, getProviders } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [providers, setProviders] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  useEffect(() => {
    const loadProviders = async () => {
      const providersList = await getProviders()
      setProviders(providersList)
      console.log('Available providers:', providersList)
    }
    loadProviders()
  }, [])

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Attempting sign in with:', { email, callbackUrl })
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      console.log('SignIn result:', result)

      if (result?.error) {
        setError('Invalid credentials')
      } else if (result?.url) {
        // ✅ Redirigir manualmente si es necesario
        router.push(result.url)
      } else {
        // ✅ Verificar sesión y redirigir
        const session = await getSession()
        console.log('Session after sign in:', session)
        router.push(callbackUrl)
      }
    } catch (error) {
      console.error('SignIn error:', error)
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (providerId: string) => {
    try {
      console.log(`Signing in with ${providerId}`, { callbackUrl })
      
      const result = await signIn(providerId, {
        callbackUrl,
        redirect: true, // ✅ Dejar que NextAuth maneje la redirección
      })
      
      console.log(`OAuth ${providerId} result:`, result)
    } catch (error) {
      console.error(`OAuth ${providerId} error:`, error)
      setError(`Failed to sign in with ${providerId}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/auth/newuser"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleCredentialsSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {providers && Object.values(providers).filter((p: any) => p.id !== 'credentials').length > 0 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {Object.values(providers)
                  .filter((provider: any) => provider.id !== 'credentials')
                  .map((provider: any) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => handleOAuthSignIn(provider.id)}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span>{provider.name}</span>
                    </button>
                  ))
                }
              </div>
            </div>
          )}
        </form>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Info:</h3>
            <p className="text-xs text-gray-600">Callback URL: {callbackUrl}</p>
            <p className="text-xs text-gray-600">Providers: {providers ? Object.keys(providers).join(', ') : 'Loading...'}</p>
          </div>
        )}
      </div>
    </div>
  )
}