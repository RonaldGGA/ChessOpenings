// components/UserButton.tsx
'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { User, LogOut, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function UserButton() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const changeSetMounted = () => {
      setMounted(true);
    }
    changeSetMounted()
  }, []);

  if (!mounted || status === "loading") {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 text-gray-400 animate-pulse">
        <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
        <div className="hidden md:block w-20 h-4 bg-slate-600 rounded"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center space-x-3">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-yellow-400/50"
            />
          ) : (
            <div className="h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-slate-900" />
            </div>
          )}
          <div className="hidden lg:block text-right">
            <p className="text-sm font-medium text-white">
              {session.user.name || "User"}
            </p>
            <p className="text-xs text-gray-400">
              {session.user.email}
            </p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
          title="Sign Out"
        >
          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span className="hidden md:block text-sm">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
      className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 group"
    >
      <LogIn className="h-4 w-4 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium">Sign In</span>
    </button>
  );
}