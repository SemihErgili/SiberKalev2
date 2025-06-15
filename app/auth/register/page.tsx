"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Terminal, User, CheckCircle, Shield, BookOpen } from "lucide-react"
import { setCurrentUser } from "@/lib/auth"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = () => {
    // Yeni kullanıcı oluştur
    const newUser = {
      id: `user_${Date.now()}`,
      username: formData.username,
      email: formData.email,
      level: "Rookie",
      points: 0,
      rank: 9999,
      streak: 0,
      successRate: 0,
      completedLessons: [],
      testScores: {},
      joinDate: new Date().toISOString(),
    }

    setCurrentUser(newUser)
    setStep(3)
  }

  const progress = (step / 3) * 100

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Terminal className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Kodluyo Siber'e Katıl"}
          </h1>
          <p className="text-gray-400 text-lg font-mono">Siber güvenlik yolculuğunuza başlayın</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
            <span>İlerleme</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="bg-gray-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                <User className="w-5 h-5" />
                Temel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300 font-mono">
                  Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="hacker_username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-mono">
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="hacker@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 font-mono">
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 font-mono">
                  Şifre Tekrar
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white font-mono"
                  placeholder="••••••••"
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-mono"
                disabled={
                  !formData.username ||
                  !formData.email ||
                  !formData.password ||
                  formData.password !== formData.confirmPassword
                }
              >
                Devam Et
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Learning Path Info */}
        {step === 2 && (
          <Card className="bg-gray-900/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 font-mono flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Eğitim Programınız
              </CardTitle>
              <p className="text-gray-400 text-sm font-mono">
                Tüm yeni üyeler için özel hazırlanmış standart eğitim programı
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black/50 rounded-lg p-6">
                <h3 className="text-green-400 font-mono text-lg mb-4">🎯 Başlangıç Seviyesi Eğitim Yolu</h3>
                <p className="text-gray-300 font-mono text-sm mb-6">
                  Siber güvenlik dünyasına adım atmanız için gerekli tüm temel bilgileri sırasıyla öğreneceksiniz.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-mono text-sm">
                      1
                    </div>
                    <div>
                      <div className="text-white font-mono text-sm">Siber Güvenlik Temelleri</div>
                      <div className="text-gray-400 text-xs">Temel kavramlar ve terminoloji</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-mono text-sm">
                      2
                    </div>
                    <div>
                      <div className="text-white font-mono text-sm">Linux Terminal Temelleri</div>
                      <div className="text-gray-400 text-xs">Komut satırı kullanımı</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-mono text-sm">
                      3
                    </div>
                    <div>
                      <div className="text-white font-mono text-sm">Nmap - Network Keşif</div>
                      <div className="text-gray-400 text-xs">İlk siber güvenlik aracınız</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-mono text-sm">
                      +
                    </div>
                    <div>
                      <div className="text-white font-mono text-sm">7 Araç Daha...</div>
                      <div className="text-gray-400 text-xs">Wireshark, Burp Suite, Metasploit ve daha fazlası</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-mono mb-2">✨ Özellikler:</h4>
                <div className="space-y-1 text-sm font-mono text-gray-300">
                  <div>• Makale tabanlı öğrenme</div>
                  <div>• AI destekli güncel bilgiler</div>
                  <div>• Her ders sonunda test</div>
                  <div>• Adım adım ilerleyiş</div>
                  <div>• Sertifika sistemi</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                >
                  Geri
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-mono">
                  Hesabı Oluştur
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <Card className="bg-gray-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Hoş Geldiniz!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-4">
                <Shield className="w-16 h-16 mx-auto text-green-400" />
                <h2 className="text-2xl font-mono font-bold text-white">Hesabınız Başarıyla Oluşturuldu!</h2>
                <p className="text-gray-300 font-mono">
                  Seviyeniz: <span className="text-green-400">Rookie</span>
                </p>
                <p className="text-gray-400 font-mono text-sm">
                  Eğitim programınız hazır! Siber güvenlik yolculuğunuza "Siber Güvenlik Temelleri" dersi ile
                  başlayabilirsiniz.
                </p>
              </div>

              <div className="bg-black/50 rounded-lg p-4">
                <h4 className="text-cyan-400 font-mono mb-3">İlk Adımlarınız:</h4>
                <div className="space-y-2 text-sm font-mono text-left">
                  <div className="text-gray-300">✓ İlk dersinize başlayın</div>
                  <div className="text-gray-300">✓ AI destekli güncel bilgileri keşfedin</div>
                  <div className="text-gray-300">✓ Ders sonundaki testi geçin (%80+)</div>
                  <div className="text-gray-300">✓ Bir sonraki dersin kilidini açın</div>
                </div>
              </div>

              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-mono"
              >
                Eğitime Başla
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}