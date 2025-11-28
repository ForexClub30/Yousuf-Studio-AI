import React, { useState } from 'react';
import { Layers, Mic2, Activity, Settings, User } from 'lucide-react';
import { ViewMode } from './types';
import VoiceGenerator from './components/VoiceGenerator';
import VoiceCloner from './components/VoiceCloner';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('generate');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-slate-200">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-slate-900 bg-slate-950 flex flex-col shrink-0 z-20">
        <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-900">
           <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
             <span className="font-bold text-white text-xl">Y</span>
           </div>
           <span className="hidden lg:block ml-3 font-bold text-lg tracking-wide brand-font text-white">
             Yousuf<span className="text-cyan-400">Studio</span>
           </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-2 md:px-4 space-y-2">
          <button 
            onClick={() => setView('generate')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${view === 'generate' ? 'bg-slate-900 text-cyan-400 shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}
          >
            <Layers className="w-6 h-6 md:w-5 md:h-5" />
            <span className="hidden lg:block font-medium">Text to Voice</span>
          </button>
          
          <button 
            onClick={() => setView('clone')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${view === 'clone' ? 'bg-slate-900 text-purple-400 shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}
          >
            <Mic2 className="w-6 h-6 md:w-5 md:h-5" />
            <span className="hidden lg:block font-medium">Voice Clone</span>
            <span className="hidden lg:block ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">PRO</span>
          </button>

          <button disabled className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 cursor-not-allowed">
            <Activity className="w-6 h-6 md:w-5 md:h-5" />
            <span className="hidden lg:block font-medium">Tools (Soon)</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900">
           <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-lg">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
               <User className="w-4 h-4 text-slate-400" />
             </div>
             <div className="hidden lg:block overflow-hidden">
               <p className="text-sm font-medium text-white truncate">Pro Creator</p>
               <p className="text-xs text-slate-500">Free Plan</p>
             </div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] md:h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 shrink-0 z-10">
          <div>
            <h1 className="text-xl font-bold brand-font tracking-wide">
              {view === 'generate' ? 'Voice Generator' : view === 'clone' ? 'Voice Lab' : 'Studio Tools'}
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">Create, Clone & Transform Your Voice in Seconds.</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition">
               <Settings className="w-4 h-4 text-slate-400" />
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 relative">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-96 bg-purple-900/5 blur-[100px] pointer-events-none rounded-full transform -translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto h-full">
            {view === 'generate' && <VoiceGenerator />}
            {view === 'clone' && <VoiceCloner />}
          </div>
        </div>
      </main>

    </div>
  );
};

export default App;