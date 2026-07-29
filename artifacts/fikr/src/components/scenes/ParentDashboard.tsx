import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Target,
  Zap,
  Flame,
  Coins,
  ChevronRight,
  Play,
  TrendingDown,
  TrendingUp,
  ShoppingBag,
  Landmark,
  Gift,
  Star,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { YounisState, Transaction } from '@/lib/mock-data';

interface ParentDashboardProps {
  younis: YounisState;
}

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

// ─── Glass panel class ────────────────────────────────────────────────────────
const card = 'bg-white/[0.045] backdrop-blur-xl border border-white/10 rounded-2xl';

// ─── Derived state helpers ────────────────────────────────────────────────────
function deriveFromYounis(younis: YounisState) {
  const dreamGoalPct = Math.min(Math.round((younis.coins / younis.goalCost) * 100), 100);
  const coinsToGoal  = Math.max(0, younis.goalCost - younis.coins);

  const spendTxns     = younis.transactions.filter(t => t.type === 'spend');
  const impulsiveCount = spendTxns.filter(t => t.isImpulsive).length;
  const totalFlow     = younis.totalSpent + younis.coins;
  const spendingRatio = totalFlow > 0 ? younis.totalSpent / totalFlow : 0;

  const isOverspender = spendingRatio > 0.35 || impulsiveCount > 1;
  const isLowSavings  = younis.coins < 500;

  // Status badge
  let statusLabel: string;
  let statusColor: string;
  let statusPulse: string;
  if (younis.coins < 300 || (isOverspender && isLowSavings)) {
    statusLabel = 'Needs Focus';
    statusColor = '#f87171';
    statusPulse = 'bg-rose-400';
  } else if (isOverspender || impulsiveCount > 0) {
    statusLabel = 'Needs Guidance';
    statusColor = '#fbbf24';
    statusPulse = 'bg-amber-400';
  } else {
    statusLabel = 'Growing Strong';
    statusColor = '#34d399';
    statusPulse = 'bg-emerald-400';
  }

  // Skills — reduce when overspending
  const penalty = Math.min(spendingRatio * 70, 40);
  const skills = [
    { name: 'Saving',      value: Math.max(18, Math.round(82 - penalty * 1.3 - impulsiveCount * 4)), from: '#34d399', to: '#10b981' },
    { name: 'Planning',    value: Math.max(18, Math.round(76 - penalty * 0.9 - impulsiveCount * 3)), from: '#60a5fa', to: '#3b82f6' },
    { name: 'Needs First', value: Math.max(18, Math.round(91 - impulsiveCount * 14)),                 from: '#a78bfa', to: '#8b5cf6' },
    { name: 'Goal Setting',value: Math.max(18, Math.round(73 - penalty * 0.5 + (dreamGoalPct > 80 ? 6 : 0))), from: '#fb923c', to: '#f97316' },
  ];

  // AI Coach message
  let coachLines: React.ReactNode;
  let nextChallenge: string;
  if (isOverspender && impulsiveCount > 1) {
    coachLines = (
      <>
        Younis made{' '}
        <span className="text-rose-400 font-semibold">impulsive purchases</span>{' '}
        this week, slowing his progress toward the Red Scooter. Encourage him to
        pause and ask:{' '}
        <span className="text-amber-400 font-semibold">"Do I need this, or do I want it?"</span>
      </>
    );
    nextChallenge = 'Practice the 24-hour wait rule before buying wants';
  } else if (isOverspender) {
    coachLines = (
      <>
        Younis is{' '}
        <span className="text-amber-400 font-semibold">spending faster than he's saving</span>.
        His goal progress has slowed — help him set a weekly spending limit to
        get back on track.
      </>
    );
    nextChallenge = 'Set a weekly spending cap together';
  } else if (spendTxns.length > 0) {
    coachLines = (
      <>
        Younis made a few purchases this week and{' '}
        <span className="text-emerald-400 font-semibold">stayed within budget</span>.
        His decision-making is developing well — keep reinforcing the
        needs-vs-wants distinction.
      </>
    );
    nextChallenge = 'Compare prices together at the grocery store';
  } else {
    coachLines = (
      <>
        This week,{' '}
        <span className="text-emerald-400 font-semibold">Younis</span>{' '}
        paused before buying the red scooter and continued saving toward his
        goal. His financial thinking is{' '}
        <span className="text-purple-400 font-semibold">improving</span>.
      </>
    );
    nextChallenge = 'Budgeting for a group goal with friends';
  }

  // Quick stats
  const xpEarned   = Math.max(0, younis.xp - 340);
  const smartCount  = younis.decisions.length;

  return {
    dreamGoalPct,
    coinsToGoal,
    impulsiveCount,
    isOverspender,
    statusLabel,
    statusColor,
    statusPulse,
    skills,
    coachLines,
    nextChallenge,
    xpEarned,
    smartCount,
  };
}

// ─── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({
  pct, size = 84, stroke = 7, color = '#f87171', delay = 0.6,
}: {
  pct: number; size?: number; stroke?: number; color?: string; delay?: number;
}) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.6, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Decision Tree SVG ────────────────────────────────────────────────────────
function DecisionTree({ isOverspender }: { isOverspender: boolean }) {
  const lineProps = (delay: number, color: string, dashed = false) => ({
    initial: { opacity: 0, pathLength: 0 },
    animate: { opacity: 1, pathLength: 1 },
    transition: { delay, duration: 0.5, ease: 'easeOut' as const },
    stroke: color,
    strokeWidth: 1.5,
    fill: 'none' as const,
    ...(dashed ? { strokeDasharray: '4 3' } : {}),
  });
  const nodeProps = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay, duration: 0.35, type: 'spring' as const, stiffness: 260 },
  });

  // When overspending, highlight the "Spend" branch instead
  const saveColor  = isOverspender ? 'rgba(255,255,255,0.12)' : 'rgba(52,211,153,0.6)';
  const spendColor = isOverspender ? 'rgba(248,113,113,0.7)' : 'rgba(255,255,255,0.12)';
  const saveDash   = isOverspender;
  const spendDash  = !isOverspender;

  return (
    <svg viewBox="0 0 200 120" className="w-full" style={{ height: 78 }}>
      <motion.path d="M100,18 Q80,38 60,58"  {...lineProps(0.7,  saveColor,  saveDash)} />
      <motion.path d="M100,18 Q120,38 145,58" {...lineProps(0.75, spendColor, spendDash)} />
      {!isOverspender && (
        <>
          <motion.path d="M60,64 Q48,82 35,100"  {...lineProps(1.05, 'rgba(96,165,250,0.5)')} />
          <motion.path d="M60,64 Q70,82 80,100"  {...lineProps(1.1,  'rgba(167,139,250,0.5)')} />
        </>
      )}
      {isOverspender && (
        <>
          <motion.path d="M145,64 Q158,82 170,100" {...lineProps(1.05, 'rgba(248,113,113,0.45)')} />
          <motion.path d="M145,64 Q135,82 125,100" {...lineProps(1.1,  'rgba(251,191,36,0.4)')} />
        </>
      )}

      {/* Root node */}
      <motion.circle cx="100" cy="16" r="13" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5" {...nodeProps(0.5)} />
      <text x="100" y="20" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontWeight="700">Start</text>

      {/* Save node */}
      <motion.circle cx="60" cy="62" r="12"
        fill={isOverspender ? 'rgba(255,255,255,0.03)' : 'rgba(52,211,153,0.18)'}
        stroke={isOverspender ? 'rgba(255,255,255,0.15)' : '#34d399'} strokeWidth="1.5" {...nodeProps(0.75)} />
      <text x="60" y="66" textAnchor="middle"
        fill={isOverspender ? 'rgba(255,255,255,0.25)' : '#34d399'} fontSize="7">
        {isOverspender ? 'Save' : 'Save ✓'}
      </text>

      {/* Spend node */}
      <motion.circle cx="145" cy="62" r="12"
        fill={isOverspender ? 'rgba(248,113,113,0.18)' : 'rgba(255,255,255,0.03)'}
        stroke={isOverspender ? '#f87171' : 'rgba(255,255,255,0.15)'} strokeWidth="1.5" {...nodeProps(0.8)} />
      <text x="145" y="66" textAnchor="middle"
        fill={isOverspender ? '#f87171' : 'rgba(255,255,255,0.25)'} fontSize="6.5">
        {isOverspender ? 'Spent ⚠' : 'Spend'}
      </text>

      {!isOverspender && (
        <>
          <motion.circle cx="35" cy="106" r="11" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" strokeWidth="1.5" {...nodeProps(1.1)} />
          <text x="35" y="110" textAnchor="middle" fill="#60a5fa" fontSize="6.5" fontWeight="700">Goal!</text>
          <motion.circle cx="80" cy="106" r="11" fill="rgba(167,139,250,0.18)" stroke="#a78bfa" strokeWidth="1.5" {...nodeProps(1.15)} />
          <text x="80" y="110" textAnchor="middle" fill="#a78bfa" fontSize="6.5" fontWeight="700">+XP 🌟</text>
          <motion.circle cx="67" cy="54" r="6" fill="#fbbf24" {...nodeProps(1.25)} />
          <text x="67" y="57.5" textAnchor="middle" fill="#0a0a0f" fontSize="6" fontWeight="900">★</text>
        </>
      )}
      {isOverspender && (
        <>
          <motion.circle cx="170" cy="106" r="11" fill="rgba(248,113,113,0.15)" stroke="#f87171" strokeWidth="1.5" {...nodeProps(1.1)} />
          <text x="170" y="110" textAnchor="middle" fill="#f87171" fontSize="6">Slow</text>
          <motion.circle cx="125" cy="106" r="11" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5" {...nodeProps(1.15)} />
          <text x="125" y="110" textAnchor="middle" fill="#fbbf24" fontSize="6">⚠️</text>
        </>
      )}
    </svg>
  );
}

// ─── Transaction Icon ─────────────────────────────────────────────────────────
function TxIcon({ tx }: { tx: Transaction }) {
  if (tx.type === 'earn') return <Gift className="w-3 h-3 text-purple-300" />;
  if (tx.type === 'save') return <Landmark className="w-3 h-3 text-blue-300" />;
  if (tx.isImpulsive)     return <AlertTriangle className="w-3 h-3 text-rose-400" />;
  return <ShoppingBag className="w-3 h-3 text-amber-300" />;
}

function txColor(tx: Transaction): string {
  if (tx.type === 'earn') return '#a78bfa';
  if (tx.type === 'save') return '#60a5fa';
  if (tx.isImpulsive)     return '#f87171';
  return '#fbbf24';
}

function txBg(tx: Transaction): string {
  if (tx.type === 'earn') return 'rgba(167,139,250,0.12)';
  if (tx.type === 'save') return 'rgba(96,165,250,0.12)';
  if (tx.isImpulsive)     return 'rgba(248,113,113,0.12)';
  return 'rgba(251,191,36,0.10)';
}

function txSign(tx: Transaction): string {
  return tx.type === 'earn' ? '+' : '-';
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ParentDashboard({ younis }: ParentDashboardProps) {
  const {
    dreamGoalPct, coinsToGoal, isOverspender,
    statusLabel, statusColor, statusPulse,
    skills, coachLines, nextChallenge,
    xpEarned, smartCount,
  } = deriveFromYounis(younis);

  const goalRingColor = dreamGoalPct >= 80 ? '#34d399' : dreamGoalPct >= 50 ? '#f97316' : '#f87171';

  const stats = [
    {
      label: xpEarned > 0 ? `+${xpEarned} XP` : `${younis.xp} XP`,
      sub:   `${Math.round((younis.xp / younis.maxXP) * 100)}% to Level Up`,
      icon:  Zap,
      color: '#fbbf24',
      bg:    'rgba(251,191,36,0.12)',
    },
    {
      label: `${younis.coins} Coins`,
      sub:   isOverspender ? 'Spending too fast' : 'Building savings',
      icon:  Coins,
      color: isOverspender ? '#f87171' : '#34d399',
      bg:    isOverspender ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.12)',
    },
    {
      label: `${smartCount} Choices`,
      sub:   'Smart decisions made',
      icon:  Flame,
      color: '#a78bfa',
      bg:    'rgba(167,139,250,0.12)',
    },
  ];

  return (
    <div className="relative w-full h-full overflow-auto" style={{ fontFamily: 'var(--font-parent)' }}>

      {/* Dashboard background */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/dashboard.jpg')` }} />
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 p-3 h-full flex flex-col gap-2">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className={`${card} px-4 py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{ background: 'linear-gradient(135deg,#fbbf24,#f97316)' }}>
              🧒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{younis.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(96,165,250,0.18)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}>
                  Level {younis.level} {younis.title}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <motion.div
                  key={statusLabel}
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusPulse}`}
                />
                <motion.span
                  key={statusLabel}
                  className="text-xs font-medium"
                  style={{ color: statusColor }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {statusLabel}
                </motion.span>
                {isOverspender && (
                  <AlertTriangle className="w-3 h-3 text-amber-400 ml-0.5" />
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">Family Intelligence Center</div>
            <div className="text-xs text-white/25 mt-0.5">Parent View</div>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="flex-1 grid grid-cols-3 gap-2 min-h-0">

          {/* LEFT — AI Coach */}
          <motion.div {...fadeUp(0.1)} className={`${card} p-3 flex flex-col`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#c026d3)' }}>
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white">AI Coach</span>
              {isOverspender && (
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: 'rgba(248,113,113,0.18)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>
                  Alert
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={isOverspender ? 'warn' : 'ok'}
                className="text-xs leading-relaxed text-white/75 flex-1"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
              >
                {coachLines}
              </motion.p>
            </AnimatePresence>

            <div className="mt-2 pt-2 border-t border-white/8">
              <p className="text-xs text-white/50">
                <span className="text-amber-400 font-semibold">Next challenge → </span>
                {nextChallenge}
              </p>
            </div>
          </motion.div>

          {/* MIDDLE — Dream Goal + Decision Tree */}
          <div className="flex flex-col gap-2">

            {/* Dream Goal */}
            <motion.div {...fadeUp(0.15)} className={`${card} p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-bold text-white">Dream Goal</span>
                <AnimatePresence>
                  {isOverspender && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="ml-auto flex items-center gap-1 text-[9px] font-bold text-rose-400"
                    >
                      <TrendingDown className="w-3 h-3" /> Slowing
                    </motion.span>
                  )}
                  {!isOverspender && dreamGoalPct >= 80 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="ml-auto flex items-center gap-1 text-[9px] font-bold text-emerald-400"
                    >
                      <TrendingUp className="w-3 h-3" /> Almost there!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <ProgressRing pct={dreamGoalPct} size={72} stroke={6} color={goalRingColor} delay={0.6} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      key={dreamGoalPct}
                      className="text-base font-black text-white leading-none"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {dreamGoalPct}%
                    </motion.span>
                    <span className="text-[9px] text-white/40 mt-0.5">saved</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl mb-1">🛵</div>
                  <div className="text-xs font-bold text-white">{younis.goal}</div>
                  <div className="text-[10px] text-white/50 mt-0.5">
                    {younis.coins.toLocaleString()} / {younis.goalCost.toLocaleString()} coins
                  </div>
                  {coinsToGoal > 0 && (
                    <div className="text-[9px] text-white/35 mt-0.5">
                      {coinsToGoal} coins to go
                    </div>
                  )}
                  <div className="mt-1.5 h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg,${goalRingColor},${goalRingColor}cc)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${dreamGoalPct}%` }}
                      transition={{ delay: 0.8, duration: 1.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decision Tree */}
            <motion.div {...fadeUp(0.2)} className={`${card} p-3 flex-1`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
                    <span className="text-xs">🌳</span>
                  </div>
                  <span className="text-xs font-bold text-white">Decision Tree</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isOverspender ? 'warn' : 'ok'}
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={isOverspender
                      ? { background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }
                      : { background: 'rgba(52,211,153,0.12)',  color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    {isOverspender ? 'Needs Work' : 'Growing'}
                  </motion.span>
                </AnimatePresence>
              </div>
              <DecisionTree isOverspender={isOverspender} />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>{younis.decisions.length} smart decisions</span>
                {isOverspender
                  ? <span className="text-rose-400 font-semibold">Overspending detected</span>
                  : <span className="text-emerald-400 font-semibold">On track ✓</span>}
              </div>
            </motion.div>

          </div>

          {/* RIGHT — Quick Stats + Skills */}
          <div className="flex flex-col gap-2">

            {/* Quick Stats */}
            <motion.div {...fadeUp(0.2)} className={`${card} p-3`}>
              <div className="text-xs font-bold text-white mb-2">Quick Stats</div>
              <div className="flex flex-col gap-1.5">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl"
                      style={{ background: stat.bg, border: `1px solid ${stat.color}25` }}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${stat.color}20` }}>
                        <Icon className="w-3 h-3" style={{ color: stat.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-black leading-tight" style={{ color: stat.color }}>
                          {stat.label}
                        </div>
                        <div className="text-[10px] text-white/40">{stat.sub}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Skills Growing */}
            <motion.div {...fadeUp(0.3)} className={`${card} p-3 flex-1`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-white">Skills Growing</div>
                {isOverspender && (
                  <span className="text-[9px] text-rose-400 font-semibold flex items-center gap-0.5">
                    <TrendingDown className="w-2.5 h-2.5" /> Adjusting
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                {skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white/75">{skill.name}</span>
                      <motion.span
                        key={skill.value}
                        className="text-xs font-black"
                        style={{ color: skill.from }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        {skill.value}%
                      </motion.span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg,${skill.from},${skill.to})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 1.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom Strip — Recent Activity + Family Mission ── */}
        <div className="grid grid-cols-3 gap-2">

          {/* Recent Spending & Activity — col-span-2 */}
          <motion.div {...fadeUp(0.35)} className={`${card} px-3 py-2 col-span-2`}>
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">
              Recent Spending &amp; Activity
            </div>

            {younis.transactions.length === 0 ? (
              <div className="text-[10px] text-white/30 italic py-1">
                No activity yet — visit the Street, Bank, or Mart to see transactions here.
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <AnimatePresence>
                  {younis.transactions.slice(0, 4).map((tx, i) => (
                    <motion.div
                      key={tx.id}
                      className="flex items-center gap-2 rounded-xl px-2 py-1"
                      style={{ background: txBg(tx) }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
                    >
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${txColor(tx)}18` }}>
                        <TxIcon tx={tx} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9.5px] font-semibold text-white/80 truncate">{tx.item}</div>
                        <div className="text-[8.5px] text-white/35">{tx.location}</div>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {tx.type === 'earn'
                          ? <ArrowUpRight className="w-2.5 h-2.5" style={{ color: txColor(tx) }} />
                          : <ArrowDownRight className="w-2.5 h-2.5" style={{ color: txColor(tx) }} />
                        }
                        <span className="text-[10px] font-black" style={{ color: txColor(tx) }}>
                          {txSign(tx)}{tx.amount}
                        </span>
                      </div>
                      {tx.isImpulsive && (
                        <span className="text-[8px] px-1 py-0.5 rounded font-bold flex-shrink-0"
                          style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>
                          Impulsive
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Family Mission — col 3 */}
          <motion.div {...fadeUp(0.4)} className={`${card} px-3 py-2 flex items-center gap-3`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-[10px] font-bold text-white">Family Mission</span>
              </div>
              <p className="text-[10px] text-white/60 leading-tight">
                {isOverspender
                  ? 'Practice the 24-hour wait rule before buying wants'
                  : 'Compare prices together at the grocery store'}
              </p>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-semibold flex-shrink-0 transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg,rgba(96,165,250,0.25),rgba(167,139,250,0.25))',
                border: '1px solid rgba(96,165,250,0.35)',
                color: '#93c5fd',
              }}
            >
              <Play className="w-2.5 h-2.5" />
              Start
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
