import React, { useState, useEffect } from 'react';
import './ScrollingInfoBar.css';

const ScrollingInfoBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="scrolling-info-bar">
      <div className="scrolling-content">
        <span>{formatTime(currentTime)}</span>
        <span>•</span>
        <span>Ho Chi Minh City, Vietnam</span>
      </div>
    </div>
  );
};

export default ScrollingInfoBar;
