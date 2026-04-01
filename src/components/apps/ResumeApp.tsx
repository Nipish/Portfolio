'use client';

import { useState } from 'react';

const FILE_ID = '1d2Vgg9WyDBeatxsC4vsilkflUatFB7pW';
const EMBED_URL = `https://drive.google.com/file/d/${FILE_ID}/preview`;
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export default function ResumeApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#ece9d8]">
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ece9d8] border-b-2 border-[#aca899] shrink-0">
        <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#ece9d8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] font-pixel text-[8px] text-[#1a1a1a] uppercase tracking-wide hover:bg-[#d4d0c8] no-underline">Download</a>
        <div className="w-px h-5 bg-[#808080] mx-1" />
        <a href={`https://drive.google.com/file/d/${FILE_ID}/view`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#ece9d8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] font-pixel text-[8px] text-[#1a1a1a] uppercase tracking-wide hover:bg-[#d4d0c8] no-underline">Open in Drive</a>
        <span className="ml-auto font-pixel text-[7px] text-[#666] uppercase">resume.pdf</span>
      </div>
      <div className="relative flex-1 bg-[#808080]">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#ece9d8] z-10">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3 bg-[#316AC5]" style={{ animation: `pixelBounce 0.8s ease-in-out ${i * 0.15}s infinite alternate` }} />
              ))}
            </div>
            <span className="font-pixel text-[8px] text-[#444] uppercase">Loading resume...</span>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#ece9d8] z-10 p-6">
            <span className="font-pixel text-[9px] text-[#1a1a1a] uppercase">Cannot display PDF</span>
            <a href={`https://drive.google.com/file/d/${FILE_ID}/view`} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-[#ece9d8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] font-pixel text-[8px] uppercase hover:bg-[#d4d0c8] no-underline">Open in Drive</a>
          </div>
        )}
        <iframe src={EMBED_URL} title="Resume PDF" className="w-full h-full border-none" onLoad={() => setIsLoading(false)} onError={() => { setIsLoading(false); setHasError(true); }} allow="autoplay" />
      </div>
      <div className="flex items-center justify-between px-2 py-0.5 bg-[#ece9d8] border-t-2 border-[#aca899] shrink-0">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 ${isLoading ? 'bg-[#f0a500]' : hasError ? 'bg-[#c0392b]' : 'bg-[#2ecc71]'}`} />
          <span className="font-pixel text-[7px] text-[#444] uppercase">{isLoading ? 'Loading...' : hasError ? 'Error' : 'Ready'}</span>
        </div>
        <span className="font-pixel text-[7px] text-[#666] uppercase">Google Drive</span>
      </div>
      <style>{`@keyframes pixelBounce { from { transform: translateY(0px); opacity: 1; } to { transform: translateY(-6px); opacity: 0.5; } }`}</style>
    </div>
  );
}
