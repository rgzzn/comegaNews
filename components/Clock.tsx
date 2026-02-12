import React, { useEffect, useState } from 'react';
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
    <div className="clock-panel">
      <div className="clock-time">{formatClockTime(time)}</div>
      <div className="clock-date">{formatDateShort(time)}</div>
    </div>
  );
};

export default Clock;
