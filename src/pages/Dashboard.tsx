import { useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Folder,
  ListFilter,
  MoreVertical,
  PlusCircle,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  activities,
  dashboardKPIs,
  onboardingPreview,
  prospects,
  revenueChartData,
} from '@/mocks/dashboardMock';

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeIn = (delay = 0) => ({
  initial: false,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: easeOutExpo },
});

function formatKpiValue(id: string, value: number) {
  if (id === 'monthly-revenue') return `$${value.toLocaleString()}`;
  return value.toLocaleString();
}

function EmptyIllustration({ icon: Icon }: { icon: IconComponent }) {
  return (
    <div className="relative mx-auto flex size-28 items-center justify-center">
      <div className="absolute left-1 top-8 size-9 rounded-xl border border-[#b8b0fb] bg-[#f4f2ff]" />
      <div className="absolute right-2 top-3 size-8 rounded-xl border border-[#c8c2ff] bg-white" />
      <div className="absolute bottom-4 right-1 size-10 rounded-xl border border-[#b8b0fb] bg-[#f6f4ff]" />
      <div className="workspace-empty-illustration relative flex size-20 items-center justify-center rounded-full border border-[#c8cbd4] shadow-sm">
        <Icon className="size-9 text-[#9499a4]" strokeWidth={1.8} />
      </div>
      <div className="absolute bottom-1 h-1 w-24 rounded-full bg-[#dfe2e8]" />
    </div>
  );
}

function WorkspaceCard({
  title,
  subtitle,
  icon: Icon,
  children,
  action,
  delay,
  className,
}: {
  title: string;
  subtitle?: string;
  icon: IconComponent;
  children: ReactNode;
  action?: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.section
      {...fadeIn(delay)}
      className={cn('workspace-panel rounded-lg', className)}
    >
      <div className="flex items-start justify-between border-b border-[#eceef2] px-5 py-4">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 size-5 shrink-0 text-[#69707a]" strokeWidth={1.8} />
          <div>
            <h2 className="text-[18px] font-bold leading-tight text-[#303238]">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-[#6f747d]">{subtitle}</p>}
          </div>
        </div>
        {action ?? (
          <button className="rounded-md border border-[#d9dde6] p-2 text-[#3f444c] transition-colors hover:bg-[#f3f4f7]">
            <MoreVertical className="size-4" />
          </button>
        )}
      </div>
      {children}
    </motion.section>
  );
}

function KpiStrip() {
  return (
    <motion.div
      {...fadeIn(0.14)}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {dashboardKPIs.map((kpi) => (
        <div
          key={kpi.id}
          className="rounded-lg border border-[#dfe2e8] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(32,33,36,0.04)]"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#737984]">{kpi.label}</p>
            <span className="rounded-full bg-[#f2efff] px-2 py-0.5 text-[11px] font-semibold text-[#6f4bd8]">
              {kpi.changeType === 'positive' ? 'Up' : kpi.changeType === 'warning' ? 'Watch' : 'Live'}
            </span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <p className="text-[26px] font-semibold leading-none text-[#24262c]">
                {formatKpiValue(kpi.id, kpi.value)}
              </p>
              <p className="mt-1.5 text-[12px] text-[#747984]">{kpi.change}</p>
            </div>
            {kpi.sparklineData && (
              <div className="hidden h-8 w-20 sm:block">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.sparklineData.map((value, index) => ({ index, value }))}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6f4bd8"
                      strokeWidth={2}
                      fill="#f2efff"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <motion.div {...fadeIn(0.08)} className="mx-auto mt-5 flex w-full max-w-[870px] items-center gap-2">
      <button className="flex h-[50px] items-center gap-2 rounded-md border border-[#cbd0da] bg-white px-3 text-[#3f444c] shadow-sm">
        <ListFilter className="size-4" />
        <ChevronDown className="size-4" />
      </button>
      <label className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#4f5661]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search clients, prospects, files, tasks..."
          className="h-[50px] w-full min-w-0 rounded-md border border-[#cbd0da] bg-white pl-12 pr-4 text-[14px] font-medium text-[#303238] shadow-sm outline-none transition focus:border-[#6f4bd8] focus:ring-2 focus:ring-[#6f4bd8]/15 sm:text-[15px]"
        />
      </label>
    </motion.div>
  );
}

function LeadAssistantCard() {
  const priorityProspects = prospects
    .slice()
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 3);

  return (
    <WorkspaceCard
      title="AI"
      subtitle="Lead intelligence and next-best actions"
      icon={Sparkles}
      delay={0.18}
      action={
        <button className="rounded-md border border-[#cbd0da] bg-white px-3 py-2 text-[14px] font-bold text-[#303238] transition-colors hover:bg-[#f3f4f7]">
          Go to AI
        </button>
      }
      className="min-h-[310px]"
    >
      <div className="space-y-3 p-5">
        {priorityProspects.map((prospect) => (
          <button
            key={prospect.id}
            className="flex w-full items-center gap-3 rounded-md border border-[#d4d8e1] bg-white px-3 py-3 text-left transition-colors hover:border-[#b8b0fb] hover:bg-[#fbfaff]"
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-[#f1f2f5] text-[#6f4bd8]">
              <Bot className="size-5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-[#303238]">{prospect.company}</p>
              <p className="truncate text-[13px] text-[#626872]">
                {prospect.aiScore} AI score · {prospect.source} · ${(prospect.value / 1000).toFixed(0)}K pipeline
              </p>
            </div>
            <ArrowUpRight className="size-4 text-[#6f747d]" />
          </button>
        ))}
      </div>
    </WorkspaceCard>
  );
}

function TasksCard() {
  const tasks = [
    { label: 'Follow up with Titan Solutions', meta: 'Proposal feedback due today', status: 'Due' },
    { label: 'Qualify NorthStar Ventures', meta: 'High-intent referral lead', status: 'Hot' },
    { label: 'Prepare onboarding for Meridian Group', meta: 'Starts next week', status: 'Ready' },
  ];

  return (
    <WorkspaceCard
      title="Tasks Assigned To Me"
      subtitle="Up to 50 of your recent CRM tasks will show up here"
      icon={CheckCircle2}
      delay={0.22}
      className="min-h-[310px]"
    >
      <div className="p-5">
        {tasks.length === 0 ? (
          <div className="flex min-h-[230px] flex-col items-center justify-center text-center">
            <EmptyIllustration icon={CheckCircle2} />
            <h3 className="mt-5 text-[20px] font-bold text-[#303238]">You do not have any tasks assigned</h3>
          </div>
        ) : (
          <div className="divide-y divide-[#eceef2]">
            {tasks.map((task) => (
              <label key={task.label} className="flex cursor-pointer items-start gap-3 py-3 first:pt-0 last:pb-0">
                <input type="checkbox" className="mt-1 size-4 rounded border-[#b9bec9] accent-[#6f4bd8]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-bold text-[#303238]">{task.label}</span>
                  <span className="text-[12px] text-[#747984]">{task.meta}</span>
                </span>
                <span className="rounded-full border border-[#d8dbe3] bg-[#f7f8fb] px-2 py-0.5 text-[11px] font-bold text-[#575d67]">
                  {task.status}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </WorkspaceCard>
  );
}

function PipelineCard() {
  const columns = [
    { label: 'Shared', value: prospects.filter((p) => p.stage !== 'Closed').length, color: '#f4c84f' },
    { label: 'Ferlan Racaza', value: onboardingPreview.length, color: '#9aa8f0' },
  ];

  return (
    <motion.div {...fadeIn(0.12)} className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-7">
      {columns.map((column) => (
        <button key={column.label} className="flex items-center gap-2 text-[15px] font-bold text-[#303238]">
          <span className="flex size-8 items-center justify-center rounded-md" style={{ backgroundColor: column.color }}>
            <Folder className="size-4 text-white" fill="currentColor" strokeWidth={1.5} />
          </span>
          {column.label}
          <span className="rounded-full bg-[#eef0f4] px-2 py-0.5 text-[11px] text-[#747984]">{column.value}</span>
        </button>
      ))}
    </motion.div>
  );
}

function RevenueWorkspaceCard() {
  return (
    <WorkspaceCard
      title="Revenue Overview"
      subtitle="Tracked from active clients and pipeline confidence"
      icon={ArrowUpRight}
      delay={0.28}
      action={
        <button className="rounded-md border border-[#cbd0da] bg-white px-3 py-2 text-[14px] font-bold text-[#303238] transition-colors hover:bg-[#f3f4f7]">
          View report
        </button>
      }
    >
      <div className="h-[270px] px-4 pb-5 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueChartData} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="workspaceRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6f4bd8" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#6f4bd8" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#777b84' }}
              axisLine={{ stroke: '#e5e7ec' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #dfe2e8',
                borderRadius: 8,
                color: '#303238',
                boxShadow: '0 12px 28px rgba(32, 33, 36, 0.12)',
                fontSize: 13,
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#6f4bd8"
              strokeWidth={2.5}
              fill="url(#workspaceRevenue)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="#9ba2ae"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              fill="transparent"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WorkspaceCard>
  );
}

function RecentActivityCard() {
  return (
    <WorkspaceCard
      title="Recent files"
      subtitle="Client updates, proposals, payouts, and system events"
      icon={Clock3}
      delay={0.34}
      action={
        <button className="rounded-md border border-[#cbd0da] bg-white px-3 py-2 text-[14px] font-bold text-[#303238] transition-colors hover:bg-[#f3f4f7]">
          View all recents
        </button>
      }
    >
      <div className="divide-y divide-[#eceef2] px-5">
        {activities.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 py-3">
            <span className="mt-2 size-2 rounded-full bg-[#6f4bd8]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-[#303238]">{activity.description}</p>
              <p className="text-[12px] text-[#747984]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </WorkspaceCard>
  );
}

function RecentProspectsTable() {
  return (
    <motion.section {...fadeIn(0.38)} className="workspace-panel mt-6 overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-[#eceef2] px-5 py-4">
        <div>
          <h2 className="text-[18px] font-bold text-[#303238]">Prospect workflow</h2>
          <p className="text-[13px] text-[#6f747d]">A compact table view aligned with your CRM pipeline.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-[#6f4bd8] px-4 py-2 text-[14px] font-bold text-white transition-colors hover:bg-[#5f3fd0]">
          <PlusCircle className="size-4" /> Create lead
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-[#eceef2] bg-[#fafbfc] text-[12px] font-bold text-[#575d67]">
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Assigned by</th>
              <th className="px-5 py-3">Value</th>
              <th className="px-5 py-3">Completion date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eceef2]">
            {prospects.slice(0, 6).map((prospect) => (
              <tr key={prospect.id} className="text-[14px] hover:bg-[#fafbfc]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#f2efff] text-[11px] font-bold text-[#6f4bd8]">
                      {prospect.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#303238]">{prospect.company}</p>
                      <p className="text-[12px] text-[#747984]">{prospect.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-md border border-[#d8dbe3] bg-[#f7f8fb] px-2.5 py-1 text-[12px] font-bold text-[#575d67]">
                    {prospect.stage}
                  </span>
                </td>
                <td className="px-5 py-3 text-[#575d67]">{prospect.source}</td>
                <td className="px-5 py-3 text-[#575d67]">{prospect.assignee}</td>
                <td className="px-5 py-3 font-bold text-[#303238]">${prospect.value.toLocaleString()}</td>
                <td className="px-5 py-3 text-[#747984]">{prospect.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

export default function Dashboard() {
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  return (
    <div className="min-h-full px-4 py-4 sm:px-6 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button className="inline-flex items-center gap-2 rounded-md bg-[#d9dce3] px-3 py-2 text-[14px] font-bold text-white opacity-80">
          <PlusCircle className="size-4" /> Create <ChevronDown className="size-3.5" />
        </button>
        <div className="flex items-center gap-3">
          <button className="rounded-md border border-[#d9dde6] bg-white p-2.5 text-[#4f5661] shadow-sm transition-colors hover:bg-[#f3f4f7]">
            <Settings className="size-5" strokeWidth={1.8} />
          </button>
          <button className="rounded-md border border-[#d9dde6] bg-white p-2.5 text-[#4f5661] shadow-sm transition-colors hover:bg-[#f3f4f7]">
            <CircleHelp className="size-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <motion.header {...fadeIn(0)} className="mx-auto mt-6 max-w-[980px] text-center">
        <div className="mx-auto mb-5 flex size-11 items-center justify-center text-[#13324f]">
          <Sparkles className="size-10 text-[#6f4bd8]" strokeWidth={1.9} />
        </div>
        <h1 className="text-[29px] font-medium leading-tight text-[#4a4d55] sm:text-[34px] md:text-[40px]">
          Welcome, Ferlan
        </h1>
        <p className="mt-2 text-[14px] font-medium text-[#777b84]">
          {today} · Your CRM workspace for leads, client operations, and revenue clarity.
        </p>
      </motion.header>

      <SearchBar />
      <PipelineCard />

      <div className="mx-auto mt-8 max-w-[1680px]">
        <KpiStrip />

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <LeadAssistantCard />
          <TasksCard />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <RevenueWorkspaceCard />
          <RecentActivityCard />
        </div>

        <RecentProspectsTable />
      </div>
    </div>
  );
}
