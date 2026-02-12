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
      <div className="text-5xl font-bold tracking-tight leading-none text-slate-900">
        {formatClockTime(time)}
      </div>
      <div className="text-xl font-medium text-orange-500 uppercase tracking-widest mt-1">
        {formatDateShort(time)}
      </div>
    </div>
  );
};

export default Clock;