import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store, Building2, Users, ShoppingCart, Coins,
  X, TrendingUp, PiggyBank, ShoppingBag, CheckCircle2,
  ArrowRight, Wallet, BarChart3,
} from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface StreetSceneProps {
  younis: YounisState;
  onLocationClick: (location: string) => void;
}

// ── Building definitions ───────────────────────────────────────────────────────
const BUILDINGS = [
  {
    id: 'toy-shop',
    label: 'Toy Shop',
    icon: Store,
    position: { left: '20%', top: '42%' },
    color: '#f97316',
    glow: 'rgba(249,115,22,0.65)',
    tooltip: 'Find the Dream Scooter — 1250 coins!',
    badge: '🛴',
  },
  {
    id: 'bank',
    label: 'Bank',
    icon: Building2,
    position: { left: '64%', top: '34%' },
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.65)',
    tooltip: 'Savings & Interest Challenge',
    badge: '🏦',
  },
  {
    id: 'parent-center',
    label: 'Parent Center',
    icon: Users,
    position: { left: '78%', top: '22%' },
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.65)',
    tooltip: 'Open Family Intelligence Center',
    badge: '👨‍👩‍👦',
  },
  {
    id: 'mart',
    label: 'FIKR Mart',
    icon: ShoppingCart,
    position: { left: '68%', top: '60%' },
    color: '#34d399',
    glow: 'rgba(52,211,153,0.65)',
    tooltip: 'Grocery Budgeting Challenge',
    badge: '🛒',
  },
];

// ── Bank Modal ─────────────────────────────────────────────────────────────────
function BankModal({ younis, onClose }: { younis: YounisState; onClose: () => void }) {
  const [deposited, setDeposited] = useState(false);
  const deposit = 500;
  const interest = Math.round(deposit * 0.05);

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-8"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(96,165,250,0.3)' }}
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: 'spring', bounce: 0.3 }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Savings Challenge</h3>
              <p className="text-xs text-blue-200">FIKR City Bank</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Your balance */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            <Wallet className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-blue-300/70 uppercase tracking-wider">Your Wallet</p>
              <p className="text-xl font-black text-white">{younis.coins} <span className="text-sm text-white/50">coins</span></p>
            </div>
          </div>

          {/* Deposit offer */}
          <div className="rounded-2xl p-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-black text-white">The Bank's Offer</span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed">
              Deposit <span className="text-amber-300 font-bold">{deposit} coins</span> today and earn{' '}
              <span className="text-emerald-400 font-bold">5% interest</span> — that's{' '}
              <span className="text-emerald-400 font-bold">+{interest} bonus coins</span> next week!
            </p>

            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { label: 'Deposit', value: deposit, color: '#fbbf24' },
                { label: 'Interest', value: `+${interest}`, color: '#34d399' },
                { label: 'Total', value: deposit + interest, color: '#60a5fa' },
              ].map((s) => (
                <div key={s.label} className="text-center px-2 py-2 rounded-xl"
                  style={{ background: `${s.color}14`, border: `1px solid ${s.color}35` }}>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: `${s.color}cc` }}>{s.label}</p>
                  <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Result / CTA */}
          <AnimatePresence mode="wait">
            {!deposited ? (
              <motion.div key="actions" className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.button onClick={onClose}
                  className="py-3 rounded-2xl text-sm font-black text-white/50"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  Keep All Coins
                </motion.button>
                <motion.button onClick={() => setDeposited(true)}
                  data-testid="button-deposit"
                  className="py-3 rounded-2xl text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', boxShadow: '0 0 18px rgba(96,165,250,0.4)' }}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(96,165,250,0.65)' }}
                  whileTap={{ scale: 0.97 }}>
                  Deposit {deposit} Coins ✓
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="success"
                className="flex flex-col items-center gap-2 py-3"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <p className="text-base font-black text-white">Smart Move! 🎉</p>
                <p className="text-xs text-white/50 text-center">
                  You deposited {deposit} coins. Come back next week for your +{interest} interest!
                </p>
                <motion.button onClick={onClose}
                  className="mt-1 flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── FIKR Mart Modal ────────────────────────────────────────────────────────────
const MART_ITEMS = [
  { id: 'lunch',    label: 'School Lunch Box',   cost: 50,  emoji: '🥪', need: true  },
  { id: 'supplies', label: 'School Supplies',    cost: 120, emoji: '✏️', need: true  },
  { id: 'book',     label: 'Library Book',       cost: 80,  emoji: '📚', need: true  },
  { id: 'toy',      label: 'Extra Toy',          cost: 300, emoji: '🎮', need: false },
  { id: 'snack',    label: 'Fancy Snack Pack',   cost: 95,  emoji: '🍬', need: false },
];
const MART_BUDGET = 300;

function MartModal({ younis, onClose }: { younis: YounisState; onClose: () => void }) {
  const [checked, setChecked] = useState<Set<string>>(new Set(['lunch', 'supplies', 'book']));
  const total = MART_ITEMS.filter(i => checked.has(i.id)).reduce((s, i) => s + i.cost, 0);
  const overBudget = total > MART_BUDGET;

  const toggle = (id: string) => setChecked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-8"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(52,211,153,0.3)' }}
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: 'spring', bounce: 0.3 }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #065f46, #059669)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Budgeting Challenge</h3>
              <p className="text-xs text-emerald-200">FIKR Mart — pick wisely!</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {/* Budget bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-white/60">Budget: {MART_BUDGET} coins</span>
              <span style={{ color: overBudget ? '#f87171' : '#34d399' }}>
                Spent: {total} / {MART_BUDGET}
              </span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: overBudget ? 'linear-gradient(90deg,#f97316,#ef4444)' : 'linear-gradient(90deg,#059669,#34d399)' }}
                animate={{ width: `${Math.min((total / MART_BUDGET) * 100, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            {MART_ITEMS.map((item) => {
              const on = checked.has(item.id);
              return (
                <motion.button key={item.id} onClick={() => toggle(item.id)}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left"
                  style={{
                    background: on ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)',
                    border: on ? '1.5px solid rgba(52,211,153,0.5)' : '1.5px solid rgba(255,255,255,0.07)',
                  }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <span className="text-xl w-6 text-center flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{item.label}</p>
                    {!item.need && <p className="text-[10px] text-amber-400/70">Want (not a need)</p>}
                  </div>
                  <span className="text-sm font-black flex-shrink-0"
                    style={{ color: on ? '#34d399' : 'rgba(255,255,255,0.4)' }}>
                    {item.cost}
                  </span>
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: on ? '#34d399' : 'rgba(255,255,255,0.1)' }}>
                    {on && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Tip */}
          {overBudget && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 font-bold text-center">
              ⚠️ Over budget! Uncheck some items to stay within {MART_BUDGET} coins.
            </motion.p>
          )}
          {!overBudget && total > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs text-emerald-400 font-bold text-center">
              ✓ Great budget plan! You have {MART_BUDGET - total} coins to spare.
            </motion.p>
          )}

          <motion.button onClick={onClose}
            disabled={overBudget}
            className="w-full py-3 rounded-2xl text-sm font-black text-white mt-1"
            style={{
              background: overBudget
                ? 'rgba(255,255,255,0.08)'
                : 'linear-gradient(135deg, #065f46, #34d399)',
              opacity: overBudget ? 0.5 : 1,
              boxShadow: overBudget ? 'none' : '0 0 18px rgba(52,211,153,0.4)',
            }}
            whileHover={!overBudget ? { scale: 1.03 } : {}}
            whileTap={!overBudget ? { scale: 0.97 } : {}}>
            {overBudget ? 'Fix your budget first' : `Confirm Purchase (${total} coins) ✓`}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function StreetScene({ younis, onLocationClick }: StreetSceneProps) {
  const [activeModal, setActiveModal] = useState<'bank' | 'mart' | null>(null);
  const [hoveredId, setHoveredId]     = useState<string | null>(null);

  const handleBuildingClick = (id: string) => {
    if (id === 'bank') { setActiveModal('bank'); return; }
    if (id === 'mart') { setActiveModal('mart'); return; }
    onLocationClick(id); // toy-shop → Challenge, parent-center → Dashboard
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Street background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/streat.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 pointer-events-none" />

      {/* Coins HUD */}
      <motion.div
        className="absolute top-5 right-6 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(251,191,36,0.35)',
        }}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.35, type: 'spring' }}
      >
        <Coins className="w-4 h-4 text-amber-400" />
        <div>
          <div className="text-[9px] font-bold text-white/50 uppercase tracking-wide">{younis.name}</div>
          <div className="text-lg font-black text-amber-300 leading-none">{younis.coins}</div>
        </div>
      </motion.div>

      {/* Buildings */}
      {BUILDINGS.map((b, i) => {
        const Icon = b.icon;
        const hovered = hoveredId === b.id;
        return (
          <div
            key={b.id}
            className="absolute z-10"
            style={{ left: b.position.left, top: b.position.top }}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-bold text-white whitespace-nowrap pointer-events-none"
                  style={{
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${b.color}55`,
                    boxShadow: `0 0 12px ${b.glow}`,
                  }}
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  {b.badge} {b.tooltip}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `5px solid rgba(0,0,0,0.85)`,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              data-testid={`hotspot-${b.id}`}
              onClick={() => handleBuildingClick(b.id)}
              onHoverStart={() => setHoveredId(b.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="flex flex-col items-center gap-1.5 relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -7, 0] }}
              transition={{
                scale:   { delay: 0.2 + i * 0.12, type: 'spring', bounce: 0.5 },
                opacity: { delay: 0.2 + i * 0.12 },
                y: { duration: 2.2, repeat: Infinity, delay: i * 0.38, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.18, y: -12 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 56, height: 56,
                  background: b.glow,
                  filter: 'blur(8px)',
                  top: 0, left: 0,
                }}
                animate={{ scale: [1, 1.75, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.1, repeat: Infinity, delay: i * 0.28 }}
              />

              {/* Icon bubble */}
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${b.color}bb, ${b.color})`,
                  border: '2px solid rgba(255,255,255,0.45)',
                  boxShadow: hovered
                    ? `0 0 36px ${b.glow}, 0 0 60px ${b.glow.replace('0.65', '0.3')}`
                    : `0 0 18px ${b.glow}`,
                  transition: 'box-shadow 0.2s',
                }}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Label */}
              <div
                className="px-3 py-1 rounded-full text-xs font-black text-white whitespace-nowrap"
                style={{
                  background: hovered ? `${b.color}33` : 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${hovered ? b.color + '66' : 'rgba(255,255,255,0.14)'}`,
                  transition: 'all 0.2s',
                }}
              >
                {b.label}
              </div>
            </motion.button>
          </div>
        );
      })}

      {/* Instruction banner */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-2xl z-20 pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-white font-bold text-xs text-center">
          🏪 Explore every building — each one is an interactive challenge!
        </p>
      </motion.div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {activeModal === 'bank' && (
          <BankModal key="bank-modal" younis={younis} onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'mart' && (
          <MartModal key="mart-modal" younis={younis} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
