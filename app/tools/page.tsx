"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Star, Search } from "lucide-react"

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    "all",
    "Network Scanning",
    "Web Security",
    "Password Cracking",
    "Forensics",
    "OSINT",
    "Penetration Testing",
    "Cryptography",
  ]

  const tools = [
    {
      name: "Nmap",
      category: "Network Scanning",
      description:
        "Ağ keşfi ve güvenlik denetimi için güçlü port tarayıcı. Açık portları, servisleri ve işletim sistemlerini tespit eder.",
      rating: 5,
      downloads: "10M+",
      color: "text-green-400",
      website: "https://nmap.org",
      github: "https://github.com/nmap/nmap",
      features: ["Port Scanning", "OS Detection", "Service Detection", "Vulnerability Scripts"],
    },
    {
      name: "Wireshark",
      category: "Network Analysis",
      description: "Ağ protokol analizi için dünya standart aracı. Ağ trafiğini yakalayıp analiz eder.",
      rating: 5,
      downloads: "5M+",
      color: "text-cyan-400",
      website: "https://wireshark.org",
      github: "https://github.com/wireshark/wireshark",
      features: ["Packet Capture", "Protocol Analysis", "Network Troubleshooting", "Deep Inspection"],
    },
    {
      name: "Metasploit",
      category: "Penetration Testing",
      description: "Kapsamlı penetration testing framework. Exploit geliştirme ve güvenlik testleri için.",
      rating: 5,
      downloads: "2M+",
      color: "text-red-400",
      website: "https://metasploit.com",
      github: "https://github.com/rapid7/metasploit-framework",
      features: ["Exploit Development", "Payload Generation", "Post-Exploitation", "Vulnerability Assessment"],
    },
    {
      name: "Burp Suite",
      category: "Web Security",
      description:
        "Web uygulaması güvenlik testi için profesyonel araç. SQL injection, XSS ve diğer web zafiyetlerini tespit eder.",
      rating: 5,
      downloads: "1M+",
      color: "text-purple-400",
      website: "https://portswigger.net/burp",
      github: null,
      features: ["Web Proxy", "Scanner", "Intruder", "Repeater"],
    },
    {
      name: "John the Ripper",
      category: "Password Cracking",
      description: "Hızlı şifre kırma ve güvenlik testi aracı. Çeşitli hash formatlarını destekler.",
      rating: 4,
      downloads: "800K+",
      color: "text-yellow-400",
      website: "https://www.openwall.com/john/",
      github: "https://github.com/openwall/john",
      features: ["Hash Cracking", "Dictionary Attacks", "Brute Force", "Custom Rules"],
    },
    {
      name: "OWASP ZAP",
      category: "Web Security",
      description: "Açık kaynak web uygulaması güvenlik tarayıcısı. Otomatik ve manuel güvenlik testleri.",
      rating: 4,
      downloads: "600K+",
      color: "text-pink-400",
      website: "https://zaproxy.org",
      github: "https://github.com/zaproxy/zaproxy",
      features: ["Automated Scanning", "Manual Testing", "API Testing", "Authentication Testing"],
    },
    {
      name: "Aircrack-ng",
      category: "Network Security",
      description: "WiFi ağ güvenliği test suite. WEP ve WPA/WPA2 şifre kırma araçları.",
      rating: 4,
      downloads: "500K+",
      color: "text-blue-400",
      website: "https://aircrack-ng.org",
      github: "https://github.com/aircrack-ng/aircrack-ng",
      features: ["WiFi Auditing", "WEP/WPA Cracking", "Packet Injection", "Network Monitoring"],
    },
    {
      name: "Hashcat",
      category: "Password Cracking",
      description: "Gelişmiş şifre kurtarma aracı. GPU hızlandırmalı hash kırma desteği.",
      rating: 5,
      downloads: "400K+",
      color: "text-orange-400",
      website: "https://hashcat.net/hashcat/",
      github: "https://github.com/hashcat/hashcat",
      features: ["GPU Acceleration", "Multiple Hash Types", "Rule-based Attacks", "Mask Attacks"],
    },
  ]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black text-green-400 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Siber Güvenlik Araçları"}
          </h1>
          <p className="text-gray-400 text-lg font-mono">
            Penetration testing, network analizi ve güvenlik denetimi için en iyi araçlar
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Araç ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`font-mono ${
                  selectedCategory === category
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "border-gray-600 text-gray-400 hover:bg-gray-800"
                }`}
              >
                {category === "all" ? "Tümü" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className={`${tool.color} font-mono text-xl mb-2`}>{tool.name}</CardTitle>
                    <Badge variant="outline" className="text-xs font-mono border-gray-600 text-gray-400">
                      {tool.category}
                    </Badge>
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

                <p className="text-gray-300 text-sm leading-relaxed mb-4">{tool.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-gray-400 text-xs font-mono mb-2 uppercase">Özellikler:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                    {tool.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        +{tool.features.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {tool.downloads}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300"
                    onClick={() => window.open(tool.website, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Website
                  </Button>
                  {tool.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:bg-gray-800"
                      onClick={() => window.open(tool.github, "_blank")}
                    >
                      GitHub
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-mono">Aradığınız kriterlere uygun araç bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}