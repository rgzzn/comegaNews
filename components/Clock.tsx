import React, { useState, useEffect } from 'react';
import { formatClockTime, formatDateShort } from '../utils/date';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end text-right z-50">
      <div className="text-8xl font-black tracking-tighter leading-none text-slate-900">
        {formatClockTime(time)}
      </div>
      <div className="text-4xl font-black text-orange-500 uppercase tracking-[0.1em] mt-3">
        {formatDateShort(time)}
      </div>
    </div>
  );
};

export default Clock;