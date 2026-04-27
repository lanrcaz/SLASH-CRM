import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
  ReferenceLine, CartesianGrid,
} from "recharts";
import {
  Download, DollarSign, Calendar, Clock,
  Sparkles, Trophy, ChevronRight, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
  monthlyEarnings, revenueSources, revenueSourcePerformance,
  milestones, earningsFeed, topClients, payoutsList, payoutStats,
  aiProjections, aiInsight, miniBarData, sparklineData,
  type Milestone,
} from "@/mocks/earningsMock";

/* ─── design tokens (workspace-aligned light theme) ─── */
const NAVY_900 = "#ffffff";
const NAVY_800 = "#f7f8fb";
const NAVY_700 = "#e4e6eb";
const NAVY_950 = "#ffffff";
const NEON_GREEN = "#6f4bd8";
const ELECTRIC_BLUE = "#3b82f6";
const PURPLE = "#8b5cf6";
const GRAY_500 = "#6f747d";
const GRAY_600 = "#4a4d55";
const WARNING = "#f59e0b";
const SUCCESS = "#10b981";
const ERROR = "#ef4444";
const WHITE = "#202124";

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── count-up hook ─── */
function useCountUp(target: number, duration = 1500, decimals = 0) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const fromRef = useRef<number>(0);
  const toRef = useRef<number>(target);

  useEffect(() => {
    toRef.current = target;
    fromRef.current = 0;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = fromRef.current + (toRef.current - fromRef.current) * eased;
      setVal(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  const formatted = decimals > 0
    ? `$${val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
    : `$${Math.floor(val).toLocaleString("en-US")}`;

  return formatted;
}

/* ─── status badge ─── */
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; border: string }> = {
    paid: { bg: "rgba(34,197,94,0.15)", text: SUCCESS, border: "1px solid rgba(34,197,94,0.3)" },
    pending: { bg: "rgba(245,158,11,0.15)", text: WARNING, border: "1px solid rgba(245,158,11,0.3)" },
    rejected: { bg: "rgba(239,68,68,0.15)", text: ERROR, border: "1px solid rgba(239,68,68,0.3)" },
  };
  const c = config[status] || config.pending;
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider"
      style={{ background: c.bg, color: c.text, border: c.border }}
    >
      {status}
    </span>
  );
}

/* ─── KPI Card ─── */
function KPICard({ label, value, sub, subColor, topColor, sparkline, barData, delay }: {
  label: string; value: string; sub: string; subColor: string;
  topColor: string; sparkline?: boolean; barData?: boolean; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo, delay }}
      className="rounded-xl px-4 py-3 relative overflow-hidden"
      style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: topColor }} />
      <p className="text-[11px] uppercase tracking-[0.06em] text-slate-500 font-medium">{label}</p>
      <p className="text-[24px] font-bold tracking-tight mt-1 leading-none" style={{ color: topColor }}>{value}</p>
      <p className="text-[12px] mt-1.5" style={{ color: subColor }}>{sub}</p>
      {sparkline && (
        <div className="mt-2 h-[32px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData.slice(-7)}>
              <defs>
                <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={topColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={topColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={topColor} strokeWidth={1.5} fill={`url(#sg-${label})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      {barData && (
        <div className="mt-2 h-[32px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={miniBarData}>
              <Bar dataKey="value" fill={topColor} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Mini sparkline ─── */
function MiniSparkline({ color = NEON_GREEN }: { color?: string }) {
  return (
    <div className="w-[60px] h-[24px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparklineData.slice(-6)}>
          <defs>
            <linearGradient id={`ms-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#ms-${color})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Confetti burst ─── */
function ConfettiBurst({ x, y, active }: { x: number; y: number; active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    dist: 30 + ((i * 17) % 50),
    size: 3 + ((i * 7) % 4),
  }));
  return (
    <div className="fixed pointer-events-none z-[9999]" style={{ left: x, top: y }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: NEON_GREEN }}
        />
      ))}
    </div>
  );
}

/* ─── Milestone node ─── */
function MilestoneNode({ m, index, onClick }: { m: Milestone; index: number; onClick: (e: React.MouseEvent) => void }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], delay: index * 0.1 }}
      className="flex flex-col items-center relative cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        animate={m.achieved ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: m.achieved ? NEON_GREEN : NAVY_700,
          boxShadow: m.achieved ? `0 0 16px ${NEON_GREEN}40` : "none",
        }}
      >
        {m.achieved ? (
          <Trophy size={18} style={{ color: NAVY_950 }} />
        ) : (
          <Clock size={16} style={{ color: GRAY_600 }} />
        )}
      </motion.div>
      <p className="text-[12px] font-medium mt-2 text-center" style={{ color: m.achieved ? WHITE : GRAY_500 }}>
        {m.label}
      </p>
      <p className="text-[11px] mt-0.5" style={{ color: m.achieved ? NEON_GREEN : GRAY_600 }}>
        {m.amount}
      </p>
      <p className="text-[10px] mt-0.5" style={{ color: GRAY_600 }}>
        {m.date}
      </p>
    </motion.div>
  );
}

/* ─── Period tabs ─── */
function PeriodTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const tabs = ["7D", "30D", "90D", "1Y", "All"];
  return (
    <div className="flex gap-1 bg-[#ffffff] rounded-[10px] p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-all duration-200"
          style={{
            background: value === t ? NAVY_800 : "transparent",
            color: value === t ? WHITE : GRAY_500,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────── */
/*  MAIN EARNINGS PAGE                        */
/* ────────────────────────────────────────── */

export default function Earnings() {
  const [period, setPeriod] = useState("1Y");
  const [showConfetti, setShowConfetti] = useState<{ x: number; y: number } | null>(null);
  const totalEarnings = useCountUp(1247800, 1500, 0);
  const thisMonth = useCountUp(24850, 1500, 0);
  const pendingPayouts = useCountUp(42300, 1500, 0);
  const avgPerClient = useCountUp(14300, 1500, 0);

  const handleMilestoneClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setShowConfetti({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setTimeout(() => setShowConfetti(null), 1000);
  }, []);

  const chartData = monthlyEarnings.filter((d) => d.actual > 0 || d.projected > 0);

  const tooltipStyle = {
    backgroundColor: NAVY_800,
    border: `1px solid ${NAVY_700}`,
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  };

  return (
    <div className="min-h-[100dvh]">
      {showConfetti && (
        <ConfettiBurst x={showConfetti.x} y={showConfetti.y} active={true} />
      )}

      <div className="max-w-[1240px] mx-auto px-5 py-6">
        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-5"
        >
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-slate-900">Earnings</h1>
            <p className="text-[13px] mt-1" style={{ color: GRAY_500 }}>
              Tracking $1.2M total · $24.8K this month · 87 clients
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium" style={{ background: NAVY_800, color: WHITE }}>
              <Calendar size={14} />
              Jun 1 – Jun 30, 2025
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-200 hover:bg-white/10" style={{ color: GRAY_500, border: "1px solid rgba(255,255,255,0.2)" }}>
              <Download size={14} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all duration-200 hover:scale-[1.02]" style={{ background: NEON_GREEN, color: NAVY_950 }}>
              <DollarSign size={14} /> Request Payout
            </button>
          </div>
        </motion.div>

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
          <KPICard label="Total Earnings" value={totalEarnings} sub="Lifetime earnings across all clients" subColor={GRAY_500} topColor={NEON_GREEN} sparkline delay={0} />
          <KPICard label="This Month" value={thisMonth} sub="+12% vs last month" subColor={NEON_GREEN} topColor={WHITE} barData delay={0.1} />
          <KPICard label="Pending Payouts" value={pendingPayouts} sub="12 invoices pending" subColor={WARNING} topColor={WARNING} delay={0.2} />
          <KPICard label="Avg per Client" value={avgPerClient} sub="+5% vs last quarter" subColor={NEON_GREEN} topColor={ELECTRIC_BLUE} sparkline delay={0.3} />
        </div>

        {/* ── Main Earnings Chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          className="rounded-xl p-5 mb-4"
          style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
            <h2 className="text-[22px] font-semibold text-slate-900" style={{ letterSpacing: "-0.01em" }}>Earnings Trajectory</h2>
            <PeriodTabs value={period} onChange={setPeriod} />
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={NEON_GREEN} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={NEON_GREEN} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: GRAY_500, fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: GRAY_500, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: GRAY_500, fontSize: 12 }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                />
                <ReferenceLine x="Jun 2025" stroke={NEON_GREEN} strokeDasharray="4 4" label={{ value: "$1M", fill: NEON_GREEN, fontSize: 11, position: "top" }} />
                <Area type="monotone" dataKey="actual" stroke={NEON_GREEN} strokeWidth={2.5} fill="url(#earnGrad)" name="Earnings" dot={false} />
                <Area type="monotone" dataKey="projected" stroke={ELECTRIC_BLUE} strokeWidth={2} strokeDasharray="8 4" fill="url(#earnGrad)" name="Projected" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-4 mt-3 text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: NEON_GREEN }} />
              <span style={{ color: GRAY_500 }}>Earnings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: ELECTRIC_BLUE }} />
              <span style={{ color: GRAY_500 }}>Projected</span>
            </div>
          </div>
        </motion.div>

        {/* ── Revenue Source Breakdown ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
            className="rounded-xl p-5"
            style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
          >
            <h3 className="text-[18px] font-semibold text-slate-900 mb-4">Revenue Sources</h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <PieChart width={220} height={220}>
                  <Pie
                    data={revenueSources}
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {revenueSources.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] font-medium text-slate-900">$1.25M</span>
                  <span className="text-[11px]" style={{ color: GRAY_500 }}>Total</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {revenueSources.map((s) => {
                const pct = ((s.value / 1247800) * 100).toFixed(0);
                return (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                      <span className="text-[13px] text-slate-900">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-medium text-slate-900">${(s.value / 1000).toFixed(0)}K</span>
                      <span className="text-[12px]" style={{ color: GRAY_500 }}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.4 }}
            className="rounded-xl p-5"
            style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
          >
            <h3 className="text-[18px] font-semibold text-slate-900 mb-4">Source Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <th className="text-left text-[11px] font-medium uppercase tracking-wider py-3 pr-4" style={{ color: GRAY_500 }}>Source</th>
                    <th className="text-right text-[11px] font-medium uppercase tracking-wider py-3 px-2" style={{ color: GRAY_500 }}>This Month</th>
                    <th className="text-right text-[11px] font-medium uppercase tracking-wider py-3 px-2" style={{ color: GRAY_500 }}>Last Month</th>
                    <th className="text-right text-[11px] font-medium uppercase tracking-wider py-3 px-2" style={{ color: GRAY_500 }}>Change</th>
                    <th className="text-left text-[11px] font-medium uppercase tracking-wider py-3 pl-4" style={{ color: GRAY_500 }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueSourcePerformance.map((row) => (
                    <tr key={row.source} className="border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                          <span className="text-[13px] text-slate-900">{row.source}</span>
                        </div>
                      </td>
                      <td className="text-right text-[13px] font-medium text-slate-900 py-3 px-2">${row.thisMonth.toLocaleString()}</td>
                      <td className="text-right text-[13px] py-3 px-2" style={{ color: GRAY_500 }}>${row.lastMonth.toLocaleString()}</td>
                      <td className="text-right py-3 px-2">
                        <span className="text-[13px] font-medium" style={{ color: row.change >= 0 ? SUCCESS : ERROR }}>
                          {row.change >= 0 ? "+" : ""}{row.change}%
                        </span>
                      </td>
                      <td className="py-3 pl-4">
                        <MiniSparkline color={row.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* ── Milestones Journey ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.4 }}
          className="rounded-xl p-6 mb-4"
          style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
        >
          <h3 className="text-[18px] font-semibold tracking-tight text-slate-900">Earnings Milestones</h3>
          <p className="text-[13px] mt-0.5 mb-5" style={{ color: GRAY_500 }}>
            Celebrate every breakthrough on the journey from $0 to 100x
          </p>
          {/* Progress track */}
          <div className="relative mb-4">
            <div className="h-1 rounded-full" style={{ background: NAVY_700 }} />
            <motion.div
              className="absolute top-0 left-0 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${NEON_GREEN}, ${NEON_GREEN}80)` }}
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, ease: easeOutExpo, delay: 0.3 }}
            />
          </div>
          {/* Milestone nodes */}
          <div className="grid grid-cols-5 md:grid-cols-9 gap-4">
            {milestones.map((m, i) => (
              <MilestoneNode key={i} m={m} index={i} onClick={handleMilestoneClick} />
            ))}
          </div>
        </motion.div>

        {/* ── Client Earnings Leaderboard ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.5 }}
          className="rounded-xl p-5 mb-4"
          style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-semibold text-slate-900">Top Earning Clients</h3>
            <button className="text-[13px] font-medium flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: NEON_GREEN }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <th className="text-left text-[11px] font-medium uppercase tracking-wider py-3 pr-4" style={{ color: GRAY_500 }}>Rank</th>
                  <th className="text-left text-[11px] font-medium uppercase tracking-wider py-3 px-2" style={{ color: GRAY_500 }}>Client</th>
                  <th className="text-right text-[11px] font-medium uppercase tracking-wider py-3 px-2" style={{ color: GRAY_500 }}>Total</th>
                  <th className="text-right text-[11px] font-medium uppercase tracking-wider py-3 px-2" style={{ color: GRAY_500 }}>This Month</th>
                  <th className="text-left text-[11px] font-medium uppercase tracking-wider py-3 pl-4" style={{ color: GRAY_500 }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((c, i) => (
                  <motion.tr
                    key={c.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.5 + i * 0.06 }}
                    className="border-b transition-colors hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  >
                    <td className="py-3 pr-4">
                      <span
                        className="text-[13px] font-semibold"
                        style={{
                          color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7f32" : GRAY_500,
                        }}
                      >
                        #{c.rank}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold" style={{ background: `${ELECTRIC_BLUE}20`, color: ELECTRIC_BLUE }}>
                          {c.client.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[14px] font-medium text-slate-900">{c.client}</span>
                      </div>
                    </td>
                    <td className="text-right text-[14px] font-semibold text-slate-900 py-3 px-2">
                      ${c.total.toLocaleString()}
                    </td>
                    <td className="text-right text-[13px] text-slate-900 py-3 px-2">
                      ${c.thisMonth.toLocaleString()}
                    </td>
                    <td className="py-3 pl-4">
                      {c.trend === "up" ? (
                        <ArrowUpRight size={16} style={{ color: SUCCESS }} />
                      ) : (
                        <ArrowDownRight size={16} style={{ color: ERROR }} />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Payout Management ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.6 }}
          className="rounded-xl p-5 mb-4"
          style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-semibold text-slate-900">Payouts</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all hover:scale-[1.02]" style={{ background: NEON_GREEN, color: NAVY_950 }}>
              <DollarSign size={14} /> Request Payout
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
              <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Available</p>
              <p className="text-[20px] font-medium mt-1" style={{ color: NEON_GREEN }}>${payoutStats.available.toLocaleString()}</p>
            </div>
            <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
              <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Pending</p>
              <p className="text-[20px] font-medium mt-1" style={{ color: WARNING }}>${payoutStats.pending.toLocaleString()}</p>
            </div>
            <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
              <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Processing</p>
              <p className="text-[20px] font-medium mt-1" style={{ color: ELECTRIC_BLUE }}>${payoutStats.processing.toLocaleString()}</p>
            </div>
            <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
              <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Total Paid</p>
              <p className="text-[20px] font-medium mt-1 text-slate-900">${payoutStats.totalPaid.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-2">
            {payoutsList.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.6 + p.id * 0.05 }}
                className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-[13px]" style={{ color: GRAY_500 }}>{p.date}</span>
                <span className="text-[14px] font-medium text-slate-900">${p.amount.toLocaleString()}</span>
                <span className="text-[13px]" style={{ color: GRAY_500 }}>{p.method}</span>
                <span
                  className="text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    background: p.status === "Completed" ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.15)",
                    color: p.status === "Completed" ? SUCCESS : ELECTRIC_BLUE,
                  }}
                >
                  {p.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── AI Projections Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.7 }}
          className="rounded-xl p-5 mb-4"
          style={{
            background: `linear-gradient(135deg, ${NAVY_900}, ${NAVY_800})`,
            border: `1px solid rgba(59,130,246,0.2)`,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} style={{ color: PURPLE }} />
            <h3 className="text-[18px] font-semibold text-slate-900">AI Revenue Forecast</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {aiProjections.map((proj, i) => (
              <motion.div
                key={proj.scenario}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.7 + i * 0.12 }}
                className="rounded-[10px] p-4"
                style={{
                  background: i === 1 ? `${NEON_GREEN}15` : NAVY_800,
                  border: i === 1 ? `1px solid ${NEON_GREEN}40` : "1px solid transparent",
                }}
              >
                <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>{proj.scenario}</p>
                <p className="text-[20px] font-medium mt-1" style={{ color: i === 1 ? NEON_GREEN : proj.color }}>{proj.amount}</p>
                <div className="mt-2">
                  <div className="h-1.5 rounded-full" style={{ background: NAVY_700 }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: i === 1 ? NEON_GREEN : proj.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${proj.probability}%` }}
                      transition={{ duration: 1, ease: easeOutExpo, delay: 0.9 + i * 0.1 }}
                    />
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: GRAY_500 }}>{proj.probability}% probability</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-start gap-2 rounded-[10px] p-4" style={{ background: NAVY_900 }}>
            <Sparkles size={16} style={{ color: PURPLE, marginTop: 2 }} />
            <p className="text-[15px] italic" style={{ color: "#cbd5e1" }}>{aiInsight}</p>
          </div>
        </motion.div>

        {/* ── Earnings Activity Feed ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.5 }}
          className="rounded-xl p-5 mb-4"
          style={{ background: NAVY_900, border: "1px solid #e4e6eb" }}
        >
          <h3 className="text-[18px] font-semibold text-slate-900 mb-4">Recent Earnings Activity</h3>
          <div className="space-y-0 max-h-[400px] overflow-y-auto pr-2">
            {earningsFeed.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.5 + i * 0.04 }}
                className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${ELECTRIC_BLUE}20` }}
                  >
                    <span className="text-[11px] font-semibold" style={{ color: ELECTRIC_BLUE }}>
                      {item.client.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-slate-900 truncate">{item.client}</p>
                    <p className="text-[12px]" style={{ color: GRAY_500 }}>{item.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-[14px] font-medium text-slate-900">${item.amount.toLocaleString()}</span>
                  <StatusBadge status={item.status} />
                  <span className="text-[12px] hidden sm:block" style={{ color: GRAY_500 }}>{item.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
