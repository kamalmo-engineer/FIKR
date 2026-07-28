import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Target,
  Zap,
  Flame,
  Coins,
  ChevronRight,
  Play,
  Home,
  ShoppingBag,
  Lightbulb,
  Gift,
  Star,
} from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

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
const card =
  'bg-white/[0.045] backdrop-blur-xl border border-white/10 rounded-2xl';

// ─── Skills data ──────────────────────────────────────────────────────────────
const skills = [
  { name: 'Saving',       value: 82, from: '#34d399', to: '#10b981' },
  { name: 'Planning',     value: 76, from: '#60a5fa', to: '#3b82f6' },
  { name: 'Needs First',  value: 91, from: '#a78bfa', to: '#8b5cf6' },
  { name: 'Goal Setting', value: 73, from: '#fb923c', to: '#f97316' },
];

// ─── Quick Stats data ─────────────────────────────────────────────────────────
const stats = [
  { label: '+120 XP',           sub: 'Earned this week', icon: Zap,    color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'  },
  { label: '+50 Coins',         sub: 'Saved this week',  icon: Coins,  color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  { label: '7-Day Streak',      sub: 'Smart decisions',  icon: Flame,  color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
];

// ─── Journey steps ────────────────────────────────────────────────────────────
const journey = [
  { label: 'Home',          icon: Home,        color: '#60a5fa' },
  { label: 'Toy Shop',      icon: ShoppingBag, color: '#fb923c' },
  { label: 'Smart Decision',icon: Lightbulb,   color: '#34d399' },
  { label: 'Reward',        icon: Gift,        color: '#a78bfa' },
];

// ─── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({
  pct,
  size = 84,
  stroke = 7,
  color = '#f87171',
  delay = 0.6,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  delay?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.6, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Decision Tree SVG ────────────────────────────────────────────────────────
function DecisionTree() {
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

  return (
    <svg viewBox="0 0 200 120" className="w-full" style={{ height: 78 }}>
      {/* Root → Save */}
      <motion.path d="M100,18 Q80,38 60,58" {...lineProps(0.7, 'rgba(52,211,153,0.6)')} />
      {/* Root → Spend (faded, dashed) */}
      <motion.path d="M100,18 Q120,38 145,58" {...lineProps(0.75, 'rgba(255,255,255,0.12)', true)} />
      {/* Save → Goal */}
      <motion.path d="M60,64 Q48,82 35,100" {...lineProps(1.05, 'rgba(96,165,250,0.5)')} />
      {/* Save → XP */}
      <motion.path d="M60,64 Q70,82 80,100" {...lineProps(1.1, 'rgba(167,139,250,0.5)')} />

      {/* Root node */}
      <motion.circle cx="100" cy="16" r="13" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.5" {...nodeProps(0.5)} />
      <text x="100" y="20" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontWeight="700">Start</text>

      {/* Save node — highlighted */}
      <motion.circle cx="60" cy="62" r="12" fill="rgba(52,211,153,0.18)" stroke="#34d399" strokeWidth="1.5" {...nodeProps(0.75)} />
      <text x="60" y="66" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="700">Save ✓</text>

      {/* Spend node — faded */}
      <motion.circle cx="145" cy="62" r="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" {...nodeProps(0.8)} />
      <text x="145" y="66" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6.5">Spend</text>

      {/* Goal leaf */}
      <motion.circle cx="35" cy="106" r="11" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" strokeWidth="1.5" {...nodeProps(1.1)} />
      <text x="35" y="110" textAnchor="middle" fill="#60a5fa" fontSize="6.5" fontWeight="700">Goal!</text>

      {/* XP leaf */}
      <motion.circle cx="80" cy="106" r="11" fill="rgba(167,139,250,0.18)" stroke="#a78bfa" strokeWidth="1.5" {...nodeProps(1.15)} />
      <text x="80" y="110" textAnchor="middle" fill="#a78bfa" fontSize="6.5" fontWeight="700">+XP 🌟</text>

      {/* Star badge on Save */}
      <motion.circle cx="67" cy="54" r="6" fill="#fbbf24" {...nodeProps(1.25)} />
      <text x="67" y="57.5" textAnchor="middle" fill="#0a0a0f" fontSize="6" fontWeight="900">★</text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ParentDashboard({ younis }: ParentDashboardProps) {
  return (
    <div className="relative w-full h-full overflow-auto"
      style={{ fontFamily: 'var(--font-parent)' }}>

      {/* Dashboard background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/dashboard.jpg')` }}
      />
      {/* Dark glass overlay so cards remain legible */}
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
        <motion.div {...fadeUp(0)}
          className={`${card} px-4 py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{ background: 'linear-gradient(135deg,#fbbf24,#f97316)' }}>
              🧒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{younis.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(96,165,250,0.18)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}>
                  Level 2 Explorer
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Growing Strong</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">Family Intelligence Center</div>
            <div className="text-xs text-white/25 mt-0.5">Parent View</div>
          </div>
        </motion.div>

        {/* ── Main Grid (3 cols, fills available height) ── */}
        <div className="flex-1 grid grid-cols-3 gap-2 min-h-0">

          {/* LEFT — AI Coach */}
          <motion.div {...fadeUp(0.1)} className={`${card} p-3 flex flex-col`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#c026d3)' }}>
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white">AI Coach</span>
            </div>
            <motion.p
              className="text-xs leading-relaxed text-white/75 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              This week,{' '}
              <span className="text-emerald-400 font-semibold">Younis</span>{' '}
              paused before buying the red scooter and continued saving toward his goal. His financial thinking is{' '}
              <span className="text-purple-400 font-semibold">improving</span>.
            </motion.p>
            <div className="mt-2 pt-2 border-t border-white/8">
              <p className="text-xs text-white/50">
                <span className="text-amber-400 font-semibold">Next challenge → </span>
                Budgeting for a group goal with friends
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
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <ProgressRing pct={72} size={72} stroke={6} color="#f87171" delay={0.6} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-black text-white leading-none">72%</span>
                    <span className="text-[9px] text-white/40 mt-0.5">saved</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl mb-1">🛵</div>
                  <div className="text-xs font-bold text-white">Red Scooter</div>
                  <div className="text-[10px] text-white/50 mt-0.5">900 / 1,250 coins</div>
                  <div className="mt-1.5 h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg,#f87171,#fb923c)' }}
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
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
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>
                  Growing
                </span>
              </div>
              <DecisionTree />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>7 smart decisions</span>
                <span className="text-emerald-400 font-semibold">+3 this week</span>
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
              <div className="text-xs font-bold text-white mb-2">Skills Growing</div>
              <div className="flex flex-col gap-2.5">
                {skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white/75">{skill.name}</span>
                      <motion.span
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

        {/* ── Bottom Strip — Journey + Family Mission ── */}
        <div className="grid grid-cols-3 gap-2">

          {/* Journey This Week — spans 2 cols */}
          <motion.div {...fadeUp(0.35)} className={`${card} px-3 py-2 col-span-2`}>
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">
              Journey This Week
            </div>
            <div className="flex items-center gap-1">
              {journey.map((step, i) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.label}>
                    <motion.div
                      className="flex flex-col items-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.1, duration: 0.3, type: 'spring' }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${step.color}1a`, border: `1px solid ${step.color}40` }}>
                        <Icon className="w-3 h-3" style={{ color: step.color }} />
                      </div>
                      <span className="text-[9px] font-medium text-white/50 text-center leading-tight w-14">
                        {step.label}
                      </span>
                    </motion.div>
                    {i < journey.length - 1 && (
                      <motion.div
                        className="flex-1 flex items-center pb-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <ChevronRight className="w-3 h-3 text-white/20 mx-auto" />
                      </motion.div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>

          {/* Family Mission — col 3 */}
          <motion.div {...fadeUp(0.4)} className={`${card} px-3 py-2 flex items-center gap-3`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-[10px] font-bold text-white">Family Mission</span>
              </div>
              <p className="text-[10px] text-white/60 leading-tight">
                Compare prices together at the grocery store
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
