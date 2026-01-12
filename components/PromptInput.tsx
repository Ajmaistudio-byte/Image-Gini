import React from 'react';
import { Send, Wand2, Loader2 } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isGenerating }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="pl-4 sm:pl-6 text-gray-400">
          <Wand2 className={`w-6 h-6 ${isGenerating ? 'animate-spin text-fuchsia-400' : 'text-cyan-400'}`} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your 2026 masterpiece..."
          className="w-full bg-transparent border-none text-white placeholder-gray-500 px-4 py-6 focus:outline-none focus:ring-0 text-lg"
          disabled={isGenerating}
        />
        <button
          onClick={onSubmit}
          disabled={isGenerating || !value.trim()}
          className={`
            m-2 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300
            ${!value.trim() || isGenerating 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5'}
          `}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>Generate</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
