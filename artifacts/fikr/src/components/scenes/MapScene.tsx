import React from 'react';
import { motion } from 'framer-motion';
import { Coins, ArrowRight } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface MapSceneProps {
  younis: YounisState;
  onEnterStreet: () => void;
}

export function MapScene({ younis, onEnterStreet }: MapSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={onEnterStreet}>
      {/* Map background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url('/map.jpg')` }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55 pointer-events-none" />

      {/* Top-left title */}
      <motion.div
        className="absolute top-5 left-6 z-20 pointer-events-none"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">City Map</p>
        <p
          className="text-2xl font-black text-white"
          style={{ textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}
        >
          Where will Younis go?
        </p>
      </motion.div>

      {/* Coins HUD */}
      <motion.div
        className="absolute top-5 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(251,191,36,0.35)',
        }}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <Coins className="w-4 h-4 text-amber-400" />
        <span className="text-base font-black text-amber-300">{younis.coins}</span>
        <span className="text-xs text-white/45 font-medium">coins</span>
      </motion.div>

      {/* Single primary CTA — bottom centre */}
      <div className="absolute bottom-7 inset-x-0 flex justify-center z-20 pointer-events-none">
        <motion.button
          onClick={(e) => { e.stopPropagation(); onEnterStreet(); }}
          data-testid="button-enter-street"
          className="relative flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-black text-base overflow-hidden pointer-events-auto"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 60%, #f97316 100%)',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 30px rgba(249,115,22,0.55), 0 4px 20px rgba(0,0,0,0.4)',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
          transition={{
            y: { delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            opacity: { delay: 0.55, duration: 0.6 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 0 52px rgba(249,115,22,0.8), 0 6px 28px rgba(0,0,0,0.45)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            🏙️ ENTER THE CITY STREET
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </div>

      {/* Subtle "tap anywhere" hint */}
      <motion.p
        className="absolute bottom-2 inset-x-0 text-center text-xs text-white/30 font-medium pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        or tap anywhere on the map
      </motion.p>
    </div>
  );
}
