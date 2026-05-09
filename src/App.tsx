import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Flame, AlertCircle } from 'lucide-react';
import { NeoCard } from './components/NeoCard';
import { StatsBar } from './components/StatsBar';
import { RoastOverlay } from './components/RoastOverlay';
import { SurvivalCard } from './components/SurvivalCard';
import { SCENARIOS } from './constants';
import { GameState, Choice } from './types';
import { getRoast } from './services/ai';

const INITIAL_STATS = {
  wallet: 50,
  sanity: 50,
  career: 50
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScenarioIndex: -1, // -1 means Landing Page
    stats: INITIAL_STATS,
    streak: 0,
    isGameOver: false,
    history: []
  });

  const [currentRoast, setCurrentRoast] = useState<string | null>(null);
  const [isLoadingRoast, setIsLoadingRoast] = useState(false);

  // Load persistence from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('mind_cleanse_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setGameState(prev => ({ ...prev, streak: parsed.streak || 0 }));
    }
  }, []);

  const handleStart = () => {
    setGameState(prev => ({
      ...prev,
      currentScenarioIndex: 0,
      stats: INITIAL_STATS,
      isGameOver: false,
      history: []
    }));
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    const scenario = SCENARIOS[gameState.currentScenarioIndex];
    const choice: Choice = direction === 'left' ? scenario.leftChoice : scenario.rightChoice;

    // Update stats
    const newStats = {
      wallet: Math.min(100, Math.max(0, gameState.stats.wallet + choice.impact.wallet)),
      sanity: Math.min(100, Math.max(0, gameState.stats.sanity + choice.impact.sanity)),
      career: Math.min(100, Math.max(0, gameState.stats.career + choice.impact.career))
    };

    setIsLoadingRoast(true);
    const roast = await getRoast(scenario.question, choice.text, choice.resultType);
    setIsLoadingRoast(false);
    
    setCurrentRoast(roast);
    
    setGameState(prev => ({
      ...prev,
      stats: newStats,
      history: [...prev.history, { scenarioId: scenario.id, choice: choice.text, roast }]
    }));
  };

  const handleNext = () => {
    setCurrentRoast(null);
    if (gameState.currentScenarioIndex >= SCENARIOS.length - 1) {
      // Game Finished
      const newStreak = gameState.streak + 1;
      setGameState(prev => ({ ...prev, isGameOver: true, streak: newStreak }));
      localStorage.setItem('mind_cleanse_progress', JSON.stringify({ streak: newStreak }));
    } else {
      setGameState(prev => ({ ...prev, currentScenarioIndex: prev.currentScenarioIndex + 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FF5C00] font-sans selection:bg-yellow-300 selection:text-black overflow-x-hidden">
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[90vh]">
        
        <AnimatePresence mode="wait">
          {/* Landing Page */}
          {gameState.currentScenarioIndex === -1 && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col items-center text-center gap-10"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="bg-white border-4 border-black p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]"
                >
                  <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-2">
                    MIND<br/>CLEANSE
                  </h1>
                </motion.div>
                <div className="absolute -top-6 -right-6 transform rotate-12 bg-yellow-400 border-4 border-black px-4 py-2 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  ADULTING?
                </div>
              </div>

              <div className="max-w-md bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] rotate-[1deg]">
                <p className="text-xl font-bold leading-tight">
                  Stop doomscrolling. 💀 Start surviving. <br/>
                  <span className="text-gray-400 text-sm italic">60 seconds of sarcastic adulting lessons. Zero login. Real roasts.</span>
                </p>
              </div>

              <button
                onClick={handleStart}
                className="group relative px-12 py-6 bg-yellow-400 border-4 border-black font-black text-3xl uppercase italic transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <span className="flex items-center gap-3">
                  START SPRINT <Play className="w-8 h-8 fill-black" />
                </span>
                
                {/* Visual streak hint */}
                {gameState.streak > 0 && (
                  <div className="absolute -bottom-4 -left-4 bg-red-500 border-2 border-black p-2 flex items-center gap-1 animate-bounce">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-black">{gameState.streak} STREAK</span>
                  </div>
                )}
              </button>

              <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-black/60">
                <span>60 Sec Challenge</span>
                <span>•</span>
                <span>AI Roasts</span>
                <span>•</span>
                <span>Gen Z Survival</span>
              </div>
            </motion.div>
          )}

          {/* Gameplay */}
          {gameState.currentScenarioIndex >= 0 && !gameState.isGameOver && (
            <motion.div
              key="gameplay"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <StatsBar 
                wallet={gameState.stats.wallet} 
                sanity={gameState.stats.sanity} 
                career={gameState.stats.career} 
                streak={gameState.streak}
              />

              <div className="relative w-full flex justify-center">
                <NeoCard 
                  scenario={SCENARIOS[gameState.currentScenarioIndex]} 
                  onSwipe={handleSwipe} 
                />
                
                {isLoadingRoast && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                    <div className="bg-white border-2 border-black p-4 font-black uppercase animate-pulse flex items-center gap-2">
                       Consulting Roast Master...
                    </div>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mt-8 flex gap-2">
                {SCENARIOS.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 border-2 border-black ${i === gameState.currentScenarioIndex ? 'bg-yellow-400 shadow-[2px_2px_0px_0px_#000]' : i < gameState.currentScenarioIndex ? 'bg-black' : 'bg-white'}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {gameState.isGameOver && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center py-4"
            >
              <SurvivalCard 
                stats={gameState.stats} 
                streak={gameState.streak} 
                onRestart={handleStart} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Roast Overlay */}
        <RoastOverlay roast={currentRoast} onContinue={handleNext} />

      </main>

      {/* Background decoration elements */}
      <div className="fixed top-20 -left-10 w-40 h-40 bg-blue-400 border-4 border-black -rotate-12 -z-1 opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 -right-10 w-60 h-60 bg-yellow-300 border-4 border-black rotate-12 -z-1 opacity-20 pointer-events-none rounded-full" />
      <div className="fixed top-1/2 left-1/4 transform -translate-y-1/2 opacity-5 pointer-events-none -z-1">
        <AlertCircle className="w-96 h-96" />
      </div>
    </div>
  );
}

