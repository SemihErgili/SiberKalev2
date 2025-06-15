"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, X, ArrowLeft, Trophy, AlertTriangle, Eye, EyeOff } from "lucide-react"
import { getCurrentUser, updateUserProgress, isAuthenticated } from "@/lib/auth"

export default function TestPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [showDetailedResults, setShowDetailedResults] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/auth/login"
      return
    }
    setUser(getCurrentUser())
  }, [])

  const testData = {
    1: {
      title: "Siber Güvenlik Temelleri Testi",
      description: "Temel siber güvenlik kavramlarını test edin",
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: "Siber güvenliğin üç temel ilkesi nelerdir?",
          options: [
            "Gizlilik, Bütünlük, Erişilebilirlik",
            "Hız, Güvenlik, Kalite",
            "Donanım, Yazılım, İnsan",
            "Saldırı, Savunma, İzleme",
          ],
          correct: 0,
          explanation:
            "CIA Triad olarak bilinen Confidentiality (Gizlilik), Integrity (Bütünlük) ve Availability (Erişilebilirlik) siber güvenliğin temel ilkeleridir.",
        },
        {
          id: 2,
          question: "Etik hacking'in diğer adı nedir?",
          options: ["Black Hat Hacking", "White Hat Hacking", "Gray Hat Hacking", "Red Hat Hacking"],
          correct: 1,
          explanation: "Etik hacking, yasal izinlerle yapıldığı için White Hat Hacking olarak da bilinir.",
        },
        {
          id: 3,
          question: "Phishing saldırısı nedir?",
          options: [
            "Ağ trafiğini dinleme",
            "Sahte e-postalarla bilgi çalma",
            "Sistemi virüsle enfekte etme",
            "Şifre kırma saldırısı",
          ],
          correct: 1,
          explanation:
            "Phishing, sahte e-postalar, web siteleri veya mesajlar kullanarak kullanıcıları kandırıp kişisel bilgilerini çalmaya yönelik bir sosyal mühendislik saldırısıdır.",
        },
        {
          id: 4,
          question: "Hangi kanun Türkiye'de siber suçları düzenler?",
          options: ["5651 Sayılı Kanun", "Türk Ceza Kanunu", "KVKK", "Hepsi"],
          correct: 3,
          explanation:
            "Türkiye'de siber suçlar 5651 sayılı kanun, TCK ve KVKK gibi birden fazla yasal düzenleme ile ele alınır.",
        },
        {
          id: 5,
          question: "Ransomware nedir?",
          options: [
            "Ücretsiz yazılım",
            "Dosyaları şifreleyen ve fidye isteyen malware",
            "Antivirüs programı",
            "Güvenlik duvarı",
          ],
          correct: 1,
          explanation:
            "Ransomware, kullanıcının dosyalarını şifreleyen ve şifre çözme karşılığında fidye talep eden bir malware türüdür.",
        },
      ],
    },
    2: {
      title: "Linux Terminal Temelleri Testi",
      description: "Linux komut satırı bilginizi test edin",
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: "Hangi komut mevcut dizini gösterir?",
          options: ["ls", "pwd", "cd", "mkdir"],
          correct: 1,
          explanation: "pwd (print working directory) komutu bulunduğunuz dizinin tam yolunu gösterir.",
        },
        {
          id: 2,
          question: "'ls -la' komutu ne yapar?",
          options: [
            "Sadece dosyaları listeler",
            "Gizli dosyalar dahil detaylı liste gösterir",
            "Sadece dizinleri listeler",
            "Dosya boyutlarını gösterir",
          ],
          correct: 1,
          explanation:
            "ls -la komutu gizli dosyalar (.ile başlayan) dahil olmak üzere tüm dosyaları detaylı olarak listeler.",
        },
        {
          id: 3,
          question: "Hangi komut dosya veya dizin siler?",
          options: ["delete", "remove", "rm", "del"],
          correct: 2,
          explanation: "rm (remove) komutu Linux'ta dosya ve dizin silmek için kullanılır.",
        },
        {
          id: 4,
          question: "'cd ..' komutu ne yapar?",
          options: ["Ana dizine gider", "Üst dizine çıkar", "Önceki dizine döner", "Hiçbir şey yapmaz"],
          correct: 1,
          explanation: "cd .. komutu bir üst dizine çıkmak için kullanılır. '..' üst dizini temsil eder.",
        },
        {
          id: 5,
          question: "Hangi komut yeni dizin oluşturur?",
          options: ["newdir", "mkdir", "createdir", "makedir"],
          correct: 1,
          explanation: "mkdir (make directory) komutu yeni dizin oluşturmak için kullanılır.",
        },
      ],
    },
    3: {
      title: "Nmap Temelleri Testi",
      description: "Nmap kullanımı hakkındaki bilginizi test edin",
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: "Nmap'in açılımı nedir?",
          options: ["Network Map", "Network Mapper", "Network Manager", "Network Monitor"],
          correct: 1,
          explanation: "Nmap, Network Mapper'ın kısaltmasıdır ve ağ keşfi için kullanılan bir araçtır.",
        },
        {
          id: 2,
          question: "Hangi komut belirli bir portu tarar?",
          options: ["nmap -p 80 target", "nmap --port 80 target", "nmap -port 80 target", "nmap 80 target"],
          correct: 0,
          explanation: "nmap -p 80 target komutu hedef sistemde sadece 80 numaralı portu tarar.",
        },
        {
          id: 3,
          question: "Nmap'te tüm portları taramak için hangi parametre kullanılır?",
          options: ["-p all", "-p *", "-p-", "-p 1-65535"],
          correct: 2,
          explanation: "-p- parametresi tüm portları (1-65535) taramak için kullanılır.",
        },
        {
          id: 4,
          question: "Hangi Nmap tarama türü en hızlıdır?",
          options: ["TCP Connect", "SYN Scan", "UDP Scan", "Ping Scan"],
          correct: 3,
          explanation:
            "Ping Scan (-sn) sadece host'ların aktif olup olmadığını kontrol eder, port taraması yapmaz, bu yüzden en hızlıdır.",
        },
        {
          id: 5,
          question: "Nmap'te servis versiyonlarını tespit etmek için hangi parametre kullanılır?",
          options: ["-sV", "-sS", "-sU", "-sP"],
          correct: 0,
          explanation:
            "-sV parametresi açık portlarda çalışan servislerin versiyonlarını tespit etmek için kullanılır.",
        },
      ],
    },
  }

  const currentTest = testData[Number.parseInt(params.id) as keyof typeof testData]

  if (!currentTest || !user) {
    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-mono text-yellow-400">Test yükleniyor...</h1>
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

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const calculateScore = () => {
    let correctAnswers = 0
    currentTest.questions.forEach((question) => {
      const userAnswer = Number.parseInt(answers[question.id])
      if (userAnswer === question.correct) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / currentTest.questions.length) * 100)
  }

  const submitTest = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setShowResults(true)

    // Kullanıcı ilerlemesini güncelle
    updateUserProgress(Number.parseInt(params.id), finalScore)
    setUser(getCurrentUser()) // Güncellenmiş kullanıcı bilgilerini al
  }

  const nextQuestion = () => {
    if (currentQuestion < currentTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / currentTest.questions.length) * 100

  if (showResults) {
    const passed = score >= currentTest.passingScore
    const correctCount = currentTest.questions.filter((q) => Number.parseInt(answers[q.id]) === q.correct).length

    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className={`bg-gray-900/50 ${passed ? "border-green-500/30" : "border-red-500/30"}`}>
            <CardHeader>
              <CardTitle className={`font-mono flex items-center gap-2 ${passed ? "text-green-400" : "text-red-400"}`}>
                {passed ? <Trophy className="w-6 h-6" /> : <X className="w-6 h-6" />}
                Test Sonuçları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-mono font-bold mb-4 ${passed ? "text-green-400" : "text-red-400"}`}>
                  {score}%
                </div>
                <h2 className={`text-2xl font-mono mb-2 ${passed ? "text-green-400" : "text-red-400"}`}>
                  {passed ? "🎉 Tebrikler! Test Geçildi!" : "❌ Test Başarısız!"}
                </h2>
                <p className="text-gray-400 font-mono mb-4">
                  {correctCount}/{currentTest.questions.length} doğru cevap | Geçme puanı: {currentTest.passingScore}%
                </p>
              </div>

              {passed ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                  <h3 className="text-green-400 font-mono text-lg mb-4">🎉 Başarılı!</h3>
                  <div className="space-y-2 text-sm font-mono text-gray-300">
                    <div>✓ +100 puan kazandınız</div>
                    <div>✓ Bir sonraki ders açıldı</div>
                    <div>✓ Başarı oranınız güncellendi</div>
                    <div>✓ Seviyeniz: {user.level}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                  <h3 className="text-red-400 font-mono text-lg mb-4">❌ Başarısız</h3>
                  <div className="space-y-2 text-sm font-mono text-gray-300">
                    <div>• Geçme puanına ulaşamadınız ({currentTest.passingScore}% gerekli)</div>
                    <div>• Dersi tekrar gözden geçirin</div>
                    <div>• Testi tekrar deneyebilirsiniz</div>
                    <div>• Video anlatımları izleyin</div>
                  </div>
                </div>
              )}

              {/* Detaylı Sonuçları Göster/Gizle */}
              <div className="text-center">
                <Button
                  onClick={() => setShowDetailedResults(!showDetailedResults)}
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                >
                  {showDetailedResults ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showDetailedResults ? "Detayları Gizle" : "Detaylı Sonuçları Göster"}
                </Button>
              </div>

              {/* Detaylı Sonuçlar */}
              {showDetailedResults && (
                <div className="space-y-4">
                  <h3 className="text-cyan-400 font-mono text-lg">📊 Detaylı Sonuçlar:</h3>
                  {currentTest.questions.map((question, index) => {
                    const userAnswer = Number.parseInt(answers[question.id])
                    const isCorrect = userAnswer === question.correct

                    return (
                      <div
                        key={question.id}
                        className={`p-4 rounded-lg border ${isCorrect ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <h4 className="text-white font-mono text-sm mb-3">
                              <span className="text-cyan-400">Soru {index + 1}:</span> {question.question}
                            </h4>

                            {/* Tüm seçenekleri göster */}
                            <div className="space-y-2 mb-3">
                              {question.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={`p-2 rounded text-sm font-mono ${
                                    optionIndex === question.correct
                                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                      : optionIndex === userAnswer && !isCorrect
                                        ? "bg-red-500/20 text-red-400 border border-red-500/50"
                                        : "bg-gray-800/50 text-gray-300"
                                  }`}
                                >
                                  <span className="mr-2">
                                    {optionIndex === question.correct
                                      ? "✓"
                                      : optionIndex === userAnswer && !isCorrect
                                        ? "✗"
                                        : "○"}
                                  </span>
                                  {option}
                                  {optionIndex === question.correct && (
                                    <span className="ml-2 text-green-400 font-bold">(Doğru Cevap)</span>
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <span className="ml-2 text-red-400 font-bold">(Sizin Cevabınız)</span>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="bg-gray-800/50 rounded p-3">
                              <p className="text-cyan-400 text-xs font-mono mb-1">💡 Açıklama:</p>
                              <p className="text-gray-300 text-xs">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={() => (window.location.href = `/learn/${params.id}`)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
                >
                  Derse Dön
                </Button>
                {passed ? (
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono"
                  >
                    Dashboard'a Dön
                  </Button>
                ) : (
                  <Button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono"
                  >
                    Testi Tekrarla
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => (window.location.href = `/learn/${params.id}`)}
            variant="outline"
            className="mb-4 border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Derse Dön
          </Button>

          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {currentTest.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 font-mono">
              Geçme Puanı: {currentTest.passingScore}%
            </Badge>
            <div className="text-gray-400 font-mono">
              Soru {currentQuestion + 1} / {currentTest.questions.length}
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

        {/* Question Card */}
        <Card className="bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 font-mono">
              <span className="text-gray-400">Soru {currentQuestion + 1}:</span>{" "}
              {currentTest.questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentTest.questions[currentQuestion].id]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(currentTest.questions[currentQuestion].id, value)}
            >
              {currentTest.questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700/50"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-gray-300 font-mono cursor-pointer flex-1">
                    <span className="text-cyan-400 mr-2">{String.fromCharCode(65 + index)})</span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <Button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="border-gray-600 text-gray-400 hover:bg-gray-800 font-mono"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Önceki
              </Button>

              {currentQuestion === currentTest.questions.length - 1 ? (
                <Button
                  onClick={submitTest}
                  disabled={Object.keys(answers).length !== currentTest.questions.length}
                  className="bg-green-600 hover:bg-green-700 text-white font-mono"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Testi Bitir
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentTest.questions[currentQuestion].id]}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono"
                >
                  Sonraki
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              )}
            </div>

            {/* Warning */}
            {Object.keys(answers).length !== currentTest.questions.length &&
              currentQuestion === currentTest.questions.length - 1 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-mono text-sm">Tüm soruları cevaplamanız gerekiyor!</span>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
