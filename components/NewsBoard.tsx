import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import MainStoryCard from './MainStoryCard';
import StoryCard from './StoryCard';
import Clock from './Clock';
import { MAIN_ROTATE_MS, SECONDARY_ITEMS_COUNT, SECONDARY_ROTATE_MS, DEFAULT_IMAGE } from '../constants';
import { Newspaper } from 'lucide-react';

interface NewsBoardProps {
  news: NewsItem[];
}

const NewsBoard: React.FC<NewsBoardProps> = ({ news }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [secondaryOffset, setSecondaryOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Rotate Main Story
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setMainIndex((prev) => (prev + 1) % news.length);
        setImageLoaded(false); // Reset image load state for next slide
        requestAnimationFrame(() => {
             setIsTransitioning(false);
        });
      }, 800); // Slightly longer transition time for smoothness
    }, MAIN_ROTATE_MS);

    return () => clearInterval(interval);
  }, [news.length]);

  // Rotate Secondary Stories (Pagination)
  useEffect(() => {
    if (news.length <= 1) return;

    const interval = setInterval(() => {
      setSecondaryOffset((prev) => {
        const nextOffset = prev + SECONDARY_ITEMS_COUNT;
        return nextOffset >= news.length ? 0 : nextOffset;
      });
    }, SECONDARY_ROTATE_MS);

    return () => clearInterval(interval);
  }, [news.length]);

  if (news.length === 0) return null;

  const mainItem = news[mainIndex];
  
  // Logic to get secondary items (excluding main item)
  const secondaryItems: NewsItem[] = [];
  let currentSearchOffset = secondaryOffset;
  let safetyCounter = 0;

  while (secondaryItems.length < SECONDARY_ITEMS_COUNT && safetyCounter < news.length * 2) {
    const index = currentSearchOffset % news.length;
    const candidateItem = news[index];
    if (candidateItem.id !== mainItem.id) {
        secondaryItems.push(candidateItem);
    }
    currentSearchOffset++;
    safetyCounter++;
  }

  return (
    <div className="w-full h-full p-6 box-border grid grid-cols-12 gap-6 relative bg-slate-100 overflow-hidden">
      
      {/* --- HEADER (Absolute) --- */}
      <div className="absolute top-6 right-8 z-[60]">
        <Clock />
      </div>

      {/* --- COLUMN 1: MAIN IMAGE (Approx 33% width -> col-span-4/12) --- */}
      <div className="col-span-4 h-full relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group">
        <div className="absolute inset-0 bg-slate-900 z-0" />
        
        {/* Animated Image */}
        <img 
          key={mainItem.imageUrl} /* Key change triggers re-mount for animation restart */
          src={mainItem.imageUrl || DEFAULT_IMAGE} 
          alt={mainItem.title}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          className={`relative z-10 w-full h-full object-cover animate-ken-burns transition-opacity duration-1000 ease-in-out
            ${isTransitioning || !imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Cinematic Gradient Overlay at bottom */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Source Badge overlaid on Image (Visual flair) */}
        <div className="absolute bottom-16 left-16 z-30">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-4 rounded-full text-3xl font-black uppercase tracking-[0.2em] shadow-2xl">
               Foto del Giorno
             </div>
        </div>
      </div>

      {/* --- COLUMN 2: MAIN CONTENT TEXT (Approx 42% width -> col-span-5/12) --- */}
      <div className="col-span-5 h-full">
        <MainStoryCard item={mainItem} isTransitioning={isTransitioning} />
      </div>

      {/* --- COLUMN 3: SIDEBAR (25% width -> col-span-3/12 approx) --- */}
      <div className="col-span-3 h-full flex flex-col pt-4 pl-2">
        
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-4 animate-slide-up-fade">
           <div className="p-2 bg-white shadow-sm rounded-lg text-orange-600">
             <Newspaper className="w-6 h-6" />
           </div>
           <div>
             <span className="text-slate-900 text-2xl font-black uppercase tracking-widest block leading-none">
              Notizie
            </span>
            <span className="text-base text-slate-500 font-bold uppercase tracking-wide">
              In tempo reale
            </span>
           </div>
        </div>
        
        {/* Sidebar Cards Stack */}
        <div className="flex-1 flex flex-col gap-4">
          {secondaryItems.map((item, idx) => (
            <div key={`${item.id}-${secondaryOffset}-${idx}`} className="flex-1 min-h-0">
               <StoryCard 
                  item={item} 
                  delayClass={idx === 0 ? '' : idx === 1 ? 'delay-200' : 'delay-300'}
               />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBoard;