import React from 'react';
import { motion } from 'framer-motion';

interface LandingSceneProps {
  onNext: () => void;
}

export function LandingScene({ onNext }: LandingSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/landing.jpg')` }}
      />

      {/* Subtle bottom vignette so footer text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      {/* CTA button — sitting low, above the footer */}
      <div className="absolute inset-x-0 bottom-16 flex justify-center z-10">
        <motion.button
          onClick={onNext}
          data-testid="button-start-journey"
          className="relative px-14 py-4 text-white text-xl font-black rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f97316, #fbbf24)',
            boxShadow: '0 0 36px rgba(251,146,60,0.55)',
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 56px rgba(251,146,60,0.8)' }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            ▶ Start Your Journey
          </span>
        </motion.button>
      </div>

      {/* Footer tagline */}
      <motion.p
        className="absolute bottom-4 inset-x-0 text-center text-white/60 text-sm font-semibold tracking-wide z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        A financial literacy adventure for the next generation
      </motion.p>
    </div>
  );
}
