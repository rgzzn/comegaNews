import React from 'react';
import { NewsItem } from '../types';
import { getRelativeTime } from '../utils/date';
import { DEFAULT_IMAGE } from '../constants';
import { Clock } from 'lucide-react';
import QRCode from "react-qr-code";

interface StoryCardProps {
  item: NewsItem;
  className?: string;
  delayClass?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ item, className = "", delayClass = "" }) => {
  return (
    <div className={`flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 ${className} ${delayClass} animate-slide-up-fade group relative`}>
      
      {/* Image Section - Reduced (Top 35%) */}
      <div className="relative h-[35%] w-full overflow-hidden bg-slate-200">
        <div className="absolute inset-0 bg-slate-800/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <img 
          src={item.imageUrl || DEFAULT_IMAGE} 
          alt={item.title}
          className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-110 will-change-transform"
        />
        
        {/* Floating Source Badge */}
        <div className="absolute top-3 left-3 z-20">
             <span className="px-3 py-1 bg-white/95 text-orange-600 text-sm font-black uppercase tracking-widest rounded-lg shadow-md backdrop-blur-xl border border-white/20">
              {item.sourceName}
            </span>
        </div>
      </div>
      
      {/* Content Section (Bottom 65%) */}
      <div className="h-[65%] p-4 flex flex-col relative justify-between">
        <div>
          {/* Time */}
          <div className="flex items-center text-orange-500 text-sm font-black mb-1 uppercase tracking-wider">
            <Clock className="w-4 h-4 mr-2" />
            {getRelativeTime(item.pubDate)}
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-slate-900 leading-tight line-clamp-3 group-hover:text-orange-600 transition-colors duration-300">
            {item.title}
          </h3>
        </div>
        
        <div className="flex justify-between items-end mt-2">
            {/* Decorative Line */}
            <div className="w-12 h-1 bg-slate-100 rounded-full group-hover:bg-orange-400 group-hover:w-20 transition-all duration-700 ease-out" />
            
            {/* QR Code (Mini) */}
            <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 bg-white p-1 rounded border border-slate-100 shadow-sm">
                <div className="h-12 w-12">
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={item.link || ""}
                    viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;