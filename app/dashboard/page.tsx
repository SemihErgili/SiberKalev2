"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Trophy, Target, BookOpen, Clock, Play, CheckCircle, Lock, Zap, Shield, Terminal } from "lucide-react"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/auth/login"
      return
    }
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto"></div>
          <p className="mt-4 text-gray-400 font-mono">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  const learningPath = [
    {
      id: 1,
      title: "Siber Güvenlik Temelleri",
      description: "Siber güvenlik dünyasına giriş ve temel kavramlar",
      duration: "45 dakika",
      difficulty: "Beginner",
      type: "article",
      topics: ["Siber Güvenlik Nedir?", "Temel Terminoloji", "Etik Hacking", "Yasal Çerçeve"],
    },
    {
      id: 2,
      title: "Linux Terminal Temelleri",
      description: "Siber güvenlik için gerekli Linux komutları",
      duration: "1 saat",
      difficulty: "Beginner",
      type: "interactive",
      topics: ["Temel Komutlar", "Dosya Sistemi", "İzinler", "Process Yönetimi"],
    },
    {
      id: 3,
      title: "Nmap - Network Keşif Aracı",
      description: "Ağ tarama ve keşif için en önemli araç",
      duration: "1.5 saat",
      difficulty: "Beginner",
      type: "hands-on",
      topics: ["Port Tarama", "Servis Tespiti", "OS Detection", "Script Engine"],
    },
    {
      id: 4,
      title: "Wireshark - Paket Analizi",
      description: "Ağ trafiğini yakalama ve analiz etme",
      duration: "2 saat",
      difficulty: "Beginner",
      type: "hands-on",
      topics: ["Paket Yakalama", "Filtreleme", "Protokol Analizi", "Güvenlik Analizi"],
    },
    {
      id: 5,
      title: "Burp Suite - Web Güvenlik Testi",
      description: "Web uygulaması güvenlik testleri için temel araç",
      duration: "2.5 saat",
      difficulty: "Intermediate",
      type: "hands-on",
      topics: ["Proxy Kullanımı", "Scanner", "Intruder", "Repeater"],
    },
    {
      id: 6,
      title: "Metasploit Framework",
      description: "Penetration testing için kapsamlı framework",
      duration: "3 saat",
      difficulty: "Intermediate",
      type: "hands-on",
      topics: ["Msfconsole", "Exploit Kullanımı", "Payload Oluşturma", "Post-Exploitation"],
    },
    {
      id: 7,
      title: "OWASP ZAP - Web Güvenlik Tarayıcısı",
      description: "Açık kaynak web uygulaması güvenlik tarayıcısı",
      duration: "1.5 saat",
      difficulty: "Intermediate",
      type: "hands-on",
      topics: ["Otomatik Tarama", "Manual Test", "API Testi", "Rapor Oluşturma"],
    },
    {
      id: 8,
      title: "John the Ripper - Şifre Kırma",
      description: "Şifre güvenliği testi ve kırma teknikleri",
      duration: "2 saat",
      difficulty: "Intermediate",
      type: "hands-on",
      topics: ["Hash Kırma", "Dictionary Attack", "Brute Force", "Custom Rules"],
    },
    {
      id: 9,
      title: "Aircrack-ng - WiFi Güvenlik Testi",
      description: "Kablosuz ağ güvenliği test araçları",
      duration: "2.5 saat",
      difficulty: "Advanced",
      type: "hands-on",
      topics: ["WiFi Monitoring", "WEP/WPA Kırma", "Packet Injection", "Evil Twin"],
    },
    {
      id: 10,
      title: "Nikto - Web Server Tarayıcısı",
      description: "Web server güvenlik açığı tarayıcısı",
      duration: "1 saat",
      difficulty: "Beginner",
      type: "hands-on",
      topics: ["Server Tarama", "Güvenlik Açığı Tespiti", "Plugin Kullanımı", "Rapor Analizi"],
    },
  ]

  // Ders durumunu belirle
  const getLessonStatus = (lessonId: number) => {
    if (!user) return "locked"

    if (user.completedLessons.includes(lessonId)) {
      return "completed"
    }

    // İlk ders her zaman açık
    if (lessonId === 1) {
      return "available"
    }

    // Önceki ders tamamlanmışsa açık
    if (user.completedLessons.includes(lessonId - 1)) {
      return "available"
    }

    return "locked"
  }

  const recentAchievements = [
    { name: "İlk Adım", description: "İlk eğitimi tamamladınız", icon: "🎯" },
    { name: "Test Ustası", description: "İlk testinizi geçtiniz", icon: "📝" },
    { name: "Hızlı Öğrenci", description: "3 günde 3 ders tamamladınız", icon: "⚡" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "available":
        return <BookOpen className="w-5 h-5 text-cyan-400" />
      case "locked":
        return <Lock className="w-5 h-5 text-gray-500" />
      default:
        return <BookOpen className="w-5 h-5 text-cyan-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "Advanced":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "Expert":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Dashboard"}
          </h1>
          <p className="text-gray-400 text-lg font-mono">Hoş geldiniz, {user.username}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-gray-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Terminal className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-xl font-mono font-bold text-white">{user.username}</h3>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 font-mono">
                    {user.level}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-cyan-400">{user.points}</div>
                    <div className="text-xs text-gray-400">Toplam Puan</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">#{user.rank}</div>
                    <div className="text-xs text-gray-400">Sıralama</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">{user.streak}</div>
                    <div className="text-xs text-gray-400">Gün Serisi</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-400">{user.successRate}%</div>
                    <div className="text-xs text-gray-400">Başarı Oranı</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-gray-900/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 font-mono flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Son Başarılar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-black/30 rounded">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="text-white font-mono text-sm">{achievement.name}</div>
                      <div className="text-gray-400 text-xs">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400 font-mono flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Hızlı Erişim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-mono justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Yeni Challenge Başlat
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-mono justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Eğitime Devam Et
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-mono justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Araçları Keşfet
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Learning Path */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Öğrenme Yolunuz
                </CardTitle>
                <p className="text-gray-400 text-sm font-mono">
                  İlerleme: {user.completedLessons.length}/{learningPath.length} ders tamamlandı
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {learningPath.map((lesson) => {
                  const status = getLessonStatus(lesson.id)
                  const testScore = user.testScores[lesson.id]

                  return (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        status === "completed"
                          ? "bg-green-500/10 border-green-500/30"
                          : status === "available"
                            ? "bg-cyan-500/10 border-cyan-500/30"
                            : "bg-gray-800/50 border-gray-700"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(status)}
                          <div>
                            <h3 className="text-white font-mono font-semibold">{lesson.title}</h3>
                            <p className="text-gray-400 text-sm">{lesson.description}</p>
                            {testScore && (
                              <p className="text-xs text-cyan-400 font-mono mt-1">Test Puanı: {testScore}%</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getDifficultyColor(lesson.difficulty)}>{lesson.difficulty}</Badge>
                          <div className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {status === "completed" ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-mono">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Tamamlandı
                          </Button>
                        ) : status === "available" ? (
                          <Button
                            size="sm"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono"
                            onClick={() => (window.location.href = `/learn/${lesson.id}`)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Başla
                          </Button>
                        ) : (
                          <Button size="sm" disabled className="bg-gray-700 text-gray-400 font-mono">
                            <Lock className="w-4 h-4 mr-1" />
                            Kilitli
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                        >
                          Detaylar
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
