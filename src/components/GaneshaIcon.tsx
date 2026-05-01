
"use client";

import React from 'react';

const GaneshaIcon = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 5C35 5 25 15 25 30C25 45 35 55 50 55C65 55 75 45 75 30C75 15 65 5 50 5ZM50 15C58 15 65 22 65 30C65 38 58 45 50 45C42 45 35 38 35 30C35 22 42 15 50 15Z" />
        <path d="M50 55C30 55 15 70 15 85C15 88 17 90 20 90H80C83 90 85 88 85 85C85 70 70 55 50 55Z" />
        <circle cx="50" cy="30" r="3" />
        <path d="M48 40C48 40 50 48 55 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

export default GaneshaIcon;
