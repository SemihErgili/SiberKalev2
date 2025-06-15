// Dosya Yolu: app/(pages)/haberler/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink, Loader2, RefreshCw } from "lucide-react";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function HaberlerSayfasi() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (isRefreshAction = false) => {
    if (isRefreshAction) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await fetch("/api/news?q=siber%20güvenlik&language=tr&pageSize=9");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Haberler alınamadı: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
        console.warn("API'den makale gelmedi, dönen veri:", data);
      }
    } catch (err: any) {
      console.error("Haberleri çekerken hata:", err);
      setError(err.message || "Bir şeyler ters gitti.");
    } finally {
      if (isRefreshAction) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchNews(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshNews = () => {
    fetchNews(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
        <p className="mt-4 text-lg font-mono">Haberler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-mono font-bold text-red-500 mb-4">Hata!</h1>
        <p className="text-lg font-mono text-center">{error}</p>
        <Button onClick={handleRefreshNews} className="mt-6 bg-green-500 hover:bg-green-600 text-black" disabled={isRefreshing}>
          {isRefreshing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          {isRefreshing ? "Yenileniyor..." : "Tekrar Dene"}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8"> {/* Ana başlık için mb-8 yapalım */}
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400">
            {"> Siber Güvenlik Haberleri"}
          </h1>
          <p className="text-gray-400 text-lg font-mono">
            En son siber güvenlik gelişmeleri ve haberleri
          </p>
        </div>
        
        {/* ----- HABERLER BAŞLIĞI VE YENİLEME BUTONU ----- */}
        <div className="flex justify-between items-center mb-6"> {/* Yeni satır */}
          <h2 className="text-2xl font-mono font-semibold text-green-300">
            Son Haberler
          </h2>
          <Button 
            onClick={handleRefreshNews} 
            variant="outline" // Daha az dikkat çekici bir stil
            size="sm" // Biraz daha küçük buton
            className="border-green-500 text-green-400 hover:bg-green-500/10" 
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-1.5" />
            )}
            {isRefreshing ? "Yenileniyor" : "Yenile"}
          </Button>
        </div>
        {/* ----- HABERLER BAŞLIĞI VE YENİLEME BUTONU BİTİŞ ----- */}
        
        {articles.length === 0 && !isRefreshing && (
             <div className="text-center p-8 border border-dashed border-gray-700 rounded-lg">
                <h2 className="text-xl font-mono font-bold text-yellow-500 mb-2">Haber Bulunamadı</h2>
                <p className="text-md font-mono text-center text-gray-400">Belirtilen kriterlere uygun haber bulunamadı.</p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card key={article.url || index} className="bg-gray-900/70 border-gray-700 flex flex-col hover:border-green-500 transition-all duration-200">
              <CardHeader>
                {article.urlToImage && (
                  <div className="mb-4 h-48 overflow-hidden rounded-md bg-gray-800 flex items-center justify-center">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.placeholder-image')) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'placeholder-image w-full h-full flex items-center justify-center text-gray-500 text-sm';
                            placeholder.innerText = 'Resim Yüklenemedi';
                            parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>
                )}
                <CardTitle className="text-xl font-mono text-green-400 leading-tight">
                  {article.title}
                </CardTitle>
                {article.source.name && (
                    <Badge variant="outline" className="mt-2 border-cyan-500 text-cyan-400 w-fit">
                        {article.source.name}
                    </Badge>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-gray-400 font-mono text-sm leading-relaxed">
                  {article.description || "Açıklama bulunmuyor."}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-500 font-mono">
                  {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <Button asChild variant="ghost" size="sm" className="text-green-400 hover:text-black hover:bg-green-500">
                  <Link href={article.url} target="_blank" rel="noopener noreferrer">
                    Devamını Oku <ExternalLink className="w-3 h-3 ml-1.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}