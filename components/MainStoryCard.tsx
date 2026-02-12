import React from 'react';
import { NewsItem } from '../types';
import { getRelativeTime } from '../utils/date';
import { MAIN_ROTATE_MS } from '../constants';

interface MainStoryCardProps {
  item: NewsItem;
  className?: string;
  isTransitioning?: boolean;
}

const MainStoryCard: React.FC<MainStoryCardProps> = ({ item, className = "", isTransitioning = false }) => {
  return (
    <div className={`relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col ${className}`}>
      
      {/* Progress Bar (Top) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 z-50">
        {!isTransitioning && (
          <div 
            className="h-full bg-orange-500 animate-progress origin-left" 
            style={{ animationDuration: `${MAIN_ROTATE_MS}ms` }}
          />
        )}
      </div>

      {/* Content Container */}
      <div 
        className={`flex-1 p-16 flex flex-col justify-center relative transition-all duration-700 ease-out transform
          ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
      >
        
        {/* Background Decorative Element */}
        <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center h-full">
          
          {/* Header */}
          <div className="flex items-center gap-8 mb-10 shrink-0 animate-slide-up-fade">
            <span className="bg-orange-600 text-white px-8 py-3 rounded-2xl text-3xl font-black uppercase tracking-widest shadow-xl shadow-orange-100">
              {item.sourceName}
            </span>
            <span className="text-slate-300 text-4xl">|</span>
            <span className="text-orange-600 font-black text-3xl uppercase tracking-widest">
              {getRelativeTime(item.pubDate)}
            </span>
          </div>
          
          {/* Title */}
          <div className="mb-12 shrink-0 animate-slide-up-fade delay-100">
            <h1 className="text-7xl xl:text-8xl font-black text-slate-900 leading-[1] tracking-tight line-clamp-2">
              {item.title}
            </h1>
          </div>

          {/* Subtitle / Highlight */}
          <div className="mb-12 shrink-0 border-l-[12px] border-orange-500 pl-10 animate-slide-up-fade delay-200">
            <h2 className="text-4xl xl:text-5xl text-slate-700 font-bold leading-tight line-clamp-2 italic">
              {item.description}
            </h2>
          </div>
          
          {/* Body Text */}
          <div className="relative flex-1 overflow-hidden mask-gradient-bottom animate-slide-up-fade delay-300">
            <p className="text-3xl xl:text-4xl text-slate-500 leading-relaxed font-medium text-justify pr-6">
              {item.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainStoryCard;