"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Terminal, Lock, User, Eye, EyeOff } from "lucide-react"
import { setCurrentUser } from "@/lib/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleLogin = () => {
    // Demo kullanıcı oluştur
    const demoUser = {
      id: "demo_user_123",
      username: formData.username || "demo_hacker",
      email: "demo@kodluyo.com",
      level: "Elite Hacker",
      points: 2450,
      rank: 1337,
      streak: 42,
      successRate: 89,
      completedLessons: [1, 2, 3], // İlk 3 ders tamamlanmış
      testScores: { 1: 95, 2: 87, 3: 92 },
      joinDate: new Date().toISOString(),
    }

    setCurrentUser(demoUser)
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Terminal className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Giriş Yap"}
          </h1>
          <p className="text-gray-400 text-lg font-mono">Siber güvenlik yolculuğunuza devam edin</p>
        </div>

        <Card className="bg-gray-900/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 font-mono flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Hesap Girişi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300 font-mono">
                Kullanıcı Adı veya E-posta
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  className="pl-10 bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="hacker_username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 font-mono">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-400 font-mono">
                <input type="checkbox" className="rounded border-gray-600" />
                <span>Beni hatırla</span>
              </label>
              <button className="text-cyan-400 hover:text-cyan-300 font-mono">Şifremi unuttum</button>
            </div>

            <Button onClick={handleLogin} className="w-full bg-green-500 hover:bg-green-600 text-black font-mono">
              <Terminal className="w-4 h-4 mr-2" />
              Sisteme Giriş Yap
            </Button>

            <div className="text-center">
              <span className="text-gray-400 font-mono text-sm">Hesabınız yok mu? </span>
              <button
                onClick={() => (window.location.href = "/auth/register")}
                className="text-cyan-400 hover:text-cyan-300 font-mono text-sm"
              >
                Kayıt Ol
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-gray-900/30 border-gray-700/50 mt-6">
          <CardContent className="p-4">
            <h4 className="text-yellow-400 font-mono text-sm mb-2">Demo Hesapları:</h4>
            <div className="space-y-1 text-xs font-mono text-gray-400">
              <div>Herhangi bir kullanıcı adı ve şifre ile giriş yapabilirsiniz</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}