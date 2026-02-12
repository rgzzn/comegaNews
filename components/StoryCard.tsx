import React from 'react';
import { Clock3 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { NewsItem } from '../types';
import { getRelativeTime } from '../utils/date';
import { DEFAULT_IMAGE } from '../constants';

interface StoryCardProps {
  item: NewsItem;
}

const StoryCard: React.FC<StoryCardProps> = ({ item }) => {
  return (
    <article className="story-card">
      <img className="story-image" src={item.imageUrl || DEFAULT_IMAGE} alt={item.title} />
      <div className="story-content">
        <span className="story-source">{item.sourceName}</span>
        <h3 className="story-title">{item.title}</h3>
        <div className="story-footer">
          <span className="story-time">
            <Clock3 size={12} />
            {getRelativeTime(item.pubDate)}
          </span>
          <div className="mini-qr">
            <QRCode
              size={60}
              style={{ width: '100%', height: 'auto' }}
              value={item.link || ''}
              viewBox="0 0 256 256"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
