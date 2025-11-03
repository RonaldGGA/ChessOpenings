// components/UserButton.tsx (actualizado)
"use client"

import { useSession, signIn, signOut } from 'next-auth/react'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdDashboard } from 'react-icons/md'

export default function UserButton() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
        <span className="text-gray-300 text-sm">Loading...</span>
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* User Avatar and Name */}
        <button
          ref={buttonRef}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600 hover:border-yellow-500/50 rounded-xl px-4 py-2 transition-all duration-300 group"
        >
          {/* User Avatar */}
          <div className="flex items-center space-x-2">
            {session.user.image ? (
              <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-yellow-400/50 group-hover:border-yellow-400 transition-colors">
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User avatar'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-400/50 group-hover:border-yellow-400 transition-colors">
                <User className="h-4 w-4 text-slate-900" />
              </div>
            )}
            
            {/* User Name - hidden on mobile, shown on desktop */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors">
                {session.user.name || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-[120px]">
                {session.user.email}
              </p>
            </div>
          </div>

          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Dropdown Menu - Aseguramos que esté por encima de todo */}
        {dropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl shadow-black/50 z-100 overflow-hidden">
            {/* User Info Section */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                {session.user.image ? (
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-yellow-400/50">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User avatar'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-400/50">
                    <User className="h-5 w-5 text-slate-900" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {session.user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
              href="/dashboard"
                onClick={() => {
                  setDropdownOpen(false)
                  // Aquí puedes redirigir a la página de perfil
                }}
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              >
                <MdDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* Sign Out Button */}
            <div className="p-2 border-t border-slate-700">
              <button
                onClick={() => {
                  setDropdownOpen(false)
                  signOut({ callbackUrl: '/' })
                }}
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // User not signed in
  return (
    <button
      onClick={() => signIn()}
      className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600 hover:border-yellow-500/50 rounded-xl px-4 py-2 transition-all duration-300 group"
    >
      <User className="h-4 w-4 text-gray-300 group-hover:text-yellow-400 transition-colors" />
      <span className="text-gray-300 group-hover:text-white">Sign In</span>
    </button>
  )
}