import React from 'react';
import { motion } from 'framer-motion';

interface DemoNavProps {
  currentScene: number;
  onSceneChange: (scene: number) => void;
}

const scenes = [
  { id: 0, label: 'Landing' },
  { id: 1, label: 'Intro' },
  { id: 2, label: 'Street' },
  { id: 3, label: 'Challenge' },
  { id: 4, label: 'Reward' },
  { id: 5, label: 'Parent Dashboard' },
  { id: 6, label: 'End Card' }
];

export function DemoNav({ currentScene, onSceneChange }: DemoNavProps) {
  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 py-3 px-6">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        <div className="text-white/60 text-sm font-medium" style={{ fontFamily: 'var(--font-parent)' }}>
          Demo Navigation
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              data-testid={`nav-scene-${scene.id}`}
              className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{ fontFamily: 'var(--font-parent)' }}
            >
              {currentScene === scene.id && (
                <motion.div
                  layoutId="active-scene"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${currentScene === scene.id ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                {scene.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
