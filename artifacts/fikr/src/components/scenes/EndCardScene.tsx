import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface EndCardSceneProps {
  onRestart: () => void;
}

export function EndCardScene({ onRestart }: EndCardSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Final scene background — Younis on scooter in the city */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/final-scene.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-10 text-center px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Star accent */}
          <motion.div
            className="text-amber-400 text-4xl mb-2"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⭐
          </motion.div>

          {/* FIKR wordmark */}
          <motion.h1
            className="text-7xl font-black mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 28px rgba(251,146,60,0.6))',
            }}
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            FIKR
          </motion.h1>

          {/* Main tagline */}
          <motion.p
            className="text-2xl font-black text-white mb-2"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Every Great Future Begins with One Smart Decision.
          </motion.p>

          {/* Sub-tagline */}
          <motion.p
            className="text-base font-semibold text-white/75 mb-8"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            Today, it was a scooter. Tomorrow, it will be real life.
          </motion.p>

          {/* Restart button */}
          <motion.button
            onClick={onRestart}
            data-testid="button-restart"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white text-lg font-black"
            style={{
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              boxShadow: '0 0 36px rgba(249,115,22,0.55)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.07, boxShadow: '0 0 52px rgba(249,115,22,0.75)' }}
            whileTap={{ scale: 0.96 }}
          >
            <RotateCcw className="w-5 h-5" />
            Restart Demo
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
