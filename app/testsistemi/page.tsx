// Dosya Yolu: app/test-sistemi/page.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Terminal, Bot, HelpCircle, Award, CheckCircle, ChevronRight, Lightbulb, Trophy,
  Gamepad2, Zap, Star, Clock, Volume2, X, ShieldCheck // ShieldCheck eklendi (opsiyonel logo için)
} from "lucide-react";
import { getCurrentUser, isAuthenticated } from "@/lib/auth"; // BU DOSYANIN VARLIĞI ÇOK ÖNEMLİ

// --- PENTEST SENARYOSU VERİLERİ ---
const pentestScenario = [
  { id: 1, instruction: "Hedef sistemi keşfetmek için bir port taraması yapın.", expectedCommand: "nmap -sV 192.168.1.10", hint: "nmap komutu ile port taraması yapabilirsiniz. Servis versiyonlarını görmek için -sV parametresini kullanın.", output: `Starting Nmap 7.92 ( https://nmap.org )\nNmap scan report for target-server (192.168.1.10)\nHost is up (0.0054s latency).\nNot shown: 995 closed ports\nPORT     STATE SERVICE     VERSION\n21/tcp   open  ftp         vsftpd 3.0.3\n22/tcp   open  ssh         OpenSSH 7.6p1\n80/tcp   open  http        Apache httpd 2.4.29\nNmap done: 1 IP address (1 host) up, scanned in 12.58 seconds`, explanation: "Port taraması, hedef sistemdeki açık portları ve çalışan servisleri tespit etmek için kullanılır. Bu, pentest'in ilk adımıdır." },
  { id: 2, instruction: "Web sunucusunda çalışan uygulamayı keşfedin.", expectedCommand: "dirb http://192.168.1.10", hint: "dirb komutu ile web sunucusundaki dizinleri ve dosyaları keşfedebilirsiniz.", output: `DIRB v2.22\nURL_BASE: http://192.168.1.10/\nGENERATED WORDS: 4612\n==> DIRECTORY: http://192.168.1.10/admin/\n+ http://192.168.1.10/index.php (CODE:200|SIZE:1521)`, explanation: "Web dizin taraması, web uygulamasındaki gizli dizinleri, dosyaları ve potansiyel giriş noktalarını keşfetmenizi sağlar." },
  // ... DİĞER TÜM PENTEST ADIMLARINI BURAYA EKLEYİN ...
  { id: 10, instruction: "Admin hesabıyla web uygulamasına giriş yapın ve rapor oluşturun.", expectedCommand: "firefox http://192.168.1.10/login.php", hint: "Web tarayıcısı ile login sayfasına gidip, çözdüğünüz admin şifresiyle giriş yapabilirsiniz.", output: `Web tarayıcısı açıldı. Admin hesabıyla (kullanıcı adı: admin, şifre: password) başarıyla giriş yapıldı.\nTebrikler! Pentest senaryosunu başarıyla tamamladınız. Şimdi bir rapor oluşturarak bulgularınızı belgelemeniz gerekiyor.`, explanation: "Pentest'in son adımı, elde ettiğiniz bilgileri kullanarak sisteme erişim sağlamak ve bulgularınızı belgelemektir." },
];

// --- QUIZ OYUNU VERİLERİ ---
const questionPool = {
  beginner: [
    { id: 1, question: "Siber güvenliğin üç temel ilkesi nelerdir?", options: ["Gizlilik, Bütünlük, Erişilebilirlik", "Hız, Güvenlik, Kalite", "Donanım, Yazılım, İnsan", "Saldırı, Savunma, İzleme"], correct: 0, explanation: "CIA Triad: Confidentiality (Gizlilik), Integrity (Bütünlük), Availability (Erişilebilirlik)", points: 10 },
    { id: 2, question: "Phishing saldırısı nedir?", options: ["Ağ trafiğini dinleme", "Sahte e-postalarla bilgi çalma", "Sistemi virüsle enfekte etme", "Şifre kırma saldırısı"], correct: 1, explanation: "Phishing, sahte e-postalar kullanarak kişisel bilgileri çalmaya yönelik sosyal mühendislik saldırısıdır.", points: 10 },
    // ... DİĞER BEGINNER SORULARINI BURAYA EKLEYİN ...
  ],
  intermediate: [
    { id: 6, question: "SQL Injection saldırısında hangi karakter sıklıkla kullanılır?", options: ["#", "&", "'", "%"], correct: 2, explanation: "Tek tırnak (') karakteri SQL injection saldırılarında sıklıkla kullanılır.", points: 20 },
    // ... DİĞER INTERMEDIATE SORULARINI BURAYA EKLEYİN ...
  ],
  advanced: [
    { id: 11, question: "Buffer overflow saldırısında hangi register'ın kontrolü hedeflenir?", options: ["EAX", "EBX", "ESP", "EIP"], correct: 3, explanation: "EIP (Extended Instruction Pointer) register'ının kontrolü buffer overflow'da hedeflenir.", points: 30 },
    // ... DİĞER ADVANCED SORULARINI BURAYA EKLEYİN ...
  ],
};
// --- VERİLER BİTİŞ ---


export default function TestSystemPage() {
  const [user, setUser] = useState<any>(null); // Kullanıcı tipini kendi User tipinize göre güncelleyin
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("pentest");

  // Pentest modu state'leri
  const [currentStep, setCurrentStep] = useState(0);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [credits, setCredits] = useState(100);
  const [showSuccess, setShowSuccess] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [showWasted, setShowWasted] = useState(false);

  // Quiz modu state'leri
  const [quizStep, setQuizStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null); // Soru tipini tanımlayabilirsiniz
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizCredits, setQuizCredits] = useState(100);
  const [showQuizSuccess, setShowQuizSuccess] = useState(false);
  const [quizCooldownEnd, setQuizCooldownEnd] = useState<number | null>(null);
  const [cooldownTime, setCooldownTime] = useState("");

  // --- SES FONKSİYONLARI (İçlerini doldurmanız gerekiyor) ---
  const playSound = useCallback((type: "wasted" | "wrong" | "success" | "correct") => {
    console.log(`Çalınması İstenen Ses: ${type}`);
    // Örnek: if (typeof Audio !== "undefined") { new Audio(`/sounds/${type}.mp3`).play(); }
    // Gerçek ses çalma mantığını buraya ekleyin. Web Audio API veya <audio> etiketi kullanabilirsiniz.
    // Tarayıcıda kullanıcı etkileşimi olmadan ses çalmanın kısıtlı olabileceğini unutmayın.
  }, []);

  // Diğer ses fonksiyonları (playGTAWastedSound, playPoliceSiren vb.) buraya eklenebilir veya playSound içinde yönetilebilir.

  // --- COOLDOWN FONKSİYONLARI ---
  const checkQuizCooldown = useCallback(() => {
    if (!user || typeof window === "undefined") return false;
    const cooldownKey = `quiz_cooldown_${user.username || "anonymous_user"}`;
    const savedCooldown = localStorage.getItem(cooldownKey);
    if (savedCooldown) {
      const cooldownEndVal = parseInt(savedCooldown, 10);
      if (Date.now() < cooldownEndVal) {
        setQuizCooldownEnd(cooldownEndVal);
        return true;
      } else {
        localStorage.removeItem(cooldownKey);
      }
    }
    return false;
  }, [user]);

  useEffect(() => { // Cooldown sayacı
    let intervalId: NodeJS.Timeout;
    if (quizCooldownEnd) {
      const updateCountdown = () => {
        const remaining = quizCooldownEnd - Date.now();
        if (remaining <= 0) {
          setQuizCooldownEnd(null);
          setCooldownTime("");
          if (intervalId) clearInterval(intervalId);
        } else {
          const h = Math.floor(remaining / 3600000);
          const m = Math.floor((remaining % 3600000) / 60000);
          const s = Math.floor((remaining % 60000) / 1000);
          setCooldownTime(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
        }
      };
      updateCountdown(); // Hemen başlat
      intervalId = setInterval(updateCountdown, 1000);
    }
    return () => clearInterval(intervalId);
  }, [quizCooldownEnd]);


  // --- ANA useEffect (Kullanıcı ve Başlangıç Ayarları) ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isAuthenticated()) {
        // window.location.href = "/auth/login"; // Gerçek auth ile yönlendirme
        console.warn("Kullanıcı doğrulanmadı, test için devam ediliyor. Gerçek uygulamada /auth/login'e yönlendirin.");
        setUser({ username: "demo_kullanici", points: 0 }); // Sahte kullanıcı
        // Sahte kullanıcı için krediler
        setCredits(parseInt(localStorage.getItem(`pentest_credits_demo_kullanici`) || "100", 10));
        setQuizCredits(parseInt(localStorage.getItem(`quiz_credits_demo_kullanici`) || "100", 10));
      } else {
        const currentUserData = getCurrentUser();
        setUser(currentUserData);
        if (currentUserData) {
            setCredits(parseInt(localStorage.getItem(`pentest_credits_${currentUserData.username}`) || "100", 10));
            setQuizCredits(parseInt(localStorage.getItem(`quiz_credits_${currentUserData.username}`) || "100", 10));
        }
      }
      setOutput([
        "Kodluyo Siber Terminal v1.0",
        "Pentest Senaryosu: Hedef Web Uygulaması Güvenlik Testi",
        `Hoş geldin, ${user?.username || 'Hacker'}! Kredilerin: ${credits}`,
        "-------------------------------------------",
        pentestScenario[0]?.instruction || "Senaryo yüklenemedi.",
        "",
      ]);
    }
    setIsAuthChecked(true);
  }, []); // Sadece ilk render'da çalışır

  // Quiz için başlangıç ve sekme değişikliği
  useEffect(() => {
    if (user && activeTab === "quiz" && !currentQuestion && !quizCooldownEnd) {
      if (!checkQuizCooldown()) {
        generateNextQuestion();
      }
    }
  }, [user, activeTab, currentQuestion, quizCooldownEnd, checkQuizCooldown]); // generateNextQuestion bağımlılıklardan çıkarıldı

  // Kredileri localStorage'a kaydet
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      localStorage.setItem(`pentest_credits_${user.username}`, credits.toString());
    }
  }, [credits, user]);

  useEffect(() => {
    if (user && typeof window !== "undefined") {
      localStorage.setItem(`quiz_credits_${user.username}`, quizCredits.toString());
    }
  }, [quizCredits, user]);

  // Terminal scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // --- QUIZ FONKSİYONLARI ---
  const generateNextQuestion = useCallback(() => {
    if (!user) return;
    let difficulty = "beginner";
    // @ts-ignore 
    if (user.points && user.points >= 500) difficulty = "advanced";
    // @ts-ignore
    else if (user.points && user.points >= 200) difficulty = "intermediate";

    const pool = questionPool[difficulty as keyof typeof questionPool];
    if (!pool || pool.length === 0) {
        console.error(`${difficulty} seviyesinde soru bulunamadı.`);
        setCurrentQuestion(null); // Soru yoksa null ata
        setShowQuizSuccess(true); // Belki bir "soru yok" mesajı gösterilebilir.
        return;
    }
    const availableQuestions = pool.filter(q => !usedQuestions.includes(q.id));

    if (availableQuestions.length === 0) {
      const cooldownEndVal = Date.now() + 24 * 60 * 60 * 1000;
      const cooldownKey = `quiz_cooldown_${user.username || "anonymous_user"}`;
      if (typeof window !== "undefined") localStorage.setItem(cooldownKey, cooldownEndVal.toString());
      setQuizCooldownEnd(cooldownEndVal);
      setShowQuizSuccess(true); // Bu, "Tüm sorular bitti" modal'ını tetikler
      playSound("success");
      return;
    }
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setIsCorrect(null);
  }, [user, usedQuestions, playSound]);

  const handleQuizAnswer = useCallback((answerIndex: number) => {
    if (!currentQuestion) return;
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correct;
    setIsCorrect(correct);
    setShowQuizResult(true);

    if (correct) {
      playSound("correct");
      setQuizScore(prev => prev + currentQuestion.points);
      setQuizStep(prev => prev + 1);
      setUsedQuestions(prev => [...prev, currentQuestion.id]);
      setTimeout(() => { generateNextQuestion(); }, 3000);
    } else {
      playSound("wrong");
      // Yanlış cevapta sadece skoru sıfırla, diğerleri kalabilir veya farklı bir mantık uygulanabilir
      setQuizScore(0); 
      setQuizStep(0);
      setUsedQuestions([]); // Veya sadece son yanlışı sıfırlama gibi
      setTimeout(() => { generateNextQuestion(); }, 2000);
    }
  }, [currentQuestion, playSound, generateNextQuestion]);

  const requestQuizAIHelp = useCallback(() => {
    if (quizCredits < 15) { alert("Yeterli krediniz yok! Quiz'de AI yardımı 15 kredi gerektirir."); return; }
    if (!currentQuestion) return;
    setQuizCredits(prev => prev - 15);
    const wrongOptions = currentQuestion.options.map((_: any, idx: number) => idx).filter((idx: number) => idx !== currentQuestion.correct);
    const optionsToEliminateCount = Math.min(2, wrongOptions.length > 1 ? wrongOptions.length -1 : 0); // En az 1 doğru seçenek kalsın
    const eliminated = [];
    for(let k=0; k<optionsToEliminateCount; k++){
        const randomIndex = Math.floor(Math.random() * wrongOptions.length);
        eliminated.push(wrongOptions.splice(randomIndex, 1)[0]);
    }
    alert(`AI Yardımı: ${eliminated.map(i => String.fromCharCode(65 + i)).join(" ve ")} seçenekleri yanlış olabilir.`);
  }, [quizCredits, currentQuestion]);


  // --- PENTEST FONKSİYONLARI ---
  const handleCommandSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || !pentestScenario[currentStep]) return;
    setOutput(prev => [...prev, `$ ${command}`]);
    const currentScenario = pentestScenario[currentStep];
    if (command.trim().toLowerCase() === currentScenario.expectedCommand.toLowerCase() || command.trim().toLowerCase().includes(currentScenario.expectedCommand.split(" ")[0].toLowerCase())) {
      setOutput(prev => [...prev, currentScenario.output, ""]);
      setCompletedSteps(prev => [...prev, currentStep]);
      if (currentStep < pentestScenario.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        setTimeout(() => {
             setOutput(prevOutput => [...prevOutput, "-------------------------------------------", pentestScenario[nextStep].instruction, ""]);
        }, 300);
      } else {
        playSound("success");
        setShowSuccess(true);
      }
    } else {
      playSound("wasted");
      setCredits(0);
      setShowWasted(true);
      setOutput(prev => [...prev, "❌ YANLIŞ KOMUT! Sistem güvenlik ihlali tespit etti!", "🚨 TÜM KREDİLERİNİZ KAYBOLDU!", ""]);
    }
    setCommand("");
    setShowAIHelp(false);
    setShowHint(false);
  }, [command, currentStep, playSound]);

  const requestAIHelp = useCallback(() => {
    if (credits < 10) { setOutput(prev => [...prev, "Yeterli krediniz yok! En az 10 kredi gerekiyor.", ""]); return; }
    if (!pentestScenario[currentStep]) return;
    setIsLoadingAI(true);
    setShowAIHelp(true);
    setTimeout(() => {
      const currentScenario = pentestScenario[currentStep];
      setAiResponse(`AI Yardımı: ${currentScenario.hint} Doğru komut: ${currentScenario.expectedCommand}`);
      setIsLoadingAI(false);
      setCredits(prev => prev - 10);
    }, 1500);
  }, [credits, currentStep]);

  const progress = pentestScenario.length > 0 ? (completedSteps.length / pentestScenario.length) * 100 : 0;
  const quizProgress = Math.min((quizStep / 10) * 100, 100);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400"></div>
        <p className="ml-4 text-gray-400 font-mono">Sistem başlatılıyor...</p>
      </div>
    );
  }
  
  if (!user) { // Bu genellikle isAuthenticated false ise tetiklenir ve yukarıdaki useEffect yönlendirir
     return <div className="min-h-screen bg-black text-green-400 flex items-center justify-center"><p className="font-mono text-xl">Giriş yapmanız gerekiyor...</p></div>;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 pt-20 sm:pt-24 pb-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-mono font-bold mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {"> Test Merkezi"}
          </h1>
          <p className="text-gray-400 text-md sm:text-lg font-mono">
            Pentest senaryosu veya quiz merdiveni ile becerilerinizi test edin.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/70 border border-gray-700/80 rounded-lg shadow-md">
            <TabsTrigger value="pentest" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-300 data-[state=active]:shadow-lg text-gray-400 hover:bg-gray-800/70 hover:text-gray-200 font-mono rounded-l-md py-2.5 text-xs sm:text-sm transition-all duration-200">
              <Terminal className="w-4 h-4 mr-1.5 sm:mr-2" /> Pentest Senaryosu
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300 data-[state=active]:shadow-lg text-gray-400 hover:bg-gray-800/70 hover:text-gray-200 font-mono rounded-r-md py-2.5 text-xs sm:text-sm transition-all duration-200">
              <Gamepad2 className="w-4 h-4 mr-1.5 sm:mr-2" /> Quiz Merdiveni
            </TabsTrigger>
          </TabsList>

          {/* PENTEST TAB İÇERİĞİ */}
          <TabsContent value="pentest" className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="w-full md:w-2/3">
                <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono"><span>İlerleme: {completedSteps.length}/{pentestScenario.length}</span><span>{Math.round(progress)}%</span></div>
                <Progress value={progress} className="h-3 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-cyan-500" />
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-purple-600/30 text-purple-300 border-purple-500/60 font-mono text-sm py-1.5 px-3"><Award className="w-4 h-4 mr-2" /> {credits} Kredi</Badge>
                <TooltipProvider>
                  <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" className="border-gray-600/70 text-gray-400 hover:bg-gray-800/70 hover:text-gray-200 w-9 h-9"><HelpCircle className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent><p className="text-xs font-mono">AI yardımı 10 kredi.</p></TooltipContent></Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-gray-900/70 border-cyan-500/40 shadow-md rounded-lg">
                  <CardHeader className="py-3 px-4"><CardTitle className="text-cyan-300 font-mono flex items-center gap-2 text-sm sm:text-base"><Terminal className="w-4 h-4" />Adım {currentStep + 1}: {pentestScenario[currentStep]?.instruction || "Senaryo Yükleniyor..."}</CardTitle></CardHeader>
                </Card>
                <Card className="bg-black border-green-500/40 shadow-lg rounded-lg">
                  <CardContent className="p-0">
                    <div className="bg-gray-900/80 border-b border-gray-700/80 p-2 flex justify-between items-center rounded-t-lg"><div className="flex items-center gap-1.5 sm:gap-2"><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div></div><span className="text-xs font-mono text-gray-500">siberkale@terminal:~</span></div>
                    <div ref={terminalRef} className="p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-300 h-[350px] sm:h-[400px] overflow-y-auto whitespace-pre-wrap bg-black/80 rounded-b-lg">{output.map((line, idx) => (<div key={idx} className={line.startsWith("$") ? "text-cyan-300" : (line.startsWith("❌") || line.startsWith("🚨") ? "text-red-400 font-semibold" : "text-green-300")}>{line}</div>))}</div>
                    <form onSubmit={handleCommandSubmit} className="border-t border-gray-700/80 p-2 bg-gray-900/80 rounded-b-lg"><div className="flex items-center"><span className="text-green-300 font-mono mr-2">$</span><Input value={command} onChange={(e) => setCommand(e.target.value)} className="bg-transparent border-none text-green-300 font-mono focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-xs sm:text-sm" placeholder="Komutunuzu girin..." autoFocus /></div></form>
                  </CardContent>
                </Card>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button variant="outline" className="border-yellow-500/60 text-yellow-300 hover:bg-yellow-500/20 hover:text-yellow-200 text-xs sm:text-sm" onClick={() => setShowHint(!showHint)}><Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />{showHint ? "İpucunu Gizle" : "İpucu Göster"}</Button>
                  <Button variant="outline" className="border-purple-500/60 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 text-xs sm:text-sm" onClick={requestAIHelp} disabled={isLoadingAI || credits < 10}><Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />{isLoadingAI ? "Yükleniyor..." : "AI Yardımı (10 Kredi)"}</Button>
                </div>
                {showHint && pentestScenario[currentStep] && (<Alert className="bg-yellow-600/10 border-yellow-500/40 text-yellow-300 mt-4 rounded-lg"><Lightbulb className="h-4 w-4" /><AlertDescription className="text-yellow-200 text-xs sm:text-sm">{pentestScenario[currentStep].hint}</AlertDescription></Alert>)}
                {showAIHelp && (<Alert className="bg-purple-600/10 border-purple-500/40 mt-4 rounded-lg"><Bot className="h-4 w-4 text-purple-300" /><AlertDescription className="text-purple-200 text-xs sm:text-sm">{isLoadingAI ? <div className="flex items-center gap-2"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-300"></div><span>AI yanıtı...</span></div> : aiResponse}</AlertDescription></Alert>)}
              </div>
              <div className="lg:col-span-1">
                <Card className="bg-gray-900/70 border-gray-700/60 shadow-md rounded-lg h-full">
                  <CardHeader className="py-3 px-4"><CardTitle className="text-gray-400 font-mono text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-300" />İlerleme Paneli</CardTitle></CardHeader>
                  <CardContent className="space-y-3 p-3 sm:p-4">
                    <div className="relative mb-4"><div className="w-full h-28 sm:h-32 bg-gradient-to-b from-cyan-900/40 to-blue-900/40 rounded-lg border border-cyan-800/60 flex items-end justify-center overflow-hidden"><div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-green-500/60 to-cyan-500/60"></div><div className="absolute bottom-1 w-10 h-10 sm:w-12 sm:h-12 mb-1"><div className="w-full h-full bg-gradient-to-b from-green-500/90 to-green-700/90 rounded-full flex items-center justify-center border-2 border-green-400/60 shadow-lg"><Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" /></div><div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/40 rounded-full blur-sm"></div></div><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div></div></div>
                    <div className="space-y-1.5 sm:space-y-2">
                      {pentestScenario.map((step, index) => (<div key={`progress-${index}`} className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-md border text-xs sm:text-sm ${completedSteps.includes(index) ? "bg-green-600/15 border-green-500/40" : index === currentStep ? "bg-cyan-600/15 border-cyan-500/40" : "bg-gray-800/60 border-gray-700/60"}`}><div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-mono ${completedSteps.includes(index) ? "bg-green-500/30 text-green-300" : index === currentStep ? "bg-cyan-500/30 text-cyan-200" : "bg-gray-700/60 text-gray-500"}`}>{completedSteps.includes(index) ? <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <span>{index + 1}</span>}</div><div className={`truncate ${completedSteps.includes(index) ? "text-green-300" : index === currentStep ? "text-cyan-200" : "text-gray-500"}`}>{step.instruction}</div></div>))}
                    </div>
                    {pentestScenario[currentStep] && (<div className="bg-gray-800/60 border border-gray-700/60 rounded-lg p-2.5 sm:p-3 mt-3 sm:mt-4"><h4 className="text-cyan-300 font-mono text-xs mb-1.5">Adım Açıklaması:</h4><p className="text-gray-400 text-xs leading-relaxed">{pentestScenario[currentStep].explanation}</p></div>)}
                  </CardContent>
                </Card>
              </div>
            </div>
             {showSuccess && ( <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"><Card className="bg-gray-900/95 border-green-500/60 max-w-md w-full shadow-2xl"><CardHeader><CardTitle className="text-green-300 font-mono flex items-center gap-2 text-lg sm:text-xl"><Trophy className="w-5 h-5 sm:w-6 sm:h-6" />Tebrikler! Senaryo Tamamlandı!</CardTitle></CardHeader><CardContent className="space-y-4"><div className="bg-green-600/15 border border-green-500/40 rounded-lg p-4"><p className="text-green-200 text-sm mb-3">Pentest senaryosunu başarıyla tamamladınız!</p><div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-300" /><span className="text-green-300">{pentestScenario.length}/{pentestScenario.length} adım tamamlandı</span></div></div><div className="bg-yellow-600/15 border border-yellow-500/40 rounded-lg p-4"><h4 className="text-yellow-300 font-mono text-sm mb-2">Kazanımlar:</h4><ul className="space-y-1 text-sm text-gray-300"><li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-yellow-300" /><span>500 Puan</span></li><li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-yellow-300" /><span>"Pentest Uzmanı" rozeti</span></li></ul></div><div className="flex gap-3"><Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-mono text-sm sm:text-base" onClick={() => { if (typeof window !== "undefined") window.location.href = "/dashboard";}}>Dashboard</Button><Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm sm:text-base" onClick={() => { setShowSuccess(false); setCurrentStep(0); setCompletedSteps([]); setOutput(["Terminal Başlatıldı...", pentestScenario[0]?.instruction || "", ""]); }}>Tekrar Dene</Button></div></CardContent></Card></div>)}
             {showWasted && ( <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4"><div className="text-center relative"><div className="absolute inset-0 animate-pulse"><div className="absolute top-0 left-0 w-full h-full bg-red-600/20 animate-ping"></div><div className="absolute top-0 left-0 w-full h-full bg-blue-600/20 animate-ping" style={{ animationDelay: "0.5s" }}></div></div><div className="relative z-10"><div className="text-6xl sm:text-8xl md:text-9xl font-mono font-bold text-red-500 mb-6 sm:mb-8 animate-bounce">WASTED</div><div className="text-xl sm:text-2xl md:text-3xl font-mono text-red-400 mb-6 sm:mb-8 animate-pulse">🚨 GÜVENLİK İHLALİ! 🚨</div><div className="text-md sm:text-lg font-mono text-gray-400 mb-8">Yanlış komut girdiniz ve yakalandınız!<br />Tüm kredileriniz sıfırlandı.</div><div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"><Button className="bg-red-600 hover:bg-red-700 text-white font-mono text-md sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 animate-pulse" onClick={() => { setShowWasted(false); setCredits(50); setCurrentStep(0); setCompletedSteps([]); setOutput(["Terminal Yeniden Başlatıldı (50 Kredi)", pentestScenario[0]?.instruction || "", ""]); }}>Tekrar Dene (50 Kredi)</Button><Button className="bg-gray-600 hover:bg-gray-700 text-white font-mono text-md sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3" onClick={() => { if (typeof window !== "undefined") window.location.href = "/dashboard";}}>Dashboard'a Kaç</Button></div></div></div></div>)}
          </TabsContent>

          {/* QUIZ TAB İÇERİĞİ */}
          <TabsContent value="quiz" className="mt-6 space-y-6">
            {quizCooldownEnd ? ( <div className="text-center py-16"><Card className="bg-gray-900/80 border-orange-500/40 max-w-md mx-auto shadow-xl rounded-lg"><CardHeader><CardTitle className="text-orange-300 font-mono flex items-center gap-2 justify-center text-lg sm:text-xl"><Clock className="w-5 h-5 sm:w-6 sm:h-6" />Quiz Tamamlandı!</CardTitle></CardHeader><CardContent className="space-y-4"><div className="bg-orange-600/15 border border-orange-500/40 rounded-lg p-4"><p className="text-orange-200 text-sm mb-3">Tebrikler! Tüm soruları başarıyla tamamladınız.<br />Yeni sorular için 24 saat beklemeniz gerekiyor.</p><div className="text-center"><div className="text-xl sm:text-2xl font-mono text-orange-300 mb-1 sm:mb-2">{cooldownTime}</div><div className="text-xs text-gray-400">Kalan süre</div></div></div><Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-mono text-sm sm:text-base" onClick={() => { if (typeof window !== "undefined") window.location.href = "/dashboard";}}>Dashboard'a Dön</Button></CardContent></Card></div> ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="w-full md:w-2/3">
                     <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono"><span>Merdiven: {quizStep}/10</span><span>{Math.round(quizProgress)}%</span></div>
                     <Progress value={quizProgress} className="h-3 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500" />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge className="bg-yellow-600/30 text-yellow-300 border-yellow-500/60 font-mono text-xs sm:text-sm py-1.5 px-2.5 sm:px-3"><Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />{quizScore} Puan</Badge>
                    <Badge className="bg-purple-600/30 text-purple-300 border-purple-500/60 font-mono text-xs sm:text-sm py-1.5 px-2.5 sm:px-3"><Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />{quizCredits} Kredi</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {currentQuestion && (
                      <Card className="bg-gray-900/70 border-purple-500/40 shadow-md rounded-lg">
                        <CardHeader className="px-4 py-3 sm:px-5 sm:py-4"><CardTitle className="text-purple-300 font-mono flex items-center gap-2 text-md sm:text-lg"><Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />Soru {quizStep + 1} ({currentQuestion.points} Puan)</CardTitle></CardHeader>
                        <CardContent className="space-y-4 sm:space-y-5 px-4 pb-4 sm:px-5 sm:pb-5">
                          <div className="text-white text-md sm:text-lg font-mono leading-relaxed">{currentQuestion.question}</div>
                          <div className="space-y-2.5 sm:space-y-3">
                            {currentQuestion.options.map((option: string, index: number) => (<button key={index} onClick={() => !showQuizResult && handleQuizAnswer(index)} disabled={showQuizResult} className={`w-full p-3 sm:p-4 rounded-md border text-left transition-all duration-200 font-mono text-xs sm:text-sm ${showQuizResult ? (index === currentQuestion.correct ? "bg-green-600/25 border-green-500/60 text-green-300" : (index === selectedAnswer && !isCorrect ? "bg-red-600/25 border-red-500/60 text-red-300" : "bg-gray-800/60 border-gray-700/70 text-gray-400 cursor-not-allowed")) : (selectedAnswer === index ? "bg-purple-600/25 border-purple-500/60 text-purple-300" : "bg-gray-800/60 border-gray-700/70 text-gray-300 hover:bg-gray-700/70 hover:border-gray-600/80")}`}><span className="text-cyan-300 mr-2.5 sm:mr-3">{String.fromCharCode(65 + index)})</span>{option}{showQuizResult && index === currentQuestion.correct && (<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 float-right mt-0.5" />)}</button>))}
                          </div>
                          {showQuizResult && (<div className={`p-3 sm:p-4 rounded-md border mt-3 sm:mt-4 ${isCorrect ? "bg-green-600/15 border-green-500/40" : "bg-red-600/15 border-red-500/40"}`}><div className={`font-mono text-sm mb-1.5 sm:mb-2 ${isCorrect ? "text-green-300" : "text-red-300"}`}>{isCorrect ? "🎉 Doğru! Bir basamak tırmandın!" : "❌ Yanlış! Tekrar dene."}</div><div className="text-gray-300 text-xs sm:text-sm"><strong>Açıklama:</strong> {currentQuestion.explanation}</div>{isCorrect && (<div className="text-yellow-300 text-xs sm:text-sm mt-1.5 sm:mt-2">+{currentQuestion.points} puan kazandınız!</div>)}{!isCorrect && (<div className="text-red-300 text-xs sm:text-sm mt-1.5 sm:mt-2">Puan kazanamadın, ama pes etme!</div>)}</div>)}
                          {!showQuizResult && (<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4"><Button variant="outline" className="border-purple-500/60 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 text-xs sm:text-sm flex-1" onClick={requestQuizAIHelp} disabled={quizCredits < 15}><Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />AI Yardımı (15 Kredi)</Button><Button variant="outline" className="border-gray-600/70 text-gray-400 hover:bg-gray-800/70 hover:text-gray-200 text-xs sm:text-sm flex-1" onClick={generateNextQuestion}><Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />Soruyu Atla</Button></div>)}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className="lg:col-span-1">
                    <Card className="bg-gray-900/70 border-gray-700/60 shadow-md rounded-lg h-full">
                      <CardHeader className="py-3 px-4"><CardTitle className="text-gray-400 font-mono text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-300" />Quiz Merdiveni</CardTitle></CardHeader>
                      <CardContent className="space-y-1.5 sm:space-y-2 p-3 sm:p-4">
                        {Array.from({ length: 10 }, (_, index) => { const step = 10 - index; const isActive = quizStep + 1 === step; const isDone = quizStep >= step; return (<div key={`ladder-${step}`} className={`relative p-2 sm:p-3 rounded-md border transition-all duration-300 ${isDone ? "bg-green-600/20 border-green-500/50" : isActive ? "bg-purple-600/20 border-purple-500/50 animate-pulse" : "bg-gray-800/60 border-gray-700/60"}`}><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 sm:gap-2"><div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-mono ${isDone ? "bg-green-500/30 text-green-300" : isActive ? "bg-purple-500/30 text-purple-200" : "bg-gray-700/60 text-gray-500"}`}>{isDone ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> : step}</div><span className={`text-xs sm:text-sm font-mono ${isDone ? "text-green-300" : isActive ? "text-purple-200" : "text-gray-500"}`}>Basamak {step}</span></div>{isDone && !isActive && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />}{isActive && <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 animate-pulse" />}</div>{isActive && (<div className="absolute -left-5 sm:-left-6 top-1/2 transform -translate-y-1/2 animate-bounce" style={{animationDuration: '1.5s'}}><div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50"><span className="text-xs">🧗</span></div></div>)}</div>);})}
                        <div className="bg-gradient-to-r from-green-600/40 to-cyan-600/40 h-4 rounded-lg border border-green-500/60 flex items-center justify-center mt-2"><span className="text-xs font-mono text-green-300">🏁 Başlangıç</span></div>
                        <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-mono"><div className="flex justify-between text-gray-400"><span>Toplam Puan:</span><span className="text-yellow-300">{quizScore}</span></div><div className="flex justify-between text-gray-400"><span>Tamamlanan:</span><span className="text-green-300">{quizStep}/10</span></div><div className="flex justify-between text-gray-400"><span>Kalan Kredi:</span><span className="text-purple-300">{quizCredits}</span></div></div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
             {showQuizSuccess && ( <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"><Card className="bg-gray-900/95 border-purple-500/60 max-w-md w-full shadow-2xl"><CardHeader><CardTitle className="text-purple-300 font-mono flex items-center gap-2 text-lg sm:text-xl"><Trophy className="w-5 h-5 sm:w-6 sm:h-6" />Merdiveni Tırmandınız!</CardTitle></CardHeader><CardContent className="space-y-4"><div className="bg-purple-600/15 border border-purple-500/40 rounded-lg p-4"><p className="text-purple-200 text-sm mb-3">Quiz merdivenini başarıyla tırmandınız! {quizScore} puan kazandınız.<br /><span className="text-orange-300 font-semibold">24 saat sonra yeni sorularla tekrar oynayabilirsiniz!</span></p><div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-purple-300" /><span className="text-purple-300">10/10 basamak tamamlandı</span></div></div><div className="flex gap-3"><Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-mono text-sm sm:text-base" onClick={() => { if (typeof window !== "undefined") window.location.href = "/dashboard";}}>Dashboard</Button></div></CardContent></Card></div>)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}