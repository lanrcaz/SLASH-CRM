import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import CountUp from 'react-countup';
import {
  Users, Rocket, DollarSign, AlertTriangle, TrendingUp,
  ArrowUpRight, Zap, Plus,
  Sparkles, Target, Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  dashboardKPIs, revenueChartData, activities,
  onboardingPreview, earningsQuickView, topEarningClients,
  prospects, type Activity,
} from '@/mocks/dashboardMock';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easeOutExpo },
});

const staggerContainer = (stagger = 0.08) => ({
  animate: { transition: { staggerChildren: stagger } },
});

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17) return 'Good evening';
  return 'Good morning';
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function KPICard({ kpi, index }: { kpi: typeof dashboardKPIs[0]; index: number }) {
  const icons: Record<string, React.ReactNode> = {
    Users: <Users className="size-5" />,
    Rocket: <Rocket className="size-5" />,
    DollarSign: <DollarSign className="size-5" />,
    AlertTriangle: <AlertTriangle className="size-5" />,
  };

  const isRevenue = kpi.id === 'monthly-revenue';
  const displayValue = isRevenue ? kpi.value : kpi.value;

  return (
    <motion.div
      {...fadeSlideUp(index * 0.1)}
      className={cn(
        'rounded-[16px] border border-[rgba(255,255,255,0.06)] p-6 transition-all duration-200',
        'bg-[#0f1535] hover:-translate-y-0.5 hover:border-[rgba(126,234,87,0.2)] hover:shadow-[0_0_20px_rgba(126,234,87,0.15)]'
      )}
      style={{ borderTop: `2px solid ${kpi.accentColor}` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${kpi.accentColor}15`, color: kpi.accentColor }}
          >
            {icons[kpi.icon]}
          </div>
          <span className="text-[13px] font-medium text-[#94a3b8]">{kpi.label}</span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-[32px] font-medium tracking-[-0.02em] text-white leading-none">
          {isRevenue ? '$' : ''}
          <CountUp end={displayValue} separator="," duration={1.2} />
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {kpi.changeType === 'positive' && <TrendingUp className="size-3.5 text-[#7eea57]" />}
        <span
          className={cn(
            'text-[13px]',
            kpi.changeType === 'positive' && 'text-[#7eea57]',
            kpi.changeType === 'info' && 'text-[#3b82f6]',
            kpi.changeType === 'warning' && 'text-[#f59e0b]',
          )}
        >
          {kpi.change}
        </span>
      </div>

      {/* Mini sparkline or progress bar */}
      <div className="mt-4">
        {kpi.id === 'active-onboarding' && kpi.progress && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: kpi.accentColor }}
              initial={{ width: 0 }}
              animate={{ width: `${kpi.progress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: easeOutExpo }}
            />
          </div>
        )}
        {(kpi.id === 'total-clients' || kpi.id === 'monthly-revenue') && kpi.sparklineData && (
          <div className="h-[30px] w-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpi.sparklineData.map((v, i) => ({ i, v }))}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={kpi.accentColor}
                  strokeWidth={2}
                  fill={`${kpi.accentColor}20`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        {kpi.id === 'churn-risk' && kpi.avatars && (
          <div className="flex -space-x-2">
            {kpi.avatars.map((a, i) => (
              <div
                key={i}
                className="flex size-6 items-center justify-center rounded-full border-2 border-[#0f1535] bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] text-[10px] font-medium text-white"
              >
                {a}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ActivityIcon({ type }: { type: Activity['type'] }) {
  const colors: Record<Activity['type'], string> = {
    success: '#22c55e',
    info: '#3b82f6',
    warning: '#f59e0b',
    purple: '#8b5cf6',
  };
  return (
    <div
      className="size-2 rounded-full shrink-0"
      style={{ backgroundColor: colors[type] }}
    />
  );
}

function RevenueChart() {
  const [period, setPeriod] = useState('1Y');
  const periods = ['7D', '30D', '90D', '1Y'];

  return (
    <motion.div
      {...fadeSlideUp(0.2)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-0"
    >
      <div className="flex items-center justify-between px-5 py-5">
        <h3 className="text-[18px] font-semibold text-white">Revenue Overview</h3>
        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-full px-3 py-1 text-[13px] font-medium transition-all',
                period === p
                  ? 'bg-[#162044] text-white'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 pb-5" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7eea57" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#7eea57" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#162044',
                border: '1px solid #1c2960',
                borderRadius: '10px',
                color: '#fff',
                fontSize: 13,
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#7eea57"
              strokeWidth={2}
              fill="url(#revGradient)"
            />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function ActivityFeed() {
  return (
    <motion.div
      {...fadeSlideUp(0.3)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] flex flex-col"
    >
      <div className="px-5 py-5">
        <h3 className="text-[18px] font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[320px] px-0">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: easeOutExpo }}
            className="flex items-start gap-3 px-5 py-3 border-b border-[rgba(255,255,255,0.04)] last:border-b-0"
          >
            <div className="mt-1">
              <ActivityIcon type={activity.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#cbd5e1] leading-relaxed">{activity.description}</p>
              <p className="text-[11px] text-[#475569] mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function OnboardingPreview() {
  return (
    <motion.div
      {...fadeSlideUp(0.4)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] font-semibold text-white">Active Onboarding</h3>
        <button className="flex items-center gap-1 text-[13px] text-[#7eea57] hover:underline">
          View All <ArrowUpRight className="size-3.5" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {onboardingPreview.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-3 rounded-[10px] bg-[#162044] p-4"
          >
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-[12px] font-medium text-white">
              {client.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-white truncate">{client.name}</p>
              <p className="text-[12px] text-[#64748b]">{client.company}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[13px] font-medium text-[#7eea57]">{client.progress}%</p>
              <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                <div
                  className="h-full rounded-full bg-[#7eea57]"
                  style={{ width: `${client.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EarningsQuickView() {
  const total = earningsQuickView.reduce((s, e) => s + e.value, 0);

  return (
    <motion.div
      {...fadeSlideUp(0.5)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] font-semibold text-white">Earnings This Month</h3>
        <button className="flex items-center gap-1 text-[13px] text-[#7eea57] hover:underline">
          Details <ArrowUpRight className="size-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative shrink-0" style={{ width: 120, height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={earningsQuickView}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                dataKey="value"
                stroke="none"
              >
                {earningsQuickView.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[18px] font-medium text-white">
              ${(total / 1000).toFixed(1)}K
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 flex-1">
          {earningsQuickView.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[13px] text-[#cbd5e1]">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[13px] font-medium text-white">
                  ${(item.value / 1000).toFixed(1)}K
                </span>
                <span className="ml-2 text-[11px] text-[#64748b]">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini horizontal bar chart */}
      <div className="mt-5 flex flex-col gap-2">
        {topEarningClients.map((client, i) => {
          const maxEarnings = topEarningClients[0].earnings;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-[90px] truncate text-[12px] text-[#94a3b8]">{client.name}</span>
              <div className="flex-1 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.04)]">
                <motion.div
                  className="h-full rounded-full bg-[#7eea57]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(client.earnings / maxEarnings) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: easeOutExpo }}
                />
              </div>
              <span className="w-[45px] text-right text-[12px] font-medium text-white">
                ${(client.earnings / 1000).toFixed(1)}K
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function AIChatTrigger() {
  return (
    <motion.div
      {...fadeSlideUp(0.55)}
      className="rounded-[16px] border border-[rgba(126,234,87,0.15)] bg-[#0f1535] p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-[rgba(126,234,87,0.1)]">
          <Sparkles className="size-5 text-[#7eea57]" />
        </div>
        <div>
          <h3 className="text-[16px] font-semibold text-white">AI Assistant</h3>
          <p className="text-[12px] text-[#64748b]">Ask me anything about your business</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {['Show me at-risk clients', "What's our revenue this month?", 'Onboard new client'].map((cmd) => (
          <button
            key={cmd}
            className="rounded-full border border-[#1c2960] px-3 py-1.5 text-[12px] text-[#94a3b8] transition-all hover:border-[#7eea57] hover:text-[#7eea57] hover:bg-[rgba(126,234,87,0.05)]"
          >
            {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function RecentProspects() {
  const recent = prospects.slice(0, 5);
  const stageColors: Record<string, string> = {
    Lead: '#64748b',
    Qualified: '#3b82f6',
    Proposal: '#8b5cf6',
    Negotiation: '#f59e0b',
    Closed: '#7eea57',
  };

  return (
    <motion.div
      {...fadeSlideUp(0.6)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] font-semibold text-white">Recent Prospects</h3>
        <button className="flex items-center gap-1 text-[13px] text-[#7eea57] hover:underline">
          View All <ArrowUpRight className="size-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Company</th>
              <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Value</th>
              <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Stage</th>
              <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Score</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((p) => (
              <tr key={p.id} className="border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-[10px] font-medium text-white">
                      {p.company.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[13px] font-medium text-white">{p.company}</span>
                  </div>
                </td>
                <td className="py-3 text-[13px] text-[#7eea57] font-medium">${(p.value / 1000).toFixed(0)}K</td>
                <td className="py-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{
                      backgroundColor: `${stageColors[p.stage]}15`,
                      color: stageColors[p.stage],
                      border: `1px solid ${stageColors[p.stage]}30`,
                    }}
                  >
                    {p.stage}
                  </span>
                </td>
                <td className="py-3 text-[13px] text-white">{p.aiScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard Page                                                */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const greeting = getGreeting();

  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  }, []);

  return (
    <div className="min-h-full bg-[#0a0e27] p-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className={cn(
          'rounded-[20px] border border-[rgba(126,234,87,0.1)] p-8',
          'bg-gradient-to-r from-[#0f1535] to-[#162044]'
        )}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.01em] text-white">
              {greeting}, Alex
            </h1>
            <p className="mt-2 text-[15px] text-[#94a3b8]">
              You have 8 clients onboarding and 3 pending payouts this week.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#7eea57] px-4 py-2 text-[13px] font-semibold text-[#0a0e27] transition-all hover:bg-[#6dd446] hover:shadow-[0_0_20px_rgba(126,234,87,0.3)]">
                <Plus className="size-4" /> Start Onboarding
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.3)]">
                <DollarSign className="size-4" /> View Earnings
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.3)]">
                <Target className="size-4" /> Check Pipeline
              </button>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">This Month&apos;s Revenue</p>
            <div className="mt-1 flex items-center gap-2 justify-end">
              <span className="text-[32px] font-medium tracking-[-0.02em] text-[#7eea57]">
                $<CountUp end={24850} separator="," duration={1.2} />
              </span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[rgba(126,234,87,0.15)] px-2 py-0.5 text-[12px] font-medium text-[#7eea57]">
                <ArrowUpRight className="size-3" /> +12%
              </span>
            </div>
            <p className="mt-1 text-[12px] text-[#475569]">{today}</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="initial"
        animate="animate"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dashboardKPIs.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left Column - 60% */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <RevenueChart />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <OnboardingPreview />
            <EarningsQuickView />
          </div>

          <AIChatTrigger />
          <RecentProspects />
        </div>

        {/* Right Column - 40% */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ActivityFeed />

          {/* Quick Stats */}
          <motion.div
            {...fadeSlideUp(0.45)}
            className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-5"
          >
            <h3 className="text-[18px] font-semibold text-white mb-4">Quick Stats</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Win Rate', value: '68%', icon: Target, color: '#7eea57' },
                { label: 'Avg. Deal Size', value: '$24.5K', icon: DollarSign, color: '#3b82f6' },
                { label: 'Pipeline Value', value: '$284K', icon: Zap, color: '#8b5cf6' },
                { label: 'Days to Close', value: '23', icon: Clock, color: '#f59e0b' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-[10px] bg-[#162044] p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                    >
                      <stat.icon className="size-4" />
                    </div>
                    <span className="text-[13px] text-[#cbd5e1]">{stat.label}</span>
                  </div>
                  <span className="text-[16px] font-medium text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
