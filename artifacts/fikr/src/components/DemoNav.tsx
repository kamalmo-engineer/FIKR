import React from 'react';
import { motion } from 'framer-motion';

interface DemoNavProps {
  currentScene: number;
  onSceneChange: (scene: number) => void;
}

const scenes = [
  { id: 0, label: 'Landing' },
  { id: 1, label: 'Intro' },
  { id: 2, label: 'Map' },
  { id: 3, label: 'Street' },
  { id: 4, label: 'Challenge' },
  { id: 5, label: 'Reward' },
  { id: 6, label: 'Dashboard' },
  { id: 7, label: 'Final' },
];

export function DemoNav({ currentScene, onSceneChange }: DemoNavProps) {
  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 py-2.5 px-6">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-2">
        <div className="text-white/50 text-xs font-semibold tracking-widest uppercase">
          Demo
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              data-testid={`nav-scene-${scene.id}`}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            >
              {currentScene === scene.id && (
                <motion.div
                  layoutId="active-scene"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className={`relative z-10 ${currentScene === scene.id ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                {scene.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
