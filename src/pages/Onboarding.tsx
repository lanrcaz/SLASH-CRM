import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { format, parseISO } from 'date-fns';
import {
  Rocket,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Search,
  X,
  Check,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import {
  activeOnboardings,
  completedOnboardings,
  onboardingTemplates,
  onboardingPhases,
  availableClients,
  availableTeam,
  availableServices,
} from '@/mocks/lifecycleMock';
import type { OnboardingClient, OnboardingTemplate } from '@/mocks/lifecycleMock';

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

// ─── Helper Components ─────────────────────────────────────────────────

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

function StatusBadge({ status, type }: { status: string; type: 'in-progress' | 'completed' | 'blocked' | 'excellent' }) {
  const styles = {
    'in-progress': 'bg-[#f6f4fd] text-[#6b62a3] border-[#e3dff5]',
    'completed': 'bg-[#f2efff] text-[#4b3bb4] border-[#d8cffa]',
    'blocked': 'bg-[#fff8eb] text-[#7c4810] border-[#f7d99a]',
    'excellent': 'bg-[#f2efff] text-[#4b3bb4] border-[#d8cffa]',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border ${styles[type]}`}>
      {status}
    </span>
  );
}

// ─── KPI Card ──────────────────────────────────────────────────────────

function KPICard({
  icon: Icon,
  iconColor,
  value,
  suffix,
  sub,
  subColor,
  index,
}: {
  icon: React.ElementType;
  iconColor: string;
  value: number;
  suffix?: string;
  sub: string;
  subColor?: string;
  index: number;
}) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className="bg-[#ffffff] rounded-xl p-6 border border-slate-200 hover:border-[rgba(111,75,216,0.2)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[32px] font-medium text-slate-900 tracking-tight leading-none">
            <CountUp end={value} duration={1.2} suffix={suffix || ''} />
          </p>
          <p className={`text-[13px] mt-2 ${subColor || 'text-slate-500'}`}>{sub}</p>
        </div>
        <div className={`p-2.5 rounded-lg bg-[${iconColor}]/10`}>
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Pizza Tracker ─────────────────────────────────────────────────────

function PizzaTracker({ phase, progress }: { phase: number; progress: number }) {
  return (
    <div className="mt-5">
      {/* Phase nodes */}
      <div className="flex items-center justify-between relative">
        {/* Connector lines background */}
        <div className="absolute top-[18px] left-0 right-0 h-[3px] bg-[#e4e6eb] rounded-full" />
        {/* Active connector lines */}
        <div
          className="absolute top-[18px] left-0 h-[3px] rounded-full bg-[#6f4bd8] transition-all duration-500"
          style={{ width: `${((phase - 1) / (onboardingPhases.length - 1)) * 100}%` }}
        />

        {onboardingPhases.map((name, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < phase;
          const isCurrent = stepNum === phase;
          return (
            <div key={name} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.4, ease: easeSpring }}
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? 'bg-[#6f4bd8] border-[#6f4bd8]'
                    : isCurrent
                      ? 'bg-[#ffffff] border-[#6f4bd8]'
                      : 'bg-[#ffffff] border-[#e4e6eb]'
                }`}
              >
                {isCompleted ? (
                  <Check size={16} className="text-[#ffffff]" />
                ) : isCurrent ? (
                  <span className="text-[#6f4bd8] text-sm font-semibold">{stepNum}</span>
                ) : (
                  <span className="text-[#9aa0a6] text-sm">{stepNum}</span>
                )}
              </motion.div>
              <span
                className={`mt-2 text-[11px] font-medium ${
                  isCompleted ? 'text-[#6f4bd8]' : isCurrent ? 'text-[#6f4bd8] font-semibold' : 'text-slate-500'
                }`}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full h-1.5 bg-[#e4e6eb] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.3 }}
            className="h-full rounded-full bg-[#6f4bd8]"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Task Accordion ────────────────────────────────────────────────────

function TaskAccordion({ client }: { client: OnboardingClient }) {
  const [expanded, setExpanded] = useState(false);
  const remaining = client.totalTasks - client.tasksCompleted;

  return (
    <div className="mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-900 transition-colors"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {remaining} tasks remaining
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
            <div className="mt-3 space-y-2">
              {Array.from({ length: Math.min(remaining, 4) }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="w-4 h-4 rounded border border-[#64748b] flex items-center justify-center">
                    <Check size={10} className="text-[#6f4bd8] opacity-0" />
                  </div>
                  <span className="text-[13px] text-[#cbd5e1] flex-1">
                    {['Configure SSO', 'Import user data', 'Set up dashboards', 'Team training session'][i] || `Task ${client.tasksCompleted + i + 1}`}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Due {format(parseISO(client.dueDate), 'MMM d')}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Onboarding Card ───────────────────────────────────────────────────

function OnboardingCard({ client, index }: { client: OnboardingClient; index: number }) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      whileHover={{ borderColor: 'rgba(59,130,246,0.2)', y: -2 }}
      className="bg-[#ffffff] rounded-xl p-6 border border-slate-200 transition-all duration-200 mb-4"
    >
      {/* Risk banner */}
      {client.health === 'At Risk' && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#f7d99a] bg-[#fff8eb] px-3 py-2">
          <AlertTriangle size={14} className="text-[#a55e08]" strokeWidth={2.2} />
          <span className="text-[12px] font-medium text-[#7c4810]">{client.blocker}</span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar initials={client.avatar} />
          <div>
            <h3 className="text-[18px] font-semibold text-slate-900">{client.company}</h3>
            <p className="text-[13px] text-slate-500">
              Started {format(parseISO(client.startDate), 'MMM d')} · AI predicts: {format(parseISO(client.aiPrediction || client.dueDate), 'MMM d')}
            </p>
          </div>
          <StatusBadge
            status={client.health === 'Excellent' ? 'Almost Complete' : 'In Progress'}
            type={client.health === 'Excellent' ? 'excellent' : 'in-progress'}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#3b82f6]">Phase {client.phase} of 4</span>
          <div className="relative w-9 h-9">
            <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e4e6eb" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15" fill="none" stroke="#6f4bd8" strokeWidth="3"
                strokeDasharray={`${(client.progress / 100) * 94.2} 94.2`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-slate-900">
              {client.progress}%
            </span>
          </div>
          <button className="p-1.5 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            <MoreVertical size={16} className="text-slate-500" />
          </button>
        </div>
      </div>

      {/* Pizza Tracker */}
      <PizzaTracker phase={client.phase} progress={client.progress} />

      {/* Progress label */}
      <p className="mt-2 text-[13px] text-slate-400">
        {client.progress}% complete · {client.totalTasks - client.tasksCompleted} tasks remaining
      </p>

      {/* Task accordion */}
      <TaskAccordion client={client} />

      {/* Footer: Assignee + View Details */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#e4e6eb] flex items-center justify-center text-[10px] text-slate-900 font-medium">
            {client.assigneeAvatar}
          </div>
          <span className="text-[12px] text-slate-500">{client.assignee}</span>
        </div>
        <button className="text-[12px] font-medium text-[#3b82f6] hover:text-[#6f4bd8] transition-colors">
          View Details
        </button>
      </div>
    </motion.div>
  );
}

// ─── Completed Onboarding Card ─────────────────────────────────────────

function CompletedCard({ client, index }: { client: OnboardingClient; index: number }) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className="bg-[#ffffff] rounded-xl p-6 border border-slate-200 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar initials={client.avatar} />
          <div>
            <h3 className="text-[18px] font-semibold text-slate-900">{client.company}</h3>
            <p className="text-[13px] text-slate-500">
              Completed {format(parseISO(client.dueDate), 'MMM d, yyyy')}
            </p>
          </div>
          <StatusBadge status="Completed" type="completed" />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[14px] font-medium text-slate-900">{client.totalTasks} tasks</p>
            <p className="text-[12px] text-[#6f4bd8]">All completed</p>
          </div>
          <button className="text-[12px] font-medium text-[#3b82f6] hover:text-[#6f4bd8] transition-colors">
            View Report
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Template Card ─────────────────────────────────────────────────────

function TemplateCard({ template, index }: { template: OnboardingTemplate; index: number }) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.08 }}
      className="bg-[#ffffff] rounded-xl p-6 border border-slate-200 hover:border-[rgba(111,75,216,0.2)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <FileText size={24} className="text-[#6f4bd8]" />
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[rgba(59,130,246,0.15)] text-[#3b82f6]">
          {template.estimatedDays} days
        </span>
      </div>
      <h3 className="text-[18px] font-semibold text-slate-900 mb-1">{template.name}</h3>
      <p className="text-[13px] text-slate-400 mb-4">{template.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-slate-500">{template.phases.length} phases · Used {template.usageCount}x</span>
        <button className="text-[12px] font-medium text-[#6f4bd8] hover:text-slate-900 transition-colors">
          Use Template
        </button>
      </div>
      {/* Phase pills */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {template.phases.map((phase) => (
          <span key={phase} className="text-[10px] px-2 py-0.5 rounded-full bg-[#e4e6eb] text-slate-400">
            {phase}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Onboarding Wizard Modal ───────────────────────────────────────────

function OnboardingWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [launched, setLaunched] = useState(false);

  const totalSteps = 5;

  const toggleService = (id: string) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const toggleTeam = (id: string) => {
    setSelectedTeam((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleLaunch = () => {
    setLaunched(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedClient !== '';
      case 2: return selectedServices.length > 0;
      case 3: return selectedTeam.length > 0;
      case 4: return startDate !== '' && targetDate !== '';
      default: return true;
    }
  };

  if (launched) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#ffffff] rounded-xl p-10 text-center max-w-[640px] w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ duration: 0.6, ease: easeSpring }}
        >
          <CheckCircle2 size={56} className="text-[#6f4bd8] mx-auto mb-4" />
        </motion.div>
        <h3 className="text-[22px] font-semibold text-slate-900 mb-2">Onboarding launched!</h3>
        <p className="text-[15px] text-slate-400 mb-6">
          {availableClients.find((c) => c.id === selectedClient)?.name || 'Client'} onboarding has started.
          The client will receive their magic link invitation.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#6f4bd8] text-[#ffffff] font-semibold text-[13px] hover:bg-[#5b39c4] transition-colors"
          >
            View Progress
          </button>
          <button
            onClick={() => { setLaunched(false); setStep(1); setSelectedClient(''); }}
            className="px-6 py-2.5 rounded-xl border border-[rgba(255,255,255,0.2)] text-slate-900 text-[13px] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            Start Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#ffffff] rounded-xl max-w-[640px] w-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#e4e6eb] flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-slate-900">Start New Onboarding</h3>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors">
          <X size={18} className="text-slate-500" />
        </button>
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-5 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${
                i + 1 < step ? 'bg-[#6f4bd8] text-[#ffffff]' :
                i + 1 === step ? 'bg-[#3b82f6] text-slate-900' : 'bg-[#e4e6eb] text-slate-500'
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
      <div className="p-6 min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
          >
            {/* Step 1: Client Selection */}
            {step === 1 && (
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Select Client</h4>
                <p className="text-[13px] text-slate-500 mb-4">Choose an existing prospect or enter a new client</p>

                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 pl-10 pr-4 text-[14px] text-slate-900 placeholder:text-slate-500 focus:border-[#6f4bd8] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                  {availableClients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClient(client.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        selectedClient === client.id
                          ? 'border-[#6f4bd8] bg-[rgba(111,75,216,0.05)]'
                          : 'border-transparent bg-[#ffffff] hover:bg-[#e4e6eb]'
                      }`}
                    >
                      <Avatar initials={client.avatar} size={36} />
                      <span className="text-[14px] text-slate-900 font-medium">{client.name}</span>
                      {selectedClient === client.id && <Check size={16} className="text-[#6f4bd8] ml-auto" />}
                    </button>
                  ))}
                </div>

                <button className="mt-3 flex items-center gap-2 text-[13px] text-[#3b82f6] hover:text-[#6f4bd8] transition-colors">
                  <Plus size={14} /> Create new client
                </button>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Choose Services</h4>
                <p className="text-[13px] text-slate-500 mb-4">Select the services this client needs</p>

                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {availableServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        selectedServices.includes(service.id)
                          ? 'border-[#6f4bd8] bg-[rgba(111,75,216,0.05)]'
                          : 'border-transparent bg-[#ffffff] hover:bg-[#e4e6eb]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          selectedServices.includes(service.id)
                            ? 'bg-[#6f4bd8] border-[#6f4bd8]'
                            : 'border-[#64748b]'
                        }`}
                      >
                        {selectedServices.includes(service.id) && <Check size={12} className="text-[#ffffff]" />}
                      </div>
                      <div>
                        <span className="text-[14px] text-slate-900 block">{service.name}</span>
                        <span className="text-[11px] text-slate-500">{service.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Team Assignment */}
            {step === 3 && (
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Assign Team</h4>
                <p className="text-[13px] text-slate-500 mb-4">Select team members for this onboarding</p>

                <div className="space-y-2">
                  {availableTeam.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => toggleTeam(member.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        selectedTeam.includes(member.id)
                          ? 'border-[#6f4bd8] bg-[rgba(111,75,216,0.05)]'
                          : 'border-transparent bg-[#ffffff] hover:bg-[#e4e6eb]'
                      }`}
                    >
                      <Avatar initials={member.avatar} size={36} />
                      <div className="flex-1">
                        <span className="text-[14px] text-slate-900 block">{member.name}</span>
                        <span className="text-[12px] text-slate-500">{member.role}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedTeam.includes(member.id) ? 'border-[#6f4bd8]' : 'border-[#64748b]'
                        }`}
                      >
                        {selectedTeam.includes(member.id) && <div className="w-2.5 h-2.5 rounded-full bg-[#6f4bd8]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Timeline Settings */}
            {step === 4 && (
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Timeline Settings</h4>
                <p className="text-[13px] text-slate-500 mb-4">Set the onboarding schedule</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[12px] text-slate-400 mb-1.5 block">Start Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 pl-10 pr-4 text-[14px] text-slate-900 focus:border-[#6f4bd8] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] text-slate-400 mb-1.5 block">Target Completion</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full bg-[#ffffff] border border-[#e4e6eb] rounded-xl py-2.5 pl-10 pr-4 text-[14px] text-slate-900 focus:border-[#6f4bd8] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] text-slate-400 mb-1.5 block">Send invitation email</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 rounded-full bg-[#6f4bd8] flex items-center justify-end px-0.5 cursor-pointer">
                        <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                      </div>
                      <span className="text-[13px] text-[#cbd5e1]">Client will receive magic link</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Launch */}
            {step === 5 && (
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Review & Launch</h4>
                <p className="text-[13px] text-slate-500 mb-4">Review your onboarding configuration</p>

                <div className="bg-[#ffffff] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Client</span>
                    <span className="text-[14px] text-slate-900">
                      {availableClients.find((c) => c.id === selectedClient)?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Services</span>
                    <span className="text-[14px] text-slate-900">{selectedServices.length} selected</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Team</span>
                    <span className="text-[14px] text-slate-900">{selectedTeam.length} members</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Start Date</span>
                    <span className="text-[14px] text-slate-900">{startDate || 'Not set'}</span>
                  </div>
                  <div className="border-t border-[#e4e6eb] pt-3 flex justify-between items-center">
                    <span className="text-[12px] text-slate-500">Target</span>
                    <span className="text-[14px] text-slate-900">{targetDate || 'Not set'}</span>
                  </div>
                </div>

                <button
                  onClick={handleLaunch}
                  className="mt-4 w-full py-3 rounded-xl bg-[#6f4bd8] text-[#ffffff] font-semibold text-[14px] hover:bg-[#5b39c4] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Rocket size={16} /> Launch Onboarding
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer navigation */}
      {!launched && (
        <div className="p-6 border-t border-[#e4e6eb] flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.2)] text-slate-900 text-[13px] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </button>
          {step < totalSteps ? (
            <button
              onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#6f4bd8] text-[#ffffff] font-semibold text-[13px] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5b39c4] transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export default function Onboarding() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'templates'>('active');
  const [showWizard, setShowWizard] = useState(false);

  // Scroll lock when modal open
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
          <h1 className="text-[36px] font-bold text-slate-900 tracking-tight leading-tight">Onboarding</h1>
          <p className="text-[15px] text-slate-500 mt-1">
            {activeOnboardings.length} active onboardings · 3 completing this week · Avg. 18 days
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6f4bd8] text-[#ffffff] font-semibold text-[13px] hover:bg-[#5b39c4] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(111,75,216,0.3)] active:scale-[0.98] transition-all"
          >
            <Rocket size={16} /> Start New Onboarding
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-[rgba(255,255,255,0.05)] transition-all text-[13px]"
          >
            <FileText size={16} /> Templates
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
        <KPICard icon={Rocket} iconColor="#3b82f6" value={8} sub="3 starting this week" subColor="text-slate-500" index={0} />
        <KPICard icon={CheckCircle2} iconColor="#6f4bd8" value={94} suffix="%" sub="On-time delivery" subColor="text-slate-500" index={1} />
        <KPICard icon={Clock} iconColor="#5f6368" value={18} suffix=" days" sub="AI predicted: 16 days" subColor="text-[#3b82f6]" index={2} />
        <KPICard icon={AlertTriangle} iconColor="#f59e0b" value={1} sub="QuantumLabs — Phase 2 blocked" subColor="text-[#f59e0b]" index={3} />
      </motion.section>

      {/* ─── View Toggle ──────────────────────────────────────────── */}
      <section className="px-6 mb-6">
        <div className="flex items-center gap-6 border-b border-[#e4e6eb]">
          {(['active', 'completed', 'templates'] as const).map((tab) => (
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
                  layoutId="onboarding-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6f4bd8] rounded-full"
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
              {activeOnboardings.map((client, i) => (
                <OnboardingCard key={client.id} client={client} index={i} />
              ))}
            </motion.div>
          )}

          {activeTab === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {completedOnboardings.map((client, i) => (
                <CompletedCard key={client.id} client={client} index={i} />
              ))}
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {onboardingTemplates.map((template, i) => (
                <TemplateCard key={template.id} template={template} index={i} />
              ))}
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
              <OnboardingWizard onClose={() => setShowWizard(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
