import React, { useState } from 'react';
import { BackgroundElements } from './components/BackgroundElements';
import { PromptInput } from './components/PromptInput';
import { StyleCard } from './components/StyleCard';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { generateImageWithGemini } from './services/geminiService';
import { AspectRatio, GenerationSettings, ImageSize, ImageStyle, GeneratedImage } from './types';
import { Zap, Settings2, Info, Crown, Palette } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  
  // Settings State
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(ImageStyle.THREE_D_RENDER);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [isProMode, setIsProMode] = useState(false);
  const [imageSize, setImageSize] = useState<ImageSize>(ImageSize.ONE_K);
  
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setCurrentImage(null);

    const settings: GenerationSettings = {
      style: selectedStyle,
      aspectRatio,
      imageSize,
      isProMode
    };

    try {
      const imageUrl = await generateImageWithGemini(prompt, settings);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        style: selectedStyle,
        createdAt: Date.now()
      };
      
      setCurrentImage(newImage);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen text-white relative pb-24">
      <BackgroundElements />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
               <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">GenZ</span>
              <span className="text-cyan-400 ml-1">2026</span>
            </h1>
          </div>
          
          <button 
            onClick={() => window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank')}
            className="hidden sm:flex text-xs text-gray-400 hover:text-white transition-colors gap-1 items-center"
          >
            <Info className="w-3 h-3" />
            <span>Pricing & API Info</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Hero Section */}
        <section className="text-center space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Design the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Future</span>
          </h2>
        </section>

        {/* 1. SETTINGS PANEL (Moved to Top) */}
        <section className="glass-panel p-6 rounded-3xl space-y-6 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <Settings2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold">Studio Settings</h3>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 {/* Left Column: Toggles & Ratios */}
                 <div className="lg:col-span-5 space-y-6">
                     
                     {/* Pro Toggle */}
                     <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Crown className={`w-5 h-5 ${isProMode ? 'text-yellow-400' : 'text-gray-500'}`} />
                                <span className="font-medium text-sm">Pro Model (2026)</span>
                            </div>
                            <button 
                                onClick={() => setIsProMode(!isProMode)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isProMode ? 'bg-cyan-600' : 'bg-gray-700'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isProMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Enables high-resolution (4K) and advanced reasoning. Requires API key.
                        </p>
                    </div>

                    {/* Aspect Ratio */}
                    <div className="space-y-3">
                        <label className="text-sm text-gray-400 font-medium">Aspect Ratio</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {[AspectRatio.SQUARE, AspectRatio.PORTRAIT, AspectRatio.LANDSCAPE, AspectRatio.STANDARD_PORTRAIT, AspectRatio.STANDARD_LANDSCAPE].map((ratio) => (
                                <button
                                    key={ratio}
                                    onClick={() => setAspectRatio(ratio)}
                                    className={`
                                        px-2 py-2 rounded-lg text-xs border transition-all truncate
                                        ${aspectRatio === ratio 
                                            ? 'bg-white/10 border-cyan-500/50 text-white shadow-[0_0_10px_-2px_rgba(6,182,212,0.3)]' 
                                            : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'}
                                    `}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Size (Pro Only) */}
                    {isProMode && (
                     <div className="space-y-3 pt-2 border-t border-white/5">
                        <label className="text-sm text-gray-400 font-medium">Resolution (Pro)</label>
                        <div className="flex gap-2">
                            {[ImageSize.ONE_K, ImageSize.TWO_K, ImageSize.FOUR_K].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setImageSize(size)}
                                    className={`
                                        flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all
                                        ${imageSize === size 
                                            ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200' 
                                            : 'bg-transparent border-white/10 text-gray-500 hover:bg-white/5'}
                                    `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                 </div>

                 {/* Right Column: Styles */}
                 <div className="lg:col-span-7 space-y-4">
                     <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-gray-400" />
                        <label className="text-sm text-gray-400 font-medium">Art Style</label>
                     </div>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.values(ImageStyle).map((style) => (
                            <StyleCard 
                                key={style}
                                style={style}
                                isSelected={selectedStyle === style}
                                onSelect={setSelectedStyle}
                            />
                        ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* 2. IMAGE DISPLAY (Middle) */}
        <section className="w-full min-h-[400px]">
             <GeneratedImageDisplay image={currentImage} isGenerating={isGenerating} />
             
             {/* Tips Section */}
             {!currentImage && !isGenerating && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-panel p-4 rounded-2xl flex gap-3 items-start border border-white/5">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Try "Animated Emoji"</h4>
                            <p className="text-xs text-gray-400">Select the Animated Emoji 3D style and describe an emotion.</p>
                        </div>
                    </div>
                    <div className="glass-panel p-4 rounded-2xl flex gap-3 items-start border border-white/5">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            <Crown className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Pro Mode</h4>
                            <p className="text-xs text-gray-400">Unlock 4K resolution and superior lighting effects.</p>
                        </div>
                    </div>
                </div>
             )}
        </section>

        {/* 3. PROMPT INPUT (Last / Sticky Bottom) */}
        <section className="sticky bottom-4 z-50">
          <PromptInput 
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleGenerate}
            isGenerating={isGenerating}
          />
          
          {error && (
            <div className="absolute bottom-full left-0 right-0 mb-4 p-4 rounded-xl bg-red-500/90 border border-red-500/30 text-white text-center text-sm max-w-2xl mx-auto backdrop-blur-md shadow-lg">
              {error}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default App;