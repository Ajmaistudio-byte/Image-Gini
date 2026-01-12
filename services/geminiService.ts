import { GoogleGenAI } from "@google/genai";
import { GenerationSettings, ImageStyle } from "../types";

const getAIClient = async (isProMode: boolean): Promise<GoogleGenAI> => {
  if (isProMode) {
    const win = window as any;
    if (win.aistudio) {
      const hasKey = await win.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await win.aistudio.openSelectKey();
      }
      // Re-instantiate to ensure latest key is used if it was just selected
      // For the pro mode in this environment, we rely on the system injecting the key
      // or the browser environment handling the `openSelectKey` flow which updates the internal state.
      // We still pass process.env.API_KEY, but in a real "AI Studio" widget context, 
      // the key might be handled transparently or updated in the env.
    }
  }

  // Always read process.env.API_KEY right before initialization to capture any updates 
  // from the key selection dialog.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateImageWithGemini = async (
  prompt: string,
  settings: GenerationSettings
): Promise<string> => {
  const ai = await getAIClient(settings.isProMode);

  // Construct a style-enhanced prompt
  const enhancedPrompt = `Generate a high quality image. Style: ${settings.style}. Description: ${prompt}. 
  Ensure high detail, good lighting, and ${settings.style === ImageStyle.ANIMATED_EMOJI ? 'cute, expressive, 3D icon style' : 'professional composition'}.`;

  const modelName = settings.isProMode ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  // For Pro model, we can specify image size. For Flash, we cannot.
  const imageConfig: any = {
    aspectRatio: settings.aspectRatio,
  };

  if (settings.isProMode) {
    imageConfig.imageSize = settings.imageSize;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { text: enhancedPrompt }
        ]
      },
      config: {
        imageConfig: imageConfig,
      }
    });

    // Parse response
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    throw new Error("No image data found in response.");
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    const win = window as any;
    if (error.message?.includes("Requested entity was not found") && settings.isProMode && win.aistudio) {
        // Retry logic for key selection could go here, but usually we just let the UI handle the error
        // Or re-trigger selection
        await win.aistudio.openSelectKey();
        throw new Error("API Key selection failed or expired. Please try again.");
    }
    throw error;
  }
};