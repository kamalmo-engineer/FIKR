import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { YounisState } from '@/lib/mock-data';

interface IntroSceneProps {
  younis: YounisState;
  onNext: () => void;
}

const ageGroups = ['6–8', '9–12', '13–18'];
const dreamIcons = [
  { label: 'Scooter', emoji: '🛴' },
  { label: 'Gadget',  emoji: '📱' },
  { label: 'Travel',  emoji: '✈️' },
  { label: 'Books',   emoji: '📚' },
];

export function IntroScene({ younis, onNext }: IntroSceneProps) {
  const [selectedAge, setSelectedAge] = useState('9–12');
  const [selectedDream, setSelectedDream] = useState('Scooter');

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/younis-intro.jpg')` }}
      />
      {/* Dark overlay so cards remain readable */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-8">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.h2
            className="text-4xl font-black text-center text-white mb-6"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome, Explorer! 👋
          </motion.h2>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-7 shadow-2xl space-y-6">
            {/* Age Group */}
            <div>
              <p className="text-sm font-bold text-white/70 uppercase tracking-widest mb-3">
                Age Group
              </p>
              <div className="flex gap-3">
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className="flex-1 py-3 rounded-2xl font-black text-lg transition-all duration-200"
                    style={{
                      background: selectedAge === age
                        ? 'linear-gradient(135deg, #f97316, #fbbf24)'
                        : 'rgba(255,255,255,0.1)',
                      color: selectedAge === age ? '#fff' : 'rgba(255,255,255,0.6)',
                      border: selectedAge === age ? 'none' : '1px solid rgba(255,255,255,0.15)',
                      boxShadow: selectedAge === age ? '0 0 20px rgba(249,115,22,0.5)' : 'none',
                    }}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Dream Icons */}
            <div>
              <p className="text-sm font-bold text-white/70 uppercase tracking-widest mb-3">
                My Dream
              </p>
              <div className="flex gap-3">
                {dreamIcons.map(({ label, emoji }) => (
                  <button
                    key={label}
                    onClick={() => setSelectedDream(label)}
                    className="flex-1 flex flex-col items-center py-3 rounded-2xl transition-all duration-200"
                    style={{
                      background: selectedDream === label
                        ? 'linear-gradient(135deg, rgba(251,191,36,0.4), rgba(249,115,22,0.4))'
                        : 'rgba(255,255,255,0.08)',
                      border: selectedDream === label
                        ? '1.5px solid rgba(251,191,36,0.7)'
                        : '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <span className="text-2xl mb-1">{emoji}</span>
                    <span className="text-xs font-bold text-white/80">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Goal */}
            <div
              className="flex items-center gap-4 rounded-2xl px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, rgba(251,146,60,0.2), rgba(251,191,36,0.2))',
                border: '1.5px solid rgba(251,191,36,0.4)',
              }}
            >
              <span className="text-3xl">🛴</span>
              <div>
                <p className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-0.5">
                  Financial Goal
                </p>
                <p className="text-lg font-black text-white">Buy My Dream Scooter</p>
                <p className="text-sm text-white/60">
                  {younis.coins} / {younis.goalCost} coins saved
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-black text-amber-300">
                  {Math.round((younis.coins / younis.goalCost) * 100)}%
                </div>
                <div className="w-20 h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(younis.coins / younis.goalCost) * 100}%` }}
                    transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              onClick={onNext}
              data-testid="button-begin-adventure"
              className="w-full py-4 rounded-2xl text-white text-xl font-black relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                boxShadow: '0 0 32px rgba(249,115,22,0.45)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 48px rgba(249,115,22,0.65)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 opacity-25"
                style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.2 }}
              />
              <span className="relative z-10">START MY JOURNEY ✨</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
