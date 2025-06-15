"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, ArrowLeft, ArrowRight, Bot, Terminal, Play, Trophy, Video } from "lucide-react"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"

export default function LearnPage({ params }: { params: { id: string } }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [aiContent, setAiContent] = useState("")
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/auth/login"
      return
    }
    setUser(getCurrentUser())
  }, [])

  const lessonData = {
    1: {
      title: "Siber Güvenlik Temelleri",
      description: "Siber güvenlik dünyasına giriş ve temel kavramlar",
      duration: "45 dakika",
      difficulty: "Beginner",
      videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA", // Siber güvenlik temelleri
      sections: [
        {
          title: "Siber Güvenlik Nedir?",
          content: `# Siber Güvenlik Nedir?

Siber güvenlik, dijital sistemleri, ağları ve verileri kötü amaçlı saldırılardan koruma sanatı ve bilimidir. Bu alan, sürekli gelişen tehditlerle mücadele etmek için çeşitli teknolojiler, süreçler ve uygulamaları kapsar.

## Temel Bileşenler

### 1. Gizlilik (Confidentiality)
- Bilgilerin yalnızca yetkili kişiler tarafından erişilebilir olması
- Şifreleme teknikleri ile sağlanır
- Örnek: Bankacılık bilgilerinin korunması

### 2. Bütünlük (Integrity)
- Verilerin değiştirilmemiş ve doğru olduğunun garantisi
- Hash fonksiyonları ve dijital imzalar kullanılır
- Örnek: Yazılım güncellemelerinin orijinalliği

### 3. Erişilebilirlik (Availability)
- Sistemlerin ihtiyaç duyulduğunda kullanılabilir olması
- DDoS saldırılarına karşı koruma
- Örnek: Web sitelerinin 7/24 erişilebilir olması

## Neden Önemli?

- **Finansal Kayıplar**: Siber saldırılar milyarlarca dolar zarara neden oluyor
- **Kişisel Gizlilik**: Kişisel verilerimizin korunması kritik
- **Ulusal Güvenlik**: Kritik altyapıların korunması
- **İş Sürekliliği**: Şirketlerin operasyonlarını sürdürebilmesi`,
          aiPrompt: "Siber güvenliğin günümüzdeki önemi ve son gelişmeler hakkında güncel bilgi ver",
        },
        {
          title: "Temel Terminoloji",
          content: `# Siber Güvenlik Terminolojisi

## Temel Kavramlar

### Threat (Tehdit)
Sisteme zarar verebilecek potansiyel tehlike. Örnek: Malware, hacker saldırıları.

### Vulnerability (Zafiyet)
Sistemdeki güvenlik açığı. Örnek: Güncellenmeyen yazılımlar, zayıf şifreler.

### Risk (Risk)
Tehdidin zafiyeti istismar etme olasılığı ve potansiyel etkisi.

### Attack Vector (Saldırı Vektörü)
Saldırganın sisteme erişim sağladığı yol. Örnek: Email, USB, web uygulaması.

## Saldırı Türleri

### Malware
- **Virus**: Kendini kopyalayan zararlı kod
- **Trojan**: Meşru yazılım gibi görünen zararlı program
- **Ransomware**: Dosyaları şifreleyen ve fidye isteyen malware
- **Spyware**: Gizlice bilgi toplayan yazılım

### Social Engineering
- **Phishing**: Sahte e-postalarla bilgi çalma
- **Pretexting**: Sahte kimlik kullanarak bilgi alma
- **Baiting**: Cazip teklif ile tuzak kurma

### Network Attacks
- **DDoS**: Sistemi aşırı yükleyerek çökertme
- **Man-in-the-Middle**: İletişimi dinleme/değiştirme
- **SQL Injection**: Veritabanı saldırıları`,
          aiPrompt: "2024 yılında en yaygın siber saldırı türleri ve yeni ortaya çıkan tehditler",
        },
        {
          title: "Etik Hacking",
          content: `# Etik Hacking (Ethical Hacking)

## Tanım
Etik hacking, sistemlerin güvenlik açıklarını bulmak ve düzeltmek amacıyla yapılan yasal ve izinli güvenlik testleridir.

## Etik Hacker Türleri

### White Hat Hackers
- **Amaç**: Güvenlik açıklarını bulmak ve düzeltmek
- **Yöntem**: Yasal izinlerle test yapma
- **Örnek**: Penetration tester, güvenlik uzmanı

### Black Hat Hackers
- **Amaç**: Kötü niyetli amaçlar (para, zarar verme)
- **Yöntem**: İzinsiz ve yasadışı
- **Sonuç**: Cezai yaptırımlar

### Gray Hat Hackers
- **Amaç**: Karışık motivasyonlar
- **Yöntem**: Bazen izinli, bazen izinsiz
- **Risk**: Yasal sorunlar yaşayabilir

## Etik Hacking Süreci

### 1. Reconnaissance (Keşif)
- Hedef hakkında bilgi toplama
- Pasif ve aktif keşif teknikleri
- OSINT (Open Source Intelligence) kullanımı

### 2. Scanning (Tarama)
- Port tarama (Nmap)
- Servis tespiti
- Zafiyet tarama

### 3. Gaining Access (Erişim Sağlama)
- Zafiyetleri istismar etme
- Exploit kullanımı
- Sistem içine sızma

### 4. Maintaining Access (Erişimi Sürdürme)
- Backdoor kurma
- Privilege escalation
- Persistence sağlama

### 5. Covering Tracks (İz Silme)
- Log temizleme
- Kanıt yok etme
- Tespit edilmemeye çalışma

## Yasal Çerçeve
- **Yazılı izin** mutlaka alınmalı
- **Kapsam** net olarak belirlenmeli
- **Raporlama** detaylı yapılmalı
- **Gizlilik** anlaşmaları imzalanmalı`,
          aiPrompt: "Etik hacking alanında kariyer fırsatları ve gerekli sertifikalar",
        },
        {
          title: "Yasal Çerçeve",
          content: `# Siber Güvenlik ve Yasal Çerçeve

## Türkiye'de Yasal Durum

### 5651 Sayılı Kanun
- İnternet ortamında yapılan yayınların düzenlenmesi
- İçerik sağlayıcıların sorumlulukları
- Erişim engelleme prosedürleri

### Türk Ceza Kanunu (TCK)
- **Madde 243**: Bilişim sistemine girme
- **Madde 244**: Sistemi engelleme, bozma, verileri yok etme
- **Madde 245**: Banka veya kredi kartlarının kötüye kullanılması

### Kişisel Verilerin Korunması Kanunu (KVKK)
- Kişisel verilerin işlenmesi
- Veri güvenliği önlemleri
- İhlal bildirimi yükümlülükleri

## Uluslararası Düzenlemeler

### GDPR (General Data Protection Regulation)
- AB'de kişisel veri korunması
- Türk şirketleri de etkileniyor
- Yüksek cezai yaptırımlar

### ISO 27001
- Bilgi güvenliği yönetim sistemi standardı
- Uluslararası kabul görmüş
- Sertifikasyon süreci

## Etik Kurallar

### Responsible Disclosure
- Güvenlik açığını sorumlu şekilde bildirme
- Önce şirkete bildirme
- Düzeltme süresi tanıma

### Bug Bounty Programları
- Şirketlerin açık ettiği ödül programları
- Yasal koruma altında test
- Finansal ödüller

## Cezai Yaptırımlar

### Türkiye'de Cezalar
- **Hapis cezası**: 6 ay - 3 yıl
- **Para cezası**: Değişken miktarlar
- **Tazminat**: Mağdur şirketlere

### Uluslararası Cezalar
- **ABD**: Yıllarca hapis
- **AB**: Milyonlarca euro ceza
- **Extradition**: Suçlu iadesi

## Güvenli Test Ortamları

### Kendi Lab'ınız
- Sanal makineler kullanın
- İzole ağ ortamları
- Yasal sorun yaşamayın

### Yasal Test Platformları
- HackTheBox
- TryHackMe
- VulnHub
- DVWA (Damn Vulnerable Web Application)`,
          aiPrompt: "2024 yılında siber güvenlik alanında yaşanan yasal gelişmeler ve yeni düzenlemeler",
        },
      ],
    },
    2: {
      title: "Linux Terminal Temelleri",
      description: "Siber güvenlik için gerekli Linux komutları",
      duration: "1 saat",
      difficulty: "Beginner",
      videoUrl: "https://www.youtube.com/embed/YHFzr-akOas", // Linux terminal basics
      sections: [
        {
          title: "Linux'a Giriş",
          content: `# Linux Terminal Temelleri

Linux, siber güvenlik uzmanları için vazgeçilmez bir işletim sistemidir. Terminal kullanımı, penetration testing ve sistem yönetimi için kritik öneme sahiptir.

## Neden Linux?

### Açık Kaynak
- Kaynak kodu incelenebilir
- Güvenlik açıkları hızla tespit edilir
- Topluluk desteği güçlü

### Güvenlik Araçları
- Çoğu siber güvenlik aracı Linux için geliştirilir
- Kali Linux gibi özel dağıtımlar
- Terminal tabanlı güçlü araçlar

### Esneklik
- Sistem seviyesinde kontrol
- Özelleştirilebilir ortam
- Otomasyon imkanları`,
          aiPrompt: "Linux'un siber güvenlik alanındaki önemi ve yeni gelişmeler",
        },
        {
          title: "Temel Komutlar",
          content: `# Temel Linux Komutları

## Dosya ve Dizin İşlemleri

### ls - Listeleme
\`\`\`bash
ls          # Mevcut dizini listele
ls -la      # Detaylı liste (gizli dosyalar dahil)
ls -lh      # İnsan okunabilir boyutlar
\`\`\`

### cd - Dizin Değiştirme
\`\`\`bash
cd /home    # Belirtilen dizine git
cd ..       # Üst dizine çık
cd ~        # Ana dizine git
cd -        # Önceki dizine dön
\`\`\`

### pwd - Mevcut Dizin
\`\`\`bash
pwd         # Bulunduğun dizini göster
\`\`\`

### mkdir - Dizin Oluşturma
\`\`\`bash
mkdir test          # test dizini oluştur
mkdir -p a/b/c      # İç içe dizinler oluştur
\`\`\`

### rm - Silme
\`\`\`bash
rm dosya.txt        # Dosya sil
rm -r dizin         # Dizin ve içeriğini sil
rm -rf dizin        # Zorla sil (dikkatli ol!)
\`\`\``,
          aiPrompt: "Linux komut satırında en çok kullanılan komutlar ve ipuçları",
        },
      ],
    },
    3: {
      title: "Nmap - Network Keşif Aracı",
      description: "Ağ tarama ve keşif için en önemli araç",
      duration: "1.5 saat",
      difficulty: "Beginner",
      videoUrl: "https://www.youtube.com/embed/4t4kBkMsDbQ", // Nmap tutorial
      sections: [
        {
          title: "Nmap'e Giriş",
          content: `# Nmap - Network Mapper

Nmap, ağ keşfi ve güvenlik denetimi için kullanılan güçlü bir araçtır. Penetration testing'in vazgeçilmez aracıdır.

## Nmap Nedir?

### Network Discovery
- Ağdaki cihazları keşfetme
- Açık portları tespit etme
- Servisleri belirleme

### Security Auditing
- Güvenlik açıklarını tespit etme
- Sistem bilgilerini toplama
- Ağ haritası çıkarma

## Temel Kullanım

### Basit Tarama
\`\`\`bash
nmap 192.168.1.1        # Tek IP tarama
nmap 192.168.1.0/24     # Ağ tarama
nmap google.com         # Domain tarama
\`\`\`

### Port Tarama
\`\`\`bash
nmap -p 80 192.168.1.1      # Belirli port
nmap -p 1-1000 192.168.1.1  # Port aralığı
nmap -p- 192.168.1.1        # Tüm portlar
\`\`\``,
          aiPrompt: "Nmap'in yeni özellikleri ve gelişmiş kullanım teknikleri",
        },
      ],
    },
  }

  const currentLesson = lessonData[Number.parseInt(params.id) as keyof typeof lessonData]

  useEffect(() => {
    if (currentLesson) {
      const progressPercentage = ((currentSection + 1) / currentLesson.sections.length) * 100
      setProgress(progressPercentage)
    }
  }, [currentSection, currentLesson])

  const loadAIContent = async () => {
    setIsLoadingAI(true)

    // Simulate AI content loading
    setTimeout(() => {
      const aiResponses = [
        "🤖 **AI Güncel Bilgi**: 2024 yılında siber güvenlik sektörü %15 büyüme gösterdi. Özellikle AI destekli saldırılar ve savunma sistemleri öne çıkıyor.",
        "🤖 **AI Analiz**: Son araştırmalara göre, şirketlerin %78'i siber güvenlik uzmanı eksikliği yaşıyor. Bu alan için kariyer fırsatları oldukça yüksek.",
        "🤖 **AI Önerisi**: Bu konuyu pekiştirmek için Nmap aracını kullanarak kendi ağınızda port tarama denemeleri yapabilirsiniz.",
        "🤖 **AI Uyarısı**: Etik hacking yaparken mutlaka yazılı izin alın. Yasal sorunlardan kaçınmak için test ortamlarını kullanın.",
        "🤖 **AI Trend**: 2024'te en çok aranan siber güvenlik becerileri: Cloud Security, AI/ML Security, DevSecOps ve Zero Trust Architecture.",
      ]

      setAiContent(aiResponses[Math.floor(Math.random() * aiResponses.length)])
      setIsLoadingAI(false)
    }, 2000)
  }

  const nextSection = () => {
    if (currentLesson && currentSection < currentLesson.sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setAiContent("")
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setAiContent("")
    }
  }

  const goToTest = () => {
    window.location.href = `/learn/${params.id}/test`
  }

  if (!currentLesson || !user) {
    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-mono text-yellow-400">Ders yükleniyor...</h1>
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="mt-4 bg-green-500 hover:bg-green-600 text-black font-mono"
          >
            Dashboard'a Dön
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            variant="outline"
            className="mb-4 border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard'a Dön
          </Button>

          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {currentLesson.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 font-mono">
              {currentLesson.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-gray-400 font-mono">
              <Clock className="w-4 h-4" />
              {currentLesson.duration}
            </div>
            <div className="flex items-center gap-1 text-gray-400 font-mono">
              <BookOpen className="w-4 h-4" />
              {currentSection + 1} / {currentLesson.sections.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
              <span>İlerleme</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Section */}
            <Card className="bg-gray-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 font-mono flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Anlatım
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={currentLesson.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Article Content */}
            <Card className="bg-gray-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  {currentLesson.sections[currentSection].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Article Content */}
                <div className="prose prose-invert max-w-none">
                  <div
                    className="text-gray-300 leading-relaxed font-mono text-sm whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: currentLesson.sections[currentSection].content.replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>

                {/* AI Content Section */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-cyan-400 font-mono">AI Destekli Güncel Bilgi</h3>
                  </div>

                  {!aiContent && !isLoadingAI && (
                    <Button onClick={loadAIContent} className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono">
                      <Bot className="w-4 h-4 mr-2" />
                      Güncel Bilgi Al
                    </Button>
                  )}

                  {isLoadingAI && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                        <span className="font-mono text-sm">AI güncel bilgi getiriyor...</span>
                      </div>
                    </div>
                  )}

                  {aiContent && (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <p className="text-cyan-100 font-mono text-sm leading-relaxed">{aiContent}</p>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                  <Button
                    onClick={prevSection}
                    disabled={currentSection === 0}
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Önceki
                  </Button>

                  {currentSection === currentLesson.sections.length - 1 ? (
                    <Button onClick={goToTest} className="bg-yellow-600 hover:bg-yellow-700 text-white font-mono">
                      <Trophy className="w-4 h-4 mr-2" />
                      Teste Geç
                    </Button>
                  ) : (
                    <Button onClick={nextSection} className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono">
                      Sonraki
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-gray-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-400 font-mono text-sm">Ders İçeriği</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentLesson.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 font-mono text-sm ${
                      index === currentSection
                        ? "bg-green-500/20 border border-green-500/50 text-green-400"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {index === currentSection ? (
                        <Play className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-500" />
                      )}
                      <span>{section.title}</span>
                    </div>
                  </button>
                ))}

                {/* Test Button */}
                <div className="pt-4 border-t border-gray-700">
                  <Button onClick={goToTest} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-mono">
                    <Trophy className="w-4 h-4 mr-2" />
                    Final Testi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
