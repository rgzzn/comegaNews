import { FeedConfig } from '../types';

export const RSS_FEEDS: FeedConfig[] = [
  {
    id: 'rainews-tutti',
    name: 'RaiNews',
    url: 'https://www.rainews.it/rss/tutti',
    color: '#003399' // Rai Blue
  },
  {
    id: 'rainews-ultimora',
    name: 'RaiNews 24',
    url: 'https://www.rainews.it/rss/ultimora',
    color: '#004db3' // Lighter Rai Blue
  },
  {
    id: 'ansa-er',
    name: 'ANSA',
    url: 'https://www.ansa.it/emiliaromagna/notizie/emiliaromagna_rss.xml',
    color: '#2563eb' // Blue-600 (Classic News Blue)
  },
  {
    id: 'forli-today',
    name: 'ForlìToday',
    url: 'https://www.forlitoday.it/rss',
    color: '#f97316' // Orange-500 (Matches Brand & App Accent)
  },
  {
    id: 'resto-carlino',
    name: 'Il Resto del Carlino',
    url: 'https://www.ilrestodelcarlino.it/forli/rss',
    color: '#1e40af' // Blue-800
  },
  {
    id: 'corriere-romagna',
    name: 'Corriere Romagna',
    url: 'https://www.corriereromagna.it/forli/feed/',
    color: '#dc2626' // Red-600
  },
  {
    id: 'comune-forli-notizie',
    name: 'Comune di Forlì',
    url: 'https://www.comune.forli.fc.it/it/notizie/rss',
    color: '#ea580c' // Orange-600
  },
  {
    id: 'comune-forli-eventi',
    name: 'Eventi Forlì',
    url: 'https://www.comune.forli.fc.it/it/eventi/rss',
    color: '#d97706' // Amber-600
  }
];