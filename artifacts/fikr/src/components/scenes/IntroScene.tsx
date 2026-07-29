import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Briefcase, Stethoscope, Cog, Palette, Compass, ArrowRight } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';
import { useYounis } from '@/context/Younis';

interface IntroSceneProps {
  younis: YounisState;
  onNext: () => void;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const AGE_GROUPS = [
  { id: '6–8',   label: '6–8',   emoji: '😊', color: '#60a5fa' },
  { id: '9–12',  label: '9–12',  emoji: '⭐', color: '#fbbf24' },
  { id: '13–18', label: '13–18', emoji: '🎓', color: '#a78bfa' },
];

const DREAMS = [
  { id: 'Entrepreneur', icon: Briefcase,    label: 'Entrepreneur', sub: 'Build my own business', color: '#34d399' },
  { id: 'Doctor',       icon: Stethoscope,  label: 'Doctor',       sub: 'Help people',           color: '#60a5fa' },
  { id: 'Engineer',     icon: Cog,          label: 'Engineer',     sub: 'Create amazing things', color: '#f97316' },
  { id: 'Artist',       icon: Palette,      label: 'Artist',       sub: 'Express creativity',    color: '#f472b6' },
  { id: 'Explorer',     icon: Compass,      label: 'Explorer',     sub: 'Still discovering',     color: '#fbbf24' },
];

const GOALS = [
  { id: 'Save Money',            emoji: '🐷', color: '#60a5fa' },
  { id: 'Smart Spending',        emoji: '💜', color: '#a78bfa' },
  { id: 'Buy My Dream Scooter',  emoji: '🛴', color: '#34d399' },
  { id: 'Buy Something Special', emoji: '🎮', color: '#f97316' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-3 ${className}`}
      style={{
        background: 'rgba(10, 14, 30, 0.65)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <span className="text-sm">{emoji}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{text}</span>
    </div>
  );
}

const CHARACTER = {
  Boy:  { src: '/character-boy.png',  name: 'Younis', glow: 'rgba(96,165,250,',  ring: '#60a5fa', gradFrom: '#1e40af', gradTo: '#60a5fa' },
  Girl: { src: '/character-girl.png', name: 'Laila',  glow: 'rgba(244,114,182,', ring: '#f472b6', gradFrom: '#9d174d', gradTo: '#f9a8d4' },
} as const;

function CharacterAvatar({ gender }: { gender: 'Boy' | 'Girl' }) {
  const c = CHARACTER[gender];
  return (
    <div className="flex flex-col items-center relative" style={{ width: 160 }}>

      {/* Holographic platform glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: 130,
          height: 20,
          background: `radial-gradient(ellipse, ${c.glow}0.55) 0%, transparent 70%)`,
          filter: 'blur(5px)',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.12, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />

      {/* Photo + glassmorphic frame */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gender}
          className="flex flex-col items-center"
          initial={{ scale: 0.88, opacity: 0, y: 10 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.88, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          style={{ marginBottom: 6 }}
        >
          <motion.div
            className="relative flex items-end justify-center overflow-hidden"
            style={{
              width: 130,
              height: 158,
              borderRadius: '50% 50% 40% 40% / 45% 45% 35% 35%',
              background: `linear-gradient(180deg, ${c.gradFrom}55 0%, ${c.gradTo}22 100%)`,
              border: `2px solid ${c.ring}60`,
            }}
            animate={{
              boxShadow: [
                `0 0 24px ${c.glow}0.5), 0 0 60px ${c.glow}0.18)`,
                `0 0 44px ${c.glow}0.85), 0 0 90px ${c.glow}0.3)`,
                `0 0 24px ${c.glow}0.5), 0 0 60px ${c.glow}0.18)`,
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            <img
              src={c.src}
              alt={c.name}
              className="w-full h-full object-cover object-top select-none"
              draggable={false}
            />

            {/* Level badge */}
            <div
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                boxShadow: '0 0 10px rgba(249,115,22,0.6)',
              }}
            >
              Lv2
            </div>
          </motion.div>

          {/* Name */}
          <div
            className="text-sm font-black text-white mt-2 mb-0.5"
            style={{ textShadow: `0 0 14px ${c.ring}` }}
          >
            {c.name}
          </div>
          <div className="text-[9px] font-bold text-white/45 uppercase tracking-wider">Level 2 Explorer</div>
        </motion.div>
      </AnimatePresence>

      {/* Orbit ring */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 150,
          height: 150,
          top: 0,
          borderRadius: '50%',
          border: `1px solid ${c.ring}35`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            top: -5,
            left: '50%',
            marginLeft: -5,
            background: c.ring,
            boxShadow: `0 0 8px ${c.ring}`,
          }}
        />
      </motion.div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function IntroScene({ younis, onNext }: IntroSceneProps) {
  const { setYounis } = useYounis();
  const [selectedAge,    setSelectedAge]    = useState('9–12');
  const [selectedDream,  setSelectedDream]  = useState('Entrepreneur');
  const [selectedGoal,   setSelectedGoal]   = useState('Buy My Dream Scooter');
  const [selectedGender, setSelectedGender] = useState<'Boy' | 'Girl'>('Boy');

  const handleStart = () => {
    setYounis(prev => ({
      ...prev,
      gender: selectedGender,
      name: CHARACTER[selectedGender].name,
    }));
    onNext();
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">

      {/* ── Background: clean environment ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/landing.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

      {/* ── Header ── */}
      <motion.div
        className="absolute top-0 inset-x-0 flex flex-col items-center pt-3 z-20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45 mb-0.5">
          Welcome to
        </p>
        <h1
          className="text-4xl font-black leading-none tracking-tight"
          style={{
            background: 'linear-gradient(90deg, #34d399 0%, #60a5fa 25%, #fbbf24 50%, #f97316 75%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 18px rgba(99,179,237,0.5))',
          }}
        >
          FIKR
        </h1>
        <p className="text-[10px] font-semibold text-white/40 mt-0.5 tracking-wide">
          Build Smart Habits. Shape Your Future.
        </p>
      </motion.div>

      {/* ── Three-column main layout ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 pt-16 pb-14">
        <div className="w-full h-full grid gap-3" style={{ gridTemplateColumns: '1fr 180px 1fr', maxWidth: 900 }}>

          {/* ── LEFT PANEL ── */}
          <motion.div
            className="flex flex-col gap-2.5 min-h-0"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            {/* Age Group */}
            <GlassCard>
              <SectionLabel emoji="🎯" text="Age Group" />
              <div className="flex flex-col gap-1.5">
                {AGE_GROUPS.map((ag) => {
                  const active = selectedAge === ag.id;
                  return (
                    <motion.button
                      key={ag.id}
                      onClick={() => setSelectedAge(ag.id)}
                      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: active
                          ? `linear-gradient(135deg, ${ag.color}22, ${ag.color}11)`
                          : 'rgba(255,255,255,0.04)',
                        border: active
                          ? `1.5px solid ${ag.color}80`
                          : '1.5px solid rgba(255,255,255,0.07)',
                        boxShadow: active ? `0 0 12px ${ag.color}30` : 'none',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base">{ag.emoji}</span>
                      <span
                        className="text-sm font-black"
                        style={{ color: active ? ag.color : 'rgba(255,255,255,0.6)' }}
                      >
                        {ag.label}
                      </span>
                      {active && (
                        <motion.div
                          className="ml-auto w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: ag.color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>

            {/* My Dream */}
            <GlassCard className="flex-1">
              <SectionLabel emoji="🌟" text="My Dream" />
              <div className="grid grid-cols-5 gap-1">
                {DREAMS.map((d) => {
                  const Icon = d.icon;
                  const active = selectedDream === d.id;
                  return (
                    <motion.button
                      key={d.id}
                      onClick={() => setSelectedDream(d.id)}
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl"
                      style={{
                        background: active
                          ? `linear-gradient(135deg, ${d.color}25, ${d.color}10)`
                          : 'rgba(255,255,255,0.04)',
                        border: active
                          ? `1.5px solid ${d.color}70`
                          : '1.5px solid rgba(255,255,255,0.07)',
                        boxShadow: active ? `0 0 10px ${d.color}30` : 'none',
                      }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: active ? `${d.color}25` : 'rgba(255,255,255,0.07)',
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: active ? d.color : 'rgba(255,255,255,0.45)' }}
                        />
                      </div>
                      <span
                        className="text-[8px] font-bold text-center leading-tight"
                        style={{ color: active ? d.color : 'rgba(255,255,255,0.45)' }}
                      >
                        {d.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* ── CENTER PANEL: Character ── */}
          <motion.div
            className="flex flex-col items-center justify-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <CharacterAvatar gender={selectedGender} />

            {/* Gender Toggle */}
            <div
              className="flex rounded-2xl p-1 gap-1"
              style={{
                background: 'rgba(10,14,30,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {(['Boy', 'Girl'] as const).map((g) => {
                const active = selectedGender === g;
                return (
                  <motion.button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-black transition-all duration-200"
                    style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {active && (
                      <motion.div
                        layoutId="gender-bg"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: g === 'Boy'
                            ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)'
                            : 'linear-gradient(135deg, #be185d, #ec4899)',
                          boxShadow: g === 'Boy'
                            ? '0 0 14px rgba(96,165,250,0.5)'
                            : '0 0 14px rgba(244,114,182,0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                      />
                    )}
                    <span className="relative z-10">{g === 'Boy' ? '👦' : '👧'}</span>
                    <span className="relative z-10">{g}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT PANEL: Financial Goal ── */}
          <motion.div
            className="flex flex-col gap-2.5 min-h-0"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <GlassCard className="flex-1">
              <SectionLabel emoji="🎯" text="Financial Goal" />
              <div className="flex flex-col gap-1.5">
                {GOALS.map((g) => {
                  const active = selectedGoal === g.id;
                  return (
                    <motion.button
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left"
                      style={{
                        background: active
                          ? `linear-gradient(135deg, ${g.color}22, ${g.color}0d)`
                          : 'rgba(255,255,255,0.04)',
                        border: active
                          ? `1.5px solid ${g.color}80`
                          : '1.5px solid rgba(255,255,255,0.07)',
                        boxShadow: active ? `0 0 14px ${g.color}35` : 'none',
                      }}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg flex-shrink-0">{g.emoji}</span>
                      <span
                        className="text-sm font-bold leading-tight flex-1"
                        style={{ color: active ? '#fff' : 'rgba(255,255,255,0.55)' }}
                      >
                        {g.id}
                      </span>
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: g.color }}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* ── CTA Button — bottom right ── */}
      <motion.div
        className="absolute bottom-3 right-4 z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.button
          onClick={handleStart}
          data-testid="button-begin-adventure"
          className="relative flex items-center gap-3 px-7 py-3 rounded-2xl text-white font-black text-sm overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #059669, #34d399, #10b981)',
            boxShadow: '0 0 24px rgba(52,211,153,0.5), 0 4px 16px rgba(0,0,0,0.3)',
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 0 40px rgba(52,211,153,0.75), 0 6px 24px rgba(0,0,0,0.35)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            ▶ START MY JOURNEY
            <ArrowRight className="w-4 h-4" />
          </span>
        </motion.button>
      </motion.div>

      {/* ── Bottom-left: level badge ── */}
      <motion.div
        className="absolute bottom-3 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(10,14,30,0.65)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white"
          style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)' }}
        >
          MVP
        </div>
        <span className="text-[10px] font-bold text-white/50">Level Zero</span>
      </motion.div>
    </div>
  );
}
