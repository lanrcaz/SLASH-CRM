import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  DollarSign,
  Rocket,
  Layers,
  Clock,
  FileText,
  ArrowLeft,
  Pencil,
  MessageSquare,
  Download,
  TrendingUp,
  Lightbulb,
  Activity,
  Check,
  Mail,
  Phone,
  ChevronDown,
  CheckCircle2,
  Plus,
  Phone as PhoneIcon,
  LogOut,
  Target,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { ClientStatus } from '@/mocks/mockData';
import {
  getClientById,
  getClientEarnings,
  getClientActivities,
  getClientServices,
  getClientOnboardingSteps,
  getClientDocuments,
} from '@/mocks/mockData';
import { cn } from '@/lib/utils';
/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Status config                                                      */
/* ------------------------------------------------------------------ */
const statusConfig: Record<ClientStatus, { bg: string; text: string; border: string }> = {
  Active:       { bg: 'rgba(111,75,216,0.15)',  text: '#6f4bd8', border: '1px solid rgba(111,75,216,0.3)' },
  Onboarding:   { bg: 'rgba(59,130,246,0.15)',  text: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' },
  Offboarding:  { bg: 'rgba(245,158,11,0.15)',  text: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' },
  Churned:      { bg: 'rgba(239,68,68,0.15)',   text: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
  Prospect:     { bg: 'rgba(139,92,246,0.15)',  text: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' },
};

/* ------------------------------------------------------------------ */
/*  StatusBadge                                                        */
/* ------------------------------------------------------------------ */
function StatusBadge({ status }: { status: ClientStatus }) {
  const c = statusConfig[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: c.bg, color: c.text, border: c.border }}
    >
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */
function ClientAvatar({ initials, size = 40 }: { initials: string; size?: number }) {
  const hue = initials.charCodeAt(0) * 137.5 % 360;
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue}, 60%, 45%), hsl(${hue + 40}, 60%, 35%))`,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Circular Health Score                                              */
/* ------------------------------------------------------------------ */
function HealthScoreRing({ value, size = 48 }: { value: number; size?: number }) {
  const stroke = size * 0.12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? '#6f4bd8' : value >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e4e6eb" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: easeOutExpo }}
        />
      </svg>
      <span className="absolute text-[13px] font-semibold text-white">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tabs config                                                        */
/* ------------------------------------------------------------------ */
const tabs = [
  { id: 'overview',    label: 'Overview',           icon: LayoutDashboard },
  { id: 'earnings',    label: 'Earnings',           icon: DollarSign },
  { id: 'onboarding',  label: 'Onboarding History', icon: Rocket, badge: 'Completed' },
  { id: 'services',    label: 'Services',           icon: Layers, badge: '3 active' },
  { id: 'activity',    label: 'Activity Log',       icon: Clock, badge: '24' },
  { id: 'documents',   label: 'Documents',          icon: FileText, badge: '8' },
];

/* ------------------------------------------------------------------ */
/*  Tab: Overview                                                      */
/* ------------------------------------------------------------------ */
function OverviewTab({ client }: { client: NonNullable<ReturnType<typeof getClientById>> }) {
  const clientEarnings = getClientEarnings(client.id);
  const clientServices = getClientServices(client.id);
  const totalEarned = clientEarnings.filter(e => e.status === 'Paid').reduce((s, e) => s + e.amount, 0);
  const chartData = [
    { month: 'Aug', value: totalEarned * 0.3 },
    { month: 'Sep', value: totalEarned * 0.45 },
    { month: 'Oct', value: totalEarned * 0.55 },
    { month: 'Nov', value: totalEarned * 0.72 },
    { month: 'Dec', value: totalEarned * 0.85 },
    { month: 'Jan', value: totalEarned },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      {/* Left column */}
      <div className="space-y-4">
        {/* Earnings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="rounded-2xl p-6"
          style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Earnings Overview</h3>
            <span className="text-[13px] text-[#6f4bd8] cursor-pointer hover:underline">View Full &rarr;</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748b] mb-1">Total Earned</p>
              <p className="text-3xl font-medium text-[#6f4bd8]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                ${totalEarned.toLocaleString()}
              </p>
              <p className="flex items-center gap-1 mt-1 text-[13px] text-[#6f4bd8]">
                <TrendingUp className="h-3.5 w-3.5" />+$8,400 this month
              </p>
            </div>
            <div className="w-[200px] h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="ovGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6f4bd8" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6f4bd8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#6f4bd8" strokeWidth={2} fill="url(#ovGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Active Services */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
          className="rounded-2xl p-6"
          style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Active Services</h3>
          <div className="space-y-4">
            {clientServices.map(svc => (
              <div key={svc.id} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#ffffff] flex items-center justify-center">
                  <Target className="h-4 w-4 text-[#6f4bd8]" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-white">{svc.name}</p>
                </div>
                <StatusBadge status="Active" />
                <span className="text-[13px] text-[#6f4bd8] font-medium">${svc.price?.toLocaleString()}/mo</span>
                <span className="text-[13px] text-[#64748b]">Since {svc.startedDate ? format(new Date(svc.startedDate), 'MMM yyyy') : 'N/A'}</span>
              </div>
            ))}
            {clientServices.length === 0 && (
              <p className="text-[13px] text-[#64748b]">No active services</p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
          className="rounded-2xl p-6"
          style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Send Message', icon: Mail },
              { label: 'Add Service', icon: Plus },
              { label: 'Schedule Call', icon: PhoneIcon },
              { label: 'Start Offboarding', icon: LogOut, warn: true },
            ].map(action => (
              <button
                key={action.label}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all border',
                  action.warn
                    ? 'text-[#f59e0b] border-[rgba(245,158,11,0.3)] hover:bg-[rgba(245,158,11,0.05)]'
                    : 'text-[#94a3b8] border-[rgba(255,255,255,0.1)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                )}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right column - AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 }}
        className="rounded-2xl p-6 h-fit"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Activity className="h-4 w-4 text-[#6f4bd8]" />
          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>AI Insights</h3>
        </div>
        <div className="space-y-0">
          {[
            { icon: TrendingUp, color: '#6f4bd8', title: 'Earnings Trending Up', body: `Client revenue has grown 23% over the last 3 months. On track to hit $${Math.round(totalEarned * 1.25 / 1000)}K by Q3.` },
            { icon: Lightbulb, color: '#3b82f6', title: 'Service Opportunity', body: 'Consider offering Social Media Management. Similar clients see 15% revenue uplift.' },
            { icon: Activity, color: '#22c55e', title: `Engagement Score: ${client.healthScore >= 80 ? 'High' : 'Medium'}`, body: `This client is ${client.healthScore >= 80 ? 'highly' : 'moderately'} engaged with a ${client.healthScore}% task completion rate.` },
          ].map((insight, i, arr) => (
            <div
              key={insight.title}
              className={cn('py-4', i < arr.length - 1 && 'border-b', 'border-[rgba(255,255,255,0.04)]')}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <insight.icon className="h-4 w-4" style={{ color: insight.color }} />
                <span className="text-[13px] font-semibold text-white">{insight.title}</span>
              </div>
              <p className="text-[13px] text-[#94a3b8] leading-relaxed">{insight.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab: Earnings                                                      */
/* ------------------------------------------------------------------ */
function EarningsTab({ clientId }: { clientId: string }) {
  const clientEarnings = getClientEarnings(clientId);
  const totalEarnings = clientEarnings.filter(e => e.status === 'Paid').reduce((s, e) => s + e.amount, 0);
  const totalPayouts = totalEarnings * 0.87;
  const pending = clientEarnings.filter(e => e.status === 'Pending').reduce((s, e) => s + e.amount, 0);

  const monthlyData = [
    { month: 'Aug', paid: 12000, pending: 2000, projected: 15000 },
    { month: 'Sep', paid: 18000, pending: 3000, projected: 22000 },
    { month: 'Oct', paid: 22000, pending: 2500, projected: 26000 },
    { month: 'Nov', paid: 35000, pending: 4000, projected: 38000 },
    { month: 'Dec', paid: 42000, pending: 3500, projected: 45000 },
    { month: 'Jan', paid: totalEarnings, pending, projected: totalEarnings * 1.15 },
  ];

  const sourceData = [
    { name: 'Service Fee', value: clientEarnings.filter(e => e.source === 'Service Fee').reduce((s, e) => s + e.amount, 0) },
    { name: 'Ad Revenue', value: clientEarnings.filter(e => e.source === 'Ad Revenue').reduce((s, e) => s + e.amount, 0) },
    { name: 'Referral', value: clientEarnings.filter(e => e.source === 'Referral').reduce((s, e) => s + e.amount, 0) },
    { name: 'Other', value: clientEarnings.filter(e => !['Service Fee', 'Ad Revenue', 'Referral'].includes(e.source)).reduce((s, e) => s + e.amount, 0) },
  ].filter(d => d.value > 0);

  const COLORS = ['#6f4bd8', '#3b82f6', '#8b5cf6', '#f59e0b'];

  const milestones = [
    { label: '$1K', date: 'Feb 2024', achieved: true },
    { label: '$5K', date: 'Mar 2024', achieved: true },
    { label: '$10K', date: 'Apr 2024', achieved: true },
    { label: '$25K', date: 'Jun 2024', achieved: true },
    { label: '$50K', date: 'Sep 2025', achieved: false },
    { label: '$100K', date: 'Mar 2026', achieved: false },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'Total Earnings', value: `$${totalEarnings.toLocaleString()}`, sub: '+$8,400 this month', color: '#6f4bd8' },
          { label: 'Total Payouts', value: `$${Math.round(totalPayouts).toLocaleString()}`, sub: '87% paid out', color: '#6f4bd8' },
          { label: 'Pending', value: `$${pending.toLocaleString()}`, sub: `${clientEarnings.filter(e => e.status === 'Pending').length} pending invoices`, color: '#f59e0b' },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-2xl p-6"
            style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748b] mb-2">{stat.label}</p>
            <p className="text-3xl font-medium mb-1" style={{ color: stat.color, fontFamily: 'JetBrains Mono, monospace' }}>{stat.value}</p>
            <p className="text-[13px] text-[#64748b]">{stat.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
        className="rounded-2xl p-6"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Earnings History</h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{ background: '#ffffff', border: '1px solid #e4e6eb', borderRadius: 12, color: '#fff' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="paid" stroke="#22c55e" strokeWidth={2} fill="url(#paidGrad)" name="Paid" />
              <Area type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Pending" />
              <Area type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} strokeDasharray="3 3" fill="none" name="Projected" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Revenue Source Pie + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
          className="rounded-2xl p-6"
          style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Revenue Sources</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e4e6eb', borderRadius: 12, color: '#fff' }} formatter={(v: number) => `$${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {sourceData.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-[#94a3b8]">{s.name}</span>
                </div>
                <span className="text-white font-medium">${s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Earnings Table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.25 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="p-6 pb-0">
            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] font-medium uppercase tracking-wider text-[#64748b]">
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-6 py-3">Source</th>
                  <th className="text-left px-6 py-3">Amount</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Campaign</th>
                </tr>
              </thead>
              <tbody>
                {clientEarnings.slice(0, 10).map((e, i) => (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.04 }}
                    className="border-t border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <td className="px-6 py-3 text-white">{format(new Date(e.date), 'MMM d, yyyy')}</td>
                    <td className="px-6 py-3 text-[#94a3b8]">{e.source}</td>
                    <td className="px-6 py-3 text-white font-medium">${e.amount.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={
                          e.status === 'Paid'
                            ? { background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }
                            : e.status === 'Pending'
                            ? { background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }
                            : { background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }
                        }
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#94a3b8]">{e.campaign}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
        className="rounded-2xl p-6"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h3 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Earnings Milestones</h3>
        <div className="relative flex items-center justify-between px-4">
          {/* Connector line */}
          <div className="absolute top-4 left-8 right-8 h-0.5 bg-[#e4e6eb]" />
          <div
            className="absolute top-4 left-8 h-0.5 bg-[#6f4bd8]"
            style={{ width: `${(milestones.filter(m => m.achieved).length / (milestones.length - 1)) * 100}%` }}
          />
          {milestones.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], delay: 0.4 + i * 0.15 }}
              className="relative flex flex-col items-center gap-2 z-10"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{
                  background: m.achieved ? '#6f4bd8' : '#e4e6eb',
                  border: m.achieved ? 'none' : '2px solid #64748b',
                }}
              >
                {m.achieved ? <Check className="h-4 w-4 text-[#ffffff]" /> : <span className="text-[11px] text-[#64748b]">$</span>}
              </div>
              <span className="text-[13px] font-medium text-white">{m.label}</span>
              <span className="text-[11px] text-[#64748b]">{m.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab: Onboarding                                                    */
/* ------------------------------------------------------------------ */
function OnboardingTab({ clientId }: { clientId: string }) {
  const steps = getClientOnboardingSteps(clientId);
  const phases = [1, 2, 3, 4];
  const phaseNames = ['Setup', 'Integration', 'Training', 'Go-Live'];
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const phaseProgress = (phase: number) => {
    const phaseSteps = steps.filter(s => s.phase === phase);
    if (phaseSteps.length === 0) return 0;
    return Math.round((phaseSteps.filter(s => s.completed).length / phaseSteps.length) * 100);
  };

  const totalCompleted = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="rounded-2xl p-6"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748b]">Status</span>
            <div className="mt-1"><StatusBadge status="Active" /></div>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748b]">Duration</span>
            <p className="text-[15px] text-white mt-1">23 days <span className="text-[#64748b]">(AI predicted: 25 days)</span></p>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748b]">Timeline</span>
            <p className="text-[15px] text-white mt-1">Jan 15, 2024 &rarr; Feb 7, 2024</p>
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748b]">Tasks</span>
            <p className="text-[15px] text-white mt-1">{totalCompleted}/{totalSteps} completed</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-5">
          <div className="h-2 w-full rounded-full bg-[#e4e6eb] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalSteps > 0 ? (totalCompleted / totalSteps) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
              className="h-full rounded-full bg-[#6f4bd8]"
            />
          </div>
        </div>
      </motion.div>

      {/* Phase Accordion */}
      <div className="space-y-3">
        {phases.map((phase, i) => {
          const phaseStepsList = steps.filter(s => s.phase === phase);
          const progress = phaseProgress(phase);
          const isExpanded = expandedPhase === phase;

          return (
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  style={{
                    background: progress === 100 ? '#6f4bd8' : '#ffffff',
                    color: progress === 100 ? '#ffffff' : '#fff',
                    border: progress === 100 ? 'none' : '1px solid #e4e6eb',
                  }}
                >
                  {progress === 100 ? <Check className="h-4 w-4" /> : phase}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-white">{phaseNames[i]}</span>
                    {progress === 100 && <StatusBadge status="Active" />}
                  </div>
                </div>
                <span className="text-[13px] text-[#64748b]">{progress}%</span>
                <ChevronDown className={cn('h-4 w-4 text-[#64748b] transition-transform', isExpanded && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: easeOutExpo }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-2">
                      {phaseStepsList.map(step => (
                        <div
                          key={step.id}
                          className="flex items-center gap-3 py-2 px-3 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                          <div
                            className={cn(
                              'h-5 w-5 rounded-full flex items-center justify-center shrink-0',
                              step.completed ? 'bg-[#6f4bd8]' : 'bg-[#e4e6eb] border border-[#64748b]'
                            )}
                          >
                            {step.completed && <Check className="h-3 w-3 text-[#ffffff]" />}
                          </div>
                          <span className={cn('text-[13px] flex-1', step.completed ? 'text-[#94a3b8] line-through' : 'text-white')}>{step.title}</span>
                          {step.completedDate && (
                            <span className="text-[11px] text-[#475569]">{format(new Date(step.completedDate), 'MMM d')}</span>
                          )}
                        </div>
                      ))}
                      {phaseStepsList.length === 0 && (
                        <p className="text-[13px] text-[#64748b] py-2">No tasks in this phase</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab: Services                                                      */
/* ------------------------------------------------------------------ */
function ServicesTab({ clientId }: { clientId: string }) {
  const clientServices = getClientServices(clientId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clientServices.map((svc, i) => (
        <motion.div
          key={svc.id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.1 }}
          className="rounded-2xl p-6"
          style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="h-10 w-10 rounded-full bg-[rgba(111,75,216,0.15)] flex items-center justify-center mb-4">
            <Target className="h-5 w-5 text-[#6f4bd8]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{svc.name}</h3>
          <p className="text-[13px] text-[#94a3b8] mb-4 line-clamp-2">{svc.description}</p>
          <p className="text-[15px] font-semibold text-[#6f4bd8] mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            ${svc.price?.toLocaleString()}/mo
          </p>
          <div className="flex items-center justify-between">
            <StatusBadge status="Active" />
            <span className="text-[13px] text-[#3b82f6] cursor-pointer hover:underline">Manage</span>
          </div>
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)] space-y-1">
            <p className="text-[12px] text-[#64748b]">Started {svc.startedDate ? format(new Date(svc.startedDate), 'MMM yyyy') : 'N/A'}</p>
            <p className="text-[12px] text-[#64748b]">${svc.totalRevenue?.toLocaleString()} total revenue</p>
          </div>
        </motion.div>
      ))}
      {clientServices.length === 0 && (
        <div className="col-span-full text-center py-12 text-[#64748b]">No active services for this client</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab: Activity                                                      */
/* ------------------------------------------------------------------ */
function ActivityTab({ clientId }: { clientId: string }) {
  const activities = getClientActivities(clientId);

  const typeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
    email: { icon: Mail, color: '#3b82f6' },
    call: { icon: Phone, color: '#8b5cf6' },
    task: { icon: CheckCircle2, color: '#22c55e' },
    earning: { icon: DollarSign, color: '#6f4bd8' },
    service: { icon: Layers, color: '#f59e0b' },
    milestone: { icon: TrophyIcon, color: '#6f4bd8' },
    onboarding: { icon: Rocket, color: '#3b82f6' },
    review: { icon: Activity, color: '#8b5cf6' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-6"
      style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="space-y-0">
        {activities.map((act, i) => {
          const cfg = typeConfig[act.type] || { icon: Activity, color: '#64748b' };
          const Icon = cfg.icon;
          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.05 }}
              className="flex gap-4 py-4 relative"
            >
              {/* Timeline line */}
              {i < activities.length - 1 && (
                <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-[#e4e6eb]" />
              )}
              {/* Dot */}
              <div
                className="h-4 w-4 rounded-full shrink-0 mt-1 z-10 flex items-center justify-center"
                style={{ background: cfg.color }}
              >
                <Icon className="h-2.5 w-2.5 text-[#ffffff]" />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[15px] text-white font-medium">{act.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-[#475569]">{formatDistanceToNow(new Date(act.timestamp), { addSuffix: true })}</span>
                  <span className="text-[11px] text-[#475569]">by {act.user}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-center py-8 text-[#64748b]">No activity recorded yet</p>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab: Documents                                                     */
/* ------------------------------------------------------------------ */
function DocumentsTab({ clientId }: { clientId: string }) {
  const docs = getClientDocuments(clientId);

  const typeIcons: Record<string, { bg: string; ext: string }> = {
    pdf: { bg: 'rgba(239,68,68,0.15)', ext: 'PDF' },
    xlsx: { bg: 'rgba(34,197,94,0.15)', ext: 'XLS' },
    docx: { bg: 'rgba(59,130,246,0.15)', ext: 'DOC' },
    zip: { bg: 'rgba(139,92,246,0.15)', ext: 'ZIP' },
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="rounded-2xl p-8 text-center border-2 border-dashed cursor-pointer hover:border-[#6f4bd8] hover:bg-[rgba(111,75,216,0.02)] transition-all"
        style={{ background: '#ffffff', borderColor: '#e4e6eb' }}
      >
        <Upload className="h-8 w-8 text-[#64748b] mx-auto mb-3" />
        <p className="text-[15px] text-white font-medium mb-1">Drop files here or click to upload</p>
        <p className="text-[13px] text-[#64748b]">PDF, DOC, XLS, ZIP up to 50MB</p>
      </motion.div>

      {/* File list */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Files</h3>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {docs.map((doc, i) => {
            const t = typeIcons[doc.type] || { bg: 'rgba(100,116,139,0.15)', ext: 'FILE' };
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.05 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer"
              >
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: t.bg, color: '#fff' }}
                >
                  {t.ext}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-white font-medium truncate">{doc.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-[#64748b]">{doc.size}</span>
                    <span className="text-[11px] text-[#64748b]">{format(new Date(doc.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#475569]">{doc.uploadedBy}</span>
                <Download className="h-4 w-4 text-[#64748b] hover:text-white transition-colors" />
              </motion.div>
            );
          })}
        </div>
        {docs.length === 0 && (
          <p className="text-center py-8 text-[#64748b]">No documents uploaded yet</p>
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function Upload({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ClientDetail Page                                                  */
/* ------------------------------------------------------------------ */
export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const client = getClientById(id || '');

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-center">
          <p className="text-white text-lg mb-4">Client not found</p>
          <button
            onClick={() => navigate('/app/clients')}
            className="text-[#6f4bd8] hover:underline"
          >
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      className="min-h-screen"
      style={{ background: '#ffffff', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="mx-6 lg:mx-8 mt-6 rounded-2xl p-6 lg:p-8"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Top row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: avatar + info */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate('/app/clients')}
              className="p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all lg:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <ClientAvatar initials={client.avatar} size={72} />
            <div>
              <div className="flex items-center gap-3">
                <h1
                  className="text-4xl font-semibold text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
                >
                  {client.company}
                </h1>
                <button
                  onClick={() => navigate('/app/clients')}
                  className="hidden lg:block p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <p className="text-[15px] text-[#94a3b8] mt-0.5">{client.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <StatusBadge status={client.status} />
                {client.joinDate && (
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[#ffffff] text-[#94a3b8]">
                    Since {format(new Date(client.joinDate), 'MMM yyyy')}
                  </span>
                )}
                {client.healthScore >= 80 && (
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' }}>
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: health score + actions */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1 mr-2">
              <HealthScoreRing value={client.healthScore} size={48} />
              <span className="text-[10px] text-[#64748b]">Health</span>
            </div>
            <button className="p-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] transition-all">
              <Pencil className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] transition-all">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] transition-all">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom row: stat pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {[
            { label: 'Total Earnings', value: `$${client.totalEarnings.toLocaleString()}`, color: '#6f4bd8' },
            { label: 'Services Active', value: String(client.servicesActive), color: '#3b82f6' },
            { label: 'Days with Us', value: String(client.daysWithUs), color: '#ffffff' },
            { label: 'Last Activity', value: client.lastActive ? formatDistanceToNow(new Date(client.lastActive), { addSuffix: false }) : 'Never', color: '#94a3b8' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-[15px] font-semibold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[13px] text-[#64748b] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div
        className="sticky top-0 z-40 mt-6 mx-0 px-6 lg:px-8"
        style={{ background: '#ffffff', borderBottom: '1px solid #e4e6eb' }}
      >
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all rounded-t-lg',
                  isActive ? 'text-white' : 'text-[#64748b] hover:text-[#cbd5e1]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={cn(
                    'text-[11px] px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-[#ffffff] text-[#94a3b8]' : 'bg-[#ffffff] text-[#475569]'
                  )}>
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6f4bd8]"
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
          >
            {activeTab === 'overview' && <OverviewTab client={client} />}
            {activeTab === 'earnings' && <EarningsTab clientId={client.id} />}
            {activeTab === 'onboarding' && <OnboardingTab clientId={client.id} />}
            {activeTab === 'services' && <ServicesTab clientId={client.id} />}
            {activeTab === 'activity' && <ActivityTab clientId={client.id} />}
            {activeTab === 'documents' && <DocumentsTab clientId={client.id} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
