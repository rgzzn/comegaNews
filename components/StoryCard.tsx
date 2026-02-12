import React from 'react';
import { NewsItem } from '../types';
import { getRelativeTime } from '../utils/date';
import { DEFAULT_IMAGE } from '../constants';
import { Clock } from 'lucide-react';

interface StoryCardProps {
  item: NewsItem;
  className?: string;
  delayClass?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ item, className = "", delayClass = "" }) => {
  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 ${className} ${delayClass} animate-slide-up-fade group`}>
      
      {/* Image Section - Reduced for more text space (Top 45%) */}
      <div className="relative h-[45%] w-full overflow-hidden bg-slate-200">
        <div className="absolute inset-0 bg-slate-800/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <img 
          src={item.imageUrl || DEFAULT_IMAGE} 
          alt={item.title}
          className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-110 will-change-transform"
        />
        
        {/* Floating Source Badge */}
        <div className="absolute top-5 left-5 z-20">
             <span className="px-5 py-2 bg-white/95 text-orange-600 text-xl font-black uppercase tracking-widest rounded-xl shadow-lg backdrop-blur-xl border border-white/20">
              {item.sourceName}
            </span>
        </div>
      </div>
      
      {/* Content Section (Bottom 55%) */}
      <div className="h-[55%] p-8 flex flex-col relative justify-between">
        <div>
          {/* Time */}
          <div className="flex items-center text-orange-500 text-lg font-black mb-4 uppercase tracking-wider">
            <Clock className="w-6 h-6 mr-3" />
            {getRelativeTime(item.pubDate)}
          </div>

          {/* Title */}
          <h3 className="text-3xl font-black text-slate-900 leading-[1.15] line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
            {item.title}
          </h3>
        </div>
        
        {/* Decorative Line */}
        <div className="w-20 h-2 bg-slate-100 mt-5 rounded-full group-hover:bg-orange-400 group-hover:w-full transition-all duration-700 ease-out" />
      </div>
    </div>
  );
};

export default StoryCard;