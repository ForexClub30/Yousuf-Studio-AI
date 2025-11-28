
export interface VoiceCharacter {
  id: string;
  name: string;
  category: 'Narrator' | 'Host' | 'Social' | 'Islamic' | 'Assistant' | 'Character' | 'News' | 'Creative';
  geminiVoiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  gender: 'Male' | 'Female';
  description: string;
  style?: string; // Additional style description
}

export interface GeneratedAudio {
  id: string;
  url: string;
  blob: Blob;
  text: string;
  characterName: string;
  timestamp: number;
  duration?: number;
}

export type ViewMode = 'generate' | 'clone' | 'tools';

export interface VoiceSettings {
  speed: number;
  pitch: number;
  emotion: string; // Mapped to prompt instructions
  stability: number;
}
