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
import { YounisProvider, useYounis } from '@/context/Younis';

// Scene index reference:
// 0 Landing  1 Intro  2 Map  3 Street  4 Challenge  5 Reward  6 Dashboard  7 Final

const queryClient = new QueryClient();

function FikrDemo() {
  const [currentScene, setCurrentScene] = useState(0);
  const { younis, setYounis, resetYounis } = useYounis();

  const handleSceneChange = (scene: number) => {
    setCurrentScene(scene);
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
      // Apply reward on top of current live state (not a hardcoded snapshot)
      setYounis(prev => {
        const newCoins = prev.coins + 50;
        const earnTx = {
          id: `${Date.now()}-earn`,
          item: 'Smart Decision Bonus (+50 Coins, +120 XP)',
          location: 'Toy Shop Challenge',
          amount: 50,
          type: 'earn' as const,
          isImpulsive: false,
          timestamp: Date.now(),
        };
        return {
          ...prev,
          coins: newCoins,
          xp: Math.min(prev.xp + 120, prev.maxXP),
          progress: Math.min(Math.round((newCoins / prev.goalCost) * 100), 100),
          decisions: [...prev.decisions, 'Chose to save and wait for scooter'],
          badges: prev.badges.includes('Smart Decision')
            ? prev.badges
            : [...prev.badges, 'Smart Decision'],
          transactions: [earnTx, ...prev.transactions].slice(0, 12),
        };
      });
      setCurrentScene(5);
    }
  };

  const handleRestart = () => {
    resetYounis();
    setCurrentScene(0);
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
        {currentScene === 1 && <IntroScene younis={younis} onNext={handleNext} />}
        {currentScene === 2 && <MapScene younis={younis} onEnterStreet={handleEnterStreet} />}
        {currentScene === 3 && <StreetScene younis={younis} onLocationClick={handleStreetClick} />}
        {currentScene === 4 && <ChallengeScene younis={younis} onDecision={handleDecision} />}
        {currentScene === 5 && <RewardScene younis={younis} onNext={handleNext} />}
        {currentScene === 6 && <ParentDashboard younis={younis} onNext={handleNext} />}
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
      <YounisProvider>
        <TooltipProvider>
          <FikrDemo />
          <Toaster />
        </TooltipProvider>
      </YounisProvider>
    </QueryClientProvider>
  );
}

export default App;
