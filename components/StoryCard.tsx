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
    <div className={`flex flex-row h-full bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 ${className} ${delayClass} animate-glide-up group`}>
      
      {/* Image Section (Approx 35-40%) */}
      <div className="w-[50%] h-full relative shrink-0 overflow-hidden bg-slate-200">
        <img 
          src={item.imageUrl || DEFAULT_IMAGE} 
          alt={item.title}
          className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105 will-change-transform"
        />
        {/* Source Badge overlaid */}
        <div className="absolute top-2 left-2">
             <span className="px-4 py-1 bg-black/60 text-white text-2xl font-bold uppercase tracking-wider rounded backdrop-blur-sm">
              {item.sourceName}
            </span>
        </div>
      </div>
      
      {/* Text Section - Added justify-center for vertical centering */}
      <div className="w-[65%] p-5 flex flex-col justify-center relative">
        <div className="flex flex-col gap-2">
          {/* Title - Increased Size */}
          <h3 className="text-3xl lg:text-3xl font-bold text-slate-900 leading-tight line-clamp-10">
            {item.title}
          </h3>

          {/* Subtitle / Description - Increased Size */}
          <p className="text-slate-700 text-xl lg:text-xl leading-snug line-clamp-10">
            {item.description}
          </p>
          
          {/* Time Footer - Increased Size */}
          <div className="mt-2 flex justify-start items-center text-orange-600 font-bold text-sm lg:text-base">
            <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            {getRelativeTime(item.pubDate)}
          </div>
        </div>
      </div>
      
      {/* Right Accent Border (Hover effect) */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-orange-500 transition-colors duration-300"></div>
    </div>
  );
};

export default StoryCard;