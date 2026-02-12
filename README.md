# BentoNews Signage

A full-screen, React-based digital signage application designed for 16:9 TV displays (Yodeck, Kiosk). It aggregates RSS feeds into a "Bento" style grid layout with automatic rotation.

## Features

- **Full Screen 16:9 Layout**: Optimized for 1080p and 4K displays.
- **Client-Side RSS Parsing**: Uses a CORS proxy to fetch feeds directly in the browser (no backend required for basic usage).
- **Auto-Rotation**:
  - Main story changes every 25 seconds.
  - Secondary stories page every 35 seconds.
- **Robustness**: 
  - Caches last known good data in memory if network fails during refresh.
  - Dedupes articles.
  - Extracts images from RSS content/enclosures/HTML.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   npm install lucide-react date-fns
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Build**
   ```bash
   npm run preview
   ```

## Configuration

### Adding Feeds
Edit `src/config/feeds.ts`:

```typescript
export const RSS_FEEDS: FeedConfig[] = [
  {
    id: 'my-custom-feed',
    name: 'Tech News',
    url: 'https://example.com/rss.xml',
    color: '#ff0000'
  },
  // ...
];
```

### Changing Timing
Edit `.env` (create if needed) or modify `src/constants.ts` default values.

```
VITE_REFRESH_MINUTES=15
VITE_MAIN_ROTATE_SECONDS=25
```

## Deployment (Yodeck / Signage)

1. Run `npm run build`.
2. Upload the contents of the `dist/` folder to a static host (Vercel, Netlify, S3).
3. Point your Yodeck/Signage player to the hosted URL.

**Note on CORS**: This app uses `api.allorigins.win` as a public proxy to fetch RSS feeds. For a mission-critical production environment, it is recommended to host your own proxy server to ensure 100% uptime and avoid rate limits.
