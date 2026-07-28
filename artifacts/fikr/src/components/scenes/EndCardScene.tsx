import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ExternalLink, Star, Coins } from 'lucide-react';
import heroSunsetPath from '@assets/generated_images/hero-sunset.jpg';

interface EndCardSceneProps {
  onRestart: () => void;
}

const FloatingStar = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  >
    <Star className={`w-${size} h-${size} text-amber-300 fill-amber-300`} />
  </motion.div>
);

const FloatingCoin = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      rotate: [0, 360],
      y: [0, -15, 0],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  >
    <Coins className="w-6 h-6 text-yellow-400" />
  </motion.div>
);

export function EndCardScene({ onRestart }: EndCardSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroSunsetPath})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-orange-600/30 to-amber-500/40" />

      {/* Floating Elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingStar key={`star-${i}`} delay={i * 0.3} size={i % 2 === 0 ? 4 : 6} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <FloatingCoin key={`coin-${i}`} delay={i * 0.4} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <motion.div
          className="max-w-3xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.h1 
            className="text-7xl font-black mb-6 tracking-tight"
            style={{ 
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.5))',
            }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            FIKR
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-2xl font-bold text-white mb-4 max-w-2xl leading-relaxed"
            style={{ 
              fontFamily: 'var(--font-display)',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Think Better. Decide Better. Build Better Futures.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="text-xl font-semibold text-white/90 mb-12 max-w-xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-display)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Ready to unlock your child's financial potential?
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 justify-center items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button
              onClick={onRestart}
              data-testid="button-restart-demo"
              className="px-10 py-4 bg-white text-orange-600 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/30"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5" />
                Restart Demo
              </span>
            </button>

            <button
              data-testid="button-learn-more"
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="flex items-center gap-3">
                Learn More
                <ExternalLink className="w-5 h-5" />
              </span>
            </button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Gamified Learning
              </h3>
              <p className="text-sm text-white/80 font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Kids learn through play, not lectures
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                AI-Powered Insights
              </h3>
              <p className="text-sm text-white/80 font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Parents see real-time progress
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Real-World Skills
              </h3>
              <p className="text-sm text-white/80 font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Build financial habits early
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="absolute bottom-8 text-white/60 text-sm font-medium"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          © 2024 FIKR — Building the next generation of financial thinkers
        </motion.div>
      </div>
    </div>
  );
}
