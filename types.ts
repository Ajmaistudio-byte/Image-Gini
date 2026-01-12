export enum ImageStyle {
  THREE_D_RENDER = '3D Render',
  PHOTOREALISTIC = 'Photorealistic',
  ANIMATED_EMOJI = 'Animated Emoji 3D',
  CYBERPUNK = 'Cyberpunk 2077',
  CLAYMATION = 'Claymation',
  PIXAR = 'Pixar Style',
  VAPORWAVE = 'Vaporwave'
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT = '9:16',
  LANDSCAPE = '16:9',
  STANDARD_PORTRAIT = '3:4',
  STANDARD_LANDSCAPE = '4:3'
}

export enum ImageSize {
  ONE_K = '1K',
  TWO_K = '2K',
  FOUR_K = '4K'
}

export interface GenerationSettings {
  style: ImageStyle;
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  isProMode: boolean;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ImageStyle;
  createdAt: number;
}
