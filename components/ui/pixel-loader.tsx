"use client"

import React from 'react';

export function PixelLoader({ className }: { className?: string }) {
  return (
    <>
      <style>{`
        .pixel-loader-custom {
          width: 60px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #1C1C1C;
          box-shadow: 0 0 0 0 #1C1C1C44;
          animation: l1 1s infinite;
        }
        @keyframes l1 {
            100% {box-shadow: 0 0 0 50px #1C1C1C00}
        }
      `}</style>
      <div className={`pixel-loader-custom ${className || ''}`}></div>
    </>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/5 backdrop-blur-md text-white gap-[50px] overflow-hidden">
      <PixelLoader />
    </div>
  )
}
