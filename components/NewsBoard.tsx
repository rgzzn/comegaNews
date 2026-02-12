import React, { useEffect, useMemo, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { NewsItem } from '../types';
import MainStoryCard from './MainStoryCard';
import StoryCard from './StoryCard';
import Clock from './Clock';
import { MAIN_ROTATE_MS, SECONDARY_ITEMS_COUNT, SECONDARY_ROTATE_MS, DEFAULT_IMAGE } from '../constants';

interface NewsBoardProps {
  news: NewsItem[];
}

const NewsBoard: React.FC<NewsBoardProps> = ({ news }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [secondaryOffset, setSecondaryOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (news.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setMainIndex((prev) => (prev + 1) % news.length);
        setIsTransitioning(false);
      }, 250);
    }, MAIN_ROTATE_MS);

    return () => clearInterval(interval);
  }, [news.length]);

  useEffect(() => {
    if (news.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setSecondaryOffset((prev) => {
        const nextOffset = prev + SECONDARY_ITEMS_COUNT;
        return nextOffset >= news.length ? 0 : nextOffset;
      });
    }, SECONDARY_ROTATE_MS);

    return () => clearInterval(interval);
  }, [news.length]);

  const mainItem = news[mainIndex];

  const secondaryItems = useMemo(() => {
    if (news.length < 2 || !mainItem) {
      return [];
    }

    const items: NewsItem[] = [];
    let cursor = secondaryOffset;

    while (items.length < SECONDARY_ITEMS_COUNT && cursor < secondaryOffset + news.length * 2) {
      const candidate = news[cursor % news.length];
      if (candidate.id !== mainItem.id) {
        items.push(candidate);
      }
      cursor += 1;
    }

    return items;
  }, [mainItem, news, secondaryOffset]);

  if (!mainItem) {
    return null;
  }

  return (
    <section className="news-layout">
      <aside className="hero-image-panel">
        <img src={mainItem.imageUrl || DEFAULT_IMAGE} alt={mainItem.title} />
        <div className="hero-overlay">
          <span className="hero-badge">Foto del giorno</span>
        </div>
      </aside>

      <MainStoryCard item={mainItem} isTransitioning={isTransitioning} />

      <aside className="sidebar-panel">
        <Clock />

        <div className="sidebar-heading">
          <Newspaper size={18} color="#ea580c" />
          <div>
            <h2 className="sidebar-title">Notizie</h2>
            <p className="sidebar-subtitle">In tempo reale</p>
          </div>
        </div>

        <div className="story-list">
          {secondaryItems.map((item) => (
            <StoryCard key={`${item.id}-${secondaryOffset}`} item={item} />
          ))}
        </div>
      </aside>
    </section>
  );
};

export default NewsBoard;
