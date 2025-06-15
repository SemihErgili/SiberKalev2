"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Star } from "lucide-react"

export function ToolsPreview() {
  const tools = [
    {
      name: "Nmap",
      category: "Network Scanning",
      description: "Ağ keşfi ve güvenlik denetimi için güçlü port tarayıcı",
      rating: 5,
      downloads: "10M+",
      color: "text-green-400",
    },
    {
      name: "Wireshark",
      category: "Network Analysis",
      description: "Ağ protokol analizi için dünya standart aracı",
      rating: 5,
      downloads: "5M+",
      color: "text-cyan-400",
    },
    {
      name: "Metasploit",
      category: "Penetration Testing",
      description: "Kapsamlı penetration testing framework",
      rating: 5,
      downloads: "2M+",
      color: "text-red-400",
    },
    {
      name: "Burp Suite",
      category: "Web Security",
      description: "Web uygulaması güvenlik testi için profesyonel araç",
      rating: 5,
      downloads: "1M+",
      color: "text-purple-400",
    },
    {
      name: "John the Ripper",
      category: "Password Cracking",
      description: "Hızlı şifre kırma ve güvenlik testi aracı",
      rating: 4,
      downloads: "800K+",
      color: "text-yellow-400",
    },
    {
      name: "OWASP ZAP",
      category: "Web Security",
      description: "Açık kaynak web uygulaması güvenlik tarayıcısı",
      rating: 4,
      downloads: "600K+",
      color: "text-pink-400",
    },
  ]

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Popüler Siber Güvenlik Araçları"}
          </h2>
          <p className="text-gray-400 text-lg font-mono mb-8">En çok kullanılan ücretsiz araçları keşfedin</p>
          <Button
            onClick={() => (window.location.href = "/tools")}
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold"
          >
            Tüm Araçları Görüntüle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`${tool.color} font-mono text-lg mb-1`}>{tool.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{tool.category}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < tool.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{tool.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {tool.downloads}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300">
                    Detaylar
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
