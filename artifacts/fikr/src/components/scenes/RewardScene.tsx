import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Coins, BarChart3 } from 'lucide-react';
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

          {/* Parent Dashboard CTA */}
          <motion.button
            onClick={onNext}
            data-testid="button-view-dashboard"
            className="relative w-full overflow-hidden rounded-2xl text-white flex items-center justify-center gap-3 px-8 py-4"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(167,139,250,0.5)',
              boxShadow: '0 0 28px rgba(167,139,250,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 48px rgba(167,139,250,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(167,139,250,0.85)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Animated shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.09) 50%, transparent 65%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />

            {/* Icon */}
            <div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.4)' }}
            >
              <BarChart3 className="w-4.5 h-4.5 text-purple-300" style={{ width: 18, height: 18 }} />
            </div>

            {/* Label */}
            <div className="relative text-left">
              <p className="text-base font-black text-white leading-tight">View Progress in Parent Dashboard</p>
              <p className="text-[11px] font-medium text-purple-300/80">See full analytics &amp; insights →</p>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
