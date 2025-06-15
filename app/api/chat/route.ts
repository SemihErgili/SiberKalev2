// Dosya Yolu: app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Groq istemcisini .env.local dosyasındaki anahtarla başlat
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return NextResponse.json(
        { error: "Mesajlar bulunamadı." },
        { status: 400 }
      );
    }

    // AI'a rolünü bildiren sistem talimatı. Bu sayede daha tutarlı cevaplar verir.
    const systemPrompt = {
      role: "system",
      content: "Sen 'Siber Kale' adlı, siber güvenlik araçları ve teknikleri konusunda uzman bir yapay zeka asistanısın. Cevapların her zaman Türkçe, net ve bilgilendirici olmalı. Kullanıcılara siber güvenlik dünyasında rehberlik et.",
    };

    // Groq'a gönderilecek mesajların başına sistem talimatını ekliyoruz
    const requestMessages = [systemPrompt, ...messages];

    const chatCompletion = await groq.chat.completions.create({
      messages: requestMessages,
      // Hızlı ve yetenekli Llama 3 modelini kullanıyoruz.
      model: "llama3-8b-8192", 
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || "Üzgünüm, bir hata oluştu ve cevap üretemedim.";

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error("Groq API Hatası:", error);
    return NextResponse.json(
      { error: "Yapay zeka servisine bağlanırken bir sorun oluştu." },
      { status: 500 }
    );
  }
}