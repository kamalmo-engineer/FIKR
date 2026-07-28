import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Award, BarChart3, Download, MessageCircle } from 'lucide-react';
import { YounisState } from '@/lib/mock-data';

interface ParentDashboardProps {
  younis: YounisState;
}

const skills = [
  { name: 'Saving', value: 85, color: 'from-emerald-500 to-green-500' },
  { name: 'Budgeting', value: 62, color: 'from-blue-500 to-cyan-500' },
  { name: 'Decision Making', value: 90, color: 'from-purple-500 to-pink-500' },
  { name: 'Planning', value: 75, color: 'from-amber-500 to-orange-500' },
  { name: 'Patience', value: 88, color: 'from-indigo-500 to-violet-500' },
  { name: 'Goal Setting', value: 80, color: 'from-rose-500 to-red-500' },
];

export function ParentDashboard({ younis }: ParentDashboardProps) {
  return (
    <div className="relative w-full h-full bg-[#0a0a0f] overflow-auto">
      <div className="p-8 pb-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ 
              fontFamily: 'var(--font-parent)',
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Family Intelligence Center
          </h1>
          <p className="text-white/60 font-medium" style={{ fontFamily: 'var(--font-parent)' }}>
            AI-powered insights into {younis.name}'s financial growth
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* AI Coach Analysis */}
          <motion.div
            className="glass-panel-dark rounded-2xl p-6 col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-parent)' }}>
                AI Coach Analysis
              </h3>
            </div>
            
            <div className="relative">
              <motion.p
                className="text-white/90 leading-relaxed text-base"
                style={{ fontFamily: 'var(--font-parent)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <span className="font-semibold text-emerald-400">{younis.name}</span> made an excellent delayed-gratification decision today. His savings discipline is in the <span className="font-bold text-purple-400">top 15%</span> of Level 2 Explorers. His ability to resist immediate purchases while keeping long-term goals in focus demonstrates mature financial thinking.
              </motion.p>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-white/70" style={{ fontFamily: 'var(--font-parent)' }}>
                  <span className="text-amber-400 font-bold">Recommended next challenge:</span> Budgeting for a group goal with friends
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decision Tree Growth */}
          <motion.div
            className="glass-panel-dark rounded-2xl p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-parent)' }}>
                Decision Tree Growth
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70 font-medium" style={{ fontFamily: 'var(--font-parent)' }}>
                  Smart Decisions
                </span>
                <span className="text-3xl font-black text-blue-400" style={{ fontFamily: 'var(--font-parent)' }}>
                  7
                </span>
              </div>
              
              {/* Circular Progress */}
              <div className="flex justify-center my-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.7 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                      strokeDasharray="352"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-parent)' }}>
                      70%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/70 font-medium" style={{ fontFamily: 'var(--font-parent)' }}>
                  Learning Streak
                </span>
                <span className="text-2xl font-black text-purple-400" style={{ fontFamily: 'var(--font-parent)' }}>
                  4 days
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="glass-panel-dark rounded-2xl p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-parent)' }}>
                Quick Stats
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-xs font-medium text-white/60 mb-1" style={{ fontFamily: 'var(--font-parent)' }}>
                  Coins Saved
                </div>
                <div className="text-2xl font-black text-amber-400" style={{ fontFamily: 'var(--font-parent)' }}>
                  {younis.coins}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-xs font-medium text-white/60 mb-1" style={{ fontFamily: 'var(--font-parent)' }}>
                  XP This Week
                </div>
                <div className="text-2xl font-black text-emerald-400" style={{ fontFamily: 'var(--font-parent)' }}>
                  +240
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-xs font-medium text-white/60 mb-1" style={{ fontFamily: 'var(--font-parent)' }}>
                  Challenges
                </div>
                <div className="text-2xl font-black text-blue-400" style={{ fontFamily: 'var(--font-parent)' }}>
                  5
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-xs font-medium text-white/60 mb-1" style={{ fontFamily: 'var(--font-parent)' }}>
                  Badges
                </div>
                <div className="text-2xl font-black text-purple-400" style={{ fontFamily: 'var(--font-parent)' }}>
                  {younis.badges.length}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Radar */}
          <motion.div
            className="glass-panel-dark rounded-2xl p-6 col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-parent)' }}>
                Skills Development
              </h3>
            </div>

            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/80" style={{ fontFamily: 'var(--font-parent)' }}>
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-parent)' }}>
                      {skill.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            data-testid="button-export-report"
            className="flex-1 glass-panel-dark rounded-xl px-6 py-4 flex items-center justify-center gap-3 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            style={{ fontFamily: 'var(--font-parent)' }}
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
          <button
            data-testid="button-schedule-chat"
            className="flex-1 glass-panel-dark rounded-xl px-6 py-4 flex items-center justify-center gap-3 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            style={{ fontFamily: 'var(--font-parent)' }}
          >
            <MessageCircle className="w-5 h-5" />
            Schedule Chat with {younis.name}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
