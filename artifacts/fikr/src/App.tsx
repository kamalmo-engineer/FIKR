import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { DemoNav } from '@/components/DemoNav';
import { LandingScene } from '@/components/scenes/LandingScene';
import { IntroScene } from '@/components/scenes/IntroScene';
import { MapScene } from '@/components/scenes/MapScene';
import { StreetScene } from '@/components/scenes/StreetScene';
import { ChallengeScene } from '@/components/scenes/ChallengeScene';
import { RewardScene } from '@/components/scenes/RewardScene';
import { ParentDashboard } from '@/components/scenes/ParentDashboard';
import { EndCardScene } from '@/components/scenes/EndCardScene';
import { initialYounisState, updatedYounisState } from '@/lib/mock-data';

// Scene index reference:
// 0 Landing  1 Intro  2 Map  3 Street  4 Challenge  5 Reward  6 Dashboard  7 Final

const queryClient = new QueryClient();

function FikrDemo() {
  const [currentScene, setCurrentScene] = useState(0);
  const [younisState, setYounisState] = useState(initialYounisState);

  const handleSceneChange = (scene: number) => {
    setCurrentScene(scene);
    if (scene <= 3) setYounisState(initialYounisState);
  };

  const handleNext = () => setCurrentScene((prev) => Math.min(prev + 1, 7));

  // Map scene: single CTA → Street (3)
  const handleEnterStreet = () => setCurrentScene(3);

  // Street scene: Toy Shop → Challenge (4), Parent Center → Dashboard (6)
  const handleStreetClick = (location: string) => {
    if (location === 'toy-shop')      setCurrentScene(4);
    if (location === 'parent-center') setCurrentScene(6);
    // bank + mart handled internally by StreetScene modals
  };

  const handleDecision = (decision: 'buy' | 'save') => {
    if (decision === 'save') {
      setYounisState(updatedYounisState);
      setCurrentScene(5);
    }
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setYounisState(initialYounisState);
  };

  const sceneVariants = {
    fadeSlide: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit:    { opacity: 0, x: -60 },
      transition: { duration: 0.4 },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit:    { opacity: 0, scale: 1.05 },
      transition: { duration: 0.5 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit:    { opacity: 0 },
      transition: { duration: 0.4 },
    },
  };

  const getVariant = (scene: number) => {
    if (scene === 0 || scene === 7) return sceneVariants.zoomIn;
    if (scene === 6) return sceneVariants.fade;
    return sceneVariants.fadeSlide;
  };

  const renderScene = () => {
    const v = getVariant(currentScene);
    const key = `scene-${currentScene}`;
    return (
      <motion.div key={key} {...v} className="absolute inset-0">
        {currentScene === 0 && <LandingScene onNext={handleNext} />}
        {currentScene === 1 && <IntroScene younis={younisState} onNext={handleNext} />}
        {currentScene === 2 && <MapScene younis={younisState} onEnterStreet={handleEnterStreet} />}
        {currentScene === 3 && <StreetScene younis={younisState} onLocationClick={handleStreetClick} />}
        {currentScene === 4 && <ChallengeScene younis={younisState} onDecision={handleDecision} />}
        {currentScene === 5 && <RewardScene younis={updatedYounisState} onNext={handleNext} />}
        {currentScene === 6 && <ParentDashboard younis={updatedYounisState} />}
        {currentScene === 7 && <EndCardScene onRestart={handleRestart} />}
      </motion.div>
    );
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col overflow-hidden">
      <DemoNav currentScene={currentScene} onSceneChange={handleSceneChange} />

      {/* 16:9 cinematic container */}
      <div className="flex-1 flex items-center justify-center p-3 overflow-hidden min-h-0">
        <div
          className="w-full max-w-[1280px] shadow-2xl overflow-hidden relative rounded-sm"
          style={{ aspectRatio: '16/9', maxHeight: '100%', background: '#000' }}
        >
          <AnimatePresence mode="wait">
            {renderScene()}
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
