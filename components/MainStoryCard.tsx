import React from 'react';
import QRCode from 'react-qr-code';
import { NewsItem } from '../types';
import { getRelativeTime } from '../utils/date';
import { MAIN_ROTATE_MS } from '../constants';

interface MainStoryCardProps {
  item: NewsItem;
  isTransitioning?: boolean;
}

const MainStoryCard: React.FC<MainStoryCardProps> = ({ item, isTransitioning = false }) => {
  return (
    <article className="main-story-panel" aria-live="polite">
      <div className="progress-track">
        {!isTransitioning && (
          <div
            className="progress-bar"
            style={{ animationDuration: `${MAIN_ROTATE_MS}ms` }}
          />
        )}
      </div>

      <div className="main-story-content">
        <div className="story-meta">
          <span className="source-chip">{item.sourceName}</span>
          <span className="time-chip">{getRelativeTime(item.pubDate)}</span>
        </div>

        <h1 className="main-story-title">{item.title}</h1>

        <p className="main-story-subtitle">{item.description}</p>

        <div className="main-story-body-wrap">
          <p className="main-story-body">{item.content}</p>
          <div className="qr-block">
            <QRCode
              size={100}
              style={{ width: '100%', height: 'auto' }}
              value={item.link || ''}
              viewBox="0 0 256 256"
            />
            <div className="qr-label">Leggi tutto</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MainStoryCard;
