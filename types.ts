export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  sourceName: string;
  imageUrl?: string;
  description: string;
  content: string;
}

export interface FeedConfig {
  id: string;
  url: string;
  name: string;
  color?: string; // Optional branding color for source
}

export interface AppConfig {
  refreshMinutes: number;
  mainRotateSeconds: number;
  secondaryRotateSeconds: number;
}