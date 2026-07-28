import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Wallet, AlertCircle, Clock } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';
import streetMapPath from '@assets/generated_images/street-map.jpg';
import scooterPath from '@assets/generated_images/red-scooter.png';

interface ChallengeSceneProps {
  younis: YounisState;
  onDecision: (decision: 'buy' | 'save') => void;
}

export function ChallengeScene({ younis, onDecision }: ChallengeSceneProps) {
  const shortfall = younis.goalCost - younis.coins;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Faded Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
        style={{ backgroundImage: `url(${streetMapPath})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Challenge Modal */}
      <div className="relative z-10 flex items-center justify-center h-full p-8">
        <motion.div
          className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
        >
          {/* Thinking Bubble */}
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-3xl px-6 py-3 shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <p className="text-sm font-bold text-gray-700 italic" style={{ fontFamily: 'var(--font-display)' }}>
              "Should I wait or find another way?"
            </p>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
          </motion.div>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
            <h2 className="text-3xl font-black text-white text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Your Dream is Here!
            </h2>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Scooter Image */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
            >
              <div className="relative">
                <img 
                  src={scooterPath} 
                  alt="Red Scooter"
                  className="w-64 h-64 object-contain drop-shadow-2xl"
                />
                <motion.div
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-full font-black text-lg shadow-xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                  animate={{ 
                    rotate: [-5, 5, -5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Dream Goal!
                </motion.div>
              </div>
            </motion.div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <h3 className="text-2xl font-black text-gray-900 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                Dream Red Scooter 🛴
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200 text-center">
                  <div className="text-xs font-bold text-amber-700 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    Price
                  </div>
                  <div className="text-2xl font-black text-amber-600" style={{ fontFamily: 'var(--font-display)' }}>
                    {younis.goalCost}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 text-center">
                  <div className="text-xs font-bold text-blue-700 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    You Have
                  </div>
                  <div className="text-2xl font-black text-blue-600" style={{ fontFamily: 'var(--font-display)' }}>
                    {younis.coins}
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200 text-center">
                  <div className="text-xs font-bold text-red-700 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    You Need
                  </div>
                  <div className="text-2xl font-black text-red-600" style={{ fontFamily: 'var(--font-display)' }}>
                    {shortfall}
                  </div>
                </div>
              </div>

              {/* Alert */}
              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-orange-800" style={{ fontFamily: 'var(--font-display)' }}>
                  You're {shortfall} coins short. What will you do?
                </p>
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Buy Now (Disabled) */}
              <motion.button
                disabled
                data-testid="button-buy-now"
                className="relative group px-6 py-5 bg-gray-200 text-gray-400 font-black rounded-2xl cursor-not-allowed border-2 border-gray-300"
                style={{ fontFamily: 'var(--font-display)' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <ShoppingCart className="w-7 h-7" />
                  <span className="text-lg">Buy Now</span>
                  <span className="text-xs font-medium">Not enough coins!</span>
                </div>
              </motion.button>

              {/* Save & Wait */}
              <motion.button
                onClick={() => onDecision('save')}
                data-testid="button-save-wait"
                className="px-6 py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-black rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-emerald-400"
                style={{ fontFamily: 'var(--font-display)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <Wallet className="w-7 h-7" />
                  <span className="text-lg">Save & Wait</span>
                  <span className="text-xs font-medium">Smart choice!</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
