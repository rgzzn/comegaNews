import { FeedConfig, NewsItem } from '../types';
import { RSS_FEEDS } from '../config/feeds';
import { CORS_PROXY } from '../constants';
import { extractImageFromContent } from '../utils/image';

const fetchFeed = async (feed: FeedConfig): Promise<NewsItem[]> => {
  try {
    // We use a CORS proxy to bypass browser restrictions on fetching XML from other domains
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feed.url)}`);
    
    if (!response.ok) throw new Error(`Failed to fetch ${feed.name}`);
    
    const data = await response.json();
    // AllOrigins returns the content in `contents` property
    const xmlText = data.contents;
    
    if (!xmlText) return [];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const items = Array.from(xmlDoc.querySelectorAll("item"));

    return items.map((item) => {
      const title = item.querySelector("title")?.textContent || "No Title";
      const link = item.querySelector("link")?.textContent || "";
      const pubDateStr = item.querySelector("pubDate")?.textContent || new Date().toISOString();
      const description = item.querySelector("description")?.textContent || "";
      const content = item.getElementsByTagNameNS("*", "encoded")[0]?.textContent || ""; // content:encoded
      
      // Attempt to find image in various RSS locations
      let imageUrl: string | undefined;
      
      // 1. Media content/enclosure
      const mediaContent = item.getElementsByTagNameNS("*", "content")[0] || item.getElementsByTagNameNS("*", "group")[0];
      if (mediaContent && mediaContent.getAttribute("url")) {
          imageUrl = mediaContent.getAttribute("url") || undefined;
      }
      const enclosure = item.querySelector("enclosure");
      if (!imageUrl && enclosure && enclosure.getAttribute("type")?.startsWith("image")) {
        imageUrl = enclosure.getAttribute("url") || undefined;
      }

      // 2. Extract from description or content HTML
      if (!imageUrl) {
        imageUrl = extractImageFromContent(content) || extractImageFromContent(description);
      }

      const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '').trim();
      const cleanDescription = stripHtml(description);
      // Use content:encoded if available and not empty, otherwise fallback to description
      const fullContent = stripHtml(content) || cleanDescription;

      return {
        id: link || title, // Simple unique ID
        title,
        link,
        pubDate: new Date(pubDateStr),
        sourceName: feed.name,
        imageUrl,
        description: cleanDescription.slice(0, 150) + (cleanDescription.length > 150 ? "..." : ""), // Short description for previews
        content: fullContent.slice(0, 4000) // Longer content for main story card
      };
    });

  } catch (error) {
    console.warn(`Error fetching feed ${feed.name}:`, error);
    return [];
  }
};

/**
 * Reorders the news list to prevent consecutive items from the same source where possible.
 * It prioritizes time, but skips to the next source if the current top item matches the previous source.
 */
const balanceNewsSources = (items: NewsItem[]): NewsItem[] => {
  const result: NewsItem[] = [];
  // Clone and ensure sorted by date first
  const pool = [...items].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  while (pool.length > 0) {
    let indexToPick = 0;

    // If we have added items, check the last one's source
    if (result.length > 0) {
      const lastSource = result[result.length - 1].sourceName;
      
      // Look for the first item in the pool that has a DIFFERENT source
      // We limit the lookahead (e.g., first 10 items) to keep things relatively fresh
      // or scan the whole pool if freshness isn't as critical as variety.
      const diffSourceIndex = pool.findIndex((item) => item.sourceName !== lastSource);
      
      // If we found a candidate with a different source, pick it
      if (diffSourceIndex !== -1) {
        indexToPick = diffSourceIndex;
      }
      // If -1, all remaining items are from the same source, so we just pick the first one (index 0)
    }

    // Add to result and remove from pool
    result.push(pool[indexToPick]);
    pool.splice(indexToPick, 1);
  }

  return result;
};

export const fetchAllNews = async (): Promise<NewsItem[]> => {
  const promises = RSS_FEEDS.map(feed => fetchFeed(feed));
  const results = await Promise.all(promises);
  
  // Flatten array
  const allNews = results.flat();

  // Deduplicate by ID (link)
  const uniqueNewsMap = new Map();
  allNews.forEach(item => {
    if (!uniqueNewsMap.has(item.id)) {
      uniqueNewsMap.set(item.id, item);
    }
  });
  
  const uniqueNews = Array.from(uniqueNewsMap.values());

  // Apply balancing algorithm
  return balanceNewsSources(uniqueNews);
};