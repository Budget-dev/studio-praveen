"use client";

import React from 'react';

const LoadingSplash = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#FAF7F2] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 animate-spin-slow">
           <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C55 35 85 45 85 65C85 80 70 90 50 90C30 90 15 80 15 65C15 45 45 35 50 10Z" fill="#7B3045" />
            <path d="M50 20C53 40 75 48 75 65C75 75 64 82 50 82C36 82 25 75 25 65C25 48 47 40 50 20Z" fill="#C49A5A" />
          </svg>
        </div>
        <p className="mt-4 font-headline text-primary tracking-widest text-lg animate-pulse">
          Loading / లోడ్ అవుతోంది...
        </p>
      </div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSplash;