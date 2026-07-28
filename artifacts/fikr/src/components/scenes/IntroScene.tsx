import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Coins, Zap } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';
import younisAvatarPath from '@assets/generated_images/younis-avatar.png';

interface IntroSceneProps {
  younis: YounisState;
  onNext: () => void;
}

export function IntroScene({ younis, onNext }: IntroSceneProps) {
  const xpPercent = (younis.xp / younis.maxXP) * 100;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          {/* Header */}
          <motion.h2
            className="text-4xl font-black text-center mb-8 text-orange-900"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Meet {younis.name}
          </motion.h2>

          {/* Character Card */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Avatar and Level */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <img 
                  src={younisAvatarPath} 
                  alt="Younis"
                  className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Lv {younis.level}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {younis.name}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-purple-900" style={{ fontFamily: 'var(--font-display)' }}>
                    {younis.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Coins */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-bold text-amber-900" style={{ fontFamily: 'var(--font-display)' }}>
                    Coins
                  </span>
                </div>
                <div className="text-3xl font-black text-amber-700" style={{ fontFamily: 'var(--font-display)' }}>
                  {younis.coins}
                </div>
              </div>

              {/* XP */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border-2 border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-900" style={{ fontFamily: 'var(--font-display)' }}>
                    Experience
                  </span>
                </div>
                <div className="text-3xl font-black text-emerald-700" style={{ fontFamily: 'var(--font-display)' }}>
                  {younis.xp}/{younis.maxXP}
                </div>
                {/* XP Bar */}
                <div className="mt-2 h-2 bg-emerald-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Goal */}
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 border-2 border-orange-300">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-orange-600" />
                <span className="text-lg font-black text-orange-900" style={{ fontFamily: 'var(--font-display)' }}>
                  Dream Goal
                </span>
              </div>
              <div className="text-2xl font-black text-orange-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {younis.goal}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-orange-700" style={{ fontFamily: 'var(--font-display)' }}>
                  Target: {younis.goalCost} coins
                </span>
                <span className="font-bold text-orange-600" style={{ fontFamily: 'var(--font-display)' }}>
                  Need: {younis.goalCost - younis.coins} more
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button
              onClick={onNext}
              data-testid="button-begin-adventure"
              className="group px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="flex items-center gap-3">
                Begin Adventure
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
