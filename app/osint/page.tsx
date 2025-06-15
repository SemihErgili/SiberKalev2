// Dosya Yolu: app/osint/page.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ExternalLink, Search, ListFilter, Wrench, BookOpenText, Puzzle, GraduationCap, AlertTriangle,
  Globe, Mail, AtSign, UserCircle, Users, Fingerprint, MapPin, Building, ShieldOff, EyeOff, FileText, Camera
} from "lucide-react"; // İkonlar eklendi
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- OSINT ARAÇLARI VERİ YAPISI VE DATASI ---
interface OsintTool {
  name: string;
  description: string;
  url: string;
  categories: string[];
  icon?: React.ElementType; 
}

const targetTypesForTools = [ 
  "Tümü", "Domain", "E-posta Adresi", "Kullanıcı Adı", "IP Adresi", "Telefon Numarası", 
  "Sosyal Medya Profili", "Görsel (Resim/Video)", "Belge/Dosya Analizi", 
  "Genel Keşif", "Dark Web İzleme", "Haritalama ve Konum", "Şirket Araştırması", "Zafiyet Bilgisi"
];

const osintToolsData: OsintTool[] = [
  // DOMAIN
  { name: "theHarvester", icon: Globe, description: "E-postalar, alt alan adları, hostlar, çalışan isimleri, açık portlar ve banner'ları toplar.", url: "https://github.com/laramies/theHarvester", categories: ["Domain", "E-posta Adresi", "Genel Keşif"]},
  { name: "Sublist3r", icon: Globe, description: "Arama motorları, SSL sertifikaları ve online servisler kullanarak alt alan adlarını listeler.", url: "https://github.com/aboul3la/Sublist3r", categories: ["Domain"]},
  { name: "Amass", icon: Globe, description: "Derinlemesine aktif/pasif DNS numaralandırması, ağ haritalaması ve harici varlık keşfi.", url: "https://github.com/owasp-amass/amass", categories: ["Domain", "Genel Keşif"]},
  { name: "DNSDumpster", icon: Globe, description: "Bir domain hakkında DNS kayıtlarını (A, MX, TXT, NS vb.) ve alt alan adlarını bulur.", url: "https://dnsdumpster.com/", categories: ["Domain"]},
  { name: "ViewDNS.info", icon: Globe, description: "DNS kayıtları, IP geçmişi, port tarama gibi çeşitli domain ve IP araçları sunar.", url: "https://viewdns.info/", categories: ["Domain", "IP Adresi"]},
  { name: "SecurityTrails", icon: Globe, description: "DNS geçmişi, alt alan adları, IP adresleri ve WHOIS bilgileri sunan kapsamlı bir platform.", url: "https://securitytrails.com/", categories: ["Domain", "IP Adresi", "Genel Keşif"]},
  { name: "WHOIS Lookup (ICANN)", icon: Globe, description: "Bir domainin kayıt bilgilerini (sahip, kayıt şirketi, iletişim vb.) sorgular.", url: "https://lookup.icann.org/", categories: ["Domain"]},

  // E-POSTA ADRESİ
  { name: "Hunter.io", icon: Mail, description: "Bir domain ile ilişkili veya belirli bir şirkette çalışanların profesyonel e-posta adreslerini bulur.", url: "https://hunter.io/", categories: ["E-posta Adresi", "Şirket Araştırması"]},
  { name: "Have I Been Pwned", icon: ShieldOff, description: "E-posta adresinizin veya telefon numaranızın bilinen veri sızıntılarında yer alıp almadığını kontrol eder.", url: "https://haveibeenpwned.com/", categories: ["E-posta Adresi", "Telefon Numarası", "Zafiyet Bilgisi"]},
  { name: "DeHashed", icon: Fingerprint, description: "Sızdırılmış veritabanlarında e-posta, kullanıcı adı, şifre (hash), IP adresi gibi bilgileri arar.", url: "https://www.dehashed.com/", categories: ["E-posta Adresi", "Kullanıcı Adı", "Genel Keşif", "IP Adresi", "Zafiyet Bilgisi"]},
  { name: "EmailRep.io", icon: Mail, description: "Bir e-posta adresinin itibarını (spam, phishing riski vb.) değerlendirir.", url: "https://emailrep.io/", categories: ["E-posta Adresi"]},
  { name: "Snov.io Email Finder", icon: Mail, description: "Şirket web sitelerinden ve LinkedIn profillerinden e-posta adresleri bulur.", url: "https://snov.io/email-finder", categories: ["E-posta Adresi", "Şirket Araştırması"]},

  // KULLANICI ADI
  { name: "Sherlock", icon: UserCircle, description: "Çok sayıda sosyal medya platformunda ve web sitesinde belirli bir kullanıcı adını arar.", url: "https://github.com/sherlock-project/sherlock", categories: ["Kullanıcı Adı", "Sosyal Medya Profili"]},
  { name: "WhatsMyName.app", icon: UserCircle, description: "Farklı kategorilerdeki yüzlerce web sitesinde bir kullanıcı adının varlığını kontrol eder.", url: "https://whatsmyname.app/", categories: ["Kullanıcı Adı"]},
  { name: "UserSearch.org", icon: UserCircle, description: "Sosyal ağlarda, forumlarda ve diğer platformlarda kullanıcı adı ve e-posta ile arama yapar.", url: "https://www.usersearch.org/", categories: ["Kullanıcı Adı", "E-posta Adresi", "Sosyal Medya Profili"]},
  { name: "KnowEm", icon: UserCircle, description: "Markanız veya kullanıcı adınız için 500'den fazla popüler sosyal medya sitesinde uygunluğu kontrol eder.", url: "https://knowem.com/", categories: ["Kullanıcı Adı", "Sosyal Medya Profili"]},

  // IP ADRESİ
  { name: "Shodan", icon: Fingerprint, description: "İnternete bağlı cihazları (kameralar, routerlar, sunucular, IoT vb.) ve servisleri bulur.", url: "https://www.shodan.io/", categories: ["IP Adresi", "Genel Keşif", "Zafiyet Bilgisi"]},
  { name: "Censys Search", icon: Fingerprint, description: "İnternete bağlı hostlar, web siteleri ve sertifikalar hakkında yapılandırılmış veri toplar.", url: "https://search.censys.io/", categories: ["IP Adresi", "Domain", "Genel Keşif", "Zafiyet Bilgisi"]},
  { name: "IPinfo.io", icon: MapPin, description: "Bir IP adresi hakkında detaylı bilgi (coğrafi konum, ASN, hosting sağlayıcı vb.) sunar.", url: "https://ipinfo.io/", categories: ["IP Adresi"]},
  { name: "AbuseIPDB", icon: ShieldOff, description: "Kötü amaçlı faaliyetlerde bulunduğu raporlanan IP adreslerinin bir veritabanı.", url: "https://www.abuseipdb.com/", categories: ["IP Adresi"]},
  { name: "GreyNoise", icon: EyeOff, description: "İnternet tarama gürültüsünü (botlar, tarayıcılar) analiz ederek gerçek tehditleri ayırt etmeye yardımcı olur.", url: "https://www.greynoise.io/", categories: ["IP Adresi", "Genel Keşif"]},
  { name: "URLScan.io", icon: Globe, description: "Bir URL'yi tarar ve sayfanın içeriği, bağlantıları, teknolojileri ve potansiyel riskleri hakkında rapor oluşturur.", url: "https://urlscan.io/", categories: ["Domain", "IP Adresi", "Genel Keşif"]},

  // SOSYAL MEDYA PROFİLİ
  { name: "Social Blade", icon: Users, description: "YouTube, Twitch, Instagram, Twitter gibi platformlarda sosyal medya istatistiklerini takip eder.", url: "https://socialblade.com/", categories: ["Sosyal Medya Profili"]},
  { name: "Twitonomy (X Pro)", icon: Users, description: "Twitter (X) kullanıcıları ve hashtag'leri hakkında detaylı analizler sunar.", url: "https://www.twitonomy.com/", categories: ["Sosyal Medya Profili"]},
  { name: "NetBootCamp Social Media Search", icon: Users, description: "Birden fazla sosyal medya platformunda aynı anda arama yapmayı sağlar.", url: "https://netbootcamp.org/socialmediasearch/", categories: ["Sosyal Medya Profili", "Kullanıcı Adı"]},
  { name: "Followerwonk", icon: Users, description: "Twitter biyografilerinde arama yapma, kullanıcıları karşılaştırma ve takipçileri analiz etme aracı.", url: "https://followerwonk.com/", categories: ["Sosyal Medya Profili"]},

  // GÖRSEL (RESİM/VIDEO)
  { name: "Google Lens / Google Images", icon: Camera, description: "Bir resim yükleyerek veya URL'sini vererek benzer görselleri, kaynağını veya içerdiği nesneleri bulur.", url: "https://images.google.com/", categories: ["Görsel (Resim/Video)"]},
  { name: "TinEye Reverse Image Search", icon: Camera, description: "Bir resmin internette nerede ve nasıl kullanıldığını bulmak için tersine görsel arama yapar.", url: "https://tineye.com/", categories: ["Görsel (Resim/Video)"]},
  { name: "Yandex Images", icon: Camera, description: "Güçlü bir tersine görsel arama motoru, özellikle yüz tanıma ve benzer görseller bulmada etkilidir.", url: "https://yandex.com/images/", categories: ["Görsel (Resim/Video)"]},
  { name: "EXIFTool by Phil Harvey", icon: FileText, description: "Resim, video ve diğer dosya türlerindeki metadata (EXIF, GPS vb.) bilgilerini okur, yazar ve düzenler.", url: "https://exiftool.org/", categories: ["Görsel (Resim/Video)", "Belge/Dosya Analizi"]},
  { name: "InVID & WeVerify", icon: Camera, description: "Video ve resimlerin doğrulanması için araçlar sunan bir tarayıcı eklentisi ve platform.", url: "https://www.invid-project.eu/", categories: ["Görsel (Resim/Video)"]},

  // GENEL KEŞİF ve ARAŞTIRMA
  { name: "Maltego", icon: Wrench, description: "Farklı kaynaklardan gelen bilgileri birleştirip görselleştiren, karmaşık ilişkileri ortaya çıkaran güçlü bir OSINT aracı.", url: "https://www.maltego.com/", categories: ["Genel Keşif", "Domain", "IP Adresi", "E-posta Adresi", "Kullanıcı Adı"]},
  { name: "SpiderFoot", icon: Wrench, description: "100'den fazla OSINT veri kaynağından otomatik olarak bilgi toplayan ve analiz eden bir araç.", url: "https://www.spiderfoot.net/", categories: ["Genel Keşif", "Domain", "IP Adresi", "E-posta Adresi"]},
  { name: "Google Dorking", icon: Search, description: "Google'ın gelişmiş arama operatörlerini kullanarak web üzerinde spesifik bilgiler bulma tekniği.", url: "https://www.exploit-db.com/google-hacking-database", categories: ["Genel Keşif", "Domain", "Belge/Dosya Analizi"]},
  { name: "Wayback Machine (Archive.org)", icon: Globe, description: "Web sitelerinin geçmişteki hallerini ve silinmiş içeriklerini arşivleyen bir servis.", url: "https://archive.org/web/", categories: ["Genel Keşif", "Domain"]},
  { name: "BuiltWith", icon: Wrench, description: "Bir web sitesinin hangi teknolojilerle (CMS, framework, analytics vb.) oluşturulduğunu gösterir.", url: "https://builtwith.com/", categories: ["Genel Keşif", "Domain"]},
  { name: "OSINT Framework", icon: ListFilter, description: "Çok sayıda OSINT aracını ve kaynağını kategorilere ayrılmış şekilde sunan bir web sitesi.", url: "https://osintframework.com/", categories: ["Genel Keşif"]},
  { name: "Recon-ng Framework", icon: Wrench, description: "Modüler yapıda, web tabanlı keşifler için güçlü bir framework.", url: "https://github.com/lanmaster53/recon-ng", categories: ["Genel Keşif", "Domain"]},

  // ŞİRKET ARAŞTIRMASI
  { name: "LinkedIn", icon: Building, description: "Profesyoneller ve şirketler hakkında bilgi bulmak için en büyük ağlardan biri.", url: "https://www.linkedin.com/", categories: ["Şirket Araştırması", "Sosyal Medya Profili", "E-posta Adresi"]},
  { name: "Crunchbase", icon: Building, description: "Şirketler, yatırımlar, kurucular ve sektör trendleri hakkında bilgi sağlar.", url: "https://www.crunchbase.com/", categories: ["Şirket Araştırması"]},
  { name: "OpenCorporates", icon: Building, description: "Dünya genelindeki şirketler hakkında açık veri sağlayan en büyük veritabanı.", url: "https://opencorporates.com/", categories: ["Şirket Araştırması"]},
  { name: "Glassdoor", icon: Building, description: "Şirketler hakkında çalışan yorumları, maaş bilgileri ve mülakat soruları içerir.", url: "https://www.glassdoor.com/", categories: ["Şirket Araştırması"]},

  // HARİTALAMA VE KONUM
  { name: "Google Maps / Earth", icon: MapPin, description: "Uydu görüntüleri, sokak görünümleri ve coğrafi veriler sunar.", url: "https://www.google.com/maps", categories: ["Haritalama ve Konum", "Görsel (Resim/Video)"]},
  { name: "Wikimapia", icon: MapPin, description: "Kullanıcılar tarafından oluşturulan, dünya üzerindeki yerler hakkında detaylı bilgiler içeren bir harita.", url: "http://wikimapia.org/", categories: ["Haritalama ve Konum"]},
  { name: "Flightradar24", icon: MapPin, description: "Dünya genelindeki uçuşları gerçek zamanlı olarak takip eder.", url: "https://www.flightradar24.com/", categories: ["Haritalama ve Konum", "Genel Keşif"]},
  { name: "SunCalc", icon: MapPin, description: "Belirli bir konum ve tarih için güneşin hareketini ve gölge yönlerini gösterir.", url: "https://www.suncalc.org/", categories: ["Haritalama ve Konum", "Görsel (Resim/Video)"]},

  // DARK WEB İZLEME (Dikkatli Kullanılmalı, TOR Browser Gerekebilir)
  { name: "Ahmia", icon: EyeOff, description: "Tor ağı (Dark Web) üzerindeki .onion sitelerini aramak için bir arama motoru.", url: "https://ahmia.fi/", categories: ["Dark Web İzleme"]},
  { name: "Hunchly", icon: FileText, description: "OSINT araştırmaları sırasında web sayfalarını ve kanıtları otomatik olarak toplayan bir araç (ücretli).", url: "https://www.hunch.ly/", categories: ["Genel Keşif", "Dark Web İzleme", "Belge/Dosya Analizi"]},
  { name: "Tor Search Engines (örn: Torch, Haystak)", icon: EyeOff, description: "Dark Web içeriğini indekslemeye çalışan çeşitli arama motorları.", url: "http://xmh57jrzrnw6insl.onion (Torch - TOR GEREKİR)", categories: ["Dark Web İzleme"]},

  // ZAFİYET BİLGİSİ
  { name: "Exploit Database", icon: ShieldOff, description: "Halka açık exploit'lerin ve zafiyetli yazılımların bir arşivi.", url: "https://www.exploit-db.com/", categories: ["Zafiyet Bilgisi", "Genel Keşif"]},
  { name: "CVE Details", icon: ShieldOff, description: "CVE (Common Vulnerabilities and Exposures) veritabanı için detaylı arama ve istatistikler.", url: "https://www.cvedetails.com/", categories: ["Zafiyet Bilgisi"]},
  { name: "NVD (National Vulnerability Database)", icon: ShieldOff, description: "ABD Ulusal Zafiyet Veritabanı, CVE'ler hakkında standartlaştırılmış bilgiler sunar.", url: "https://nvd.nist.gov/", categories: ["Zafiyet Bilgisi"]},
];
// --- OSINT ARAÇLARI VERİ YAPISI VE DATASI BİTİŞ ---

export default function OsintMerkeziSayfasi() {
  const [selectedTargetType, setSelectedTargetType] = useState<string>("Tümü");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTools = osintToolsData.filter(tool => {
    const targetTypeMatch = selectedTargetType === "Tümü" || tool.categories.includes(selectedTargetType);
    const searchTermMatch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return targetTypeMatch && searchTermMatch;
  });

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-mono font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            {"> OSINT Merkezi"}
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl font-mono">
            Açık kaynak istihbaratı: Tanımlar, araçlar, teknikler ve kaynaklar.
          </p>
        </div>

        <Tabs defaultValue="osint-nedir" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-900/70 p-1.5 rounded-lg mb-8 border border-gray-700/70 shadow-md">
            <TabsTrigger value="osint-nedir" className="font-mono text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-800/80 hover:text-gray-100 rounded-md text-xs sm:text-sm py-2.5 px-1 transition-all duration-200 ease-in-out">
              <BookOpenText className="w-4 h-4 mr-1.5 shrink-0" /> OSINT Nedir?
            </TabsTrigger>
            <TabsTrigger value="araclar" className="font-mono text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-800/80 hover:text-gray-100 rounded-md text-xs sm:text-sm py-2.5 px-1 transition-all duration-200 ease-in-out">
              <Wrench className="w-4 h-4 mr-1.5 shrink-0" /> Araçlar
            </TabsTrigger>
            <TabsTrigger value="temel-kavramlar" className="font-mono text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-800/80 hover:text-gray-100 rounded-md text-xs sm:text-sm py-2.5 px-1 transition-all duration-200 ease-in-out">
              <Puzzle className="w-4 h-4 mr-1.5 shrink-0" /> Temel Kavramlar
            </TabsTrigger>
            <TabsTrigger value="ogrenme-kaynaklari" className="font-mono text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-800/80 hover:text-gray-100 rounded-md text-xs sm:text-sm py-2.5 px-1 transition-all duration-200 ease-in-out">
              <GraduationCap className="w-4 h-4 mr-1.5 shrink-0" /> Öğrenme Kaynakları
            </TabsTrigger>
          </TabsList>

          {/* OSINT NEDİR? SEKMESİ */}
          <TabsContent value="osint-nedir">
            <Card className="bg-gray-900/80 border border-gray-700/60 shadow-lg rounded-xl p-2 sm:p-6">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-mono text-blue-300 flex items-center">
                  <BookOpenText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-400" /> Açık Kaynak İstihbaratı (OSINT) Nedir?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300 font-mono leading-relaxed text-sm sm:text-base">
                <p>
                  OSINT (Open Source Intelligence), halka açık, yasal olarak erişilebilir kaynaklardan veri ve bilgi toplama, analiz etme ve yayma sürecidir. 
                  Bu kaynaklar arasında internet siteleri, sosyal medya platformları, akademik yayınlar, haber makaleleri, resmi raporlar, forumlar, sızdırılmış veritabanları (dikkatli kullanılmalı) ve çok daha fazlası bulunur.
                </p>
                <p>
                  Siber güvenlikte OSINT, potansiyel hedefler hakkında bilgi toplamak, saldırı yüzeyini anlamak, tehdit aktörlerini izlemek, zafiyetleri tespit etmek ve olay müdahalesine yardımcı olmak gibi birçok amaçla kullanılır. 
                  Aynı zamanda gazeteciler, araştırmacılar, özel dedektifler ve hatta iş dünyasındaki rekabet analizi gibi farklı alanlarda da yaygın olarak başvurulan bir yöntemdir.
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-200 pt-3">Neden Önemlidir?</h3>
                <ul className="list-disc list-inside space-y-1.5 pl-4">
                  <li><strong className="text-sky-300">Proaktif Savunma:</strong> Kuruluşlar, kendileri hakkında dışarıdan nasıl göründüklerini (dijital ayak izleri, sızan bilgiler vb.) anlayarak potansiyel zafiyetlerini ve saldırı vektörlerini proaktif bir şekilde tespit edip kapatabilirler.</li>
                  <li><strong className="text-sky-300">Hedef Analizi:</strong> Penetrasyon testi uzmanları ve etik hackerlar, saldırı simülasyonları öncesinde hedef sistemler, ağlar ve personel hakkında detaylı bilgi toplayarak daha gerçekçi ve etkili testler yapabilirler.</li>
                  <li><strong className="text-sky-300">Tehdit İstihbaratı (Threat Intelligence):</strong> Yeni ve gelişmekte olan siber tehditler, saldırı yöntemleri, kötü amaçlı yazılımlar ve tehdit aktörlerinin taktikleri hakkında güncel bilgi edinmeyi sağlar.</li>
                  <li><strong className="text-sky-300">Olay Müdahalesi (Incident Response):</strong> Bir siber saldırı veya güvenlik ihlali durumunda, saldırının kaynağını, kapsamını, etkilenen sistemleri ve olası failleri belirlemede kritik rol oynayabilir.</li>
                  <li><strong className="text-sky-300">Marka İtibarı Yönetimi:</strong> Şirketler, markaları hakkında internette neler konuşulduğunu, olası dezenformasyon kampanyalarını veya itibarlarını zedeleyebilecek içerikleri takip edebilirler.</li>
                </ul>
                <p className="pt-2">
                  OSINT, doğru araçlar, analitik düşünme ve yaratıcı metodolojilerle kullanıldığında son derece güçlü bir bilgi toplama disiplinidir. 
                  Ancak, toplanan bilgilerin doğruluğunun teyit edilmesi, etik kurallara uyulması ve yasal sınırlar içinde kalınması büyük önem taşır.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ARAÇLAR SEKMESİ */}
          <TabsContent value="araclar">
            <div className="mb-8 p-4 sm:p-6 bg-gray-900/70 border border-gray-700/60 rounded-xl shadow-lg">
                <h2 className="text-lg sm:text-xl font-mono font-semibold text-blue-300 mb-5 flex items-center">
                    <ListFilter className="w-5 h-5 mr-2.5 text-blue-400" /> Araçları Hedef Tipine Göre Filtrele
                </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 items-end">
                <div>
                  <label htmlFor="target-type-select" className="block text-sm font-mono text-gray-300 mb-1.5">Hedef Tipi:</label>
                  <select id="target-type-select" value={selectedTargetType} onChange={(e) => setSelectedTargetType(e.target.value)} className="w-full bg-gray-800 border-2 border-gray-600 text-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono transition-all duration-150 ease-in-out">
                    {targetTypesForTools.map(type => (<option key={type} value={type}>{type}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="search-input" className="block text-sm font-mono text-gray-300 mb-1.5">Araç Adı/Açıklamasında Ara:</label>
                  <input id="search-input" type="text" placeholder="Örn: Sherlock, Maltego..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-800 border-2 border-gray-600 text-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono transition-all duration-150 ease-in-out"/>
                </div>
              </div>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card 
                    key={tool.name} 
                    className="bg-gray-900/80 border border-gray-700/60 flex flex-col rounded-xl overflow-hidden shadow-md hover:border-blue-500/80 hover:shadow-blue-500/40 hover:shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 ease-out group"
                  >
                    <CardHeader className="pb-3 pt-4 px-4">
                      <CardTitle className="text-md font-mono text-blue-300 flex items-center group-hover:text-blue-200 transition-colors duration-300">
                        {tool.icon ? <tool.icon className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" /> : <Wrench className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />}
                        {tool.name}
                      </CardTitle>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {tool.categories.map(cat => (
                          <Badge key={cat} variant="secondary" className="bg-gray-700/70 text-sky-400 text-xs px-2 py-0.5 border border-sky-600/50 rounded-full group-hover:bg-gray-700/90 group-hover:text-sky-300 transition-colors duration-300">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-1 pb-3 px-4">
                      <CardDescription className="text-gray-400 font-mono text-xs leading-relaxed line-clamp-3 sm:line-clamp-4 group-hover:text-gray-300 transition-colors duration-300">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto pt-3 pb-4 px-4 border-t border-gray-700/60">
                      <Button asChild variant="outline" size="sm" className="w-full text-blue-300 border-blue-500/70 hover:bg-blue-500 hover:text-black hover:border-blue-500 transition-all duration-200 ease-out">
                        <Link href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          Araca Git <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-700/50 rounded-lg bg-gray-900/50">
                <p className="text-lg font-mono text-gray-500">Filtrelerinize uygun OSINT aracı bulunamadı.</p>
                <p className="text-sm font-mono text-gray-600 mt-1">Farklı bir hedef tipi seçmeyi veya arama teriminizi değiştirmeyi deneyin.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="temel-kavramlar">
            <Card className="bg-gray-900/80 border border-gray-700/60 shadow-lg rounded-xl p-2 sm:p-6">
              <CardHeader><CardTitle className="text-xl sm:text-2xl font-mono text-blue-300 flex items-center"><Puzzle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-400" /> OSINT Temel Kavramları ve Metodolojileri</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-gray-300 font-mono leading-relaxed text-sm sm:text-base">
                 <p>OSINT sürecinde sıkça karşılaşacağınız bazı temel kavramlar ve yaklaşımlar:</p>
                <div>
                    <h4 className="font-semibold text-sky-300 text-base sm:text-lg">Pasif vs. Aktif Keşif:</h4>
                    <p className="text-xs sm:text-sm"><strong>Pasif Keşif:</strong> Hedefle doğrudan etkileşime girmeden, halka açık kaynaklardan (arama motorları, sosyal medya, arşivler) bilgi toplamaktır. Genellikle ilk adımdır ve iz bırakmaz. Hedefin haberi olmadan veri toplanır.</p>
                    <p className="text-xs sm:text-sm pt-1"><strong>Aktif Keşif:</strong> Hedef sistemlerle doğrudan etkileşime girerek (port tarama, web sitesiyle etkileşim, sahte profil ile mesajlaşma) bilgi toplamaktır. Daha fazla detay sağlayabilir ancak tespit edilme ve iz bırakma riski taşır.</p>
                </div>
                <div className="pt-2">
                    <h4 className="font-semibold text-sky-300 text-base sm:text-lg">OSINT Döngüsü (Intelligence Cycle):</h4>
                    <p className="text-xs sm:text-sm">Etkili bir OSINT çalışması genellikle şu adımları izler:</p>
                    <ol className="list-decimal list-inside pl-4 space-y-1 text-xs sm:text-sm">
                        <li><strong>Planlama ve Yönlendirme (Planning & Direction):</strong> Araştırmanın amacı ne? Hangi bilgilere ihtiyaç var? Kapsam nedir?</li>
                        <li><strong>Toplama (Collection):</strong> İlgili açık kaynaklardan verilerin toplanması.</li>
                        <li><strong>İşleme (Processing):</strong> Toplanan ham verinin kullanılabilir bir formata dönüştürülmesi (filtreleme, düzenleme, çeviri vb.).</li>
                        <li><strong>Analiz (Analysis):</strong> İşlenmiş verinin incelenerek anlamlı bilgilere ve sonuçlara dönüştürülmesi, bağlantıların kurulması.</li>
                        <li><strong>Yayma (Dissemination):</strong> Elde edilen istihbaratın ilgili kişi veya kurumlara uygun formatta sunulması.</li>
                        <li><strong>Geri Bildirim (Feedback):</strong> Sunulan istihbaratın etkinliğinin değerlendirilmesi ve gelecekteki çalışmalar için ders çıkarılması.</li>
                    </ol>
                </div>
                <div className="pt-2">
                    <h4 className="font-semibold text-sky-300 text-base sm:text-lg">Dijital Ayak İzi (Digital Footprint):</h4>
                    <p className="text-xs sm:text-sm">Bir bireyin veya kuruluşun internette bıraktığı izlerin tümüdür. Sosyal medya paylaşımları, web sitesi kayıtları, online alışverişler, forum yorumları gibi birçok aktivite dijital ayak izi oluşturur.</p>
                </div>
                <div className="pt-2">
                    <h4 className="font-semibold text-sky-300 text-base sm:text-lg">Sok Puppet (Sahte Profil):</h4>
                    <p className="text-xs sm:text-sm">Araştırmacının gerçek kimliğini gizlemek ve hedefle daha rahat etkileşim kurmak (veya sadece gözlem yapmak) için oluşturduğu sahte çevrimiçi kimliklerdir. Özellikle sosyal medya OSINT'inde ve insan kaynaklı istihbarat toplama çabalarında kullanılır.</p>
                </div>
                <p className="pt-3">Bu kavramlar ve daha fazlası, etkili bir OSINT operasyonunun temelini oluşturur. Detaylı metodolojiler ve teknikler için "Öğrenme Kaynakları" sekmesine göz atabilirsiniz.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ogrenme-kaynaklari">
            <Card className="bg-gray-900/80 border border-gray-700/60 shadow-lg rounded-xl p-2 sm:p-6">
              <CardHeader><CardTitle className="text-xl sm:text-2xl font-mono text-blue-300 flex items-center"><GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-400" /> OSINT Öğrenme Kaynakları ve Topluluklar</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-gray-300 font-mono leading-relaxed text-sm sm:text-base">
                <p>OSINT bilginizi ve becerilerinizi geliştirmek için faydalanabileceğiniz bazı kaynaklar:</p>
                <ul className="list-disc list-inside space-y-2.5 pl-4">
                  <li><Link href="https://osintframework.com/" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 hover:underline">OSINT Framework:<ExternalLink className="w-3 h-3 inline-block ml-1" /></Link> Kapsamlı bir OSINT araçları ve kaynakları koleksiyonu sunan interaktif bir web sitesi.</li>
                  <li><Link href="https://www.bellingcat.com/" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 hover:underline">Bellingcat:<ExternalLink className="w-3 h-3 inline-block ml-1" /></Link> Araştırmacı gazetecilik ve OSINT üzerine derinlemesine makaleler, kılavuzlar ve vaka çalışmaları yayınlayan bir platform.</li>
                  <li><Link href="https://inteltechniques.com/" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 hover:underline">IntelTechniques (Michael Bazzell):<ExternalLink className="w-3 h-3 inline-block ml-1" /></Link> OSINT, gizlilik ve güvenlik üzerine kapsamlı kitaplar, podcast'ler ve online araçlar sunar.</li>
                  <li><Link href="https://www.sans.org/cyber-security-courses/?focus-area=open-source-intelligence-osint" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 hover:underline">SANS Enstitüsü OSINT Kursları:<ExternalLink className="w-3 h-3 inline-block ml-1" /></Link> Sektörde tanınan, profesyonel düzeyde OSINT eğitimleri ve sertifikasyonları (genellikle ücretlidir).</li>
                  <li><strong>Trace Labs:</strong> Kayıp kişileri bulmak için OSINT becerilerinin kullanıldığı, kitle kaynaklı bir platform ve yarışmalar düzenler. Etik OSINT pratiği için harika bir yerdir.</li>
                  <li><strong>Reddit Toplulukları:</strong> `r/OSINT`, `r/netsec`, `r/privacy` gibi subreddit'lerde güncel tartışmalar, yeni araçlar, teknikler ve kaynak paylaşımları bulabilirsiniz.</li>
                  <li><strong>YouTube Kanalları:</strong> The Cyber Mentor, Joe Gray, OffensiveOSINT, Hak5 gibi kanallarda pratik OSINT eğitimleri, araç incelemeleri ve gösterimler yer alır.</li>
                  <li><strong>Twitter (X):</strong> Birçok OSINT uzmanı ve araştırmacısı aktif olarak bilgi ve ipuçları paylaşır. İlgili hashtag'leri (#OSINT) takip edebilirsiniz.</li>
                </ul>
                <p className="pt-3">Unutmayın, OSINT dünyası sürekli gelişmektedir. Yeni araçlar ve teknikler ortaya çıktıkça <strong className="text-sky-200">sürekli öğrenme ve pratik yapma</strong>, becerilerinizi güncel tutmanın anahtarıdır.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ----- YASAL UYARI VE ETİK KULLANIM BÖLÜMÜ ----- */}
        <div className="mt-16 pt-10 border-t border-gray-700/50">
          <div className="bg-gray-900/70 border border-yellow-500/40 rounded-xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-start sm:items-center mb-4">
              <div className="bg-yellow-500/25 p-2.5 rounded-full mr-3 sm:mr-4 shrink-0">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <h2 className="text-lg sm:text-xl font-mono font-semibold text-yellow-200">
                Önemli Uyarı: Etik Kullanım ve Yasal Sorumluluklar
              </h2>
            </div>
            <div className="space-y-3 text-sm text-gray-400 font-mono leading-relaxed selection:bg-yellow-500/30">
              <p>Bu "OSINT Merkezi" bölümünde sunulan tüm bilgiler, araçlar ve kaynaklar yalnızca <strong className="text-yellow-100 font-semibold">eğitim, araştırma ve bireysel farkındalık geliştirme</strong> amacıyla derlenmiştir.</p>
              <p>Listelenen OSINT araçlarının ve açıklanan tekniklerin kullanımı, tamamen kullanıcının kendi takdirine ve sorumluluğuna bağlıdır. Bu araçların ve bilgilerin yasa dışı faaliyetlerde, izinsiz sistemlere erişim girişimlerinde, bireylerin veya kurumların gizliliğini ihlal edecek şekilde, taciz veya takip amacıyla kullanılması <strong className="text-yellow-100 font-semibold">kesinlikle yasaktır ve ciddi yasal yaptırımlara</strong> tabidir.</p>
              <p>Herhangi bir kişi, kurum, sistem veya ağ hakkında OSINT teknikleri uygulamadan veya araçları kullanmadan önce, ilgili tüm yerel ve uluslararası yasalara uymak ve geçerli tüm izinleri almak <strong className="text-yellow-100 font-semibold">kullanıcının kendi yükümlülüğündedir</strong>. Unutmayın ki, "açık kaynak" olması, bilginin her koşulda ve izinsiz olarak kullanılabileceği anlamına gelmez.</p>
              <p>Siber Kale platformu ve geliştiricileri, bu sayfada sunulan bilgilerin veya araçların kötüye kullanılmasından kaynaklanabilecek hiçbir doğrudan veya dolaylı zarardan, kayıptan veya yasal sorundan sorumlu tutulamaz. Amacımız, siber güvenlik bilincini artırmak ve OSINT'in etik ve yasal çerçeveler içinde nasıl kullanılabileceğine dair farkındalık oluşturmaktır.</p>
              <p className="pt-2">Lütfen tüm faaliyetlerinizde <strong className="text-yellow-100 font-semibold">etik değerlere, yasalara ve başkalarının haklarına</strong> saygılı olun.</p>
            </div>
          </div>
        </div>
        {/* ----- YASAL UYARI BİTİŞ ----- */}

      </div>
    </div>
  );
}