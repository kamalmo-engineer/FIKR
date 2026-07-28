import React from 'react';
import { motion } from 'framer-motion';
import { Store, Building2, Users, ShoppingCart, Coins } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';
import streetMapPath from '@assets/generated_images/street-map.jpg';

interface StreetSceneProps {
  younis: YounisState;
  onLocationClick: (location: string) => void;
}

const hotspots = [
  { id: 'toy-shop', label: 'Toy Shop', icon: Store, position: { left: '28%', top: '48%' }, color: 'from-pink-500 to-rose-500' },
  { id: 'bank', label: 'Bank', icon: Building2, position: { left: '68%', top: '38%' }, color: 'from-blue-500 to-cyan-500' },
  { id: 'parent-center', label: 'Parent Center', icon: Users, position: { left: '72%', top: '20%' }, color: 'from-purple-500 to-indigo-500' },
  { id: 'mart', label: 'FIKR Mart', icon: ShoppingCart, position: { left: '68%', top: '68%' }, color: 'from-emerald-500 to-green-500' },
];

export function StreetScene({ younis, onLocationClick }: StreetSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100">
      {/* Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${streetMapPath})` }}
      />

      {/* Coin HUD */}
      <motion.div
        className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border-2 border-amber-200"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600" style={{ fontFamily: 'var(--font-display)' }}>
              {younis.name}'s Coins
            </div>
            <div className="text-2xl font-black text-amber-600" style={{ fontFamily: 'var(--font-display)' }}>
              {younis.coins}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hotspots */}
      {hotspots.map((hotspot, index) => (
        <motion.button
          key={hotspot.id}
          onClick={() => onLocationClick(hotspot.id)}
          data-testid={`hotspot-${hotspot.id}`}
          className={`absolute z-10 px-5 py-3 bg-gradient-to-r ${hotspot.color} text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 border-3 border-white/50`}
          style={{ 
            left: hotspot.position.left, 
            top: hotspot.position.top,
            fontFamily: 'var(--font-display)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -8, 0],
          }}
          transition={{ 
            scale: { delay: 0.2 + index * 0.15, type: 'spring', bounce: 0.5 },
            opacity: { delay: 0.2 + index * 0.15 },
            y: { 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.3,
              ease: 'easeInOut',
            }
          }}
          whileHover={{ 
            y: -12,
            transition: { duration: 0.2 }
          }}
        >
          <span className="flex items-center gap-2">
            <hotspot.icon className="w-5 h-5" />
            {hotspot.label}
          </span>
        </motion.button>
      ))}

      {/* Instruction Text */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-lg font-bold text-gray-800 text-center" style={{ fontFamily: 'var(--font-display)' }}>
          Click on the Toy Shop to start your mission!
        </p>
      </motion.div>
    </div>
  );
}
