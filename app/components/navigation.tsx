// components/Navigation.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Menu, X, BarChart3 } from "lucide-react";
import UserButton from "@/app/components/userButton";
import { useState, useEffect } from "react";
import { FaChessBoard } from "react-icons/fa";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación incorrecta en SSR
  useEffect(() => {
    const changeSetMounted = () => {
      setMounted(true);
    }
    changeSetMounted()
  }, []);

  // Cerrar menú móvil al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { href: "/", icon: Home, label: "Home", exact: true },
    { href: "/free-practice", icon: FaChessBoard, label: "Practice", exact: false },
    { href: "/search-openings", icon: Search, label: "Search Openings", exact: false },
    { href: "/dashboard", icon: BarChart3, label: "Dashboard", exact: false },
  ];

  // Función para verificar si un enlace está activo
  const isActive = (href: string, exact: boolean) => {
    if (!mounted) return false;
    
    if (exact) {
      return pathname === href;
    }
    
    // Para rutas no exactas, verificar si la ruta comienza con el href
    return pathname.startsWith(href);
  };

  // Estilos para estados activos/inactivos
  const getLinkStyles = (isActive: boolean) => 
    isActive 
      ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 shadow-lg shadow-yellow-400/10"
      : "text-gray-300 hover:text-yellow-400 hover:bg-slate-700/30";

  const getIconStyles = (isActive: boolean) =>
    isActive
      ? "scale-110 text-yellow-400"
      : "group-hover:scale-110 transition-transform";

  return (
    <>
      <nav className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0">
              <div className="relative">
                <div className="h-8 w-8 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-yellow-300 transition-colors">
                  <span className="text-slate-900 font-bold text-lg">♔</span>
                </div>
                <div className="absolute inset-0 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ChessMaster
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 flex-1 justify-center">
              {menuItems.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 group ${getLinkStyles(active)}`}
                  >
                    <item.icon className={`h-4 w-4 ${getIconStyles(active)}`} />
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {/* Desktop User Button */}
              <div className="hidden md:block">
                <UserButton />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-yellow-500/50 transition-colors mobile-menu-button"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && mounted && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 shadow-2xl mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-2">
              {menuItems.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 group ${getLinkStyles(active)}`}
                  >
                    <item.icon className={`h-5 w-5 ${getIconStyles(active)}`} />
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}