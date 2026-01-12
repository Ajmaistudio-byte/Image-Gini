import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { Download, Share2, Maximize2, X } from 'lucide-react';

interface GeneratedImageDisplayProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
}

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ image, isGenerating }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isGenerating) {
    return (
      <div className="w-full h-96 sm:h-[500px] flex flex-col items-center justify-center glass-panel rounded-3xl border-dashed border-2 border-white/20 animate-pulse relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-yellow-500/10 animate-[spin_4s_linear_infinite]" />
         <div className="z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-t-cyan-400 border-r-fuchsia-400 border-b-yellow-400 border-l-transparent animate-spin" />
            <p className="text-gray-300 font-mono animate-bounce">Dreaming up pixels...</p>
         </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full h-64 sm:h-96 flex flex-col items-center justify-center glass-panel rounded-3xl border border-white/10 text-center p-8">
        <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-inner">
           <span className="text-4xl">🎨</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Create</h3>
        <p className="text-gray-400 max-w-sm">
          Select a style, adjust your settings, and type a prompt to generate next-gen imagery.
        </p>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `genz-2026-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="group relative w-full rounded-3xl overflow-hidden glass-panel shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-auto object-cover min-h-[400px] max-h-[800px]"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex items-center justify-between">
            <div className="flex gap-2">
                <button 
                  onClick={handleDownload}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-110"
                  title="Download"
                >
                    <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsFullscreen(true)}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-110"
                  title="Fullscreen"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>
            <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                {image.style}
            </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-200">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-cyan-500/20"
          />
        </div>
      )}
    </>
  );
};
