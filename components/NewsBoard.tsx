import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import MainStoryCard from './MainStoryCard';
import StoryCard from './StoryCard';
import Clock from './Clock';
import { MAIN_ROTATE_MS, SECONDARY_ITEMS_COUNT, SECONDARY_ROTATE_MS } from '../constants';
import { Newspaper } from 'lucide-react';

interface NewsBoardProps {
  news: NewsItem[];
}

const NewsBoard: React.FC<NewsBoardProps> = ({ news }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [secondaryOffset, setSecondaryOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotate Main Story
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setMainIndex((prev) => (prev + 1) % news.length);
        requestAnimationFrame(() => {
             setIsTransitioning(false);
        });
      }, 750);
    }, MAIN_ROTATE_MS);

    return () => clearInterval(interval);
  }, [news.length]);

  // Rotate Secondary Stories (Pagination)
  useEffect(() => {
    if (news.length <= 1) return;

    const interval = setInterval(() => {
      setSecondaryOffset((prev) => {
        // Just increment offset normally; the render logic handles skipping duplicates
        const nextOffset = prev + SECONDARY_ITEMS_COUNT;
        return nextOffset >= news.length ? 0 : nextOffset;
      });
    }, SECONDARY_ROTATE_MS);

    return () => clearInterval(interval);
  }, [news.length]);

  if (news.length === 0) return null;

  const mainItem = news[mainIndex];
  
  // Generate Secondary Items List
  // We strictly exclude the ID of the main item to prevent duplication on screen.
  const secondaryItems: NewsItem[] = [];
  let currentSearchOffset = secondaryOffset;
  let safetyCounter = 0; // Prevent infinite loops if array is too small

  while (secondaryItems.length < SECONDARY_ITEMS_COUNT && safetyCounter < news.length * 2) {
    const index = currentSearchOffset % news.length;
    const candidateItem = news[index];
    
    // Only add if it is NOT the main item currently displayed
    if (candidateItem.id !== mainItem.id) {
        secondaryItems.push(candidateItem);
    }
    
    currentSearchOffset++;
    safetyCounter++;
  }

  return (
    <div className="w-full h-full p-6 lg:p-12 box-border grid grid-cols-12 gap-8 relative bg-slate-100">
      
      {/* Header/Clock Area - Absolute Top Right */}
      <div className="absolute top-8 right-10 z-50">
        <Clock />
      </div>

      {/* Main Story Area (Left 8/12 = 66%) */}
      <div className="col-span-8 h-full">
        <MainStoryCard item={mainItem} isTransitioning={isTransitioning} />
      </div>

      {/* Secondary Stories Area (Right 4/12 = 33%) */}
      <div className="col-span-4 h-full flex flex-col pt-24">
        <div className="flex items-center gap-4 border-b-4 border-slate-200 pb-4 mb-8 animate-fade-in">
           <div className="p-3 bg-orange-500 rounded text-white">
             <Newspaper className="w-8 h-8" />
           </div>
           <div>
             <span className="text-slate-900 text-3xl font-black uppercase tracking-widest block leading-none">
              Ultime Notizie
            </span>
            <span className="text-base text-slate-500 font-medium">
              Aggiornamenti in tempo reale
            </span>
           </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          {secondaryItems.map((item, idx) => (
            <div key={`${item.id}-${secondaryOffset}-${idx}`} className="flex-1 min-h-0">
               <StoryCard 
                  item={item} 
                  delayClass={idx === 0 ? '' : idx === 1 ? 'delay-100' : 'delay-200'}
               />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBoard;