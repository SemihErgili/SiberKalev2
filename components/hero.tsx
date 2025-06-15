"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Terminal, Shield, Zap } from "lucide-react"

export function Hero() {
  const [text, setText] = useState("")
  const fullText = "KODLUYO SİBER > Türkiye'nin Siber Kalesi"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Terminal className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-400">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-mono">
            {"> Ethical Hacking • Penetration Testing • OSINT • CTF Challenges"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold py-3 px-8 text-lg border-0"
          >
            <Shield className="w-5 h-5 mr-2" />
            Platformu Keşfet
          </Button>
          <Button
            onClick={() => (window.location.href = "/ai-guide")}
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 text-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            AI Tool Rehberi
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border border-green-500/30 rounded-lg p-4 bg-black/50">
            <div className="text-2xl font-bold text-green-400">500+</div>
            <div className="text-sm text-gray-400">Ücretsiz Araç</div>
          </div>
          <div className="border border-cyan-500/30 rounded-lg p-4 bg-black/50">
            <div className="text-2xl font-bold text-cyan-400">50+</div>
            <div className="text-sm text-gray-400">CTF Challenge</div>
          </div>
          <div className="border border-purple-500/30 rounded-lg p-4 bg-black/50">
            <div className="text-2xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-gray-400">Güvenlik Haberleri</div>
          </div>
          <div className="border border-red-500/30 rounded-lg p-4 bg-black/50">
            <div className="text-2xl font-bold text-red-400">AI</div>
            <div className="text-sm text-gray-400">Destekli Rehber</div>
          </div>
        </div>
      </div>
    </div>
  )
}
