import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import NewsBoard from './components/NewsBoard';
import { fetchAllNews } from './services/rss';
import { NewsItem } from './types';
import { REFRESH_INTERVAL_MS } from './constants';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(news.length === 0);

    try {
      const items = await fetchAllNews();
      if (items.length > 0) {
        setNews(items);
        setError(null);
      } else if (news.length === 0) {
        setError('Nessuna notizia disponibile. Controlla la connessione internet.');
      }
    } catch (err) {
      console.error(err);
      if (news.length === 0) {
        setError('Impossibile caricare i feed notizie.');
      }
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
      <div className="app-state">
        <Loader2 className="spin-loader" size={56} />
        <h2>Aggiornamento in corso...</h2>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="app-state">
        <AlertCircle size={72} color="#dc2626" />
        <h1>Servizio Interrotto</h1>
        <p>{error}</p>
        <button onClick={loadNews} type="button">
          <RefreshCw size={16} /> Riprova
        </button>
      </div>
    );
  }

  return (
    <main className="app-shell">
      <NewsBoard news={news} />
    </main>
  );
};

export default App;
