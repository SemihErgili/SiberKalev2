// Dosya Yolu: app/api/news/route.ts

import { NextRequest, NextResponse } from "next/server";

const NEWS_API_ENDPOINT = "https://newsapi.org/v2/everything"; // Veya 'top-headlines' kullanabilirsin
const API_KEY = process.env.NEWS_API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    console.error("HATA: News API anahtarı yapılandırılmamış. .env.local dosyasını kontrol edin.");
    return NextResponse.json(
      { error: "News API anahtarı yapılandırılmamış." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const queryFromClient = searchParams.get("q"); // Client'tan gelen 'q' parametresini al
  const languageFromClient = searchParams.get("language"); // Client'tan gelen 'language'
  const pageSizeFromClient = searchParams.get("pageSize"); // Client'tan gelen 'pageSize'

  // Eğer client'tan parametre gelmezse varsayılan değerleri kullan
  const query = queryFromClient || "siber güvenlik"; 
  const language = languageFromClient || "tr";
  const pageSize = pageSizeFromClient || "9";

  // Cache'i kırmak için her istekte değişen bir parametre (cache buster)
  const cacheBuster = `&_cb=${new Date().getTime()}`;

  // NewsAPI'ye gönderilecek URL'i oluştur
  const apiUrl = `${NEWS_API_ENDPOINT}?q=${encodeURIComponent(query)}&language=${language}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}${cacheBuster}`;
  
  // Terminalde loglama
  console.log("------------------------------------------------------");
  console.log(`[${new Date().toISOString()}] GET /api/news isteği alındı.`);
  console.log("İstemciden Gelen Parametreler (varsa):");
  console.log(`  q: ${queryFromClient || '(varsayılan kullanıldı)'}`);
  console.log(`  language: ${languageFromClient || '(varsayılan kullanıldı)'}`);
  console.log(`  pageSize: ${pageSizeFromClient || '(varsayılan kullanıldı)'}`);
  console.log("NewsAPI'ye Gönderilecek Son URL:", apiUrl);
  console.log("------------------------------------------------------");

  try {
    const apiResponse = await fetch(apiUrl, {
      cache: 'no-store', // Next.js'e bu isteği cache'lememesini söyler
    });

    // Cevabın metin halini alıp loglayalım (hata ayıklama için)
    const responseText = await apiResponse.text();
    // console.log("NewsAPI Ham Cevap (Text):", responseText); // İstersen bu logu açabilirsin, çok uzun olabilir

    if (!apiResponse.ok) {
      console.error(`NewsAPI Hata (status ${apiResponse.status}):`, responseText);
      let errorMessage = `NewsAPI'den veri alınamadı: ${apiResponse.statusText}`;
      try {
        // Hata cevabı JSON formatında olabilir, onu parse etmeye çalışalım
        const errorJson = JSON.parse(responseText);
        if (errorJson.message) errorMessage = `NewsAPI Error: ${errorJson.message}`;
      } catch (e) {
        // Parse edilemiyorsa, ham metni kullan veya genel bir mesaj ver
        errorMessage = `NewsAPI'den ${apiResponse.status} koduyla hata alındı.`;
      }
      return NextResponse.json({ error: errorMessage }, { status: apiResponse.status });
    }

    // apiResponse.ok ise, metni JSON'a çevirmeyi dene
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
        console.error("JSON parse hatası:", parseError);
        console.error("Parse edilemeyen responseText:", responseText);
        return NextResponse.json(
          { error: "NewsAPI'den gelen cevap JSON formatında değil." },
          { status: 500 }
        );
    }

    // NewsAPI'nin kendi içindeki hata durumu (status: "error")
    if (data.status === "error") {
      console.error("NewsAPI (JSON içi) Hata Mesajı:", data.message);
      return NextResponse.json(
        { error: `NewsAPI Error: ${data.message}` },
        { status: data.code ? 400 : 500 } // NewsAPI bazen hata kodu dönebilir
      );
    }

    // console.log("NewsAPI'den başarılı veri alındı, makale sayısı:", data.articles ? data.articles.length : 0);
    return NextResponse.json(data);

  } catch (error: any) { // Hata tipini 'any' olarak belirttik
    console.error("API Route Genel Hatası (News):", error.message || error);
    return NextResponse.json(
      { error: "Haberler alınırken bir iç sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}