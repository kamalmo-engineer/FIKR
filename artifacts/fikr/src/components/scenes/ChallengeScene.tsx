import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Wallet, AlertCircle } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface ChallengeSceneProps {
  younis: YounisState;
  onDecision: (decision: 'buy' | 'save') => void;
}

export function ChallengeScene({ younis, onDecision }: ChallengeSceneProps) {
  const shortfall = younis.goalCost - younis.coins;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Toy shop background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/challang.jpg')` }}
      />
      {/* Darken so modal pops */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Thought bubble */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
      >
        <p className="text-sm font-bold text-gray-700 italic">
          "Should I buy it now or keep saving? 🤔"
        </p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
      </motion.div>

      {/* Challenge Modal */}
      <div className="relative z-10 flex items-center justify-center h-full p-6">
        <motion.div
          className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: 'rgba(255,255,255,0.97)' }}
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
        >
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }} className="px-6 py-4">
            <h2 className="text-2xl font-black text-white text-center">
              🛴 Your Dream Is Right Here!
            </h2>
          </div>

          <div className="p-6 space-y-5">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-amber-700 mb-1">Price</p>
                <p className="text-2xl font-black text-amber-600">{younis.goalCost}</p>
                <p className="text-xs text-amber-500">coins</p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-blue-700 mb-1">You Have</p>
                <p className="text-2xl font-black text-blue-600">{younis.coins}</p>
                <p className="text-xs text-blue-500">coins</p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-red-700 mb-1">You Need</p>
                <p className="text-2xl font-black text-red-600">{shortfall}</p>
                <p className="text-xs text-red-500">more coins</p>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                <span>Savings progress</span>
                <span>{Math.round((younis.coins / younis.goalCost) * 100)}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(younis.coins / younis.goalCost) * 100}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Alert */}
            <div className="flex items-start gap-3 bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-orange-800">
                You're {shortfall} coins short. Think carefully — what's the smart move?
              </p>
            </div>

            {/* Decision buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                disabled
                data-testid="button-buy-now"
                className="py-5 rounded-2xl bg-gray-100 border-2 border-gray-200 cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col items-center gap-1.5 text-gray-400">
                  <ShoppingCart className="w-7 h-7" />
                  <span className="text-base font-black">Buy Now</span>
                  <span className="text-xs font-medium">Not enough coins!</span>
                </div>
              </motion.button>

              <motion.button
                onClick={() => onDecision('save')}
                data-testid="button-save-wait"
                className="py-5 rounded-2xl border-2 border-emerald-400 text-white"
                style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', boxShadow: '0 0 24px rgba(16,185,129,0.4)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(16,185,129,0.6)' }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <Wallet className="w-7 h-7" />
                  <span className="text-base font-black">Save & Wait</span>
                  <span className="text-xs font-medium">✨ Smart choice!</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
