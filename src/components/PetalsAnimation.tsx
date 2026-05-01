
"use client";

import React, { useEffect, useState } from 'react';

const PetalsAnimation = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 10 + 's',
      duration: (Math.random() * 5 + 10) + 's',
      size: (Math.random() * 15 + 15) + 'px',
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-petal opacity-0"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            bottom: '-20px',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-primary/20"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default PetalsAnimation;
