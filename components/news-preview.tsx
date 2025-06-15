"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, Shield, Bug } from "lucide-react"

export function NewsPreview() {
  const news = [
    {
      title: "Kritik Zero-Day Açığı: Apache Struts'ta RCE Zafiyeti Keşfedildi",
      summary:
        "Apache Struts framework'ünde uzaktan kod çalıştırma imkanı sağlayan kritik bir güvenlik açığı tespit edildi.",
      category: "Zero-Day",
      time: "2 saat önce",
      severity: "critical",
      icon: Bug,
      color: "text-red-400",
    },
    {
      title: "Yeni Ransomware Grubu: LockBit 4.0 Saldırıları Artışta",
      summary:
        "LockBit ransomware grubunun yeni versiyonu ile gerçekleştirdiği saldırılar küresel çapta artış gösteriyor.",
      category: "Malware",
      time: "4 saat önce",
      severity: "high",
      icon: AlertTriangle,
      color: "text-orange-400",
    },
    {
      title: "Microsoft Patch Tuesday: 89 Güvenlik Açığı Kapatıldı",
      summary: "Microsoft'un aylık güvenlik güncellemesi ile 89 güvenlik açığı kapatıldı, 12 tanesi kritik seviyede.",
      category: "Patch",
      time: "6 saat önce",
      severity: "medium",
      icon: Shield,
      color: "text-blue-400",
    },
    {
      title: "CISA Uyarısı: Fortinet FortiOS'ta Aktif Saldırılar",
      summary: "CISA, Fortinet FortiOS güvenlik açığının aktif olarak istismar edildiği konusunda uyarı yayınladı.",
      category: "Alert",
      time: "8 saat önce",
      severity: "high",
      icon: AlertTriangle,
      color: "text-yellow-400",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500/50 bg-red-500/10"
      case "high":
        return "border-orange-500/50 bg-orange-500/10"
      case "medium":
        return "border-blue-500/50 bg-blue-500/10"
      default:
        return "border-gray-500/50 bg-gray-500/10"
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Canlı Siber Güvenlik Haberleri"}
          </h2>
          <p className="text-gray-400 text-lg font-mono mb-8">Son dakika güvenlik açıkları ve tehdit istihbaratı</p>
          <Button
            onClick={() => (window.location.href = "/news")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
          >
            Tüm Haberleri Görüntüle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <Card
              key={index}
              className={`${getSeverityColor(item.severity)} border backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 group`}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <item.icon
                    className={`w-6 h-6 ${item.color} mt-1 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-mono ${item.color} bg-black/50`}>
                        {item.category}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                    <CardTitle className="text-white font-mono text-lg leading-tight">{item.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.summary}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                >
                  Devamını Oku
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
