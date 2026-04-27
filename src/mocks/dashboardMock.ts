// Dashboard KPIs
export const dashboardKPIs = [
  {
    id: 'total-clients',
    label: 'Total Clients',
    value: 156,
    previous: 144,
    change: '+12 this month',
    changeType: 'positive' as const,
    icon: 'Users',
    accentColor: '#7eea57',
    sparklineData: [120, 125, 130, 132, 140, 144, 148, 150, 154, 156],
  },
  {
    id: 'active-onboarding',
    label: 'Active Onboarding',
    value: 8,
    previous: 6,
    change: '3 completing this week',
    changeType: 'info' as const,
    icon: 'Rocket',
    accentColor: '#3b82f6',
    progress: 60,
  },
  {
    id: 'monthly-revenue',
    label: 'Monthly Revenue',
    value: 24850,
    previous: 22100,
    change: '+12% vs last month',
    changeType: 'positive' as const,
    icon: 'DollarSign',
    accentColor: '#22c55e',
    sparklineData: [18000, 19200, 21000, 20500, 23000, 22100, 23500, 24000, 24600, 24850],
  },
  {
    id: 'churn-risk',
    label: 'Churn Risk',
    value: 3,
    previous: 5,
    change: 'At-risk clients',
    changeType: 'warning' as const,
    icon: 'AlertTriangle',
    accentColor: '#f59e0b',
    avatars: ['QC', 'NS', 'PE'],
  },
];

// Revenue chart data
export const revenueChartData = [
  { month: 'Jan', current: 18200, previous: 15400 },
  { month: 'Feb', current: 21000, previous: 16800 },
  { month: 'Mar', current: 19500, previous: 18200 },
  { month: 'Apr', current: 23000, previous: 20100 },
  { month: 'May', current: 22100, previous: 21500 },
  { month: 'Jun', current: 24850, previous: 22800 },
];

// Recent activities
export interface Activity {
  id: string;
  description: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'purple';
}

export const activities: Activity[] = [
  { id: '1', description: 'Acme Corp completed onboarding phase 3', time: '2 hours ago', type: 'success' },
  { id: '2', description: 'New prospect: Zenith Media ($15K potential)', time: '4 hours ago', type: 'purple' },
  { id: '3', description: 'Payout of $3,200 processed for BrightPath', time: '6 hours ago', type: 'success' },
  { id: '4', description: 'QuantumLabs at risk: 14 days inactive', time: '8 hours ago', type: 'warning' },
  { id: '5', description: 'NovaScale started offboarding workflow', time: '1 day ago', type: 'warning' },
  { id: '6', description: 'Revenue milestone: $100K total earnings!', time: '1 day ago', type: 'success' },
  { id: '7', description: 'AI suggested: Follow up with ApexDigital', time: '1 day ago', type: 'info' },
  { id: '8', description: 'TechStart earned $1,200 from ads this week', time: '2 days ago', type: 'success' },
  { id: '9', description: 'Sarah added a new prospect: Catalyst Partners', time: '2 days ago', type: 'purple' },
  { id: '10', description: 'Meridian Group paid invoice #2841 ($8,500)', time: '3 days ago', type: 'success' },
  { id: '11', description: 'System: Weekly backup completed successfully', time: '3 days ago', type: 'info' },
  { id: '12', description: 'Pinnacle Tech requested service upgrade', time: '4 days ago', type: 'info' },
];

// Onboarding preview
export const onboardingPreview = [
  { id: '1', name: 'TechFlow Inc', company: 'TechFlow', progress: 75, avatar: 'TF' },
  { id: '2', name: 'QuantumLabs', company: 'QuantumLabs', progress: 40, avatar: 'QL' },
  { id: '3', name: 'NovaScale', company: 'NovaScale', progress: 90, avatar: 'NS' },
  { id: '4', name: 'BrightPath AI', company: 'BrightPath', progress: 55, avatar: 'BP' },
  { id: '5', name: 'ApexDigital', company: 'ApexDigital', progress: 20, avatar: 'AD' },
];

// Earnings quick view
export const earningsQuickView = [
  { name: 'Services', value: 12000, color: '#7eea57', percentage: 48 },
  { name: 'Ads', value: 8500, color: '#3b82f6', percentage: 34 },
  { name: 'Referrals', value: 4300, color: '#8b5cf6', percentage: 18 },
];

// Top 5 clients by earnings
export const topEarningClients = [
  { name: 'Acme Corp', earnings: 8450 },
  { name: 'TechStart', earnings: 6200 },
  { name: 'Meridian Group', earnings: 5100 },
  { name: 'BrightPath AI', earnings: 4300 },
  { name: 'NovaScale', earnings: 3800 },
];

// Prospect types
export type ProspectStage = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';

export interface Prospect {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  probability: number;
  stage: ProspectStage;
  assignee: string;
  assigneeAvatar: string;
  lastContact: string;
  aiScore: number;
  source: string;
  notes: string;
  tags: string[];
}

// Prospects mock data
export const prospects: Prospect[] = [
  // Lead (5)
  { id: 'p1', name: 'Zenith Media', company: 'Zenith Media', email: 'contact@zenith.com', phone: '+1 (555) 100-1001', value: 15000, probability: 25, stage: 'Lead', assignee: 'Sarah Chen', assigneeAvatar: 'SC', lastContact: '2 days ago', aiScore: 72, source: 'Website', notes: 'Interested in full service package. Follow up in 3 days.', tags: ['Website', 'Score: 72'] },
  { id: 'p2', name: 'Catalyst Partners', company: 'Catalyst Partners', email: 'info@catalyst.com', phone: '+1 (555) 100-1002', value: 8000, probability: 15, stage: 'Lead', assignee: 'Marcus Johnson', assigneeAvatar: 'MJ', lastContact: '5 days ago', aiScore: 45, source: 'Cold outreach', notes: 'Low engagement. Consider nurturing campaign.', tags: ['Cold outreach', 'Score: 45'] },
  { id: 'p3', name: 'NorthStar Ventures', company: 'NorthStar Ventures', email: 'hello@northstar.com', phone: '+1 (555) 100-1003', value: 12000, probability: 30, stage: 'Lead', assignee: 'Sarah Chen', assigneeAvatar: 'SC', lastContact: '1 day ago', aiScore: 88, source: 'Referral', notes: 'High-value referral from Meridian Group. Very interested.', tags: ['Referral', 'Score: 88'] },
  { id: 'p4', name: 'BlueOcean Digital', company: 'BlueOcean Digital', email: 'team@blueocean.com', phone: '+1 (555) 100-1004', value: 6000, probability: 20, stage: 'Lead', assignee: 'Priya Patel', assigneeAvatar: 'PP', lastContact: '3 days ago', aiScore: 55, source: 'Ad', notes: 'Clicked ad twice, downloaded case study.', tags: ['Ad', 'Score: 55'] },
  { id: 'p5', name: 'Elevate Corp', company: 'Elevate Corp', email: 'contact@elevate.com', phone: '+1 (555) 100-1005', value: 4000, probability: 20, stage: 'Lead', assignee: 'Tom Wright', assigneeAvatar: 'TW', lastContact: '4 days ago', aiScore: 60, source: 'Event', notes: 'Met at SaaS conference. Requested pricing info.', tags: ['Event', 'Score: 60'] },
  // Qualified (3)
  { id: 'p6', name: 'Pinnacle Tech', company: 'Pinnacle Tech', email: 'sales@pinnacle.com', phone: '+1 (555) 100-2001', value: 28000, probability: 65, stage: 'Qualified', assignee: 'Sarah Chen', assigneeAvatar: 'SC', lastContact: '12 hours ago', aiScore: 91, source: 'Referral', notes: 'Excellent fit. Decision maker engaged. Proposal ready.', tags: ['Referral', 'Score: 91'] },
  { id: 'p7', name: 'Aurora Systems', company: 'Aurora Systems', email: 'hello@aurora.com', phone: '+1 (555) 100-2002', value: 25000, probability: 55, stage: 'Qualified', assignee: 'Marcus Johnson', assigneeAvatar: 'MJ', lastContact: '1 day ago', aiScore: 78, source: 'Website', notes: 'Completed demo request. Budget confirmed.', tags: ['Website', 'Score: 78'] },
  { id: 'p8', name: 'Forge Digital', company: 'Forge Digital', email: 'team@forge.com', phone: '+1 (555) 100-2003', value: 25000, probability: 60, stage: 'Qualified', assignee: 'Priya Patel', assigneeAvatar: 'PP', lastContact: '6 hours ago', aiScore: 82, source: 'Partner', notes: 'Strong partner referral. Technical evaluation passed.', tags: ['Partner', 'Score: 82'] },
  // Proposal (2)
  { id: 'p9', name: 'Titan Solutions', company: 'Titan Solutions', email: 'contact@titan.com', phone: '+1 (555) 100-3001', value: 48000, probability: 75, stage: 'Proposal', assignee: 'Sarah Chen', assigneeAvatar: 'SC', lastContact: '3 hours ago', aiScore: 95, source: 'Referral', notes: 'Proposal sent. Awaiting feedback. High close probability.', tags: ['Referral', 'Score: 95'] },
  { id: 'p10', name: 'Apex Enterprise', company: 'Apex Enterprise', email: 'sales@apex.com', phone: '+1 (555) 100-3002', value: 48000, probability: 70, stage: 'Proposal', assignee: 'Marcus Johnson', assigneeAvatar: 'MJ', lastContact: '8 hours ago', aiScore: 89, source: 'Website', notes: 'Custom proposal prepared. Review meeting scheduled.', tags: ['Website', 'Score: 89'] },
  // Negotiation (1)
  { id: 'p11', name: 'Summit Global', company: 'Summit Global', email: 'team@summit.com', phone: '+1 (555) 100-4001', value: 45000, probability: 85, stage: 'Negotiation', assignee: 'Sarah Chen', assigneeAvatar: 'SC', lastContact: '1 hour ago', aiScore: 87, source: 'Event', notes: 'Final pricing negotiation. Legal review in progress.', tags: ['Event', 'Score: 87'] },
  // Closed (1)
  { id: 'p12', name: 'Meridian Group', company: 'Meridian Group', email: 'contact@meridian.com', phone: '+1 (555) 100-5001', value: 20000, probability: 100, stage: 'Closed', assignee: 'Lisa Park', assigneeAvatar: 'LP', lastContact: '2 days ago', aiScore: 100, source: 'Referral', notes: 'Deal closed! Onboarding scheduled for next week.', tags: ['Referral', 'Score: 100'] },
];

// Team members
export const teamMembers = [
  { id: 't1', name: 'Alex Morgan', role: 'Owner', email: 'alex@clientvault.com', avatar: 'AM', status: 'active' as const },
  { id: 't2', name: 'Sarah Chen', role: 'Admin', email: 'sarah@clientvault.com', avatar: 'SC', status: 'active' as const },
  { id: 't3', name: 'Marcus Johnson', role: 'Editor', email: 'marcus@clientvault.com', avatar: 'MJ', status: 'active' as const },
  { id: 't4', name: 'Priya Patel', role: 'Viewer', email: 'priya@clientvault.com', avatar: 'PP', status: 'active' as const },
  { id: 't5', name: 'Tom Wright', role: 'Editor', email: 'tom@clientvault.com', avatar: 'TW', status: 'invited' as const },
  { id: 't6', name: 'Lisa Park', role: 'Viewer', email: 'lisa@clientvault.com', avatar: 'LP', status: 'active' as const },
];

// Invoices
export const invoices = [
  { id: 'INV-001', date: 'Jun 15, 2025', amount: 49, status: 'Paid' as const, plan: 'Growth' },
  { id: 'INV-002', date: 'May 15, 2025', amount: 49, status: 'Paid' as const, plan: 'Growth' },
  { id: 'INV-003', date: 'Apr 15, 2025', amount: 49, status: 'Paid' as const, plan: 'Growth' },
  { id: 'INV-004', date: 'Mar 15, 2025', amount: 49, status: 'Paid' as const, plan: 'Growth' },
  { id: 'INV-005', date: 'Feb 15, 2025', amount: 49, status: 'Paid' as const, plan: 'Growth' },
  { id: 'INV-006', date: 'Jan 15, 2025', amount: 49, status: 'Paid' as const, plan: 'Growth' },
];

// Pipeline stage config — monochrome violet ramp + neutral grey for new leads
export const pipelineStages: { stage: ProspectStage; color: string; bgColor: string }[] = [
  { stage: 'Lead', color: '#9aa0a6', bgColor: 'rgba(154, 160, 166, 0.12)' },
  { stage: 'Qualified', color: '#cdc4f1', bgColor: 'rgba(205, 196, 241, 0.20)' },
  { stage: 'Proposal', color: '#a89aea', bgColor: 'rgba(168, 154, 234, 0.20)' },
  { stage: 'Negotiation', color: '#8466e0', bgColor: 'rgba(132, 102, 224, 0.18)' },
  { stage: 'Closed', color: '#6f4bd8', bgColor: 'rgba(111, 75, 216, 0.16)' },
];

// Integration data
export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: string;
}

export const integrations: Integration[] = [
  { id: 'slack', name: 'Slack', description: 'Receive notifications and run commands from Slack', connected: true, icon: 'MessageSquare' },
  { id: 'stripe', name: 'Stripe', description: 'Sync payment data and track revenue automatically', connected: true, icon: 'CreditCard' },
  { id: 'hubspot', name: 'HubSpot', description: 'Sync prospect and client data with HubSpot CRM', connected: false, icon: 'Database' },
  { id: 'google', name: 'Google Workspace', description: 'Single sign-on and calendar sync', connected: true, icon: 'Mail' },
  { id: 'zapier', name: 'Zapier', description: 'Connect with 5,000+ apps via Zapier', connected: false, icon: 'Zap' },
];

// Notification preferences
export interface NotificationPref {
  id: string;
  label: string;
  description: string;
  email: boolean;
  inApp: boolean;
  category: string;
}

export const notificationPrefs: NotificationPref[] = [
  { id: 'n1', label: 'Payout received', description: 'Get notified when a payout is processed', email: true, inApp: true, category: 'Earnings' },
  { id: 'n2', label: 'Milestone reached', description: 'Get notified when you hit revenue milestones', email: false, inApp: true, category: 'Earnings' },
  { id: 'n3', label: 'Revenue drop alert', description: 'Get alerted when revenue drops significantly', email: true, inApp: false, category: 'Earnings' },
  { id: 'n4', label: 'New client added', description: 'Get notified when a new client is added', email: false, inApp: true, category: 'Clients' },
  { id: 'n5', label: 'Client offboarding started', description: 'Get notified when offboarding begins', email: true, inApp: true, category: 'Clients' },
  { id: 'n6', label: 'Churn risk detected', description: 'Get alerted when a client is at risk', email: true, inApp: true, category: 'Clients' },
  { id: 'n7', label: 'Phase completed', description: 'Get notified when an onboarding phase completes', email: false, inApp: true, category: 'Onboarding' },
  { id: 'n8', label: 'Task overdue', description: 'Get notified when tasks go overdue', email: true, inApp: true, category: 'Onboarding' },
  { id: 'n9', label: 'Onboarding stalled', description: 'Get alerted when onboarding stalls', email: true, inApp: false, category: 'Onboarding' },
  { id: 'n10', label: 'Weekly digest', description: 'Receive a weekly summary of activity', email: true, inApp: false, category: 'System' },
  { id: 'n11', label: 'Security alert', description: 'Get notified of security-related events', email: true, inApp: true, category: 'System' },
];

// Active sessions
export const activeSessions = [
  { device: 'MacBook Pro', location: 'New York, US', lastActive: 'Now', current: true },
  { device: 'iPhone 15', location: 'New York, US', lastActive: '2h ago', current: false },
];

// Login history
export const loginHistory = [
  { date: 'Jul 2, 2025', time: '09:14 AM', device: 'MacBook Pro', location: 'New York, US', status: 'Success' },
  { date: 'Jul 1, 2025', time: '06:42 PM', device: 'iPhone 15', location: 'New York, US', status: 'Success' },
  { date: 'Jul 1, 2025', time: '08:30 AM', device: 'MacBook Pro', location: 'New York, US', status: 'Success' },
  { date: 'Jun 30, 2025', time: '05:15 PM', device: 'Safari Browser', location: 'New York, US', status: 'Success' },
  { date: 'Jun 28, 2025', time: '11:22 AM', device: 'MacBook Pro', location: 'Boston, US', status: 'Success' },
];

// AI chat suggested queries
export const aiSuggestedQueries = [
  'Show top earners',
  "Who's at risk?",
  'Revenue this quarter',
  'Start onboarding',
];

// AI chat commands for Dashboard card
export const aiChatCommands = [
  { command: 'Show me at-risk clients', description: 'Get a list of clients with churn risk' },
  { command: "What's our revenue this month?", description: 'View current month revenue breakdown' },
  { command: 'Onboard new client', description: 'Start the client onboarding wizard' },
];
