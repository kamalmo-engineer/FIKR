import React from 'react';
import { motion } from 'framer-motion';

interface LandingSceneProps {
  onNext: () => void;
}

const FloatingParticle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      background: 'radial-gradient(circle, #fbbf24, #f97316)',
    }}
    animate={{ y: [0, -28, 0], opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
    transition={{ duration: 3.5 + delay * 0.4, repeat: Infinity, delay }}
  />
);

const particles = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37 + 11) % 97,
  y: (i * 53 + 7) % 90,
  delay: i * 0.18,
}));

export function LandingScene({ onNext }: LandingSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Real background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/landing.jpg')` }}
      />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />

      {/* Floating particles */}
      {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.68, -0.55, 0.265, 1.55] }}
          className="flex flex-col items-center"
        >
          {/* CTA */}
          <motion.button
            onClick={onNext}
            data-testid="button-start-journey"
            className="relative px-14 py-4 text-white text-xl font-black rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              boxShadow: '0 0 36px rgba(251,146,60,0.5)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            whileHover={{ scale: 1.07, boxShadow: '0 0 56px rgba(251,146,60,0.75)' }}
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
        </motion.div>

        <motion.p
          className="absolute bottom-8 text-white/60 text-sm font-semibold tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          A financial literacy adventure for the next generation
        </motion.p>
      </div>
    </div>
  );
}
