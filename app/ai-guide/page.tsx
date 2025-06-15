// Dosya Yolu: app/(pages)/siber-ai/page.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, Zap } from "lucide-react"

// Mesaj objesinin tipini tanımlıyoruz
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AIGuidePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Merhaba! Ben Siber Kale'nin AI asistanıyım. Sana siber güvenlik araçları, saldırı teknikleri veya savunma stratejileri hakkında nasıl yardımcı olabilirim?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null); // Sohbeti en alta kaydırmak için referans

  const quickQuestions = [
    "En iyi penetration testing araçları neler?",
    "OSINT için hangi araçları önerirsin?",
    "Web uygulaması güvenlik testi nasıl yapılır?",
    "Network scanning için hangi araçlar kullanılır?",
    "Password cracking araçları nelerdir?",
    "Wireless network güvenlik testleri nasıl yapılır?",
  ]
  
  // Her yeni mesaj geldiğinde sohbetin en altına otomatik olarak kaydırır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = async () => {
    // Mesaj boşsa veya zaten bir istek işleniyorsa gönderme
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Yeni mesajı mevcut mesaj listesine ekle
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); // Arayüzü hemen güncelle
    setInputMessage(""); // Input alanını temizle
    setIsLoading(true); // Yükleme durumunu başlat

    try {
      const response = await fetch('/api/chat', { // Backend API rotamıza istek
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // AI'a sadece rol ve içerik bilgisini gönderiyoruz, timestamp'e backend'de ihtiyacı yok
        body: JSON.stringify({ 
          messages: newMessages.map(msg => ({ role: msg.role, content: msg.content }))
        }),
      });

      if (!response.ok) { // Eğer API isteği başarısız olursa
        const errorData = await response.json();
        console.error("API Hatası:", errorData);
        throw new Error(errorData.error || 'API isteği başarısız oldu.');
      }

      const data = await response.json(); // Başarılı cevabı JSON olarak al

      const aiMessage: Message = {
        role: "assistant",
        content: data.response, // AI'dan gelen cevap
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]); // AI'nın cevabını mesaj listesine ekle

    } catch (error) {
      console.error("Mesaj gönderilirken hata:", error);
      // Kullanıcıya bir hata mesajı göster
      const errorMessage: Message = {
        role: "assistant",
        content: "Üzgünüm, asistana bağlanırken bir sorun oluştu. Sunucu loglarını kontrol edin veya daha sonra tekrar deneyin.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Yükleme durumunu sonlandır
    }
  };

  // Hızlı sorulardan birine tıklandığında input'u doldurur
  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  }
  
  // Input alanındayken Enter'a basıldığında mesajı gönderir
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) { // isLoading kontrolü eklendi
        handleSendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> AI Siber Rehber"}
          </h1>
          <p className="text-gray-400 text-lg font-mono">Siber güvenlik araçları hakkında AI destekli rehberlik alın</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Hızlı Sorular Kenar Çubuğu */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-gray-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-cyan-400 font-mono flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Hızlı Sorular
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full h-auto text-left justify-start text-gray-300 hover:text-green-400 hover:bg-gray-800 font-mono text-xs whitespace-normal leading-normal py-2"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sohbet Arayüzü */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900/50 border-gray-700 h-[calc(100vh-200px)] min-h-[400px] max-h-[700px] flex flex-col"> {/* Yüksekliği biraz daha dinamik hale getirdim */}
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  Siber Kale AI Assistant
                  <Badge variant="outline" className="ml-auto border-green-500 text-green-400">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>

              {/* Mesajların Gösterildiği Alan */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-cyan-500/20 text-cyan-400" : "bg-green-500/20 text-green-400"}`}>
                        {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${message.role === "user" ? "bg-cyan-500/10 border border-cyan-500/30" : "bg-gray-800/50 border border-gray-700"}`}>
                        <div className="text-sm whitespace-pre-wrap font-mono leading-relaxed break-words">{message.content}</div>
                        <div className="text-xs text-gray-500 mt-2 text-right">{message.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Yükleme Animasyonu */}
                {isLoading && (
                  <div className="flex gap-3 justify-start"> {/* AI mesajı gibi sola yasladım */}
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0"> <Bot className="w-4 h-4" /> </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} /> {/* Bu boş div, en alta kaydırmak için kullanılır */}
              </CardContent>

              {/* Mesaj Yazma Alanı */}
              <div className="border-t border-gray-700 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Siber güvenlik araçları hakkında soru sorun..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 font-mono"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !inputMessage.trim()} 
                    className="bg-green-500 hover:bg-green-600 text-black disabled:opacity-50 disabled:cursor-not-allowed" // disabled stili güncellendi
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}