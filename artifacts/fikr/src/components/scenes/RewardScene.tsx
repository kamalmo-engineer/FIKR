import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Coins, ArrowRight } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface RewardSceneProps {
  younis: YounisState;
  onNext: () => void;
}

const ConfettiPiece = ({ x, delay, color }: { x: number; delay: number; color: string }) => (
  <motion.div
    className="absolute w-3 h-3 rounded-sm"
    style={{ left: `${x}%`, top: '-5%', background: color }}
    initial={{ y: 0, rotate: 0, opacity: 1 }}
    animate={{ y: '110vh', rotate: 900, opacity: 0 }}
    transition={{ duration: 3 + Math.random() * 1.5, delay, ease: 'linear' }}
  />
);

const confettiData = Array.from({ length: 45 }, (_, i) => ({
  x: (i * 47 + 3) % 100,
  delay: i * 0.07,
  color: ['#f97316','#fbbf24','#34d399','#a78bfa','#f472b6','#60a5fa'][i % 6],
}));

export function RewardScene({ younis, onNext }: RewardSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Reward background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/reward.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Confetti */}
      {confettiData.map((c, i) => <ConfettiPiece key={i} {...c} />)}

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(251,191,36,0.2), transparent)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <div className="relative z-10 flex items-center justify-center h-full p-8">
        <motion.div
          className="w-full max-w-xl text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
        >
          {/* Trophy */}
          <motion.div
            className="text-8xl mb-4"
            animate={{ rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.5 }}
          >
            🏆
          </motion.div>

          <motion.h2
            className="text-5xl font-black text-white mb-2"
            style={{ textShadow: '0 0 40px rgba(251,191,36,0.7)' }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Mission Complete!
          </motion.h2>
          <motion.p
            className="text-lg font-bold text-purple-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You made a smart decision, {younis.name}! 🌟
          </motion.p>

          {/* Rewards */}
          <motion.div
            className="rounded-3xl p-6 mb-6 space-y-3"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(251,191,36,0.35)',
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <h3 className="text-lg font-black text-white mb-4">Your Rewards</h3>

            {[
              { icon: Zap,   label: '+120 XP',  sub: 'Experience gained', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
              { icon: Coins, label: '+50 Coins', sub: 'Added to savings',  color: '#34d399', bg: 'rgba(52,211,153,0.15)'  },
            ].map(({ icon: Icon, label, sub, color, bg }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{ background: bg, border: `1px solid ${color}40` }}
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.15, type: 'spring' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}22` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-black text-white">{label}</div>
                  <div className="text-xs font-medium" style={{ color: `${color}bb` }}>{sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Badge */}
            <motion.div
              className="flex items-center gap-4 rounded-2xl px-5 py-4"
              style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(167,139,250,0.2)' }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                🏅
              </motion.div>
              <div className="text-left">
                <div className="text-base font-black text-white">Smart Decision Badge</div>
                <div className="text-xs font-medium text-purple-300">Unlocked achievement!</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Next */}
          <motion.button
            onClick={onNext}
            data-testid="button-view-dashboard"
            className="px-10 py-4 rounded-2xl text-white text-lg font-black flex items-center gap-3 mx-auto"
            style={{
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              boxShadow: '0 0 32px rgba(249,115,22,0.5)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 48px rgba(249,115,22,0.7)' }}
            whileTap={{ scale: 0.96 }}
          >
            View Parent Dashboard
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
