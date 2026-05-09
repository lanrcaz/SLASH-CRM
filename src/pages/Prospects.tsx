import { useMemo, useState } from 'react';
import type { DragEvent } from 'react';
import {
  ArrowUpRight,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Filter,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Send,
  Sparkles,
  Upload,
  UserCheck,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  pipelineStages,
  prospects,
  type Prospect,
  type ProspectStage,
} from '@/mocks/dashboardMock';

const stageOrder: ProspectStage[] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'];
const sources = ['Website', 'Referral', 'Cold outreach', 'Ad', 'Event', 'Partner'];
const assignees = ['Sarah Chen', 'Marcus Johnson', 'Priya Patel', 'Tom Wright', 'Lisa Park'];

type ViewMode = 'board' | 'table' | 'intake';

type ProspectForm = {
  company: string;
  name: string;
  email: string;
  phone: string;
  value: string;
  source: string;
  assignee: string;
  notes: string;
};

function getScoreColor(score: number) {
  if (score >= 80) return '#1f8f55';
  if (score >= 55) return '#b97010';
  return '#c2413d';
}

function getScoreLabel(score: number) {
  if (score >= 80) return 'Hot';
  if (score >= 55) return 'Warm';
  return 'Cold';
}

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

function scoreTone(score: number) {
  if (score >= 80) return 'border-[#b6dec8] bg-[#eef9f3] text-[#1f8f55]';
  if (score >= 55) return 'border-[#f1d6aa] bg-[#fff6e8] text-[#b97010]';
  return 'border-[#f0b7b4] bg-[#fff0ef] text-[#c2413d]';
}

function MetricCard({
  label,
  value,
  detail,
  tone = 'purple',
}: {
  label: string;
  value: string;
  detail: string;
  tone?: 'purple' | 'green' | 'amber' | 'gray';
}) {
  const toneClasses = {
    purple: 'bg-[#f2efff] text-[#6f4bd8]',
    green: 'bg-[#eef9f3] text-[#1f8f55]',
    amber: 'bg-[#fff6e8] text-[#b97010]',
    gray: 'bg-[#f1f2f5] text-[#575d67]',
  };

  return (
    <div className="rounded-lg border border-[#dfe2e8] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(32,33,36,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[#737984]">{label}</p>
        <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-bold', toneClasses[tone])}>
          Live
        </span>
      </div>
      <p className="mt-2 text-[27px] font-semibold leading-none text-[#24262c]">{value}</p>
      <p className="mt-1.5 text-[12px] text-[#747984]">{detail}</p>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-[150px] appearance-none rounded-md border border-[#cbd0da] bg-white px-3 pr-9 text-[13px] font-semibold text-[#3f444c] outline-none transition focus:border-[#6f4bd8] focus:ring-2 focus:ring-[#6f4bd8]/15"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#69707a]" />
    </label>
  );
}

function ProspectScore({ score }: { score: number }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold', scoreTone(score))}>
      {score} · {getScoreLabel(score)}
    </span>
  );
}

function BoardCard({
  prospect,
  onSelect,
  onDragStart,
}: {
  prospect: Prospect;
  onSelect: () => void;
  onDragStart: () => void;
}) {
  return (
    <button
      draggable
      onDragStart={onDragStart}
      onClick={onSelect}
      className="w-full cursor-grab rounded-md border border-[#dfe2e8] bg-white p-3 text-left shadow-[0_1px_2px_rgba(32,33,36,0.05)] transition hover:border-[#b8b0fb] hover:bg-[#fbfaff] active:cursor-grabbing"
      style={{ borderLeft: `3px solid ${getScoreColor(prospect.aiScore)}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-bold text-[#303238]">{prospect.company}</p>
          <p className="truncate text-[12px] text-[#747984]">{prospect.name}</p>
        </div>
        <ProspectScore score={prospect.aiScore} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[15px] font-bold text-[#303238]">{formatMoney(prospect.value)}</p>
        <span className="rounded-full bg-[#f1f2f5] px-2 py-0.5 text-[11px] font-semibold text-[#575d67]">
          {prospect.probability}%
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6e9ef]">
        <div
          className="h-full rounded-full bg-[#6f4bd8]"
          style={{ width: `${prospect.probability}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#eceef2] pt-2.5">
        <span className="text-[11px] text-[#747984]">{prospect.source}</span>
        <span className="flex size-6 items-center justify-center rounded-full bg-[#f2efff] text-[9px] font-bold text-[#6f4bd8]">
          {prospect.assigneeAvatar}
        </span>
      </div>
    </button>
  );
}

function ProspectTable({
  rows,
  onSelect,
}: {
  rows: Prospect[];
  onSelect: (prospect: Prospect) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] text-left">
        <thead>
          <tr className="border-b border-[#eceef2] bg-[#fafbfc] text-[12px] font-bold text-[#575d67]">
            <th className="px-5 py-3">Company</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Source</th>
            <th className="px-5 py-3">Assigned by</th>
            <th className="px-5 py-3">AI score</th>
            <th className="px-5 py-3">Value</th>
            <th className="px-5 py-3">Last contact</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eceef2]">
          {rows.map((prospect) => (
            <tr key={prospect.id} className="text-[14px] hover:bg-[#fafbfc]">
              <td className="px-5 py-3">
                <button onClick={() => onSelect(prospect)} className="flex items-center gap-3 text-left">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#f2efff] text-[11px] font-bold text-[#6f4bd8]">
                    {prospect.company.slice(0, 2).toUpperCase()}
                  </span>
                  <span>
                    <span className="block font-bold text-[#303238]">{prospect.company}</span>
                    <span className="text-[12px] text-[#747984]">{prospect.email}</span>
                  </span>
                </button>
              </td>
              <td className="px-5 py-3">
                <span className="rounded-md border border-[#d8dbe3] bg-[#f7f8fb] px-2.5 py-1 text-[12px] font-bold text-[#575d67]">
                  {prospect.stage}
                </span>
              </td>
              <td className="px-5 py-3 text-[#575d67]">{prospect.source}</td>
              <td className="px-5 py-3 text-[#575d67]">{prospect.assignee}</td>
              <td className="px-5 py-3"><ProspectScore score={prospect.aiScore} /></td>
              <td className="px-5 py-3 font-bold text-[#303238]">{formatMoney(prospect.value)}</td>
              <td className="px-5 py-3 text-[#747984]">{prospect.lastContact}</td>
              <td className="px-5 py-3 text-right">
                <button
                  onClick={() => onSelect(prospect)}
                  className="rounded-md border border-[#d9dde6] p-2 text-[#4f5661] transition hover:bg-[#f3f4f7]"
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IntakePanel({ onCreate }: { onCreate: () => void }) {
  const intakeRows = [
    { source: 'Google Search Console', leads: 18, status: 'Ready to qualify', owner: 'SEO queue' },
    { source: 'Website form', leads: 7, status: 'New submissions', owner: 'Sarah Chen' },
    { source: 'Referral partners', leads: 5, status: 'Warm introductions', owner: 'Marcus Johnson' },
    { source: 'Manual CSV import', leads: 42, status: 'Needs dedupe', owner: 'Ops' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
      <section className="workspace-panel rounded-lg">
        <div className="flex items-start justify-between border-b border-[#eceef2] px-5 py-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#303238]">Lead intake sources</h2>
            <p className="text-[13px] text-[#6f747d]">Free-first lead sources we can connect before paid enrichment APIs.</p>
          </div>
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-md bg-[#6f4bd8] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#5f3fd0]"
          >
            <Plus className="size-4" /> Add lead
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-[#eceef2] bg-[#fafbfc] text-[12px] font-bold text-[#575d67]">
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Open leads</th>
                <th className="px-5 py-3">Workflow status</th>
                <th className="px-5 py-3">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef2]">
              {intakeRows.map((row) => (
                <tr key={row.source} className="text-[14px]">
                  <td className="px-5 py-3 font-bold text-[#303238]">{row.source}</td>
                  <td className="px-5 py-3 text-[#575d67]">{row.leads}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-md border border-[#d8dbe3] bg-[#f7f8fb] px-2.5 py-1 text-[12px] font-bold text-[#575d67]">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#575d67]">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="workspace-panel rounded-lg p-5">
        <div className="flex size-11 items-center justify-center rounded-md bg-[#f2efff] text-[#6f4bd8]">
          <Bot className="size-5" />
        </div>
        <h3 className="mt-4 text-[18px] font-bold text-[#303238]">Free SEO lead workflow</h3>
        <p className="mt-2 text-[13px] leading-6 text-[#6f747d]">
          Start with Search Console queries, landing-page form submissions, CSV imports, and a dedupe queue. Paid APIs can be added later only when the free signal is not enough.
        </p>
        <div className="mt-4 space-y-2">
          {['Import query winners', 'Match company domains', 'Score lead intent', 'Assign follow-up task'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[13px] font-semibold text-[#3f444c]">
              <CheckCircle2 className="size-4 text-[#1f8f55]" />
              {item}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function ProspectDrawer({
  prospect,
  onClose,
  onStageChange,
}: {
  prospect: Prospect;
  onClose: () => void;
  onStageChange: (stage: ProspectStage) => void;
}) {
  const expectedValue = Math.round(prospect.value * (prospect.probability / 100));

  return (
    <>
      <button className="fixed inset-0 z-40 bg-[#202124]/25" onClick={onClose} aria-label="Close prospect details" />
      <aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[460px] overflow-y-auto border-l border-[#dfe2e8] bg-white shadow-[-16px_0_40px_rgba(32,33,36,0.14)]">
        <div className="sticky top-0 z-10 border-b border-[#eceef2] bg-white px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-[22px] font-bold text-[#303238]">{prospect.company}</h2>
              <p className="text-[13px] text-[#747984]">{prospect.name} · {prospect.source}</p>
            </div>
            <button onClick={onClose} className="rounded-md border border-[#d9dde6] p-2 text-[#4f5661] hover:bg-[#f3f4f7]">
              <X className="size-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {stageOrder.map((stage) => (
              <button
                key={stage}
                onClick={() => onStageChange(stage)}
                className={cn(
                  'rounded-full border px-3 py-1 text-[12px] font-bold transition',
                  prospect.stage === stage
                    ? 'border-[#6f4bd8] bg-[#f2efff] text-[#6f4bd8]'
                    : 'border-[#d8dbe3] bg-white text-[#575d67] hover:bg-[#f7f8fb]'
                )}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5 px-6 py-5">
          <section className="rounded-lg border border-[#dfe2e8] bg-[#fafbfc] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[#737984]">AI score</p>
                <p className="mt-1 text-[30px] font-semibold text-[#303238]">{prospect.aiScore}</p>
              </div>
              <ProspectScore score={prospect.aiScore} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-white p-3">
                <p className="text-[12px] text-[#747984]">Deal value</p>
                <p className="text-[17px] font-bold text-[#303238]">{formatMoney(prospect.value)}</p>
              </div>
              <div className="rounded-md bg-white p-3">
                <p className="text-[12px] text-[#747984]">Expected value</p>
                <p className="text-[17px] font-bold text-[#303238]">{formatMoney(expectedValue)}</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#dfe2e8] p-4">
            <h3 className="text-[15px] font-bold text-[#303238]">Contact details</h3>
            <div className="mt-4 space-y-3 text-[13px] text-[#575d67]">
              <p className="flex items-center gap-3"><Mail className="size-4 text-[#747984]" /> {prospect.email}</p>
              <p className="flex items-center gap-3"><Phone className="size-4 text-[#747984]" /> {prospect.phone}</p>
              <p className="flex items-center gap-3"><Calendar className="size-4 text-[#747984]" /> Last contact: {prospect.lastContact}</p>
            </div>
          </section>

          <section className="rounded-lg border border-[#dfe2e8] p-4">
            <h3 className="text-[15px] font-bold text-[#303238]">Suggested next action</h3>
            <div className="mt-3 rounded-md border border-[#dcd7ff] bg-[#fbfaff] p-3">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 size-4 text-[#6f4bd8]" />
                <p className="text-[13px] leading-5 text-[#575d67]">
                  Send a short follow-up focused on ROI and book a 20-minute qualification call within 48 hours.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#dfe2e8] p-4">
            <h3 className="text-[15px] font-bold text-[#303238]">Notes</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#6f747d]">{prospect.notes}</p>
          </section>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button className="bg-[#6f4bd8] text-white hover:bg-[#5f3fd0]">
              <Send className="mr-2 size-4" /> Email
            </Button>
            <Button variant="outline" className="border-[#cbd0da] text-[#303238] hover:bg-[#f3f4f7]">
              <UserCheck className="mr-2 size-4" /> Convert
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

function AddProspectDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (prospect: Prospect) => void;
}) {
  const [form, setForm] = useState<ProspectForm>({
    company: '',
    name: '',
    email: '',
    phone: '',
    value: '',
    source: 'Website',
    assignee: 'Sarah Chen',
    notes: '',
  });

  const update = (field: keyof ProspectForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setForm({
      company: '',
      name: '',
      email: '',
      phone: '',
      value: '',
      source: 'Website',
      assignee: 'Sarah Chen',
      notes: '',
    });
  };

  const submit = () => {
    const assigneeInitials = form.assignee
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    onAdd({
      id: `p-${Date.now()}`,
      company: form.company || 'New Prospect',
      name: form.name || 'Unknown contact',
      email: form.email || 'contact@example.com',
      phone: form.phone || '+1 (555) 000-0000',
      value: Number(form.value) || 0,
      probability: 20,
      stage: 'Lead',
      assignee: form.assignee,
      assigneeAvatar: assigneeInitials,
      lastContact: 'Just now',
      aiScore: 58,
      source: form.source,
      notes: form.notes || 'New lead added manually.',
      tags: [form.source, 'Manual'],
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[560px] border-[#dfe2e8] bg-white text-[#303238]">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold">Add Prospect</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-[12px] font-bold text-[#575d67]">Company</span>
            <Input value={form.company} onChange={(event) => update('company', event.target.value)} className="border-[#cbd0da] bg-[#f7f8fb]" />
          </label>
          <label className="space-y-1.5">
            <span className="text-[12px] font-bold text-[#575d67]">Contact</span>
            <Input value={form.name} onChange={(event) => update('name', event.target.value)} className="border-[#cbd0da] bg-[#f7f8fb]" />
          </label>
          <label className="space-y-1.5">
            <span className="text-[12px] font-bold text-[#575d67]">Email</span>
            <Input value={form.email} onChange={(event) => update('email', event.target.value)} className="border-[#cbd0da] bg-[#f7f8fb]" />
          </label>
          <label className="space-y-1.5">
            <span className="text-[12px] font-bold text-[#575d67]">Phone</span>
            <Input value={form.phone} onChange={(event) => update('phone', event.target.value)} className="border-[#cbd0da] bg-[#f7f8fb]" />
          </label>
          <label className="space-y-1.5">
            <span className="text-[12px] font-bold text-[#575d67]">Value</span>
            <Input value={form.value} onChange={(event) => update('value', event.target.value)} className="border-[#cbd0da] bg-[#f7f8fb]" placeholder="25000" />
          </label>
          <label className="space-y-1.5">
            <span className="text-[12px] font-bold text-[#575d67]">Source</span>
            <select value={form.source} onChange={(event) => update('source', event.target.value)} className="h-10 w-full rounded-md border border-[#cbd0da] bg-[#f7f8fb] px-3 text-[13px] outline-none">
              {sources.map((source) => <option key={source}>{source}</option>)}
            </select>
          </label>
          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-[12px] font-bold text-[#575d67]">Notes</span>
            <textarea
              value={form.notes}
              onChange={(event) => update('notes', event.target.value)}
              className="min-h-24 w-full rounded-md border border-[#cbd0da] bg-[#f7f8fb] px-3 py-2 text-[13px] outline-none focus:border-[#6f4bd8] focus:ring-2 focus:ring-[#6f4bd8]/15"
            />
          </label>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-[#575d67] hover:bg-[#f3f4f7]">
            Cancel
          </Button>
          <Button onClick={submit} className="bg-[#6f4bd8] text-white hover:bg-[#5f3fd0]">
            Add Prospect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Prospects() {
  const [prospectList, setProspectList] = useState<Prospect[]>(prospects);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [activeView, setActiveView] = useState<ViewMode>('board');
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filteredProspects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return prospectList.filter((prospect) => {
      const matchesSearch =
        !normalizedSearch ||
        prospect.company.toLowerCase().includes(normalizedSearch) ||
        prospect.name.toLowerCase().includes(normalizedSearch) ||
        prospect.email.toLowerCase().includes(normalizedSearch);

      return (
        matchesSearch &&
        (!stageFilter || prospect.stage === stageFilter) &&
        (!sourceFilter || prospect.source === sourceFilter) &&
        (!assigneeFilter || prospect.assignee === assigneeFilter)
      );
    });
  }, [assigneeFilter, prospectList, search, sourceFilter, stageFilter]);

  const pipelineValue = useMemo(
    () => prospectList.reduce((sum, prospect) => sum + prospect.value, 0),
    [prospectList]
  );

  const weightedValue = useMemo(
    () => prospectList.reduce((sum, prospect) => sum + prospect.value * (prospect.probability / 100), 0),
    [prospectList]
  );

  const hotLeadCount = useMemo(
    () => prospectList.filter((prospect) => prospect.aiScore >= 80).length,
    [prospectList]
  );

  const winRate = useMemo(() => {
    const closed = prospectList.filter((prospect) => prospect.stage === 'Closed').length;
    return prospectList.length ? Math.round((closed / prospectList.length) * 100) : 0;
  }, [prospectList]);

  const handleDrop = (event: DragEvent<HTMLDivElement>, stage: ProspectStage) => {
    event.preventDefault();
    if (!draggedId) return;

    setProspectList((current) =>
      current.map((prospect) => (prospect.id === draggedId ? { ...prospect, stage } : prospect))
    );
    setDraggedId(null);
  };

  const updateSelectedStage = (stage: ProspectStage) => {
    if (!selectedProspect) return;

    setProspectList((current) =>
      current.map((prospect) => (prospect.id === selectedProspect.id ? { ...prospect, stage } : prospect))
    );
    setSelectedProspect((current) => (current ? { ...current, stage } : current));
  };

  const addProspect = (prospect: Prospect) => {
    setProspectList((current) => [prospect, ...current]);
  };

  const stageMetrics = pipelineStages.map((stage) => {
    const rows = prospectList.filter((prospect) => prospect.stage === stage.stage);
    const value = rows.reduce((sum, prospect) => sum + prospect.value, 0);
    return { ...stage, rows, value };
  });

  return (
    <div className="min-h-full overflow-x-hidden px-4 py-5 sm:px-6 md:px-10">
      <div className="flex flex-col gap-4 border-b border-[#dfe2e8] pb-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight text-[#303238] md:text-[36px]">
            Prospects & Lead Workflows
          </h1>
          <p className="mt-1 max-w-[250px] text-[14px] leading-5 text-[#6f747d] sm:max-w-[760px]">
            {prospectList.length} prospects · {formatMoney(pipelineValue)} total pipeline · {winRate}% closed conversion
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="border-[#cbd0da] bg-white text-[#303238] hover:bg-[#f3f4f7]">
            <Upload className="mr-2 size-4" /> Import
          </Button>
          <Button onClick={() => setAddOpen(true)} className="bg-[#6f4bd8] text-white hover:bg-[#5f3fd0]">
            <Plus className="mr-2 size-4" /> Add Prospect
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Pipeline value" value={formatMoney(pipelineValue)} detail="All active and closed opportunities" />
        <MetricCard label="Weighted value" value={formatMoney(Math.round(weightedValue))} detail="Probability-adjusted forecast" tone="green" />
        <MetricCard label="Hot leads" value={`${hotLeadCount}`} detail="AI score of 80 or higher" tone="amber" />
        <MetricCard label="Closed rate" value={`${winRate}%`} detail="Closed prospects across the sample" tone="gray" />
      </div>

      <section className="workspace-panel mt-5 rounded-lg">
        <div className="flex flex-col gap-4 border-b border-[#eceef2] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'board' as const, label: 'Pipeline Board' },
              { id: 'table' as const, label: 'Table View' },
              { id: 'intake' as const, label: 'Lead Intake' },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={cn(
                  'rounded-md px-3 py-2 text-[14px] font-bold transition',
                  activeView === view.id
                    ? 'border border-[#6f4bd8] bg-[#f2efff] text-[#6f4bd8]'
                    : 'border border-[#d9dde6] bg-white text-[#3f444c] hover:bg-[#f3f4f7]'
                )}
              >
                {view.label}
              </button>
            ))}
          </div>

          <a href="#/app/reports" className="text-[14px] font-bold text-[#6f4bd8] hover:underline">
            How do I assign lead workflows?
          </a>
        </div>

        <div className="flex flex-col gap-3 px-5 py-4 xl:flex-row xl:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#69707a]" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search prospects, contacts, domains..."
              className="h-10 border-[#cbd0da] bg-white pl-9 text-[#303238] placeholder:text-[#8b9099] focus-visible:border-[#6f4bd8]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterSelect value={stageFilter} onChange={setStageFilter} options={stageOrder} label="All stages" />
            <FilterSelect value={sourceFilter} onChange={setSourceFilter} options={sources} label="All sources" />
            <FilterSelect value={assigneeFilter} onChange={setAssigneeFilter} options={assignees} label="All assignees" />
            <button
              onClick={() => {
                setSearch('');
                setStageFilter('');
                setSourceFilter('');
                setAssigneeFilter('');
              }}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-[#cbd0da] bg-white px-3 text-[13px] font-bold text-[#3f444c] hover:bg-[#f3f4f7]"
            >
              <Filter className="size-4" /> Clear
            </button>
          </div>
        </div>
      </section>

      {activeView === 'board' && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {stageMetrics.map((metric) => (
              <div key={metric.stage} className="rounded-lg border border-[#dfe2e8] bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ backgroundColor: metric.color }} />
                  <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[#737984]">{metric.stage}</p>
                </div>
                <p className="mt-2 text-[22px] font-semibold text-[#303238]">{metric.rows.length}</p>
                <p className="text-[12px] text-[#747984]">{formatMoney(metric.value)}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-4">
            {stageMetrics.map((metric) => (
              <div
                key={metric.stage}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, metric.stage)}
                className="min-h-[420px] w-[312px] shrink-0 rounded-lg border border-[#dfe2e8] bg-[#f5f6f8] p-3"
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: metric.color }} />
                    <span className="text-[15px] font-bold text-[#303238]">{metric.stage}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#747984]">
                      {metric.rows.length}
                    </span>
                  </div>
                  <button className="rounded-md p-1.5 text-[#69707a] hover:bg-white">
                    <MoreVertical className="size-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {filteredProspects
                    .filter((prospect) => prospect.stage === metric.stage)
                    .map((prospect) => (
                      <BoardCard
                        key={prospect.id}
                        prospect={prospect}
                        onSelect={() => setSelectedProspect(prospect)}
                        onDragStart={() => setDraggedId(prospect.id)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeView === 'table' && (
        <section className="workspace-panel mt-5 overflow-hidden rounded-lg">
          <div className="border-b border-[#eceef2] px-5 py-4">
            <h2 className="text-[18px] font-bold text-[#303238]">Prospect table</h2>
            <p className="text-[13px] text-[#6f747d]">{filteredProspects.length} results match the active filters.</p>
          </div>
          <ProspectTable rows={filteredProspects} onSelect={setSelectedProspect} />
        </section>
      )}

      {activeView === 'intake' && <div className="mt-5"><IntakePanel onCreate={() => setAddOpen(true)} /></div>}

      {selectedProspect && (
        <ProspectDrawer
          prospect={selectedProspect}
          onClose={() => setSelectedProspect(null)}
          onStageChange={updateSelectedStage}
        />
      )}

      <AddProspectDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={addProspect} />
    </div>
  );
}
