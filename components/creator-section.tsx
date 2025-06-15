"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Code, Shield, Zap, MessageCircle, Users, Globe } from "lucide-react"
import Image from "next/image"

export function CreatorSection() {
  const [displayText, setDisplayText] = useState("")
  const [displayTopluyoText, setDisplayTopluyoText] = useState("")
  const fullText = "Challenger"
  const fullTopluyoText = "Topluyo"
  const typingSpeed = 150
  const cursorRef = useRef<HTMLSpanElement>(null)
  const topluyoCursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)

        // Start typing Topluyo after Challenger is complete
        setTimeout(() => {
          let j = 0
          const topluyoTimer = setInterval(() => {
            if (j <= fullTopluyoText.length) {
              setDisplayTopluyoText(fullTopluyoText.slice(0, j))
              j++
            } else {
              clearInterval(topluyoTimer)

              // Add blinking cursor effect after typing is complete
              if (topluyoCursorRef.current) {
                topluyoCursorRef.current.classList.add("cursor-blink")
              }
            }
          }, typingSpeed)
        }, 1000)

        // Add blinking cursor effect after typing is complete
        if (cursorRef.current) {
          cursorRef.current.classList.add("cursor-blink")
        }
      }
    }, typingSpeed)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900/30 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Kodlayan Ve Sahibi"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-8"></div>
        </div>

        {/* Challenger Card */}
        <Card className="bg-black/60 border-green-500/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-500 group mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-green-500/50 group-hover:border-green-400 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20 animate-pulse"></div>
                  <Image
                    src="/images/challenger.gif"
                    alt="Challenger - Platform Sahibi"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover relative z-10"
                    unoptimized
                  />
                </div>

                {/* Glowing Ring Effect */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-cyan-400/30 animate-spin-slow"></div>
                <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 rounded-full border border-green-400/20 animate-pulse"></div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-terminal font-bold italic mb-2 typewriter-container">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-400">
                      {displayText}
                    </span>
                    <span ref={cursorRef} className="text-green-400 font-terminal">
                      |
                    </span>
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50 font-mono">
                      <Terminal className="w-3 h-3 mr-1" />
                      Ethical Hacker
                    </Badge>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 font-mono">
                      <Code className="w-3 h-3 mr-1" />
                      Full Stack Developer
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 font-mono">
                      <Shield className="w-3 h-3 mr-1" />
                      Cybersecurity Expert
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 font-mono text-sm md:text-base">
                  {"> Siber güvenlik dünyasında 5+ yıllık deneyim"}
                  <br />
                  {"> Penetration testing ve ethical hacking uzmanı"}
                  <br />
                  {"> Açık kaynak siber güvenlik araçları geliştirici"}
                  <br />
                  {"> CTF yarışmalarında aktif katılımcı"}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400 font-mono">500+</div>
                    <div className="text-xs text-gray-400 font-mono">Araç Keşfi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-cyan-400 font-mono">50+</div>
                    <div className="text-xs text-gray-400 font-mono">CTF Çözümü</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400 font-mono">1000+</div>
                    <div className="text-xs text-gray-400 font-mono">Kod Satırı</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-400 font-mono">24/7</div>
                    <div className="text-xs text-gray-400 font-mono">Platform Desteği</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <blockquote className="text-center">
                <p className="text-gray-300 italic font-mono text-sm md:text-base mb-2">
                  "Siber güvenlik sadece bir meslek değil, dijital dünyayı koruma misyonudur."
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">- Challenger</span>
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
              </blockquote>
            </div>
          </CardContent>
        </Card>

        {/* Topluyo Card */}
        <Card className="bg-black/60 border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 group">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Topluyo Logo */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500/50 group-hover:border-purple-400 transition-all duration-500 relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>
                  <Image
                    src="/images/kodluyo-logo.svg"
                    alt="Topluyo - Yerli Discord Alternatifi"
                    width={100}
                    height={100}
                    className="relative z-10 w-24 h-24 md:w-28 md:h-28 object-contain"
                  />
                </div>

                {/* Glowing Ring Effect */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-purple-400/30 animate-spin-slow"></div>
                <div className="absolute inset-2 w-28 h-28 md:w-36 md:h-36 rounded-full border border-purple-400/20 animate-pulse"></div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-terminal font-bold italic mb-2 typewriter-container">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                      {displayTopluyoText}
                    </span>
                    <span ref={topluyoCursorRef} className="text-purple-400 font-terminal">
                      |
                    </span>
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 font-mono">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Yerli Discord
                    </Badge>
                    <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50 font-mono">
                      <Code className="w-3 h-3 mr-1" />
                      Açık Kaynak
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 font-mono">
                      <Globe className="w-3 h-3 mr-1" />
                      Yerli Üretici
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 font-mono text-sm md:text-base">
                  {"> Türkiye'nin yerli Discord alternatifi"}
                  <br />
                  {"> Açık kaynak kodlu topluluk platformu"}
                  <br />
                  {"> Gizlilik odaklı ve güvenli iletişim"}
                  <br />
                  {"> Yerli ve milli teknoloji ürünü"}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400 font-mono">10K+</div>
                    <div className="text-xs text-gray-400 font-mono">Aktif Kullanıcı</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-pink-400 font-mono">500+</div>
                    <div className="text-xs text-gray-400 font-mono">Topluluk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400 font-mono">100%</div>
                    <div className="text-xs text-gray-400 font-mono">Açık Kaynak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400 font-mono">🇹🇷</div>
                    <div className="text-xs text-gray-400 font-mono">Yerli Üretim</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <blockquote className="text-center">
                <p className="text-gray-300 italic font-mono text-sm md:text-base mb-2">
                  "Yerli teknoloji ile güvenli ve özgür iletişim platformu."
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-mono text-sm">- Hasan Delibaş</span>
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
