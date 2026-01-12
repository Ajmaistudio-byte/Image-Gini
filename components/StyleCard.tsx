import React from 'react';
import { ImageStyle } from '../types';
import { Sparkles, Box, Camera, Smile, Zap, Palette, MonitorPlay } from 'lucide-react';

interface StyleCardProps {
  style: ImageStyle;
  isSelected: boolean;
  onSelect: (style: ImageStyle) => void;
}

const getIcon = (style: ImageStyle) => {
  switch (style) {
    case ImageStyle.THREE_D_RENDER: return <Box className="w-6 h-6 text-cyan-400" />;
    case ImageStyle.PHOTOREALISTIC: return <Camera className="w-6 h-6 text-emerald-400" />;
    case ImageStyle.ANIMATED_EMOJI: return <Smile className="w-6 h-6 text-yellow-400" />;
    case ImageStyle.CYBERPUNK: return <Zap className="w-6 h-6 text-fuchsia-400" />;
    case ImageStyle.CLAYMATION: return <Palette className="w-6 h-6 text-orange-400" />;
    case ImageStyle.VAPORWAVE: return <MonitorPlay className="w-6 h-6 text-pink-400" />;
    default: return <Sparkles className="w-6 h-6 text-purple-400" />;
  }
};

const getGradient = (style: ImageStyle) => {
    switch (style) {
    case ImageStyle.THREE_D_RENDER: return 'from-cyan-500/20 to-blue-600/20 border-cyan-500/50';
    case ImageStyle.ANIMATED_EMOJI: return 'from-yellow-400/20 to-orange-500/20 border-yellow-400/50';
    case ImageStyle.CYBERPUNK: return 'from-fuchsia-500/20 to-purple-600/20 border-fuchsia-500/50';
    default: return 'from-gray-700/30 to-gray-800/30 border-gray-600/30';
  }
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onSelect }) => {
  const gradientClass = isSelected ? getGradient(style) : 'from-transparent to-transparent border-transparent hover:border-white/20 hover:bg-white/5';

  return (
    <button
      onClick={() => onSelect(style)}
      className={`
        relative group flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300
        ${gradientClass}
        ${isSelected ? 'scale-105 shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] bg-gradient-to-br' : 'bg-white/5'}
      `}
    >
      <div className={`p-3 rounded-xl mb-3 transition-transform duration-300 ${isSelected ? 'bg-white/10 scale-110' : 'bg-white/5 group-hover:scale-110'}`}>
        {getIcon(style)}
      </div>
      <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
        {style}
      </span>
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 pointer-events-none" />
      )}
    </button>
  );
};
