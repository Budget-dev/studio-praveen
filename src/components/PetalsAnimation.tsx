"use client";

import React, { useEffect, useState } from 'react';

const PetalsAnimation = () => {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 10 + 's',
      duration: (Math.random() * 5 + 10) + 's',
      size: (Math.random() * 10 + 10) + 'px',
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-float-petal opacity-0"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            bottom: '-20px',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 100 100"
            fill="#7B3045"
            className="opacity-40"
          >
            <path d="M50 0 C60 30 100 40 100 60 C100 85 75 100 50 100 C25 100 0 85 0 60 C0 40 40 30 50 0" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default PetalsAnimation;