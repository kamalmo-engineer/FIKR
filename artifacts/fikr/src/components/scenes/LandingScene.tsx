import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import heroSunsetPath from '@assets/generated_images/hero-sunset.jpg';

interface LandingSceneProps {
  onNext: () => void;
}

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-amber-300 rounded-full opacity-60"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  />
);

export function LandingScene({ onNext }: LandingSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroSunsetPath})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-orange-600/20 to-amber-500/30" />
      
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.2} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        >
          {/* Logo */}
          <motion.h1 
            className="text-8xl font-black mb-4 tracking-tight"
            style={{ 
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.4))',
            }}
            animate={{
              filter: [
                'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.4))',
                'drop-shadow(0 4px 30px rgba(251, 146, 60, 0.6))',
                'drop-shadow(0 4px 20px rgba(251, 146, 60, 0.4))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FIKR
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-2xl font-bold text-white mb-12 max-w-2xl leading-relaxed"
            style={{ 
              fontFamily: 'var(--font-display)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Think Better. Decide Better. Build Better Futures.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={onNext}
            data-testid="button-start-journey"
            className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.6)' }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 animate-shimmer" />
            
            <span className="relative z-10 flex items-center gap-3">
              Start Journey
              <Sparkles className="w-6 h-6" />
            </span>
            
            {/* Pulse Glow */}
            <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="absolute bottom-12 text-white/70 text-sm font-medium"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A financial literacy adventure for the next generation
        </motion.div>
      </div>
    </div>
  );
}
