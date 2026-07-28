import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { DemoNav } from '@/components/DemoNav';
import { LandingScene } from '@/components/scenes/LandingScene';
import { IntroScene } from '@/components/scenes/IntroScene';
import { StreetScene } from '@/components/scenes/StreetScene';
import { ChallengeScene } from '@/components/scenes/ChallengeScene';
import { RewardScene } from '@/components/scenes/RewardScene';
import { ParentDashboard } from '@/components/scenes/ParentDashboard';
import { EndCardScene } from '@/components/scenes/EndCardScene';
import { initialYounisState, updatedYounisState } from '@/lib/mock-data';

const queryClient = new QueryClient();

function FikrDemo() {
  const [currentScene, setCurrentScene] = useState(0);
  const [younisState, setYounisState] = useState(initialYounisState);

  const handleSceneChange = (scene: number) => {
    setCurrentScene(scene);
    // Reset Younis state if going back to early scenes
    if (scene <= 3) {
      setYounisState(initialYounisState);
    }
  };

  const handleNext = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 6));
  };

  const handleLocationClick = (location: string) => {
    if (location === 'toy-shop') {
      setCurrentScene(3);
    }
  };

  const handleDecision = (decision: 'buy' | 'save') => {
    if (decision === 'save') {
      setYounisState(updatedYounisState);
      setCurrentScene(4);
    }
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setYounisState(initialYounisState);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col overflow-hidden">
      {/* Demo Navigation */}
      <DemoNav currentScene={currentScene} onSceneChange={handleSceneChange} />

      {/* Main Container - 16:9 Cinematic */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden min-h-0">
        <div 
          className="w-full max-w-[1280px] bg-black shadow-2xl overflow-hidden relative"
          style={{ aspectRatio: '16/9', maxHeight: '100%' }}
        >
          <AnimatePresence mode="wait">
            {currentScene === 0 && (
              <motion.div
                key="scene-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <LandingScene onNext={handleNext} />
              </motion.div>
            )}

            {currentScene === 1 && (
              <motion.div
                key="scene-1"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <IntroScene younis={younisState} onNext={handleNext} />
              </motion.div>
            )}

            {currentScene === 2 && (
              <motion.div
                key="scene-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <StreetScene younis={younisState} onLocationClick={handleLocationClick} />
              </motion.div>
            )}

            {currentScene === 3 && (
              <motion.div
                key="scene-3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <ChallengeScene younis={younisState} onDecision={handleDecision} />
              </motion.div>
            )}

            {currentScene === 4 && (
              <motion.div
                key="scene-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <RewardScene younis={updatedYounisState} onNext={handleNext} />
              </motion.div>
            )}

            {currentScene === 5 && (
              <motion.div
                key="scene-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <ParentDashboard younis={updatedYounisState} />
              </motion.div>
            )}

            {currentScene === 6 && (
              <motion.div
                key="scene-6"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <EndCardScene onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FikrDemo />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
