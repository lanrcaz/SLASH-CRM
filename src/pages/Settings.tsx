import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Users, Plug, CreditCard, Bell, Shield, Settings as SettingsIcon, Code,
  Upload, CheckCircle2, Plus, Download, Eye, EyeOff, Copy, RefreshCw,
  ExternalLink, Trash2, LogOut, Moon, Sun, Monitor,
  MessageSquare, Database, Mail, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  teamMembers, integrations, invoices, notificationPrefs,
  activeSessions, loginHistory,
} from '@/mocks/dashboardMock';
import type { Integration, NotificationPref } from '@/mocks/dashboardMock';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: easeOutExpo },
});

const staggerContainer = (stagger = 0.04) => ({
  animate: { transition: { staggerChildren: stagger } },
});

const staggerItem = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
};

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */
const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'platform', label: 'Platform', icon: SettingsIcon },
  { id: 'api', label: 'API', icon: Code },
];

/* ------------------------------------------------------------------ */
/*  Profile Tab                                                        */
/* ------------------------------------------------------------------ */
function ProfileTab() {
  const [form, setForm] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex@clientvault.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Operations Manager',
    timezone: 'America/New_York',
  });
  const [hasChanges, setHasChanges] = useState(false);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
  };

  const fields = [
    { label: 'First Name', field: 'firstName', type: 'text' },
    { label: 'Last Name', field: 'lastName', type: 'text' },
    { label: 'Email', field: 'email', type: 'email' },
    { label: 'Phone', field: 'phone', type: 'tel' },
    { label: 'Job Title', field: 'jobTitle', type: 'text' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Personal Information */}
      <motion.div
        {...fadeSlideUp(0)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Personal Information</h3>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] text-[22px] font-semibold text-white">
            AM
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#1c2960] text-[#7eea57] hover:bg-[rgba(126,234,87,0.08)]"
            >
              <Upload className="size-4 mr-1.5" /> Change Avatar
            </Button>
            <button className="text-[13px] text-[#ef4444] hover:underline">Remove</button>
          </div>
        </div>

        {/* Form Fields */}
        <motion.div
          variants={staggerContainer(0.04)}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {fields.map(({ label, field, type }) => (
            <motion.div key={field} variants={staggerItem}>
              <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">{label}</label>
              <Input
                type={type}
                value={form[field as keyof typeof form]}
                onChange={(e) => update(field, e.target.value)}
                className="border-[#1c2960] bg-[#162044] text-white placeholder:text-[#475569] focus-visible:border-[#7eea57] focus-visible:ring-[#7eea57]/30"
              />
            </motion.div>
          ))}
          <motion.div variants={staggerItem}>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Time Zone</label>
            <select
              value={form.timezone}
              onChange={(e) => update('timezone', e.target.value)}
              className="w-full rounded-md border border-[#1c2960] bg-[#162044] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7eea57]"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </motion.div>
        </motion.div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="ghost"
            onClick={() => { setHasChanges(false); }}
            className="text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.08)]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className={cn(
              'font-semibold',
              hasChanges
                ? 'bg-[#7eea57] text-[#0a0e27] hover:bg-[#6dd446]'
                : 'bg-[#1c2960] text-[#64748b] cursor-not-allowed'
            )}
          >
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Change Password */}
      <motion.div
        {...fadeSlideUp(0.15)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Change Password</h3>
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Current Password</label>
            <Input
              type="password"
              placeholder="Enter current password"
              className="border-[#1c2960] bg-[#162044] text-white placeholder:text-[#475569] focus-visible:border-[#7eea57]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="border-[#1c2960] bg-[#162044] text-white placeholder:text-[#475569] focus-visible:border-[#7eea57]"
            />
            {/* Password strength */}
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full',
                    i <= 2 ? 'bg-[#f59e0b]' : 'bg-[#334155]'
                  )}
                />
              ))}
            </div>
            <p className="mt-1 text-[11px] text-[#64748b]">Medium strength</p>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Confirm New Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="border-[#1c2960] bg-[#162044] text-white placeholder:text-[#475569] focus-visible:border-[#7eea57]"
            />
          </div>
          <Button className="mt-2 w-fit bg-[#7eea57] text-[#0a0e27] hover:bg-[#6dd446] font-semibold">
            Update Password
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Tab                                                           */
/* ------------------------------------------------------------------ */
function TeamTab() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');

  const roleColors: Record<string, string> = {
    Owner: '#8b5cf6',
    Admin: '#7eea57',
    Editor: '#3b82f6',
    Viewer: '#64748b',
  };

  const filteredMembers = roleFilter
    ? teamMembers.filter((m) => m.role === roleFilter)
    : teamMembers;

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        {...fadeSlideUp(0)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[22px] font-semibold text-white">
            Team Members ({teamMembers.length})
          </h3>
          <Button
            onClick={() => setInviteModalOpen(true)}
            className="bg-[#7eea57] text-[#0a0e27] hover:bg-[#6dd446] font-semibold"
          >
            <Plus className="size-4 mr-1.5" /> Invite Member
          </Button>
        </div>

        {/* Filter */}
        <div className="mb-4 flex gap-2">
          {['', 'Owner', 'Admin', 'Editor', 'Viewer'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={cn(
                'rounded-full px-3 py-1 text-[12px] font-medium transition-all',
                roleFilter === role || (!roleFilter && !role)
                  ? role === ''
                    ? 'bg-[#162044] text-white'
                    : 'text-[#0a0e27]'
                  : 'border border-[#1c2960] text-[#94a3b8] hover:text-white'
              )}
              style={
                (roleFilter === role || (!roleFilter && !role)) && role !== ''
                  ? { backgroundColor: roleColors[role] || '#64748b' }
                  : undefined
              }
            >
              {role || 'All'}
            </button>
          ))}
        </div>

        {/* Team Table */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-2"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_100px_100px_120px_80px] gap-4 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">
            <span>Member</span>
            <span>Role</span>
            <span>Status</span>
            <span>Last Active</span>
            <span className="text-right">Actions</span>
          </div>

          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={staggerItem}
              className="grid grid-cols-[1fr_100px_100px_120px_80px] items-center gap-4 rounded-[10px] bg-[#162044] px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] text-[11px] font-medium text-white shrink-0">
                  {member.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-white truncate">{member.name}</p>
                  <p className="text-[11px] text-[#64748b] truncate">{member.email}</p>
                </div>
              </div>
              <span
                className="w-fit rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: `${roleColors[member.role]}15`,
                  color: roleColors[member.role],
                }}
              >
                {member.role}
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    'size-2 rounded-full',
                    member.status === 'active' ? 'bg-[#22c55e]' : 'bg-[#f59e0b]'
                  )}
                />
                <span className="text-[12px] text-[#94a3b8] capitalize">{member.status}</span>
              </div>
              <span className="text-[12px] text-[#94a3b8]">
                {member.status === 'invited' ? '—' : member.name === 'Alex Morgan' ? 'Now' : 'Recently'}
              </span>
              <div className="flex justify-end gap-1">
                {member.role !== 'Owner' && (
                  <>
                    <button className="rounded-md p-1 text-[#64748b] hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-colors">
                      <span className="text-[11px]">Edit</span>
                    </button>
                    {member.status === 'invited' ? (
                      <button className="rounded-md p-1 text-[#f59e0b] hover:bg-[rgba(245,158,11,0.1)] transition-colors">
                        <span className="text-[11px]">Resend</span>
                      </button>
                    ) : (
                      <button className="rounded-md p-1 text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] transition-colors">
                        <span className="text-[11px]">Remove</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Invite Modal */}
      <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
        <DialogContent className="max-w-[480px] border-[#1c2960] bg-[#0f1535] text-white">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-semibold">Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Email Address</label>
              <Input
                placeholder="colleague@company.com"
                className="border-[#1c2960] bg-[#162044] text-white placeholder:text-[#475569] focus-visible:border-[#7eea57]"
              />
              <p className="mt-1 text-[11px] text-[#64748b]">You can invite multiple by separating with commas</p>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Role</label>
              <div className="flex flex-col gap-2">
                {[
                  { role: 'Admin', desc: 'Full access to all settings and data' },
                  { role: 'Editor', desc: 'Can edit clients, prospects, and earnings' },
                  { role: 'Viewer', desc: 'Read-only access to dashboards and reports' },
                ].map(({ role, desc }) => (
                  <label
                    key={role}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#1c2960] bg-[#162044] p-3 transition-colors hover:border-[#64748b]"
                  >
                    <input type="radio" name="inviteRole" value={role} className="accent-[#7eea57]" />
                    <div>
                      <p className="text-[13px] font-medium text-white">{role}</p>
                      <p className="text-[11px] text-[#64748b]">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setInviteModalOpen(false)}
              className="text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.08)]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setInviteModalOpen(false)}
              className="bg-[#7eea57] text-[#0a0e27] hover:bg-[#6dd446] font-semibold"
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Integrations Tab                                                   */
/* ------------------------------------------------------------------ */
function IntegrationsTab() {
  const [integrationList, setIntegrationList] = useState<Integration[]>(integrations);

  const toggleConnection = (id: string) => {
    setIntegrationList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
  };

  const integrationIcons: Record<string, React.ReactNode> = {
    slack: <MessageSquare className="size-6" />,
    stripe: <CreditCard className="size-6" />,
    hubspot: <Database className="size-6" />,
    google: <Mail className="size-6" />,
    zapier: <Zap className="size-6" />,
  };

  return (
    <motion.div
      {...fadeSlideUp(0)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-6"
    >
      <h3 className="text-[22px] font-semibold text-white mb-6">Connected Integrations</h3>
      <motion.div
        variants={staggerContainer(0.08)}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        {integrationList.map((integration) => (
          <motion.div
            key={integration.id}
            variants={staggerItem}
            className={cn(
              'rounded-[16px] border border-[rgba(255,255,255,0.06)] p-5 transition-all',
              integration.connected
                ? 'border-l-[3px] border-l-[#7eea57]'
                : 'border-l-[3px] border-l-[#64748b]'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex size-10 items-center justify-center rounded-[10px]',
                    integration.connected ? 'text-[#7eea57] bg-[rgba(126,234,87,0.1)]' : 'text-[#64748b] bg-[#162044]'
                  )}
                >
                  {integrationIcons[integration.id]}
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-white">{integration.name}</h4>
                  <p className="text-[12px] text-[#94a3b8] mt-0.5">{integration.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'size-2 rounded-full',
                    integration.connected ? 'bg-[#22c55e]' : 'bg-[#64748b]'
                  )}
                />
                <span className="text-[12px] text-[#94a3b8]">
                  {integration.connected ? 'Connected' : 'Not connected'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected && (
                  <button className="text-[12px] text-[#7eea57] hover:underline">
                    Configure →
                  </button>
                )}
                <Button
                  size="sm"
                  onClick={() => toggleConnection(integration.id)}
                  variant={integration.connected ? 'ghost' : 'default'}
                  className={cn(
                    'text-[12px] font-medium',
                    integration.connected
                      ? 'text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]'
                      : 'bg-[#7eea57] text-[#0a0e27] hover:bg-[#6dd446]'
                  )}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Billing Tab                                                        */
/* ------------------------------------------------------------------ */
function BillingTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Current Plan */}
      <motion.div
        {...fadeSlideUp(0)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Current Plan</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-[12px] font-semibold"
              style={{ backgroundColor: 'rgba(126,234,87,0.15)', color: '#7eea57' }}
            >
              Growth
            </span>
            <p className="mt-2 text-[20px] font-medium text-white">$49/month</p>
            <p className="text-[13px] text-[#64748b]">Billed annually ($468/year — save $120)</p>
            <p className="mt-2 text-[13px] text-[#64748b]">Next billing: July 15, 2025</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="border-[#1c2960] text-white hover:bg-[rgba(255,255,255,0.08)]"
            >
              Change Plan
            </Button>
            <button className="text-[13px] text-[#ef4444] hover:underline">Cancel Subscription</button>
          </div>
        </div>
      </motion.div>

      {/* Usage */}
      <motion.div
        {...fadeSlideUp(0.1)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Usage</h3>
        <div className="flex flex-col gap-5">
          {[
            { label: 'Clients', used: 24, total: 100 },
            { label: 'Team Members', used: 6, total: 10 },
            { label: 'AI Queries', used: 100, total: 100, unlimited: true },
          ].map((item) => {
            const pct = item.unlimited ? 100 : Math.round((item.used / item.total) * 100);
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] text-[#cbd5e1]">{item.label}</span>
                  <span className="text-[12px] text-[#94a3b8]">
                    {item.unlimited ? 'Unlimited' : `${item.used} of ${item.total} used`}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                  <motion.div
                    className="h-full rounded-full bg-[#7eea57]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: easeOutExpo }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Payment Method */}
      <motion.div
        {...fadeSlideUp(0.15)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-4">Payment Method</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#162044]">
              <CreditCard className="size-5 text-[#94a3b8]" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-white">Visa ****4242</p>
              <p className="text-[12px] text-[#64748b]">Expires 09/27</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-[#1c2960] text-white hover:bg-[rgba(255,255,255,0.08)]"
          >
            Update Card
          </Button>
        </div>
      </motion.div>

      {/* Invoice History */}
      <motion.div
        {...fadeSlideUp(0.2)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Invoice History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Date</th>
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Amount</th>
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Status</th>
                <th className="pb-3 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.04, ease: easeOutExpo }}
                  className="border-b border-[rgba(255,255,255,0.04)] last:border-b-0"
                >
                  <td className="py-3 text-[13px] text-[#cbd5e1]">{inv.date}</td>
                  <td className="py-3 text-[13px] font-medium text-white">${inv.amount}</td>
                  <td className="py-3">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                    >
                      <CheckCircle2 className="size-3" /> {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-[12px] text-[#7eea57] hover:underline">
                      <Download className="size-3" /> Download
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notifications Tab                                                  */
/* ------------------------------------------------------------------ */
function NotificationsTab() {
  const [prefs, setPrefs] = useState<NotificationPref[]>(notificationPrefs);

  const toggleEmail = (id: string) => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, email: !p.email } : p))
    );
  };

  const toggleInApp = (id: string) => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inApp: !p.inApp } : p))
    );
  };

  const categories = [...new Set(prefs.map((p) => p.category))];

  return (
    <motion.div
      {...fadeSlideUp(0)}
      className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-6"
    >
      <h3 className="text-[22px] font-semibold text-white mb-6">Notification Preferences</h3>

      <div className="flex flex-col gap-8">
        {categories.map((category) => (
          <div key={category}>
            <h4 className="text-[14px] font-semibold text-[#94a3b8] uppercase tracking-[0.06em] mb-4">
              {category}
            </h4>
            <motion.div
              variants={staggerContainer(0.04)}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-3"
            >
              {prefs
                .filter((p) => p.category === category)
                .map((pref) => (
                  <motion.div
                    key={pref.id}
                    variants={staggerItem}
                    className="flex items-center justify-between rounded-[10px] bg-[#162044] px-4 py-3"
                  >
                    <div>
                      <p className="text-[14px] font-medium text-white">{pref.label}</p>
                      <p className="text-[12px] text-[#64748b]">{pref.description}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={pref.email}
                          onCheckedChange={() => toggleEmail(pref.id)}
                        />
                        <span className="text-[11px] text-[#94a3b8]">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={pref.inApp}
                          onCheckedChange={() => toggleInApp(pref.id)}
                        />
                        <span className="text-[11px] text-[#94a3b8]">In-app</span>
                      </label>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Security Tab                                                       */
/* ------------------------------------------------------------------ */
function SecurityTab() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [sessions, setSessions] = useState(activeSessions);

  const revokeSession = (index: number) => {
    setSessions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Two-Factor Authentication */}
      <motion.div
        {...fadeSlideUp(0)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-[rgba(34,197,94,0.1)]">
              <Shield className="size-5 text-[#22c55e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                >
                  <CheckCircle2 className="size-3" /> Enabled
                </span>
              </div>
              <p className="mt-1 text-[13px] text-[#94a3b8]">Method: Authenticator App</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={twoFAEnabled} onCheckedChange={setTwoFAEnabled} />
            <Button
              variant="outline"
              className="border-[#1c2960] text-white hover:bg-[rgba(255,255,255,0.08)]"
            >
              Reconfigure
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Active Sessions */}
      <motion.div
        {...fadeSlideUp(0.1)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Active Sessions</h3>
        <div className="flex flex-col gap-3">
          {sessions.map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-[10px] bg-[#162044] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Monitor className="size-5 text-[#94a3b8]" />
                <div>
                  <p className="text-[13px] font-medium text-white">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 text-[11px] text-[#7eea57]">(This device)</span>
                    )}
                  </p>
                  <p className="text-[11px] text-[#64748b]">
                    {session.location} · {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => revokeSession(i)}
                  className="text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]"
                >
                  <LogOut className="size-3.5 mr-1" /> Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Login History */}
      <motion.div
        {...fadeSlideUp(0.15)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Login History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Date</th>
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Time</th>
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Device</th>
                <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Location</th>
                <th className="pb-3 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-[#64748b]">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((log, i) => (
                <tr key={i} className="border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
                  <td className="py-3 text-[13px] text-[#cbd5e1]">{log.date}</td>
                  <td className="py-3 text-[13px] text-[#94a3b8]">{log.time}</td>
                  <td className="py-3 text-[13px] text-[#94a3b8]">{log.device}</td>
                  <td className="py-3 text-[13px] text-[#94a3b8]">{log.location}</td>
                  <td className="py-3 text-right">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: log.status === 'Success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                        color: log.status === 'Success' ? '#22c55e' : '#ef4444',
                      }}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform Tab                                                       */
/* ------------------------------------------------------------------ */
function PlatformTab() {
  const [theme, setTheme] = useState('dark');
  const [density, setDensity] = useState('default');
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="flex flex-col gap-6">
      {/* Appearance */}
      <motion.div
        {...fadeSlideUp(0)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Appearance</h3>

        {/* Theme */}
        <div className="mb-6">
          <label className="mb-2 block text-[12px] font-medium text-[#94a3b8]">Theme</label>
          <div className="flex gap-3">
            {[
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'light', label: 'Light', icon: Sun, disabled: true, badge: 'Coming soon' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => !t.disabled && setTheme(t.id)}
                disabled={t.disabled}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-3 text-[13px] font-medium transition-all',
                  theme === t.id
                    ? 'border-[#7eea57] bg-[rgba(126,234,87,0.08)] text-[#7eea57]'
                    : 'border-[#1c2960] bg-[#162044] text-[#94a3b8]',
                  t.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <t.icon className="size-4" />
                {t.label}
                {t.badge && (
                  <span className="ml-1 rounded-full bg-[#1c2960] px-1.5 py-0.5 text-[9px] text-[#64748b]">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Density */}
        <div>
          <label className="mb-2 block text-[12px] font-medium text-[#94a3b8]">Density</label>
          <div className="flex gap-3">
            {['compact', 'default', 'comfortable'].map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-3 text-[13px] font-medium capitalize transition-all',
                  density === d
                    ? 'border-[#7eea57] bg-[rgba(126,234,87,0.08)] text-[#7eea57]'
                    : 'border-[#1c2960] bg-[#162044] text-[#94a3b8]'
                )}
              >
                <Monitor className="size-4" />
                {d}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Language & Region */}
      <motion.div
        {...fadeSlideUp(0.1)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Language & Region</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-[#1c2960] bg-[#162044] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7eea57]"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Date Format</label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full rounded-md border border-[#1c2960] bg-[#162044] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7eea57]"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-md border border-[#1c2960] bg-[#162044] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7eea57]"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Default Views */}
      <motion.div
        {...fadeSlideUp(0.15)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Default Views</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Default Dashboard View</label>
            <select className="w-full rounded-md border border-[#1c2960] bg-[#162044] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7eea57]">
              <option>Overview</option>
              <option>Earnings</option>
              <option>Clients</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Default Date Range</label>
            <select className="w-full rounded-md border border-[#1c2960] bg-[#162044] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7eea57]">
              <option>30D</option>
              <option>90D</option>
              <option>1Y</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        {...fadeSlideUp(0.2)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Data Management</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            className="border-[#1c2960] text-white hover:bg-[rgba(255,255,255,0.08)]"
          >
            <Download className="size-4 mr-1.5" /> Export All Data
          </Button>
          <Button
            variant="ghost"
            className="text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]"
          >
            <Trash2 className="size-4 mr-1.5" /> Delete Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  API Tab                                                            */
/* ------------------------------------------------------------------ */
function APITab() {
  const [apiKey, setApiKey] = useState('cv_live_51H8m...9xK2pL7qR');
  const [showKey, setShowKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourapp.com/webhooks/clientvault');

  const regenerateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const random = Array.from({ length: 24 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    setApiKey(`cv_live_${random.slice(0, 4)}...${random.slice(-8)}`);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* API Documentation */}
      <motion.div
        {...fadeSlideUp(0)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-4">API Documentation</h3>
        <p className="text-[14px] text-[#94a3b8] mb-4">
          Use the ClientVault API to programmatically manage clients, prospects, earnings, and more.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[13px] text-[#7eea57] hover:underline"
          >
            <ExternalLink className="size-4" /> View API Documentation
          </a>
        </div>
        <div className="mt-4 rounded-[10px] bg-[#162044] p-3">
          <p className="text-[11px] text-[#64748b] uppercase tracking-[0.06em]">Base URL</p>
          <code className="mt-1 block text-[13px] text-[#7eea57]">https://api.clientvault.io/v1</code>
        </div>
      </motion.div>

      {/* API Key */}
      <motion.div
        {...fadeSlideUp(0.1)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">API Keys</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-[10px] bg-[#162044] p-4">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#64748b] uppercase tracking-[0.06em]">Live API Key</p>
              <div className="mt-1 flex items-center gap-2">
                <code className="text-[14px] text-white font-mono">
                  {showKey ? apiKey : apiKey.replace(/./g, '•')}
                </code>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="text-[#64748b] hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={copyKey}
                className="text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.08)]"
              >
                <Copy className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={regenerateKey}
                className="text-[#f59e0b] hover:bg-[rgba(245,158,11,0.1)] hover:text-[#f59e0b]"
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Webhooks */}
      <motion.div
        {...fadeSlideUp(0.15)}
        className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#0f1535] p-8"
      >
        <h3 className="text-[22px] font-semibold text-white mb-6">Webhooks</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#94a3b8]">Webhook URL</label>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 border-[#1c2960] bg-[#162044] text-white focus-visible:border-[#7eea57]"
              />
              <Button className="bg-[#7eea57] text-[#0a0e27] hover:bg-[#6dd446] font-semibold">
                Save
              </Button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-medium text-[#94a3b8]">Event Types</label>
            <div className="flex flex-wrap gap-2">
              {[
                'client.created',
                'client.updated',
                'prospect.converted',
                'earning.paid',
                'onboarding.completed',
              ].map((event) => (
                <label
                  key={event}
                  className="flex items-center gap-2 rounded-full border border-[#1c2960] bg-[#162044] px-3 py-1.5 text-[12px] text-[#cbd5e1] cursor-pointer hover:border-[#64748b]"
                >
                  <input type="checkbox" defaultChecked className="accent-[#7eea57]" />
                  {event}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-[#1c2960] text-white hover:bg-[rgba(255,255,255,0.08)]"
            >
              Test Webhook
            </Button>
          </div>

          {/* Recent deliveries */}
          <div className="mt-2">
            <p className="mb-2 text-[12px] font-medium text-[#94a3b8]">Recent Deliveries</p>
            <div className="flex flex-col gap-2">
              {[
                { event: 'client.created', status: '200 OK', time: '2 hours ago' },
                { event: 'earning.paid', status: '200 OK', time: '5 hours ago' },
                { event: 'prospect.converted', status: '200 OK', time: '1 day ago' },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-[#162044] px-3 py-2">
                  <span className="text-[12px] text-[#cbd5e1]">{d.event}</span>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: d.status.startsWith('2') ? '#22c55e' : '#ef4444' }}
                    >
                      {d.status}
                    </span>
                    <span className="text-[11px] text-[#475569]">{d.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Settings Page                                                 */
/* ------------------------------------------------------------------ */

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabContent: Record<string, React.ReactNode> = {
    profile: <ProfileTab />,
    team: <TeamTab />,
    integrations: <IntegrationsTab />,
    billing: <BillingTab />,
    notifications: <NotificationsTab />,
    security: <SecurityTab />,
    platform: <PlatformTab />,
    api: <APITab />,
  };

  return (
    <div className="min-h-full bg-[#0a0e27] p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
      >
        <h1 className="text-[36px] font-semibold tracking-[-0.02em] text-white">Settings</h1>
        <p className="mt-1 text-[15px] text-[#64748b]">
          Manage your account, team, and platform preferences
        </p>
      </motion.div>

      {/* Settings Layout */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        {/* Left Sidebar Tabs */}
        <motion.div
          {...fadeSlideUp(0.1)}
          className="flex-shrink-0 lg:w-[200px]"
        >
          <div className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all whitespace-nowrap',
                    isActive
                      ? 'border-l-2 border-[#7eea57] bg-[rgba(126,234,87,0.08)] text-white'
                      : 'border-l-2 border-transparent text-[#64748b] hover:text-[#cbd5e1]'
                  )}
                >
                  <tab.icon className={cn('size-4', isActive ? 'text-[#7eea57]' : 'text-[#64748b]')} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
