
import React, { useState } from 'react';
import { Mic, Upload, CheckCircle2, AlertCircle, Fingerprint, Play, Cpu, Sparkles, UserCheck } from 'lucide-react';

const VoiceCloner: React.FC = () => {
  const [step, setStep] = useState<1|2|3>(1);
  const [isRecording, setIsRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAction = () => {
    if (step === 1) {
       // Simulate upload/analysis
       setStep(2);
       setAnalyzing(true);
       setTimeout(() => {
         setAnalyzing(false);
         setStep(3);
       }, 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-full">
      <div className="text-center mb-8 shrink-0">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 brand-font text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Neural Voice Cloning Engine
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Create an ultra-realistic 98% accurate digital replica of your voice in seconds using our proprietary Yousuf Studio AI engine.
        </p>
      </div>

      <div className="flex-1 bg-slate-950/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Steps Indicator */}
        <div className="flex justify-center mb-16 relative z-10 w-full max-w-xl">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full"></div>
          <div className="flex justify-between w-full">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`relative flex flex-col items-center gap-2 transition-all duration-500 ${step >= s ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-500 ${step >= s ? 'bg-black border-cyan-500 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>
                  {s}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${step >= s ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {s === 1 ? 'Sample' : s === 2 ? 'Train' : 'Ready'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Input */}
        {step === 1 && (
          <div className="w-full max-w-3xl animate-fadeIn relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`p-8 rounded-3xl border-2 border-dashed transition-all group relative overflow-hidden ${isRecording ? 'border-red-500 bg-red-500/5' : 'border-slate-700 hover:border-cyan-500 hover:bg-slate-900/80'}`}
              >
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' : 'bg-slate-800 group-hover:bg-cyan-500/20 group-hover:scale-110'}`}>
                    <Mic className={`w-8 h-8 ${isRecording ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Record Voice</h3>
                    <p className="text-sm text-slate-400">{isRecording ? 'Recording... click to stop' : 'Read the sample script (20s)'}</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={handleAction}
                className="p-8 rounded-3xl border-2 border-dashed border-slate-700 hover:border-purple-500 hover:bg-slate-900/80 transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-slate-800 group-hover:bg-purple-500/20 group-hover:scale-110 flex items-center justify-center transition-all">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Upload Sample</h3>
                    <p className="text-sm text-slate-400">MP3/WAV (High Quality)</p>
                  </div>
                </div>
              </button>
            </div>
            
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-left backdrop-blur-sm">
               <p className="text-cyan-500 text-xs font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
                 <Sparkles className="w-3 h-3" /> Sample Script
               </p>
               <p className="text-slate-200 text-lg italic leading-relaxed font-light">
                 "Artificial intelligence is transforming how we communicate, breaking down barriers between languages and people. With Yousuf Studio AI, I can now speak in any language with my own voice."
               </p>
               {isRecording && (
                 <button onClick={handleAction} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold w-full transition">Stop & Process</button>
               )}
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center text-center animate-fadeIn relative z-10">
            <div className="relative w-40 h-40 mb-10">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-4 rounded-full border-4 border-slate-800 border-t-transparent border-l-purple-500 animate-spin-reverse opacity-70"></div>
              <Fingerprint className="absolute inset-0 m-auto w-16 h-16 text-white animate-pulse" />
            </div>
            
            <h3 className="text-3xl font-bold mb-3 text-white">Analyzing Biometrics</h3>
            <p className="text-slate-400 max-w-md mb-8">Our AI is mapping your vocal cords, breath patterns, and emotional range to create a perfect digital twin.</p>
            
            <div className="flex gap-8 text-sm font-mono text-cyan-400">
               <span className="animate-pulse">Pitch: 98%</span>
               <span className="animate-pulse delay-75">Tone: 95%</span>
               <span className="animate-pulse delay-150">Cadence: 100%</span>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center animate-fadeIn w-full max-w-2xl relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-4 text-white">Voice Clone Ready!</h3>
            <p className="text-slate-400 mb-10 text-lg">Your custom voice model <span className="text-cyan-400 font-mono bg-cyan-900/30 px-2 py-1 rounded border border-cyan-500/30">USR-CLONE-V1</span> has been successfully generated and added to your studio.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500">
                 <Play className="w-5 h-5" /> Test Sample
               </button>
               <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 transition flex items-center justify-center gap-2">
                 <UserCheck className="w-5 h-5" /> Use in Studio
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-900/10 border border-yellow-600/20 rounded-xl max-w-3xl mx-auto">
        <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-500/80">
          <strong>Compliance Notice:</strong> Generated voices contain an encrypted digital watermark. Cloning public figures or individuals without explicit consent is strictly prohibited and monitored by Yousuf Studio AI safety protocols.
        </p>
      </div>
    </div>
  );
};

export default VoiceCloner;
