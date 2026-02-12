import React, { useState } from 'react';
import { NewsItem } from '../types';
import { getRelativeTime } from '../utils/date';
import { DEFAULT_IMAGE } from '../constants';

interface MainStoryCardProps {
  item: NewsItem;
  className?: string;
  isTransitioning?: boolean;
}

const MainStoryCard: React.FC<MainStoryCardProps> = ({ item, className = "", isTransitioning = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white flex ${className}`}>
      
      {/* Left: Image Section (40%) */}
      <div className="relative w-[70%] h-full overflow-hidden shrink-0 bg-slate-200">
         <div className="absolute inset-0 bg-slate-200 z-0" />

         <img 
          key={item.imageUrl} 
          src={item.imageUrl || DEFAULT_IMAGE} 
          alt={item.title}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          className={`relative z-10 w-full h-full object-cover animate-slow-zoom transition-opacity duration-700 ease-out 
            ${isTransitioning || !imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Right: Content Section (60%) */}
      {/* Added justify-center to center content vertically */}
      <div 
        className={`w-[30%] h-full p-12 flex flex-col justify-center relative transition-all duration-500 ease-out transform
          ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
      >
        
        {/* Top Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 z-0" />

        <div className="relative z-10 flex flex-col justify-center h-full">
          
          {/* Header: Source | Time - Increased Text Size */}
          <div className="flex items-center gap-3 mb-5 shrink-0">
            <span className="bg-orange-600 text-white px-5 py-1.5 rounded text-base font-bold uppercase tracking-wider">
              {item.sourceName}
            </span>
            <span className="text-slate-400 text-xl">|</span>
            <span className="text-orange-600 font-semibold text-xl">
              {getRelativeTime(item.pubDate)}
            </span>
          </div>
          
          {/* Title Area - Increased Text Size significantly */}
          <div className="mb-5 shrink-0">
            <h1 className="text-8xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight line-clamp-10">
              {item.title}
            </h1>
          </div>

          {/* Subtitle / Description Area - Increased Text Size */}
          <div className="mb-7 shrink-0 border-l-[6px] border-orange-200 pl-6">
            <h2 className="text-4xl text-slate-700 font-semibold leading-snug line-clamp-5">
              {item.description}
            </h2>
          </div>
          
          {/* Main Content Body - Increased Text Size */}
          <div className="relative overflow-hidden">
            <p className="text-3xl lg:text-4xl text-slate-600 leading-relaxed font-normal text-justify pr-2">
              {item.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainStoryCard;