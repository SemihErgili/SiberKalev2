import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal, Bot, Newspaper, Trophy, Shield, Search } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Terminal,
      title: "Ücretsiz Siber Güvenlik Araçları",
      description:
        "Penetration testing, network analizi, kriptografi ve OSINT için en iyi açık kaynak araçları keşfedin.",
      color: "text-green-400",
      borderColor: "border-green-500/30",
    },
    {
      icon: Bot,
      title: "AI Destekli Tool Rehberi",
      description: "İstediğiniz araçları AI'ye sorarak öneriler, kullanım kılavuzları ve alternatifler alın.",
      color: "text-cyan-400",
      borderColor: "border-cyan-500/30",
    },
    {
      icon: Newspaper,
      title: "Canlı Siber Güvenlik Haberleri",
      description: "Zero-Day açıkları, veri ihlalleri ve yeni güvenlik protokolleri hakkında güncel haberler.",
      color: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Trophy,
      title: "Hacker Challenge Alanı",
      description: "CTF senaryolarını çözün, şifre kırma ve sistem analizi görevlerini tamamlayın.",
      color: "text-red-400",
      borderColor: "border-red-500/30",
    },
    {
      icon: Shield,
      title: "Ethical Hacking Eğitimleri",
      description: "Adım adım rehberler ve pratik örneklerle ethical hacking becerilerinizi geliştirin.",
      color: "text-yellow-400",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: Search,
      title: "OSINT Araç Koleksiyonu",
      description: "Açık kaynak istihbarat toplama için en etkili araçları ve teknikleri öğrenin.",
      color: "text-pink-400",
      borderColor: "border-pink-500/30",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Platform Özellikleri"}
          </h2>
          <p className="text-gray-400 text-lg font-mono">Siber güvenlik dünyasında ihtiyacınız olan her şey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`bg-black/50 ${feature.borderColor} border backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group`}
            >
              <CardHeader>
                <feature.icon
                  className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                />
                <CardTitle className={`${feature.color} font-mono text-lg`}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
