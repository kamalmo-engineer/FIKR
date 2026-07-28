import React from 'react';
import { motion } from 'framer-motion';
import { Store, Building2, Users, Coins } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface MapSceneProps {
  younis: YounisState;
  onLocationClick: (location: string) => void;
}

const hotspots = [
  {
    id: 'toy-shop',
    label: 'Toy Shop',
    icon: Store,
    position: { left: '14%', top: '52%' },
    color: '#f97316',
    glow: 'rgba(249,115,22,0.6)',
    desc: 'Visit for the scooter!',
  },
  {
    id: 'bank',
    label: 'Bank',
    icon: Building2,
    position: { left: '54%', top: '32%' },
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.6)',
    desc: 'Save & grow',
  },
  {
    id: 'parent-center',
    label: 'Parent Center',
    icon: Users,
    position: { left: '76%', top: '28%' },
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.6)',
    desc: 'Family insights',
  },
];

export function MapScene({ younis, onLocationClick }: MapSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Map background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/map.jpg')` }}
      />
      {/* Light vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />

      {/* Coins HUD */}
      <motion.div
        className="absolute top-5 right-6 z-20 flex items-center gap-2 px-5 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(251,191,36,0.35)',
        }}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
      >
        <Coins className="w-5 h-5 text-amber-400" />
        <span className="text-lg font-black text-amber-300">{younis.coins}</span>
        <span className="text-xs text-white/50 font-medium">coins</span>
      </motion.div>

      {/* Title */}
      <motion.div
        className="absolute top-5 left-6 z-20"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p
          className="text-sm font-bold uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          City Map Hub
        </p>
        <p className="text-2xl font-black text-white" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
          Where will Younis go?
        </p>
      </motion.div>

      {/* Hotspots */}
      {hotspots.map((spot, i) => {
        const Icon = spot.icon;
        return (
          <motion.button
            key={spot.id}
            onClick={() => onLocationClick(spot.id)}
            data-testid={`hotspot-${spot.id}`}
            className="absolute z-10 flex flex-col items-center gap-1.5 group"
            style={{ left: spot.position.left, top: spot.position.top }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={{
              scale: { delay: 0.5 + i * 0.15, type: 'spring', bounce: 0.5 },
              opacity: { delay: 0.5 + i * 0.15 },
              y: { duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.15, y: -14 }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: spot.glow, filter: 'blur(8px)' }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            {/* Icon bubble */}
            <div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${spot.color}cc, ${spot.color})`,
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: `0 0 24px ${spot.glow}`,
              }}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            {/* Label */}
            <div
              className="px-3 py-1 rounded-full text-xs font-black text-white"
              style={{
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {spot.label}
            </div>
          </motion.button>
        );
      })}

      {/* Instruction banner */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 px-8 py-3 rounded-2xl z-20"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <p className="text-white font-bold text-sm text-center">
          🗺️ Tap a location to begin Younis's adventure
        </p>
      </motion.div>
    </div>
  );
}
