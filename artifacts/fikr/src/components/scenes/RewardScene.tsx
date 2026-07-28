import React from 'react';
import { motion } from 'framer-motion';
import { Award, Coins, Zap, ArrowRight } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface RewardSceneProps {
  younis: YounisState;
  onNext: () => void;
}

const ConfettiPiece = ({ delay, color }: { delay: number; color: string }) => (
  <motion.div
    className={`absolute w-3 h-3 ${color}`}
    style={{
      left: `${Math.random() * 100}%`,
      top: '-10%',
    }}
    initial={{ y: 0, opacity: 1, rotate: 0 }}
    animate={{ 
      y: '120vh', 
      opacity: 0,
      rotate: 720,
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      ease: 'linear',
    }}
  />
);

export function RewardScene({ younis, onNext }: RewardSceneProps) {
  const confettiColors = [
    'bg-orange-500',
    'bg-amber-400',
    'bg-emerald-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece 
          key={i} 
          delay={i * 0.05} 
          color={confettiColors[i % confettiColors.length]} 
        />
      ))}

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-400/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full p-8">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
        >
          {/* Celebration Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Award className="w-24 h-24 text-yellow-300 drop-shadow-2xl" />
            </motion.div>
            
            <h2 className="text-5xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Mission Complete!
            </h2>
            <p className="text-xl font-bold text-purple-200" style={{ fontFamily: 'var(--font-display)' }}>
              You made a smart decision, {younis.name}!
            </p>
          </motion.div>

          {/* Rewards Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-amber-300/50 shadow-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-black text-white text-center mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Your Rewards
            </h3>

            {/* Reward Items */}
            <div className="space-y-4">
              {/* XP */}
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-5 flex items-center justify-between"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
                      Experience Points
                    </div>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      +120 XP
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-4xl font-black text-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  ✓
                </motion.div>
              </motion.div>

              {/* Coins */}
              <motion.div
                className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-5 flex items-center justify-between"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, type: 'spring' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
                      Bonus Coins
                    </div>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      +50 Coins
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-4xl font-black text-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  ✓
                </motion.div>
              </motion.div>

              {/* Badge */}
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 flex items-center justify-between"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, type: 'spring' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/80" style={{ fontFamily: 'var(--font-display)' }}>
                      New Badge Unlocked
                    </div>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Smart Decision 🧠
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-4xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </div>

            {/* Updated Stats */}
            <motion.div
              className="mt-6 pt-6 border-t-2 border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm font-bold text-white/70" style={{ fontFamily: 'var(--font-display)' }}>
                    Total Coins
                  </div>
                  <div className="text-3xl font-black text-amber-300" style={{ fontFamily: 'var(--font-display)' }}>
                    {younis.coins}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white/70" style={{ fontFamily: 'var(--font-display)' }}>
                    XP Progress
                  </div>
                  <div className="text-3xl font-black text-emerald-300" style={{ fontFamily: 'var(--font-display)' }}>
                    {younis.xp}/{younis.maxXP}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            <button
              onClick={onNext}
              data-testid="button-continue"
              className="group px-12 py-5 bg-white text-purple-900 text-xl font-black rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="flex items-center gap-3">
                Continue
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
