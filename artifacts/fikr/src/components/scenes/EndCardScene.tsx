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

      {/* Subtle bottom vignette so button stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />

      {/* Restart button — bottom-center, above the edge */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center z-10">
        <motion.button
          onClick={onRestart}
          data-testid="button-restart"
          className="inline-flex items-center gap-3 px-10 py-3.5 rounded-2xl text-white text-base font-black"
          style={{
            background: 'linear-gradient(135deg, #f97316, #fbbf24)',
            boxShadow: '0 0 36px rgba(249,115,22,0.55)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 52px rgba(249,115,22,0.75)' }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw className="w-5 h-5" />
          Restart Demo
        </motion.button>
      </div>
    </div>
  );
}
