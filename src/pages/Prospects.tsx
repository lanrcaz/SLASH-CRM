import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Upload, X, Mail, Phone,
  Calendar, CheckCircle2, Send, PhoneCall, UserCheck, UserX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  prospects, pipelineStages, type Prospect, type ProspectStage,
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const stageOrder: ProspectStage[] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'];

function getScoreColor(score: number) {
  if (score >= 80) return '#6f4bd8';
  if (score >= 50) return '#a89aea';
  return '#cdc4f1';
}

function getScoreLabel(score: number) {
  if (score >= 80) return 'Hot';
  if (score >= 50) return 'Warm';
  return 'Cold';
}

/* ------------------------------------------------------------------ */
/*  AI Score Ring                                                      */
/* ------------------------------------------------------------------ */
function AIScoreRing({ score, size = 32 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Prospect Card                                                      */
/* ------------------------------------------------------------------ */
function ProspectCard({
  prospect,
  onClick,
  onDragStart,
}: {
  prospect: Prospect;
  onClick: () => void;
  onDragStart: () => void;
}) {
  const scoreColor = getScoreColor(prospect.aiScore);

  return (
    <motion.div
      layout
      layoutId={prospect.id}
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-4 cursor-grab active:cursor-grabbing',
        'transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold tracking-tight text-slate-900 truncate">{prospect.company}</p>
          <p className="text-[12px] text-slate-500 truncate">{prospect.name}</p>
        </div>
        <AIScoreRing score={prospect.aiScore} size={28} />
      </div>

      <p className="mt-2 text-[14px] font-semibold text-[#6f4bd8]">
        ${(prospect.value / 1000).toFixed(0)},{String(prospect.value % 1000).padStart(3, '0')}
      </p>

      <div className="mt-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">{prospect.probability}% probability</span>
        </div>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${prospect.probability}%`, backgroundColor: scoreColor }}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: '#f2efff', color: '#6f4bd8', border: '1px solid #e4dffb' }}
        >
          {prospect.source}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: `${scoreColor}1f`, color: scoreColor }}
        >
          {getScoreLabel(prospect.aiScore)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#eceef2] pt-2.5">
        <span className="text-[11px] text-slate-500">{prospect.lastContact}</span>
        <div
          className="flex size-6 items-center justify-center rounded-full text-[9px] font-semibold"
          style={{ background: '#f2efff', color: '#6f4bd8', border: '1px solid #e4dffb' }}
        >
          {prospect.assigneeAvatar}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Prospect Detail Panel                                              */
/* ------------------------------------------------------------------ */
function ProspectDetailPanel({
  prospect,
  onClose,
  onStageChange,
}: {
  prospect: Prospect;
  onClose: () => void;
  onStageChange: (stage: ProspectStage) => void;
}) {
  const scoreColor = getScoreColor(prospect.aiScore);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: easeOutExpo }}
      className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] border-l border-[#e4e6eb] bg-[#ffffff] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#e4e6eb] bg-[#ffffff] px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-slate-900 truncate">{prospect.company}</h2>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-slate-900"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Stage selector */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stageOrder.map((s) => (
            <button
              key={s}
              onClick={() => onStageChange(s)}
              className={cn(
                'rounded-full px-3 py-1 text-[11px] font-medium transition-all',
                prospect.stage === s
                  ? 'text-[#ffffff]'
                  : 'border border-[#e4e6eb] text-slate-400 hover:text-slate-900 hover:border-[#64748b]'
              )}
              style={
                prospect.stage === s
                  ? { backgroundColor: pipelineStages.find((ps) => ps.stage === s)?.color || '#64748b' }
                  : undefined
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-5 flex flex-col gap-6">
        {/* AI Score */}
        <div className="rounded-xl border border-slate-200 bg-[#ffffff] p-5">
          <h3 className="text-[14px] font-semibold text-slate-900 mb-4">AI Score</h3>
          <div className="flex items-center gap-5">
            <AIScoreRing score={prospect.aiScore} size={64} />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-medium text-slate-900">{prospect.aiScore}</span>
                <span className="text-[13px] text-slate-500">/ 100</span>
              </div>
              <span
                className="inline-block mt-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}
              >
                {getScoreLabel(prospect.aiScore)}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {[
              { label: 'Engagement', score: Math.min(100, prospect.aiScore + 5) },
              { label: 'Company Fit', score: Math.min(100, prospect.aiScore - 2) },
              { label: 'Timing', score: Math.min(100, prospect.aiScore + 3) },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-[90px] text-[12px] text-slate-400">{item.label}</span>
                <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.score}%`, backgroundColor: scoreColor }}
                  />
                </div>
                <span className="w-[28px] text-right text-[12px] text-slate-900">{item.score}</span>
              </div>
            ))}
          </div>

          {prospect.aiScore >= 80 && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-[rgba(111,75,216,0.08)] p-3">
              <SparklesIcon className="mt-0.5 size-4 shrink-0 text-[#6f4bd8]" />
              <p className="text-[12px] text-[#6f4bd8]">
                Likely to convert in 14 days based on engagement patterns.
              </p>
            </div>
          )}
        </div>

        {/* Contact Details */}
        <div className="rounded-xl border border-slate-200 bg-[#ffffff] p-5">
          <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Contact Details</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <UserIcon className="size-4 text-slate-500" />
              <span className="text-[13px] text-[#cbd5e1]">{prospect.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-slate-500" />
              <span className="text-[13px] text-[#cbd5e1]">{prospect.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-slate-500" />
              <span className="text-[13px] text-[#cbd5e1]">{prospect.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="size-4 text-slate-500" />
              <span className="text-[13px] text-[#cbd5e1]">Last contact: {prospect.lastContact}</span>
            </div>
          </div>
        </div>

        {/* Value */}
        <div className="rounded-xl border border-slate-200 bg-[#ffffff] p-5">
          <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Deal Value</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-medium text-[#6f4bd8]">
              ${(prospect.value / 1000).toFixed(0)}K
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-slate-400">Probability</span>
              <span className="text-[13px] font-medium text-slate-900">{prospect.probability}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
              <div
                className="h-full rounded-full bg-[#6f4bd8]"
                style={{ width: `${prospect.probability}%` }}
              />
            </div>
          </div>
          <p className="mt-3 text-[12px] text-slate-500">
            Expected value:{' '}
            <span className="text-slate-900 font-medium">
              ${Math.round(prospect.value * (prospect.probability / 100)).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Activity Timeline */}
        <div className="rounded-xl border border-slate-200 bg-[#ffffff] p-5">
          <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Activity</h3>
          <div className="flex flex-col gap-4">
            {[
              { action: 'Initial contact', date: '3 weeks ago', icon: Mail },
              { action: 'Demo completed', date: '2 weeks ago', icon: CheckCircle2 },
              { action: 'Proposal sent', date: '1 week ago', icon: Send },
              { action: 'Follow-up call', date: prospect.lastContact, icon: PhoneCall },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#ffffff]">
                  <activity.icon className="size-3.5 text-slate-500" />
                </div>
                <div>
                  <p className="text-[13px] text-[#cbd5e1]">{activity.action}</p>
                  <p className="text-[11px] text-slate-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-xl border border-slate-200 bg-[#ffffff] p-5">
          <h3 className="text-[14px] font-semibold text-slate-900 mb-3">Notes</h3>
          <p className="text-[13px] text-slate-400 leading-relaxed">{prospect.notes}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] font-semibold">
            <Send className="size-4 mr-2" /> Send Email
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#e4e6eb] text-slate-900 hover:bg-[rgba(255,255,255,0.08)]"
          >
            <PhoneCall className="size-4 mr-2" /> Schedule Call
          </Button>
          <Button className="w-full bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] font-semibold">
            <UserCheck className="size-4 mr-2" /> Convert to Client
          </Button>
          <Button
            variant="ghost"
            className="w-full text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]"
          >
            <UserX className="size-4 mr-2" /> Mark Lost
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add Prospect Modal                                                 */
/* ------------------------------------------------------------------ */
function AddProspectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    value: '', source: 'Website', stage: 'Lead' as ProspectStage,
    assignee: 'Sarah Chen', notes: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    onClose();
    setForm({ name: '', company: '', email: '', phone: '', value: '', source: 'Website', stage: 'Lead', assignee: 'Sarah Chen', notes: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[520px] border-[#e4e6eb] bg-[#ffffff] text-slate-900">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold">Add Prospect</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Company *</label>
              <Input
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder="Company name"
                className="border-[#e4e6eb] bg-[#ffffff] text-slate-900 placeholder:text-slate-600 focus-visible:border-[#6f4bd8]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Contact Name *</label>
              <Input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Full name"
                className="border-[#e4e6eb] bg-[#ffffff] text-slate-900 placeholder:text-slate-600 focus-visible:border-[#6f4bd8]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Email</label>
              <Input
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="contact@company.com"
                className="border-[#e4e6eb] bg-[#ffffff] text-slate-900 placeholder:text-slate-600 focus-visible:border-[#6f4bd8]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Phone</label>
              <Input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="border-[#e4e6eb] bg-[#ffffff] text-slate-900 placeholder:text-slate-600 focus-visible:border-[#6f4bd8]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Estimated Value ($)</label>
              <Input
                value={form.value}
                onChange={(e) => update('value', e.target.value)}
                placeholder="25000"
                className="border-[#e4e6eb] bg-[#ffffff] text-slate-900 placeholder:text-slate-600 focus-visible:border-[#6f4bd8]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Source</label>
              <select
                value={form.source}
                onChange={(e) => update('source', e.target.value)}
                className="w-full rounded-md border border-[#e4e6eb] bg-[#ffffff] px-3 py-2 text-[13px] text-slate-900 outline-none focus:border-[#6f4bd8]"
              >
                {['Website', 'Referral', 'Cold outreach', 'Ad', 'Event', 'Partner', 'Other'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Stage</label>
              <select
                value={form.stage}
                onChange={(e) => update('stage', e.target.value as ProspectStage)}
                className="w-full rounded-md border border-[#e4e6eb] bg-[#ffffff] px-3 py-2 text-[13px] text-slate-900 outline-none focus:border-[#6f4bd8]"
              >
                {stageOrder.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Assigned To</label>
              <select
                value={form.assignee}
                onChange={(e) => update('assignee', e.target.value)}
                className="w-full rounded-md border border-[#e4e6eb] bg-[#ffffff] px-3 py-2 text-[13px] text-slate-900 outline-none focus:border-[#6f4bd8]"
              >
                {['Sarah Chen', 'Marcus Johnson', 'Priya Patel', 'Tom Wright', 'Lisa Park'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-slate-400">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Additional notes..."
              rows={3}
              className="w-full rounded-md border border-[#e4e6eb] bg-[#ffffff] px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-600 outline-none focus:border-[#6f4bd8] resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 hover:bg-[rgba(255,255,255,0.08)]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] font-semibold"
          >
            Add Prospect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter Bar                                                         */
/* ------------------------------------------------------------------ */
function FilterBar({
  search,
  onSearchChange,
  stageFilter,
  onStageFilterChange,
  assigneeFilter,
  onAssigneeFilterChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  stageFilter: string;
  onStageFilterChange: (v: string) => void;
  assigneeFilter: string;
  onAssigneeFilterChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search prospects..."
          className="pl-9 border-[#e4e6eb] bg-[#ffffff] text-slate-900 placeholder:text-slate-600 focus-visible:border-[#6f4bd8]"
        />
      </div>
      <select
        value={stageFilter}
        onChange={(e) => onStageFilterChange(e.target.value)}
        className="rounded-md border border-[#e4e6eb] bg-[#ffffff] px-3 py-2 text-[13px] text-slate-900 outline-none focus:border-[#6f4bd8]"
      >
        <option value="">All Stages</option>
        {stageOrder.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select
        value={assigneeFilter}
        onChange={(e) => onAssigneeFilterChange(e.target.value)}
        className="rounded-md border border-[#e4e6eb] bg-[#ffffff] px-3 py-2 text-[13px] text-slate-900 outline-none focus:border-[#6f4bd8]"
      >
        <option value="">All Assignees</option>
        {['Sarah Chen', 'Marcus Johnson', 'Priya Patel', 'Tom Wright', 'Lisa Park'].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (local to avoid naming conflicts)                            */
/* ------------------------------------------------------------------ */
function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Prospects Page                                                */
/* ------------------------------------------------------------------ */

export default function Prospects() {
  const [prospectList, setProspectList] = useState<Prospect[]>(prospects);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

  /* Drag & drop */
  const handleDragStart = useCallback((id: string) => {
    setDraggedId(id);
  }, []);

  const handleDrop = useCallback(
    (stage: ProspectStage) => {
      if (!draggedId) return;
      setProspectList((prev) =>
        prev.map((p) => (p.id === draggedId ? { ...p, stage } : p))
      );
      setDraggedId(null);
    },
    [draggedId]
  );

  /* Stage change from detail panel */
  const handleStageChange = useCallback((stage: ProspectStage) => {
    if (!selectedProspect) return;
    setProspectList((prev) =>
      prev.map((p) => (p.id === selectedProspect.id ? { ...p, stage } : p))
    );
    setSelectedProspect((prev) => (prev ? { ...prev, stage } : null));
  }, [selectedProspect]);

  /* Filtered prospects */
  const filteredProspects = useMemo(() => {
    return prospectList.filter((p) => {
      const matchesSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase());
      const matchesStage = !stageFilter || p.stage === stageFilter;
      const matchesAssignee = !assigneeFilter || p.assignee === assigneeFilter;
      return matchesSearch && matchesStage && matchesAssignee;
    });
  }, [prospectList, search, stageFilter, assigneeFilter]);

  /* Pipeline summary values */
  const pipelineValue = useMemo(() => {
    return prospectList.reduce((sum, p) => sum + p.value, 0);
  }, [prospectList]);

  const winRate = useMemo(() => {
    const closed = prospectList.filter((p) => p.stage === 'Closed').length;
    return prospectList.length > 0 ? Math.round((closed / prospectList.length) * 100) : 0;
  }, [prospectList]);

  return (
    <div className="min-h-full p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-[36px] font-bold tracking-tight text-slate-900">Prospects</h1>
            <p className="mt-1 text-[15px] text-slate-500">
              {prospectList.length} prospects · ${(pipelineValue / 1000).toFixed(0)}K pipeline value · {winRate}% win rate
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] hover:shadow-[0_0_20px_rgba(111,75,216,0.3)] font-semibold"
            >
              <Plus className="size-4 mr-1.5" /> Add Prospect
            </Button>
            <Button
              variant="outline"
              className="border-[#e4e6eb] text-slate-400 hover:text-slate-900 hover:bg-[rgba(255,255,255,0.08)]"
            >
              <Upload className="size-4 mr-1.5" /> Import
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Pipeline Summary Bar */}
      <motion.div
        variants={{
          animate: { transition: { staggerChildren: 0.08 } },
        }}
        initial="initial"
        animate="animate"
        className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5"
      >
        {pipelineStages.map((ps) => {
          const count = prospectList.filter((p) => p.stage === ps.stage).length;
          const value = prospectList
            .filter((p) => p.stage === ps.stage)
            .reduce((s, p) => s + p.value, 0);

          return (
            <motion.div
              key={ps.stage}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } },
              }}
              className="rounded-xl border border-slate-200 bg-[#ffffff] p-5"
              style={{ borderTop: `2px solid ${ps.color}` }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate-500">{ps.stage}</p>
              <p className="mt-1 text-[20px] font-medium text-slate-900">{count}</p>
              <p className="text-[12px] text-slate-500">${(value / 1000).toFixed(0)}K</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filter Bar */}
      <motion.div {...fadeSlideUp(0.25)} className="mt-6">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          stageFilter={stageFilter}
          onStageFilterChange={setStageFilter}
          assigneeFilter={assigneeFilter}
          onAssigneeFilterChange={setAssigneeFilter}
        />
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        variants={{
          animate: { transition: { staggerChildren: 0.1 } },
        }}
        initial="initial"
        animate="animate"
        className="mt-6 flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#e4e6eb transparent' }}
      >
        {pipelineStages.map((ps) => {
          const stageProspects = filteredProspects.filter((p) => p.stage === ps.stage);

          return (
            <motion.div
              key={ps.stage}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
              }}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
              onDrop={(e: React.DragEvent) => {
                e.preventDefault();
                handleDrop(ps.stage);
              }}
              className={cn(
                'flex-shrink-0 min-w-[280px] w-[300px] rounded-xl p-3 transition-colors',
                draggedId ? 'bg-[#f2efff]/40' : 'bg-transparent'
              )}
            >
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: ps.color }} />
                  <span className="text-[14px] font-semibold tracking-tight text-slate-900">{ps.stage}</span>
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500">
                    {stageProspects.length}
                  </span>
                </div>
                <button className="flex size-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Column Value */}
              <p className="mb-3 px-1 text-[12px] font-normal text-slate-500">
                ${(stageProspects.reduce((s, p) => s + p.value, 0) / 1000).toFixed(0)}K total
              </p>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                <AnimatePresence mode="popLayout">
                  {stageProspects.map((prospect) => (
                    <ProspectCard
                      key={prospect.id}
                      prospect={prospect}
                      onClick={() => setSelectedProspect(prospect)}
                      onDragStart={() => handleDragStart(prospect.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add Prospect Modal */}
      <AddProspectModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />

      {/* Prospect Detail Panel */}
      <AnimatePresence>
        {selectedProspect && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setSelectedProspect(null)}
            />
            <ProspectDetailPanel
              prospect={selectedProspect}
              onClose={() => setSelectedProspect(null)}
              onStageChange={handleStageChange}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
