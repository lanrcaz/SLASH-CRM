import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { format, parseISO } from 'date-fns';
import {
  LogOut,
  CheckCircle2,
  Clock,
  Database,
  Flag,
  Download,
  MessageSquare,
  Lock,
  CheckCircle,
  MoreVertical,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Search,
  AlertTriangle,
  Star,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  FileArchive,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  activeOffboardings,
  completedOffboardings,
  churnReasons,
} from '@/mocks/lifecycleMock';
import type { OffboardingClient, OffboardingStep } from '@/mocks/lifecycleMock';

// ─── Animation Variants ────────────────────────────────────────────────

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

const fadeSlideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
};

const tableRowEntrance = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeOutExpo } },
};

// ─── Helpers ───────────────────────────────────────────────────────────

function Avatar({ initials, size = 44 }: { initials: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-[#6f4bd8]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: '#f2efff',
        border: '1px solid #e4dffb',
      }}
    >
      {initials}
    </div>
  );
}

function StepIcon({ step, size = 16, className }: { step: OffboardingStep; size?: number; className?: string }) {
  switch (step.icon) {
    case 'Flag': return <Flag size={size} className={className} />;
    case 'Download': return <Download size={size} className={className} />;
    case 'MessageSquare': return <MessageSquare size={size} className={className} />;
    case 'Lock': return <Lock size={size} className={className} />;
    case 'CheckCircle': return <CheckCircle size={size} className={className} />;
    default: return <CheckCircle size={size} className={className} />;
  }
}

// ─── KPI Card ──────────────────────────────────────────────────────────

function KPICard({
  icon: Icon,
  iconColor,
  value,
  suffix,
  sub,
  index,
}: {
  icon: React.ElementType;
  iconColor: string;
  value: number;
  suffix?: string;
  sub: string;
  index: number;
}) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className="bg-[#ffffff] rounded-xl p-6 border border-slate-200 hover:border-[rgba(245,158,11,0.2)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[32px] font-medium text-slate-900 tracking-tight leading-none">
            <CountUp end={value} duration={1.2} suffix={suffix || ''} />
          </p>
          <p className="text-[13px] mt-2 text-slate-500">{sub}</p>
        </div>
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step Tracker (Horizontal) ─────────────────────────────────────────

function OffboardingStepTracker({ steps, currentStep }: { steps: OffboardingStep[]; currentStep: number }) {
  return (
    <div className="mt-5 relative">
      {/* Background connector */}
      <div className="absolute top-[16px] left-[4%] right-[4%] h-[2px] bg-[#e4e6eb] rounded-full" />
      {/* Active connector */}
      <div
        className="absolute top-[16px] left-[4%] h-[2px] rounded-full bg-[#6f4bd8] transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 92}%` }}
      />

      <div className="flex items-start justify-between relative">
        {steps.map((step, i) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.4, ease: easeSpring }}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? 'bg-[#6f4bd8] border-[#6f4bd8]'
                    : isCurrent
                      ? 'bg-[#ffffff] border-[#6f4bd8]'
                      : 'bg-[#ffffff] border-[#e4e6eb]'
                }`}
              >
                {isCompleted ? (
                  <Check size={14} className="text-[#ffffff]" />
                ) : isCurrent ? (
                  <StepIcon step={step} size={14} className="text-[#6f4bd8]" />
                ) : (
                  <StepIcon step={step} size={14} className="text-[#9aa0a6]" />
                )}
              </motion.div>
              <span
                className={`mt-2 text-[10px] font-medium max-w-[60px] text-center leading-tight ${
                  isCompleted ? 'text-[#6f4bd8]' : isCurrent ? 'text-[#6f4bd8]' : 'text-slate-500'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step Detail Panel ─────────────────────────────────────────────────

function StepDetailPanel({ client }: { client: OffboardingClient }) {
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [recommendValue, setRecommendValue] = useState<'yes' | 'no' | 'maybe' | null>(null);

  return (
    <div className="mt-4 space-y-2">
      {/* Data Export Panel */}
      {client.currentStep === 2 && (
        <div className="bg-[#ffffff] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Export Summary</p>
              <p className="text-[12px] text-slate-500">450MB across 156 files</p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[rgba(59,130,246,0.15)] text-[#3b82f6]">
              CSV + JSON + Attachments
            </span>
          </div>
          <div className="space-y-2">
            {[
              { category: 'Client Data', size: '12MB', files: 24, status: 'Exported' },
              { category: 'Communications', size: '156MB', files: 89, status: 'Exported' },
              { category: 'Documents', size: '245MB', files: 34, status: 'Exported' },
              { category: 'Analytics', size: '37MB', files: 9, status: 'Exported' },
            ].map((row, i) => (
              <motion.div
                key={row.category}
                variants={tableRowEntrance}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-2 border-b border-[#e4e6eb] last:border-0"
              >
                <div className="flex items-center gap-2">
                  <FileArchive size={14} className="text-slate-500" />
                  <span className="text-[13px] text-slate-900">{row.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[12px] text-slate-500">{row.size}</span>
                  <span className="text-[12px] text-slate-500">{row.files} files</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.15)] text-[#22c55e]">
                    {row.status} <Check size={10} className="inline" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="mt-3 text-[12px] text-[#3b82f6] hover:text-[#6f4bd8] transition-colors">
            Download full export (ZIP)
          </button>
        </div>
      )}

      {/* Feedback Panel */}
      {client.currentStep === 3 && (
        <div className="bg-[#ffffff] rounded-xl p-4 space-y-4">
          <div>
            <label className="text-[12px] text-slate-400 mb-2 block">Exit Reason</label>
            <select className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 px-3 text-[14px] text-slate-900 focus:border-[#f59e0b] focus:outline-none transition-colors">
              <option>Select reason</option>
              <option>Moving in-house</option>
              <option>Budget cuts</option>
              <option>Service no longer needed</option>
              <option>Switching provider</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] text-slate-400 mb-2 block">Satisfaction Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedbackRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={22}
                    className={star <= feedbackRating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-slate-500'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] text-slate-400 mb-2 block">What went well?</label>
            <textarea
              rows={2}
              placeholder="Share what worked well..."
              className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 px-3 text-[14px] text-slate-900 placeholder:text-slate-500 focus:border-[#f59e0b] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-[12px] text-slate-400 mb-2 block">What could we improve?</label>
            <textarea
              rows={2}
              placeholder="Share areas for improvement..."
              className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 px-3 text-[14px] text-slate-900 placeholder:text-slate-500 focus:border-[#f59e0b] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-[12px] text-slate-400 mb-2 block">Would you recommend us?</label>
            <div className="flex items-center gap-2">
              {(['yes', 'maybe', 'no'] as const).map((val) => (
                <button
                  key={val}
                  onClick={() => setRecommendValue(val)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] transition-all ${
                    recommendValue === val
                      ? 'border-[#f59e0b] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]'
                      : 'border-[#e4e6eb] text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {val === 'yes' && <ThumbsUp size={12} />}
                  {val === 'no' && <ThumbsDown size={12} />}
                  {val === 'maybe' && <HelpCircle size={12} />}
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-[#f59e0b] text-[#ffffff] font-semibold text-[13px] hover:bg-[#d97706] transition-colors">
            Save Feedback
          </button>
        </div>
      )}

      {/* Access Revocation Panel */}
      {client.currentStep === 4 && (
        <div className="bg-[#ffffff] rounded-xl p-4">
          <p className="text-[14px] font-semibold text-slate-900 mb-3">Access Checklist</p>
          <div className="space-y-2">
            {[
              { resource: 'Dashboard Access', status: 'Revoked', action: 'View log' },
              { resource: 'API Keys', status: 'Revoked', action: 'Regenerate available' },
              { resource: 'File Storage', status: 'Revoked', action: '30-day retention' },
              { resource: 'Email Forwarding', status: 'Pending', action: 'Revoke now' },
              { resource: 'Third-party Integrations', status: 'Pending', action: 'Disconnect' },
              { resource: 'Team Member Access', status: 'Revoked', action: 'View log' },
            ].map((item, i) => {
              const isRevoked = item.status === 'Revoked';
              return (
                <motion.div
                  key={item.resource}
                  variants={tableRowEntrance}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-[#e4e6eb] last:border-0"
                >
                  <span className="text-[13px] text-slate-900">{item.resource}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                      isRevoked
                        ? 'bg-[rgba(34,197,94,0.15)] text-[#22c55e]'
                        : 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b]'
                    }`}>
                      {item.status}
                    </span>
                    <button className="text-[11px] text-[#3b82f6] hover:text-[#6f4bd8] transition-colors">
                      {item.action}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Final Review Panel */}
      {client.currentStep === 5 && (
        <div className="bg-[#ffffff] rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#22c55e]" />
            <span className="text-[14px] font-semibold text-slate-900">Compliance Verification</span>
          </div>

          <div className="space-y-2">
            {[
              'GDPR data processing agreement terminated',
              'CCPA data deletion request completed',
              'Data retention policy: 30 days',
              'All client data exported and verified',
              'Access revoked across all systems',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={14} className="text-[#22c55e]" />
                <span className="text-[13px] text-[#cbd5e1]">{item}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e4e6eb] pt-3">
            <p className="text-[12px] text-slate-400 mb-2">Automated farewell email preview:</p>
            <div className="bg-[#ffffff] rounded-lg p-3 text-[12px] text-slate-400 italic">
              "Thank you for being a valued client. Your offboarding is now complete. All data has been securely exported and access has been revoked. We wish you the best in your future endeavors."
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-[#22c55e] text-slate-900 font-semibold text-[13px] hover:bg-[#16a34a] transition-colors">
            Confirm Final Review
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Offboarding Card ──────────────────────────────────────────────────

function OffboardingCard({ client, index }: { client: OffboardingClient; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const daysLeft = Math.ceil(
    (new Date(client.expectedCompletion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className={`bg-[#ffffff] rounded-xl p-6 border mb-4 transition-all duration-200 ${
        client.urgent
          ? 'border-l-[3px] border-l-[#ef4444] border-slate-200'
          : 'border-l-[3px] border-l-[#f59e0b] border-slate-200'
      }`}
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar initials={client.avatar} />
          <div>
            <h3 className="text-[18px] font-semibold text-slate-900">{client.clientName}</h3>
            <p className="text-[13px] text-slate-500">
              Offboarding started {format(parseISO(client.startDate), 'MMM d')} · Est. complete: {format(parseISO(client.expectedCompletion), 'MMM d')}
            </p>
          </div>
          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[rgba(245,158,11,0.15)] text-[#f59e0b] border border-[rgba(245,158,11,0.3)]">
            Step {client.currentStep} of 5
          </span>
          {client.urgent && (
            <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.3)]">
              Completing in 1 day
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#22c55e]" />
            <span className="text-[12px] text-[#22c55e]">{client.compliance}</span>
          </div>
          <span className="text-[12px] text-slate-400">{daysLeft > 0 ? `${daysLeft} days left` : 'Completing today'}</span>
          <button className="p-1.5 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            <MoreVertical size={16} className="text-slate-500" />
          </button>
        </div>
      </div>

      {/* Reason */}
      <p className="mt-2 text-[12px] text-slate-400">
        Reason: <span className="text-[#cbd5e1]">{client.reason}</span>
        {client.notes && <span className="block mt-0.5 text-slate-500">{client.notes}</span>}
      </p>

      {/* Step Tracker */}
      <OffboardingStepTracker steps={client.steps} currentStep={client.currentStep} />

      {/* Expand step details */}
      <div className="mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-900 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide' : 'Show'} step details
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: easeSmooth }}
              className="overflow-hidden"
            >
              <StepDetailPanel client={client} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Completed Offboardings Table ──────────────────────────────────────

function CompletedTable() {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      className="bg-[#ffffff] rounded-xl border border-slate-200 overflow-hidden"
    >
      <div className="p-6 border-b border-[#e4e6eb]">
        <h3 className="text-[18px] font-semibold text-slate-900">Completed Exits</h3>
        <p className="text-[13px] text-slate-500 mt-0.5">Recently offboarded clients</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e4e6eb]">
              <th className="text-left px-6 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Client</th>
              <th className="text-left px-6 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Duration</th>
              <th className="text-left px-6 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Reason</th>
              <th className="text-left px-6 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Satisfaction</th>
              <th className="text-left px-6 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Data Exported</th>
              <th className="text-left px-6 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {completedOffboardings.map((row, i) => (
              <motion.tr
                key={row.id}
                variants={tableRowEntrance}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.04 }}
                className="border-b border-[#e4e6eb] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar initials={row.clientName.substring(0, 2).toUpperCase()} size={32} />
                    <span className="text-[14px] text-slate-900 font-medium">{row.clientName}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-[13px] text-[#cbd5e1]">{row.duration}</td>
                <td className="px-6 py-3.5 text-[13px] text-[#cbd5e1]">{row.reason}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
                    <span className="text-[13px] text-slate-900">{row.satisfaction}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-[13px] text-[#cbd5e1]">{row.dataExported}</td>
                <td className="px-6 py-3.5 text-[13px] text-slate-500">{format(parseISO(row.offboardDate), 'MMM d, yyyy')}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Churn Analysis Chart ──────────────────────────────────────────────

function ChurnAnalysis() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = churnReasons.reduce((sum, r) => sum + r.count, 0);

  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      className="bg-[#ffffff] rounded-xl p-6 border border-slate-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[18px] font-semibold text-slate-900">Churn Analysis</h3>
          <p className="text-[13px] text-slate-500 mt-0.5">Exit reasons breakdown</p>
        </div>
        <div className="text-right">
          <p className="text-[28px] font-medium text-[#f59e0b] leading-none">
            <CountUp end={2.4} decimals={1} suffix="%" duration={1.2} />
          </p>
          <p className="text-[11px] text-slate-500 mt-1">30-day churn rate</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={churnReasons}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                dataKey="count"
                stroke="none"
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {churnReasons.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e6eb',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2.5">
          {churnReasons.map((reason) => (
            <div key={reason.reason} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: reason.color }} />
              <span className="text-[12px] text-[#cbd5e1] flex-1">{reason.reason}</span>
              <span className="text-[12px] text-slate-900 font-medium">{reason.count}</span>
              <span className="text-[11px] text-slate-500 w-10 text-right">
                {Math.round((reason.count / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Start Offboarding Wizard ──────────────────────────────────────────

function OffboardingWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState('');
  const [reason, setReason] = useState('');
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);
  const [exportFormat, setExportFormat] = useState('Both');
  const [retention, setRetention] = useState('30 days');
  const [confirmed, setConfirmed] = useState(false);
  const [started, setStarted] = useState(false);

  const totalSteps = 3;

  if (started) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#ffffff] rounded-xl p-10 text-center max-w-[560px] w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ duration: 0.6, ease: easeSpring }}
        >
          <CheckCircle2 size={56} className="text-[#f59e0b] mx-auto mb-4" />
        </motion.div>
        <h3 className="text-[22px] font-semibold text-slate-900 mb-2">Offboarding started</h3>
        <p className="text-[15px] text-slate-400 mb-2">
          The exit workflow has been initiated for the selected client.
        </p>
        <p className="text-[13px] text-slate-500 mb-6">
          Estimated completion: 5 days
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl bg-[#f59e0b] text-[#ffffff] font-semibold text-[13px] hover:bg-[#d97706] transition-colors"
        >
          View Progress
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#ffffff] rounded-xl max-w-[560px] w-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#e4e6eb] flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-slate-900">Start Offboarding</h3>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors">
          <X size={18} className="text-slate-500" />
        </button>
      </div>

      {/* Warning banner */}
      <div className="mx-6 mt-4 px-3 py-2.5 rounded-lg bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] flex items-center gap-2">
        <AlertTriangle size={14} className="text-[#f59e0b] flex-shrink-0" />
        <span className="text-[12px] text-[#f59e0b]">This will begin the exit workflow for this client.</span>
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-5 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${
                i + 1 < step ? 'bg-[#6f4bd8] text-[#ffffff]' :
                i + 1 === step ? 'bg-[#f59e0b] text-[#ffffff]' : 'bg-[#e4e6eb] text-slate-500'
              }`}
            >
              {i + 1 < step ? <Check size={14} /> : i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div className={`flex-1 h-[2px] rounded-full ${i + 1 < step ? 'bg-[#6f4bd8]' : 'bg-[#e4e6eb]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
          >
            {/* Step 1: Select Client */}
            {step === 1 && (
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Select Client</h4>
                <p className="text-[13px] text-slate-500 mb-4">Choose an active client to offboard</p>

                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search active clients..."
                    className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 pl-10 pr-4 text-[14px] text-slate-900 placeholder:text-slate-500 focus:border-[#f59e0b] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  {['Apex Industries', 'Blue Ridge Corp', 'Catalyst Health'].map((name) => (
                    <button
                      key={name}
                      onClick={() => setSelectedClient(name)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        selectedClient === name
                          ? 'border-[#f59e0b] bg-[rgba(245,158,11,0.05)]'
                          : 'border-transparent bg-[#ffffff] hover:bg-[#e4e6eb]'
                      }`}
                    >
                      <Avatar initials={name.substring(0, 2).toUpperCase()} size={36} />
                      <span className="text-[14px] text-slate-900 font-medium">{name}</span>
                      {selectedClient === name && <Check size={16} className="text-[#f59e0b] ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Configure */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] text-slate-400 mb-1.5 block">Offboarding Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 px-3 text-[14px] text-slate-900 focus:border-[#f59e0b] focus:outline-none transition-colors"
                  >
                    <option value="">Select reason</option>
                    <option value="contract">Contract ended</option>
                    <option value="inhouse">Moving in-house</option>
                    <option value="budget">Budget cuts</option>
                    <option value="switching">Switching provider</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 mb-1.5 block">Request Feedback</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFeedbackEnabled(!feedbackEnabled)}
                      className={`w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                        feedbackEnabled ? 'bg-[#f59e0b]' : 'bg-[#e4e6eb]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                          feedbackEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-[13px] text-[#cbd5e1]">Send exit survey to client</span>
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 mb-1.5 block">Data Export Format</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['CSV', 'JSON', 'Both', 'Full Archive'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setExportFormat(fmt)}
                        className={`py-2 rounded-lg border text-[12px] transition-all ${
                          exportFormat === fmt
                            ? 'border-[#f59e0b] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]'
                            : 'border-[#e4e6eb] text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 mb-1.5 block">Retention Period</label>
                  <div className="flex items-center gap-2">
                    {(['30 days', '60 days', '90 days'] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setRetention(period)}
                        className={`px-4 py-2 rounded-lg border text-[12px] transition-all ${
                          retention === period
                            ? 'border-[#f59e0b] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]'
                            : 'border-[#e4e6eb] text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Confirm Offboarding</h4>
                <p className="text-[13px] text-slate-500 mb-4">Review all settings before proceeding</p>

                <div className="bg-[#ffffff] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Client</span>
                    <span className="text-[14px] text-slate-900">{selectedClient || 'Not selected'}</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Reason</span>
                    <span className="text-[14px] text-slate-900">{reason || 'Not specified'}</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Export Format</span>
                    <span className="text-[14px] text-slate-900">{exportFormat}</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Retention</span>
                    <span className="text-[14px] text-slate-900">{retention}</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Exit Survey</span>
                    <span className="text-[14px] text-slate-900">{feedbackEnabled ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <button
                    onClick={() => setConfirmed(!confirmed)}
                    className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                      confirmed ? 'bg-[#f59e0b] border-[#f59e0b]' : 'border-[#64748b]'
                    }`}
                  >
                    {confirmed && <Check size={12} className="text-[#ffffff]" />}
                  </button>
                  <span className="text-[13px] text-[#cbd5e1]">
                    I understand this will revoke all client access and begin the exit workflow.
                  </span>
                </label>

                <button
                  onClick={() => setStarted(true)}
                  disabled={!confirmed}
                  className="w-full py-3 rounded-xl bg-[#f59e0b] text-[#ffffff] font-semibold text-[14px] hover:bg-[#d97706] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <LogOut size={16} /> Begin Offboarding
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!started && (
        <div className="p-6 border-t border-[#e4e6eb] flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="text-[13px] text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          {step < totalSteps && (
            <button
              onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
              className="px-5 py-2 rounded-xl bg-[#f59e0b] text-[#ffffff] font-semibold text-[13px] hover:bg-[#d97706] transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export default function Offboarding() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'settings'>('active');
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    if (showWizard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showWizard]);

  return (
    <div className="min-h-[100dvh]">
      {/* ─── Header ───────────────────────────────────────────────── */}
      <motion.section
        variants={fadeSlideDown}
        initial="hidden"
        animate="visible"
        className="px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-[36px] font-bold text-slate-900 tracking-tight leading-tight">Offboarding</h1>
          <p className="text-[15px] text-slate-500 mt-1">
            {activeOffboardings.length} active offboardings · 2 completed this month · Avg. 5 days
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f59e0b] text-[#ffffff] font-semibold text-[13px] hover:bg-[#d97706] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <LogOut size={16} /> Start Offboarding
          </button>
        </div>
      </motion.section>

      {/* ─── KPI Cards ────────────────────────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <KPICard icon={LogOut} iconColor="#f59e0b" value={3} sub="In progress" index={0} />
        <KPICard icon={CheckCircle2} iconColor="#6f4bd8" value={2} sub="All compliant" index={1} />
        <KPICard icon={Clock} iconColor="#5f6368" value={5} suffix=" days" sub="From start to complete" index={2} />
        <KPICard icon={Database} iconColor="#3b82f6" value={1.2} suffix="GB" sub="Total client data exported" index={3} />
      </motion.section>

      {/* ─── View Toggle ──────────────────────────────────────────── */}
      <section className="px-6 mb-6">
        <div className="flex items-center gap-6 border-b border-[#e4e6eb]">
          {(['active', 'completed', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-medium transition-colors relative ${
                activeTab === tab ? 'text-slate-900' : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="offboarding-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f59e0b] rounded-full"
                  transition={{ duration: 0.2, ease: easeSmooth }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────────── */}
      <section className="px-6 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeOffboardings.map((client, i) => (
                <OffboardingCard key={client.id} client={client} index={i} />
              ))}

              {/* Churn Analysis */}
              <div className="mt-8">
                <ChurnAnalysis />
              </div>
            </motion.div>
          )}

          {activeTab === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <CompletedTable />
              <ChurnAnalysis />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#ffffff] rounded-xl p-8 border border-slate-200"
            >
              <h3 className="text-[18px] font-semibold text-slate-900 mb-2">Offboarding Settings</h3>
              <p className="text-[13px] text-slate-500 mb-6">Configure default offboarding behavior</p>

              <div className="space-y-6 max-w-[480px]">
                <div>
                  <label className="text-[12px] text-slate-400 mb-2 block">Default Retention Period</label>
                  <div className="flex items-center gap-2">
                    {(['30 days', '60 days', '90 days'] as const).map((period) => (
                      <button
                        key={period}
                        className={`px-4 py-2 rounded-lg border text-[12px] transition-all border-[#f59e0b] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 mb-2 block">Auto-export Format</label>
                  <div className="flex items-center gap-2">
                    {['CSV', 'JSON', 'Both'].map((fmt) => (
                      <button
                        key={fmt}
                        className="px-4 py-2 rounded-lg border text-[12px] border-[#f59e0b] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]"
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 mb-2 block">Automated Actions</label>
                  <div className="space-y-2">
                    {[
                      'Send farewell email automatically',
                      'Request feedback survey',
                      'Revoke API keys on completion',
                      'Delete data after retention period',
                    ].map((action) => (
                      <label key={action} className="flex items-center gap-3 cursor-pointer">
                        <div className="w-5 h-5 rounded bg-[#f59e0b] flex items-center justify-center">
                          <Check size={12} className="text-[#ffffff]" />
                        </div>
                        <span className="text-[13px] text-[#cbd5e1]">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="px-6 py-2.5 rounded-xl bg-[#f59e0b] text-[#ffffff] font-semibold text-[13px] hover:bg-[#d97706] transition-colors">
                  Save Settings
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── Wizard Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showWizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,14,39,0.8)] backdrop-blur-sm p-4"
            onClick={(e: React.MouseEvent) => { if (e.target === e.currentTarget) setShowWizard(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeSpring }}
            >
              <OffboardingWizard onClose={() => setShowWizard(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
