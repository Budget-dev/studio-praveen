
"use client";

import React from 'react';

const OmIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M52.2,28.2c0,0-5.8-5.3-12.7-5.3c-9.1,0-16.5,7.4-16.5,16.5c0,9.1,7.4,16.5,16.5,16.5c4.1,0,7.9-1.5,10.8-4 c1.2-1.1,2.3-2.3,3.2-3.7c1.4-2.2,2.3-4.8,2.3-7.6c0-4.1-1.8-7.8-4.6-10.4 M63,55.4c0,0,6.2,8.6,6.2,16.4c0,9.1-7.4,16.5-16.5,16.5 c-9.1,0-16.5-7.4-16.5-16.5c0-4.3,1.7-8.2,4.4-11.2 M58.9,38.8c0,0,10.8,0.4,17.2,8.2c6.4,7.8,6.1,19.3,6.1,19.3 M56.5,16.7 c0,3.3,2.7,6,6,6s6-2.7,6-6s-2.7-6-6-6S56.5,13.4,56.5,16.7z M52.5,23c0,0,11.3-1.8,17.2,3.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

export default OmIcon;
