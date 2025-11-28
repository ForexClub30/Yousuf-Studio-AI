
import { GoogleGenAI, Modality } from "@google/genai";

// Initialize Gemini AI
// Ensure API key is available from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Helper to create a WAV header for raw PCM data.
 * Gemini TTS output is typically 24kHz, 1 channel, 16-bit PCM.
 */
const createWavHeader = (dataLength: number, sampleRate: number = 24000, numChannels: number = 1, bitsPerSample: number = 16): ArrayBuffer => {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF chunk descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true); // ChunkSize
  writeString(8, 'WAVE');

  // fmt sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);  // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true); // ByteRate
  view.setUint16(32, numChannels * (bitsPerSample / 8), true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample

  // data sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataLength, true); // Subchunk2Size

  return header;
};

export const generateSpeech = async (
  text: string,
  voiceName: string,
  language: string = 'English',
  emotion: string = 'Neutral'
): Promise<string> => {
  try {
    // Construct a prompt that guides the style while using the specific voice
    let styleInstruction = "";
    switch (emotion.toLowerCase()) {
      case 'energetic': styleInstruction = "Speak in an energetic, excited, and fast-paced tone."; break;
      case 'calm': styleInstruction = "Speak in a calm, soothing, and slow-paced tone."; break;
      case 'sad': styleInstruction = "Speak in a sad, deep, and melancholic tone."; break;
      case 'narration': styleInstruction = "Speak in a professional, clear, deep, and storytelling tone."; break;
      case 'whisper': styleInstruction = "Whisper the following text softly."; break;
      default: styleInstruction = "Speak clearly and naturally.";
    }

    // Gemini 2.5 Flash TTS prompt structure
    const prompt = `${styleInstruction} Language: ${language}. Text to read: "${text}"`;
    
    console.log("Generating with Voice:", voiceName, "Prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { 
              voiceName: voiceName as any 
            },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      console.error("Gemini Response:", response);
      throw new Error("No audio data returned from API. The model might have refused the request.");
    }

    // Decode Base64 to binary
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Create WAV Header
    // Gemini output is 24000Hz, Mono, 16-bit PCM
    const wavHeader = createWavHeader(bytes.length, 24000, 1, 16);
    
    // Combine Header + PCM Data
    const wavBlob = new Blob([wavHeader, bytes], { type: 'audio/wav' }); 
    
    return URL.createObjectURL(wavBlob);

  } catch (error) {
    console.error("Gemini TTS Error:", error);
    throw error;
  }
};
