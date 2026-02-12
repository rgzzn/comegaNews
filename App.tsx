import React, { useEffect, useState } from 'react';
import NewsBoard from './components/NewsBoard';
import { fetchAllNews } from './services/rss';
import { NewsItem } from './types';
import { REFRESH_INTERVAL_MS } from './constants';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(news.length === 0); // Only show full loader if no news exists
    try {
      const items = await fetchAllNews();
      if (items.length > 0) {
        setNews(items);
        setError(null);
      } else {
        // Keep old news if fetch fails but we have data
        if (news.length === 0) setError("Nessuna notizia disponibile. Controlla la connessione internet.");
      }
    } catch (err) {
      console.error(err);
      if (news.length === 0) setError("Impossibile caricare i feed notizie.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-slate-800">
        <Loader2 className="w-16 h-16 animate-spin text-orange-500 mb-4" />
        <h2 className="text-2xl font-light tracking-widest uppercase text-slate-500">Aggiornamento in corso...</h2>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-red-500 p-8 text-center">
        <AlertCircle className="w-24 h-24 mb-6 opacity-80" />
        <h1 className="text-4xl font-bold mb-4 text-slate-800">Servizio Interrotto</h1>
        <p className="text-xl text-slate-500 max-w-lg">{error}</p>
        <button 
          onClick={loadNews}
          className="mt-8 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors flex items-center gap-2 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" /> Riprova
        </button>
      </div>
    );
  }

  return (
    <main className="w-full h-full bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-orange-200 selection:text-orange-900">
      <NewsBoard news={news} />
      
      {/* Hidden Debug Refresh Button (Bottom Left Corner) */}
      <button 
        onClick={loadNews}
        className="absolute bottom-0 left-0 w-10 h-10 z-[100] opacity-0 hover:opacity-10 cursor-none"
        title="Forza Aggiornamento"
      />
    </main>
  );
};

export default App;