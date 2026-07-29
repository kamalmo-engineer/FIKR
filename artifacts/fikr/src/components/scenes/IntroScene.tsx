import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { YounisState } from '@/lib/mock-data';

interface IntroSceneProps {
  younis: YounisState;
  onNext: () => void;
}

// Transparent hotspot — invisible by default, subtle glow on hover/selected
function Hotspot({
  style,
  onClick,
  selected,
  glowColor = 'rgba(250,204,21,0.5)',
  children,
  testId,
}: {
  style: React.CSSProperties;
  onClick?: () => void;
  selected?: boolean;
  glowColor?: string;
  children?: React.ReactNode;
  testId?: string;
}) {
  return (
    <motion.button
      data-testid={testId}
      onClick={onClick}
      className="absolute"
      style={{
        ...style,
        background: selected ? 'rgba(250,204,21,0.18)' : 'transparent',
        border: selected ? `1.5px solid ${glowColor}` : '1.5px solid transparent',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: selected ? `0 0 16px ${glowColor}` : 'none',
        transition: 'all 0.2s ease',
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.08)',
        border: `1.5px solid rgba(255,255,255,0.3)`,
        boxShadow: `0 0 12px rgba(255,255,255,0.2)`,
      }}
    >
      {children}
    </motion.button>
  );
}

export function IntroScene({ younis, onNext }: IntroSceneProps) {
  const [selectedAge, setSelectedAge] = useState('9–12');
  const [selectedDream, setSelectedDream] = useState('Entrepreneur');
  const [selectedGoal, setSelectedGoal] = useState('Buy My Dream Scooter');
  const [selectedGender, setSelectedGender] = useState('Boy');

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Full background — no overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/younis-intro.jpg')` }}
      />

      {/* ── AGE GROUP hotspots (left panel, upper) ── */}
      {/* 6–8 */}
      <Hotspot
        testId="age-6-8"
        style={{ left: '5.5%', top: '31%', width: '22%', height: '6.5%' }}
        selected={selectedAge === '6–8'}
        glowColor="rgba(96,165,250,0.6)"
        onClick={() => setSelectedAge('6–8')}
      />
      {/* 9–12 */}
      <Hotspot
        testId="age-9-12"
        style={{ left: '5.5%', top: '38%', width: '22%', height: '6.5%' }}
        selected={selectedAge === '9–12'}
        glowColor="rgba(250,204,21,0.6)"
        onClick={() => setSelectedAge('9–12')}
      />
      {/* 13–18 */}
      <Hotspot
        testId="age-13-18"
        style={{ left: '5.5%', top: '45%', width: '22%', height: '6.5%' }}
        selected={selectedAge === '13–18'}
        glowColor="rgba(167,139,250,0.6)"
        onClick={() => setSelectedAge('13–18')}
      />

      {/* ── MY DREAM hotspots (left panel, lower) — individual icons ── */}
      {[
        { id: 'Entrepreneur', left: '5.5%'  },
        { id: 'Doctor',       left: '11.5%' },
        { id: 'Engineer',     left: '17.5%' },
        { id: 'Artist',       left: '23%'   },
        { id: 'Explorer',     left: '28.5%' },
      ].map(({ id, left }) => (
        <Hotspot
          key={id}
          testId={`dream-${id.toLowerCase()}`}
          style={{ left, top: '60%', width: '5.5%', height: '16%' }}
          selected={selectedDream === id}
          glowColor="rgba(52,211,153,0.6)"
          onClick={() => setSelectedDream(id)}
        />
      ))}

      {/* ── FINANCIAL GOAL hotspots (right panel) ── */}
      {[
        { id: 'Save Money',            top: '31%', color: 'rgba(96,165,250,0.6)'  },
        { id: 'Smart Spending',        top: '39%', color: 'rgba(167,139,250,0.6)' },
        { id: 'Buy My Dream Scooter',  top: '47%', color: 'rgba(52,211,153,0.6)'  },
        { id: 'Buy Something Special', top: '55%', color: 'rgba(249,115,22,0.6)'  },
      ].map(({ id, top, color }) => (
        <Hotspot
          key={id}
          testId={`goal-${id.replace(/\s+/g, '-').toLowerCase()}`}
          style={{ left: '64.5%', top, width: '31%', height: '7%' }}
          selected={selectedGoal === id}
          glowColor={color}
          onClick={() => setSelectedGoal(id)}
        />
      ))}

      {/* ── Boy / Girl toggle (center bottom) ── */}
      <Hotspot
        testId="gender-boy"
        style={{ left: '37%', top: '75.5%', width: '12%', height: '7%' }}
        selected={selectedGender === 'Boy'}
        glowColor="rgba(96,165,250,0.7)"
        onClick={() => setSelectedGender('Boy')}
      />
      <Hotspot
        testId="gender-girl"
        style={{ left: '50%', top: '75.5%', width: '12%', height: '7%' }}
        selected={selectedGender === 'Girl'}
        glowColor="rgba(244,114,182,0.7)"
        onClick={() => setSelectedGender('Girl')}
      />

      {/* ── START MY JOURNEY — transparent overlay over the green button ── */}
      <motion.button
        data-testid="button-begin-adventure"
        onClick={onNext}
        className="absolute"
        style={{
          left: '63%',
          top: '73%',
          width: '33%',
          height: '11%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 40,
        }}
        whileHover={{
          background: 'rgba(52,211,153,0.15)',
          boxShadow: '0 0 28px rgba(52,211,153,0.5)',
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
}
