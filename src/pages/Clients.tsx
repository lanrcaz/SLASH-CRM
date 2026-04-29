import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Upload,
  LayoutGrid,
  List,
  MoreVertical,
  ChevronDown,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Target,
  Search as SearchIcon,
  BarChart3,
  Share2,
  FileText,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { ClientStatus } from '@/mocks/mockData';
import { clients } from '@/mocks/mockData';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

/* ------------------------------------------------------------------ */
/*  Status config                                                      */
/* ------------------------------------------------------------------ */
// Monochrome violet ramp for client lifecycle states. Churned uses a neutral
// grey to communicate "out" without introducing red into the palette.
const statusConfig: Record<ClientStatus, { bg: string; text: string; border: string; dot: string }> = {
  Active:       { bg: '#f2efff', text: '#4b3bb4', border: '1px solid #d8cffa', dot: '#6f4bd8' },
  Onboarding:   { bg: '#f6f4fd', text: '#6b62a3', border: '1px solid #e3dff5', dot: '#a89aea' },
  Offboarding:  { bg: '#f3f4f7', text: '#4a4d55', border: '1px solid #dfe2e8', dot: '#9aa0a6' },
  Churned:      { bg: '#f3f4f7', text: '#777b84', border: '1px solid #dfe2e8', dot: '#c2c6cd' },
  Prospect:     { bg: '#fbfaff', text: '#7a6dc2', border: '1px solid #ebe6f9', dot: '#cdc4f1' },
};

const statusOptions: ClientStatus[] = ['Active', 'Onboarding', 'Offboarding', 'Churned', 'Prospect'];
const sortOptions = ['Newest', 'Oldest', 'Revenue (High-Low)', 'Revenue (Low-High)', 'Name (A-Z)'];

/* ------------------------------------------------------------------ */
/*  StatusBadge                                                        */
/* ------------------------------------------------------------------ */
function StatusBadge({ status }: { status: ClientStatus }) {
  const c = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: c.bg, color: c.text, border: c.border }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.dot }} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini sparkline (SVG)                                               */
/* ------------------------------------------------------------------ */
function MiniSparkline({ data, color = '#6f4bd8' }: { data: number[]; color?: string }) {
  const w = 60, h = 24;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */
function ClientAvatar({ initials, size = 40 }: { initials: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-[#6f4bd8] shrink-0"
      style={{
        width: size,
        height: size,
        background: '#f2efff',
        border: '1px solid #e4dffb',
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ease                                                               */
/* ------------------------------------------------------------------ */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  AddClientModal (multi-step wizard)                                 */
/* ------------------------------------------------------------------ */
function AddClientModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', notes: '' });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sendInvite, setSendInvite] = useState(true);
  const [success, setSuccess] = useState(false);
  const steps = ['Client Info', 'Services', 'Invite'];

  const reset = () => {
    setStep(0);
    setForm({ name: '', email: '', company: '', phone: '', notes: '' });
    setSelectedServices([]);
    setSendInvite(true);
    setSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const serviceOptions = [
    { id: 'ad', name: 'Ad Management', desc: 'Campaign management across platforms', icon: Target },
    { id: 'seo', name: 'SEO Optimization', desc: 'Technical SEO & content strategy', icon: SearchIcon },
    { id: 'content', name: 'Content Marketing', desc: 'Blog posts, social & email', icon: FileText },
    { id: 'social', name: 'Social Media', desc: 'Daily posting & community mgmt', icon: Share2 },
    { id: 'analytics', name: 'Analytics', desc: 'Custom dashboards & reports', icon: BarChart3 },
    { id: 'consulting', name: 'Consulting', desc: 'Strategic growth consulting', icon: Building2 },
  ];

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    setSuccess(true);
    setTimeout(() => handleClose(), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-[560px] p-0 gap-0 overflow-hidden"
        style={{ background: '#ffffff', border: '1px solid #e4e6eb' }}
        showCloseButton={false}
      >
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-slate-900" >
              {success ? '' : 'Add New Client'}
            </DialogTitle>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center px-6 pb-10 pt-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <CheckCircle2 className="h-12 w-12 text-[#6f4bd8] mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2" >
                Client added successfully!
              </h3>
              <p className="text-sm text-slate-400 text-center">
                {form.company || 'New client'} has been added{sendInvite ? ' and an onboarding invitation has been sent.' : '.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 px-6 pb-6">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={cn(
                          'h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                          i < step && 'bg-[#6f4bd8] text-[#ffffff]',
                          i === step && 'bg-[#3b82f6] text-slate-900',
                          i > step && 'bg-[#e4e6eb] text-slate-500'
                        )}
                      >
                        {i < step ? <Check className="h-4 w-4" /> : i + 1}
                      </div>
                      <span className={cn('text-xs', i === step ? 'text-slate-900 font-medium' : 'text-slate-500')}>
                        {s}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={cn('h-0.5 w-12 -mt-5', i < step ? 'bg-[#6f4bd8]' : 'bg-[#e4e6eb]')} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: easeSmooth }}
                  className="px-6 pb-6"
                >
                  {step === 0 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                        <Input
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                          className="bg-[#ffffff] border-[#e4e6eb] text-slate-900 placeholder:text-slate-500 focus-visible:border-[#6f4bd8] focus-visible:ring-[#6f4bd8]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                        <Input
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="john@company.com"
                          className="bg-[#ffffff] border-[#e4e6eb] text-slate-900 placeholder:text-slate-500 focus-visible:border-[#6f4bd8] focus-visible:ring-[#6f4bd8]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Company</label>
                        <Input
                          value={form.company}
                          onChange={e => setForm({ ...form, company: e.target.value })}
                          placeholder="Acme Corp"
                          className="bg-[#ffffff] border-[#e4e6eb] text-slate-900 placeholder:text-slate-500 focus-visible:border-[#6f4bd8] focus-visible:ring-[#6f4bd8]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Phone</label>
                        <Input
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="bg-[#ffffff] border-[#e4e6eb] text-slate-900 placeholder:text-slate-500 focus-visible:border-[#6f4bd8] focus-visible:ring-[#6f4bd8]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes</label>
                        <textarea
                          value={form.notes}
                          onChange={e => setForm({ ...form, notes: e.target.value })}
                          placeholder="Additional notes..."
                          rows={3}
                          className="w-full rounded-md bg-[#ffffff] border border-[#e4e6eb] text-slate-900 placeholder:text-slate-500 p-3 text-sm outline-none focus-visible:border-[#6f4bd8] focus-visible:ring-1 focus-visible:ring-[#6f4bd8]/30 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-2 gap-3">
                      {serviceOptions.map(svc => {
                        const Icon = svc.icon;
                        const selected = selectedServices.includes(svc.id);
                        return (
                          <button
                            key={svc.id}
                            onClick={() => toggleService(svc.id)}
                            className={cn(
                              'flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left',
                              selected
                                ? 'border-[#6f4bd8] bg-[rgba(111,75,216,0.05)]'
                                : 'border-[#e4e6eb] bg-[#ffffff] hover:border-slate-200'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={cn('h-4 w-4', selected ? 'text-[#6f4bd8]' : 'text-slate-500')} />
                              <span className={cn('text-sm font-medium', selected ? 'text-[#6f4bd8]' : 'text-slate-900')}>
                                {svc.name}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">{svc.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#ffffff] border border-[#e4e6eb]">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Send onboarding invitation email</p>
                          <p className="text-xs text-slate-500 mt-0.5">Client will receive a welcome email with login instructions</p>
                        </div>
                        <Switch checked={sendInvite} onCheckedChange={setSendInvite} />
                      </div>
                      {sendInvite && (
                        <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e4e6eb]">
                          <p className="text-xs text-slate-500 mb-2">Email Preview:</p>
                          <div className="space-y-2">
                            <p className="text-sm text-slate-900 font-medium">Welcome to ClientVault!</p>
                            <p className="text-xs text-slate-400">
                              Hi {form.name || 'there'},<br /><br />
                              You have been invited to join {form.company || 'our platform'} on ClientVault.
                              Click the link below to set up your account and get started.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Footer buttons */}
              <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-900 hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  >
                    Back
                  </button>
                )}
                {step < 2 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] hover:scale-[1.02] transition-all"
                    style={{ boxShadow: '0 0 20px rgba(111,75,216,0.3)' }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] hover:scale-[1.02] transition-all"
                    style={{ boxShadow: '0 0 20px rgba(111,75,216,0.3)' }}
                  >
                    Add Client
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Clients Page                                                       */
/* ------------------------------------------------------------------ */
export default function Clients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalClients = clients.length;
  const activeCount = clients.filter(c => c.status === 'Active').length;
  const onboardingCount = clients.filter(c => c.status === 'Onboarding').length;
  const offboardingCount = clients.filter(c => c.status === 'Offboarding').length;

  const filteredClients = useMemo(() => {
    let result = [...clients];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(c => c.status === statusFilter);
    }

    switch (sortBy) {
      case 'Newest':
        result.sort((a, b) => new Date(b.joinDate || '9999').getTime() - new Date(a.joinDate || '9999').getTime());
        break;
      case 'Oldest':
        result.sort((a, b) => new Date(a.joinDate || '9999').getTime() - new Date(b.joinDate || '9999').getTime());
        break;
      case 'Revenue (High-Low)':
        result.sort((a, b) => b.mrr - a.mrr);
        break;
      case 'Revenue (Low-High)':
        result.sort((a, b) => a.mrr - b.mrr);
        break;
      case 'Name (A-Z)':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [search, statusFilter, sortBy]);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / pageSize));
  const pagedClients = filteredClients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleRowClick = useCallback((id: string) => {
    navigate(`/app/clients/${id}`);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      className="min-h-screen p-6 lg:p-8"
      style={{ background: '#ffffff', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1
            className="text-4xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Clients
          </h1>
          <div className="flex items-center gap-3 mt-1 text-[15px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#94a3b8]" />
              {totalClients} total
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#6f4bd8]" />
              {activeCount} active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
              {onboardingCount} onboarding
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#f59e0b]" />
              {offboardingCount} offboarding
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#6f4bd8] text-[#ffffff] hover:bg-[#5b39c4] hover:scale-[1.02] transition-all"
            style={{ boxShadow: '0 0 20px rgba(111,75,216,0.3)' }}
          >
            <Plus className="h-4 w-4" />
            Add Client
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-900 hover:bg-[rgba(255,255,255,0.05)] border border-slate-200 transition-all">
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
        </div>
      </motion.div>

      {/* Filters & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.05 }}
        className="rounded-xl p-5 mb-6"
        style={{ background: '#ffffff', border: '1px solid #e4e6eb' }}
      >
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px] max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, company..."
              className="pl-9 bg-[#ffffff] border-[#e4e6eb] text-slate-900 placeholder:text-slate-500 focus-visible:border-[#6f4bd8] focus-visible:ring-[#6f4bd8]/30"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as ClientStatus | 'All')}
              className="appearance-none bg-[#ffffff] border border-[#e4e6eb] text-slate-900 text-sm rounded-lg px-3 py-2 pr-8 outline-none focus:border-[#6f4bd8] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-[#ffffff] border border-[#e4e6eb] text-slate-900 text-sm rounded-lg px-3 py-2 pr-8 outline-none focus:border-[#6f4bd8] cursor-pointer"
            >
              {sortOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>

          {/* Active filter pill */}
          {statusFilter !== 'All' && (
            <button
              onClick={() => setStatusFilter('All')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#6f4bd8]"
              style={{ background: 'rgba(111,75,216,0.15)', border: '1px solid rgba(111,75,216,0.3)' }}
            >
              {statusFilter}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </motion.div>

      {/* View Toggle */}
      <div className="flex items-center justify-end gap-1 mb-4">
        <button
          onClick={() => setViewMode('grid')}
          className={cn(
            'p-2 rounded-lg transition-all',
            viewMode === 'grid' ? 'bg-[#ffffff] text-slate-900' : 'text-slate-500 hover:text-slate-900'
          )}
        >
          <LayoutGrid className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={cn(
            'p-2 rounded-lg transition-all',
            viewMode === 'list' ? 'bg-[#ffffff] text-slate-900' : 'text-slate-500 hover:text-slate-900'
          )}
        >
          <List className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* List View */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Table Header */}
            <div
              className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_60px] gap-4 px-5 py-3 text-xs font-medium uppercase tracking-wider text-slate-500"
              style={{ background: '#ffffff', borderRadius: '16px 16px 0 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <span>Client</span>
              <span>Status</span>
              <span>Revenue</span>
              <span>Services</span>
              <span>Last Activity</span>
              <span />
            </div>

            {/* Rows */}
            <div className="space-y-3 mt-3">
              {pagedClients.map((client, i) => {
                const sparkData = [
                  client.mrr * 0.6, client.mrr * 0.75, client.mrr * 0.7,
                  client.mrr * 0.85, client.mrr * 0.9, client.mrr,
                ];
                return (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.05 }}
                    onClick={() => handleRowClick(client.id)}
                    className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_60px] gap-4 items-center p-5 rounded-xl cursor-pointer transition-all hover:-translate-y-[1px]"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #f1f3f5',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                      (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                      (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.04)';
                    }}
                  >
                    {/* Client */}
                    <div className="flex items-center gap-3">
                      <ClientAvatar initials={client.avatar} size={40} />
                      <div>
                        <p className="text-[15px] font-medium text-slate-900">{client.name}</p>
                        <p className="text-[13px] text-slate-500">{client.email}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <StatusBadge status={client.status} />
                    </div>

                    {/* Revenue */}
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] text-slate-900">
                        ${client.mrr.toLocaleString()}
                      </span>
                      {client.mrr > 0 && <MiniSparkline data={sparkData} />}
                    </div>

                    {/* Services */}
                    <div className="flex items-center gap-1.5">
                      {client.servicesActive > 0 && (
                        <div className="flex -space-x-1">
                          {Array.from({ length: Math.min(client.servicesActive, 3) }).map((_, j) => (
                            <div key={j} className="h-7 w-7 rounded-full bg-[#ffffff] border border-[#ffffff] flex items-center justify-center">
                              <Target className="h-3 w-3 text-slate-500" />
                            </div>
                          ))}
                        </div>
                      )}
                      {client.servicesActive === 0 && <span className="text-[13px] text-slate-500">—</span>}
                    </div>

                    {/* Last Activity */}
                    <span className="text-[13px] text-slate-500">
                      {client.lastActive ? formatDistanceToNow(new Date(client.lastActive), { addSuffix: true }) : 'Never'}
                    </span>

                    {/* Actions */}
                    <div onClick={e => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-[rgba(255,255,255,0.05)] transition-all">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="min-w-[160px] bg-[#ffffff] border-[#e4e6eb] text-slate-900"
                        >
                          <DropdownMenuItem onClick={() => handleRowClick(client.id)} className="text-slate-900 focus:bg-[rgba(255,255,255,0.05)] focus:text-slate-900">
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-900 focus:bg-[rgba(255,255,255,0.05)] focus:text-slate-900">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-900 focus:bg-[rgba(255,255,255,0.05)] focus:text-slate-900">
                            Start Offboarding
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-900 focus:bg-[rgba(255,255,255,0.05)] focus:text-slate-900">
                            Export Data
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#ef4444] focus:bg-[rgba(239,68,68,0.1)] focus:text-[#ef4444]">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Grid View */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {pagedClients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.08 }}
                onClick={() => handleRowClick(client.id)}
                className="relative flex flex-col items-center p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e4e6eb',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(111,75,216,0.2)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Status badge top-right */}
                <div className="absolute top-4 right-4">
                  <StatusBadge status={client.status} />
                </div>

                <ClientAvatar initials={client.avatar} size={56} />
                <h3 className="mt-3 text-lg font-semibold text-slate-900" >
                  {client.name}
                </h3>
                <p className="text-[13px] text-slate-500">{client.company}</p>

                <div className="w-full h-px my-4" style={{ background: '#e4e6eb' }} />

                <p className="text-xl font-medium text-[#6f4bd8]" >
                  ${client.mrr.toLocaleString()}
                  <span className="text-xs text-slate-500 ml-1">/mo</span>
                </p>

                <div className="flex items-center gap-2 mt-3">
                  {client.servicesActive > 0 ? (
                    Array.from({ length: Math.min(client.servicesActive, 3) }).map((_, j) => (
                      <div key={j} className="h-7 w-7 rounded-full bg-[#ffffff] flex items-center justify-center">
                        <Target className="h-3 w-3 text-slate-500" />
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">No active services</span>
                  )}
                </div>

                <p
                  className="mt-4 text-[13px] font-medium text-[#6f4bd8] hover:underline"
                  onClick={(e) => { e.stopPropagation(); handleRowClick(client.id); }}
                >
                  View Details
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-[13px] text-slate-500">
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredClients.length)} of {filteredClients.length} clients
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    'h-9 w-9 rounded-full text-sm font-medium transition-all',
                    currentPage === pageNum
                      ? 'bg-[#ffffff] text-slate-900'
                      : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      <AddClientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
}
