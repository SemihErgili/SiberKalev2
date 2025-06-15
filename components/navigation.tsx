"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Terminal, Menu, X, Shield, Bot, Newspaper, Trophy, Search, User, LogIn, LogOut } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"


export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const navItems = [
    { name: "Araçlar", href: "/tools", icon: Shield },
    { name: "AI Rehber", href: "/ai-guide", icon: Bot },
    { name: "Haberler", href: "/news", icon: Newspaper },
    { name: "OSINT", href: "/osint", icon: Search },
    { name: "Test Sistemi", href: "/testsistemi", icon: Terminal },
  ]

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
          >
            <Terminal className="w-8 h-8 text-green-400" />
            <span className="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              KODLUYO SİBER
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => (window.location.href = item.href)}
                className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors duration-200 font-mono bg-transparent border-none cursor-pointer"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button
                  onClick={() => (window.location.href = "/dashboard")}
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.username}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-mono"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
                </Button>
              </>
            ) : (
              // Önce import satırını kontrol et veya güncelle:
// import { UserRoundPlus, LogIn /* ...diğer ikonların... */ } from "lucide-react";

<>
  {/* Giriş Yap Butonu */}
  <Button
    onClick={() => (window.location.href = "/auth/login")}
    variant="outline"
    className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono text-sm px-4 py-2"
  >
    <LogIn className="w-4 h-4 mr-2" />
    Giriş Yap
  </Button>

<Button
  onClick={() => (window.location.href = "/auth/register")}
  variant="default"
  className="bg-gradient-to-r from-green-400 to-cyan-400 text-black hover:from-green-500 hover:to-cyan-500 font-mono font-semibold text-sm px-4 py-2"
>
  <User className="w-4 h-4 mr-2" /> {/* User ikonu kullanıldı */}
  Kayıt Ol
</Button>
</>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-green-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 border-t border-green-500/30">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => (window.location.href = item.href)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-green-400 transition-colors duration-200 font-mono w-full text-left bg-transparent border-none cursor-pointer"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                {user ? (
                  <>
                    <Button
                      className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono"
                      variant="outline"
                      onClick={() => (window.location.href = "/dashboard")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {user.username}
                    </Button>
                    <Button
                      className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-mono"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-mono"
                      variant="outline"
                      onClick={() => (window.location.href = "/auth/login")}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Giriş Yap
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold"
                      onClick={() => (window.location.href = "/auth/register")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Kayıt Ol
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
