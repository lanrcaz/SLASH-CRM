export type ClientStatus = 'Active' | 'Onboarding' | 'Offboarding' | 'Churned' | 'Prospect';

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: ClientStatus;
  avatar: string;
  joinDate: string;
  healthScore: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  mrr: number;
  lastActive: string;
  industry: string;
  phone: string;
  address: string;
  notes: string;
  totalEarnings: number;
  servicesActive: number;
  daysWithUs: number;
  tags: string[];
}

export interface Earning {
  id: string;
  clientId: string;
  amount: number;
  source: string;
  status: 'Paid' | 'Pending' | 'Rejected';
  date: string;
  campaign: string;
}

export interface Activity {
  id: string;
  clientId: string;
  type: 'email' | 'call' | 'task' | 'earning' | 'service' | 'milestone' | 'onboarding' | 'review';
  description: string;
  timestamp: string;
  user: string;
  userAvatar?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  icon: string;
  clientId?: string;
  startedDate?: string;
  totalRevenue?: number;
}

export interface OnboardingStep {
  id: string;
  clientId: string;
  phase: number;
  phaseName: string;
  title: string;
  completed: boolean;
  dueDate: string;
  completedDate?: string;
}

export const clients: Client[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@acmecorp.com',
    company: 'Acme Corp',
    status: 'Active',
    avatar: 'SC',
    joinDate: '2024-01-15',
    healthScore: 92,
    churnRisk: 'Low',
    mrr: 7500,
    lastActive: '2025-01-20T14:30:00Z',
    industry: 'Technology',
    phone: '+1 (555) 123-4567',
    address: '123 Market St, San Francisco, CA',
    notes: 'Key enterprise client. Expansion opportunity in Q2.',
    totalEarnings: 48200,
    servicesActive: 3,
    daysWithUs: 371,
    tags: ['Premium', 'Enterprise'],
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@techflow.io',
    company: 'TechFlow Inc',
    status: 'Onboarding',
    avatar: 'MJ',
    joinDate: '2025-01-10',
    healthScore: 78,
    churnRisk: 'Low',
    mrr: 3200,
    lastActive: '2025-01-20T10:15:00Z',
    industry: 'SaaS',
    phone: '+1 (555) 234-5678',
    address: '456 Mission St, San Francisco, CA',
    notes: 'Currently in integration phase. Responsive team.',
    totalEarnings: 12500,
    servicesActive: 1,
    daysWithUs: 10,
    tags: ['New'],
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@quantumlabs.ai',
    company: 'QuantumLabs',
    status: 'Active',
    avatar: 'ER',
    joinDate: '2023-08-20',
    healthScore: 88,
    churnRisk: 'Low',
    mrr: 12100,
    lastActive: '2025-01-19T16:45:00Z',
    industry: 'AI/ML',
    phone: '+1 (555) 345-6789',
    address: '789 Innovation Dr, Austin, TX',
    notes: 'Highest value client. Multiple service lines.',
    totalEarnings: 89400,
    servicesActive: 4,
    daysWithUs: 518,
    tags: ['Premium', 'Strategic'],
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david@novascale.com',
    company: 'NovaScale',
    status: 'Offboarding',
    avatar: 'DP',
    joinDate: '2023-05-10',
    healthScore: 45,
    churnRisk: 'High',
    mrr: 1800,
    lastActive: '2025-01-15T09:00:00Z',
    industry: 'Cloud Infrastructure',
    phone: '+1 (555) 456-7890',
    address: '321 Cloud Way, Seattle, WA',
    notes: 'Offboarding due to acquisition. Handle data export carefully.',
    totalEarnings: 34100,
    servicesActive: 1,
    daysWithUs: 620,
    tags: ['Offboarding'],
  },
  {
    id: '5',
    name: 'Amelia Foster',
    email: 'amelia@brightpath.co',
    company: 'BrightPath',
    status: 'Active',
    avatar: 'AF',
    joinDate: '2024-03-01',
    healthScore: 85,
    churnRisk: 'Low',
    mrr: 5800,
    lastActive: '2025-01-20T11:30:00Z',
    industry: 'EdTech',
    phone: '+1 (555) 567-8901',
    address: '567 Learning Ln, Boston, MA',
    notes: 'Growing account. Added Content Marketing in Q4.',
    totalEarnings: 67800,
    servicesActive: 3,
    daysWithUs: 325,
    tags: ['Growing'],
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james@zenithmedia.tv',
    company: 'Zenith Media',
    status: 'Prospect',
    avatar: 'JW',
    joinDate: '',
    healthScore: 0,
    churnRisk: 'Medium',
    mrr: 0,
    lastActive: '2025-01-18T13:00:00Z',
    industry: 'Media',
    phone: '+1 (555) 678-9012',
    address: '890 Broadcast Blvd, Los Angeles, CA',
    notes: 'Proposal sent. Awaiting decision by end of month.',
    totalEarnings: 0,
    servicesActive: 0,
    daysWithUs: 0,
    tags: ['Proposal Sent'],
  },
  {
    id: '7',
    name: 'Lisa Nakamura',
    email: 'lisa@apexdigital.jp',
    company: 'ApexDigital',
    status: 'Active',
    avatar: 'LN',
    joinDate: '2024-06-15',
    healthScore: 76,
    churnRisk: 'Medium',
    mrr: 4200,
    lastActive: '2025-01-20T08:45:00Z',
    industry: 'E-commerce',
    phone: '+1 (555) 789-0123',
    address: '234 Commerce St, New York, NY',
    notes: 'Health score dipping - schedule quarterly review.',
    totalEarnings: 23600,
    servicesActive: 2,
    daysWithUs: 219,
    tags: ['At Risk'],
  },
  {
    id: '8',
    name: 'Robert Taylor',
    email: 'robert@polaris.group',
    company: 'Polaris Group',
    status: 'Onboarding',
    avatar: 'RT',
    joinDate: '2025-01-05',
    healthScore: 65,
    churnRisk: 'Low',
    mrr: 2800,
    lastActive: '2025-01-19T15:20:00Z',
    industry: 'Consulting',
    phone: '+1 (555) 890-1234',
    address: '345 Polaris Ave, Chicago, IL',
    notes: 'Phase 2 of onboarding. API integrations in progress.',
    totalEarnings: 5200,
    servicesActive: 1,
    daysWithUs: 15,
    tags: ['New'],
  },
  {
    id: '9',
    name: 'Catherine Lee',
    email: 'cat@summitco.io',
    company: 'SummitCo',
    status: 'Active',
    avatar: 'CL',
    joinDate: '2023-11-01',
    healthScore: 94,
    churnRisk: 'Low',
    mrr: 9500,
    lastActive: '2025-01-20T12:00:00Z',
    industry: 'FinTech',
    phone: '+1 (555) 901-2345',
    address: '456 Summit Rd, Denver, CO',
    notes: 'Excellent client. Referral source for 2 new prospects.',
    totalEarnings: 91200,
    servicesActive: 3,
    daysWithUs: 445,
    tags: ['Premium', 'Advocate'],
  },
  {
    id: '10',
    name: 'Oliver Martinez',
    email: 'oliver@veridianlabs.co',
    company: 'Veridian Labs',
    status: 'Churned',
    avatar: 'OM',
    joinDate: '2023-04-01',
    healthScore: 20,
    churnRisk: 'High',
    mrr: 0,
    lastActive: '2024-12-01T10:00:00Z',
    industry: 'Biotech',
    phone: '+1 (555) 012-3456',
    address: '789 Lab Ct, San Diego, CA',
    notes: 'Churned due to budget cuts. Potential return in 2026.',
    totalEarnings: 18900,
    servicesActive: 0,
    daysWithUs: 609,
    tags: ['Churned'],
  },
  {
    id: '11',
    name: 'Sophia Anderson',
    email: 'sophia@orbitsys.io',
    company: 'Orbit Systems',
    status: 'Active',
    avatar: 'SA',
    joinDate: '2024-05-20',
    healthScore: 81,
    churnRisk: 'Low',
    mrr: 6800,
    lastActive: '2025-01-19T17:30:00Z',
    industry: 'SpaceTech',
    phone: '+1 (555) 111-2222',
    address: '012 Orbit Way, Houston, TX',
    notes: 'Strong performance. Interested in additional services.',
    totalEarnings: 56300,
    servicesActive: 2,
    daysWithUs: 245,
    tags: ['Growing'],
  },
  {
    id: '12',
    name: 'Daniel Kim',
    email: 'daniel@catalyst.partners',
    company: 'Catalyst Partners',
    status: 'Prospect',
    avatar: 'DK',
    joinDate: '',
    healthScore: 0,
    churnRisk: 'Medium',
    mrr: 0,
    lastActive: '2025-01-17T14:00:00Z',
    industry: 'Venture Capital',
    phone: '+1 (555) 222-3333',
    address: '345 Venture Blvd, Palo Alto, CA',
    notes: 'Discovery call completed. Sending custom proposal.',
    totalEarnings: 0,
    servicesActive: 0,
    daysWithUs: 0,
    tags: ['Discovery'],
  },
];

export const earnings: Earning[] = [
  { id: 'e1', clientId: '1', amount: 3200, source: 'Ad Revenue', status: 'Paid', date: '2025-01-15', campaign: 'Q1 Growth' },
  { id: 'e2', clientId: '1', amount: 2500, source: 'Service Fee', status: 'Paid', date: '2025-01-10', campaign: 'Monthly Retainer' },
  { id: 'e3', clientId: '1', amount: 850, source: 'Referral', status: 'Paid', date: '2025-01-05', campaign: 'Partner Referral' },
  { id: 'e4', clientId: '1', amount: 2800, source: 'Ad Revenue', status: 'Pending', date: '2025-01-01', campaign: 'Winter Campaign' },
  { id: 'e5', clientId: '1', amount: 2500, source: 'Service Fee', status: 'Paid', date: '2024-12-28', campaign: 'Monthly Retainer' },
  { id: 'e6', clientId: '1', amount: 1200, source: 'Upgrade', status: 'Paid', date: '2024-12-20', campaign: 'Premium Upgrade' },
  { id: 'e7', clientId: '1', amount: 2950, source: 'Ad Revenue', status: 'Paid', date: '2024-12-15', campaign: 'Holiday Special' },
  { id: 'e8', clientId: '1', amount: 2500, source: 'Service Fee', status: 'Paid', date: '2024-12-10', campaign: 'Monthly Retainer' },
  { id: 'e9', clientId: '1', amount: 600, source: 'Referral', status: 'Paid', date: '2024-12-05', campaign: 'Client Referral' },
  { id: 'e10', clientId: '1', amount: 2600, source: 'Ad Revenue', status: 'Paid', date: '2024-12-01', campaign: 'Winter Campaign' },
  { id: 'e11', clientId: '3', amount: 8500, source: 'Service Fee', status: 'Paid', date: '2025-01-15', campaign: 'Enterprise Retainer' },
  { id: 'e12', clientId: '3', amount: 4200, source: 'Ad Revenue', status: 'Paid', date: '2025-01-10', campaign: 'AI Product Launch' },
  { id: 'e13', clientId: '3', amount: 3800, source: 'Consulting', status: 'Paid', date: '2025-01-05', campaign: 'Strategy Session' },
  { id: 'e14', clientId: '3', amount: 8500, source: 'Service Fee', status: 'Pending', date: '2025-01-01', campaign: 'Enterprise Retainer' },
  { id: 'e15', clientId: '5', amount: 5800, source: 'Service Fee', status: 'Paid', date: '2025-01-15', campaign: 'Monthly Retainer' },
  { id: 'e16', clientId: '5', amount: 2100, source: 'Content', status: 'Paid', date: '2025-01-08', campaign: 'Blog Package' },
  { id: 'e17', clientId: '9', amount: 9500, source: 'Service Fee', status: 'Paid', date: '2025-01-15', campaign: 'Premium Retainer' },
  { id: 'e18', clientId: '9', amount: 3500, source: 'Referral', status: 'Paid', date: '2025-01-10', campaign: 'FinTech Connect' },
  { id: 'e19', clientId: '7', amount: 4200, source: 'Service Fee', status: 'Pending', date: '2025-01-10', campaign: 'Monthly Retainer' },
  { id: 'e20', clientId: '11', amount: 6800, source: 'Service Fee', status: 'Paid', date: '2025-01-12', campaign: 'Monthly Retainer' },
];

export const activities: Activity[] = [
  { id: 'a1', clientId: '1', type: 'onboarding', description: 'Onboarding completed successfully', timestamp: '2024-01-30T10:00:00Z', user: 'System' },
  { id: 'a2', clientId: '1', type: 'service', description: 'First service activated: Ad Management', timestamp: '2024-02-05T14:00:00Z', user: 'Alex Morgan' },
  { id: 'a3', clientId: '1', type: 'milestone', description: '$1K earnings milestone reached', timestamp: '2024-02-15T09:00:00Z', user: 'System' },
  { id: 'a4', clientId: '1', type: 'service', description: 'Service added: SEO Optimization', timestamp: '2024-03-10T11:00:00Z', user: 'Alex Morgan' },
  { id: 'a5', clientId: '1', type: 'milestone', description: '$5K earnings milestone reached', timestamp: '2024-03-25T16:00:00Z', user: 'System' },
  { id: 'a6', clientId: '1', type: 'earning', description: 'Revenue spike: +40% MoM growth', timestamp: '2024-04-20T13:00:00Z', user: 'System' },
  { id: 'a7', clientId: '1', type: 'service', description: 'Service added: Content Marketing', timestamp: '2024-05-01T10:00:00Z', user: 'Alex Morgan' },
  { id: 'a8', clientId: '1', type: 'milestone', description: '$10K earnings milestone reached', timestamp: '2024-05-15T09:00:00Z', user: 'System' },
  { id: 'a9', clientId: '1', type: 'review', description: 'Quarterly review completed - Health score: 92/100', timestamp: '2024-06-01T11:00:00Z', user: 'Alex Morgan' },
  { id: 'a10', clientId: '1', type: 'milestone', description: '$25K earnings milestone reached', timestamp: '2024-06-20T14:00:00Z', user: 'System' },
  { id: 'a11', clientId: '1', type: 'call', description: 'Monthly strategy call - discussed Q3 expansion', timestamp: '2024-07-10T15:00:00Z', user: 'Alex Morgan' },
  { id: 'a12', clientId: '1', type: 'email', description: 'Campaign performance report sent', timestamp: '2025-01-15T10:00:00Z', user: 'System' },
  { id: 'a13', clientId: '1', type: 'task', description: 'SEO audit completed - 12 improvements made', timestamp: '2025-01-18T09:00:00Z', user: 'Jordan Lee' },
  { id: 'a14', clientId: '1', type: 'earning', description: 'Ad Revenue payment processed: $3,200', timestamp: '2025-01-15T12:00:00Z', user: 'System' },
  { id: 'a15', clientId: '2', type: 'onboarding', description: 'Phase 1: Setup completed', timestamp: '2025-01-12T10:00:00Z', user: 'System' },
  { id: 'a16', clientId: '2', type: 'task', description: 'API credentials configured', timestamp: '2025-01-14T14:00:00Z', user: 'Alex Morgan' },
  { id: 'a17', clientId: '2', type: 'service', description: 'First service activated: Ad Management', timestamp: '2025-01-15T09:00:00Z', user: 'System' },
  { id: 'a18', clientId: '3', type: 'review', description: 'Annual business review - expansion plan approved', timestamp: '2025-01-10T11:00:00Z', user: 'Alex Morgan' },
  { id: 'a19', clientId: '4', type: 'task', description: 'Offboarding initiated - data export requested', timestamp: '2025-01-10T09:00:00Z', user: 'System' },
  { id: 'a20', clientId: '4', type: 'call', description: 'Exit interview - feedback collected', timestamp: '2025-01-12T15:00:00Z', user: 'Jordan Lee' },
  { id: 'a21', clientId: '5', type: 'service', description: 'Service upgraded: Premium Content Package', timestamp: '2025-01-08T10:00:00Z', user: 'Alex Morgan' },
  { id: 'a22', clientId: '6', type: 'email', description: 'Proposal delivered: $5,200/mo package', timestamp: '2025-01-17T14:00:00Z', user: 'Alex Morgan' },
  { id: 'a23', clientId: '9', type: 'milestone', description: '$50K earnings milestone reached', timestamp: '2025-01-05T09:00:00Z', user: 'System' },
  { id: 'a24', clientId: '9', type: 'call', description: 'Referral program discussion - 2 introductions made', timestamp: '2025-01-10T16:00:00Z', user: 'Alex Morgan' },
];

export const services: Service[] = [
  {
    id: 's1',
    name: 'Ad Management',
    description: 'Full-service ad campaign management across Google, Meta, and LinkedIn. Includes A/B testing, budget optimization, and monthly reporting.',
    price: 2500,
    category: 'Marketing',
    active: true,
    icon: 'Target',
  },
  {
    id: 's2',
    name: 'SEO Optimization',
    description: 'Technical SEO, content strategy, and ranking improvements. Monthly audits and competitor analysis included.',
    price: 1800,
    category: 'Marketing',
    active: true,
    icon: 'Search',
  },
  {
    id: 's3',
    name: 'Content Marketing',
    description: 'Blog posts, social content, and email campaigns. Includes editorial calendar and performance tracking.',
    price: 3200,
    category: 'Marketing',
    active: true,
    icon: 'FileText',
  },
  {
    id: 's4',
    name: 'Social Media Management',
    description: 'Daily posting, community management, and growth strategies across all major platforms.',
    price: 1500,
    category: 'Social',
    active: true,
    icon: 'Share2',
  },
  {
    id: 's5',
    name: 'Email Marketing',
    description: 'Campaign design, automation flows, list management, and performance analytics.',
    price: 1200,
    category: 'Marketing',
    active: false,
    icon: 'Mail',
  },
  {
    id: 's6',
    name: 'Analytics & Reporting',
    description: 'Custom dashboards, monthly reports, and data-driven insights for decision making.',
    price: 900,
    category: 'Data',
    active: true,
    icon: 'BarChart3',
  },
  {
    id: 's7',
    name: 'Web Development',
    description: 'Landing pages, website optimizations, and technical implementations.',
    price: 4500,
    category: 'Dev',
    active: false,
    icon: 'Code',
  },
  {
    id: 's8',
    name: 'Consulting',
    description: 'Strategic consulting for growth, positioning, and market expansion.',
    price: 5000,
    category: 'Strategy',
    active: true,
    icon: 'Lightbulb',
  },
];

export const clientServices: Service[] = [
  { id: 'cs1', name: 'Ad Management', description: 'Full-service ad campaign management', price: 2500, category: 'Marketing', active: true, clientId: '1', startedDate: '2024-02-01', totalRevenue: 27000, icon: 'Target' },
  { id: 'cs2', name: 'SEO Optimization', description: 'Technical SEO and content strategy', price: 1800, category: 'Marketing', active: true, clientId: '1', startedDate: '2024-03-10', totalRevenue: 16200, icon: 'Search' },
  { id: 'cs3', name: 'Content Marketing', description: 'Blog posts and social content', price: 3200, category: 'Marketing', active: true, clientId: '1', startedDate: '2024-05-01', totalRevenue: 25600, icon: 'FileText' },
  { id: 'cs4', name: 'Ad Management', description: 'Full-service ad campaign management', price: 5500, category: 'Marketing', active: true, clientId: '3', startedDate: '2023-09-01', totalRevenue: 77000, icon: 'Target' },
  { id: 'cs5', name: 'Consulting', description: 'Strategic growth consulting', price: 5000, category: 'Strategy', active: true, clientId: '3', startedDate: '2023-10-15', totalRevenue: 15000, icon: 'Lightbulb' },
  { id: 'cs6', name: 'Analytics & Reporting', description: 'Custom dashboards and insights', price: 1600, category: 'Data', active: true, clientId: '3', startedDate: '2024-01-01', totalRevenue: 19200, icon: 'BarChart3' },
];

export const onboardingSteps: OnboardingStep[] = [
  { id: 'os1', clientId: '1', phase: 1, phaseName: 'Setup', title: 'Account creation & configuration', completed: true, dueDate: '2024-01-20', completedDate: '2024-01-18' },
  { id: 'os2', clientId: '1', phase: 1, phaseName: 'Setup', title: 'Team access & permissions', completed: true, dueDate: '2024-01-22', completedDate: '2024-01-20' },
  { id: 'os3', clientId: '1', phase: 1, phaseName: 'Setup', title: 'Initial data import', completed: true, dueDate: '2024-01-25', completedDate: '2024-01-23' },
  { id: 'os4', clientId: '1', phase: 1, phaseName: 'Setup', title: 'Security configuration', completed: true, dueDate: '2024-01-27', completedDate: '2024-01-25' },
  { id: 'os5', clientId: '1', phase: 2, phaseName: 'Integration', title: 'API integration setup', completed: true, dueDate: '2024-02-05', completedDate: '2024-02-01' },
  { id: 'os6', clientId: '1', phase: 2, phaseName: 'Integration', title: 'Third-party tool connections', completed: true, dueDate: '2024-02-08', completedDate: '2024-02-05' },
  { id: 'os7', clientId: '1', phase: 2, phaseName: 'Integration', title: 'Data sync verification', completed: true, dueDate: '2024-02-10', completedDate: '2024-02-08' },
  { id: 'os8', clientId: '1', phase: 2, phaseName: 'Integration', title: 'Security audit & compliance check', completed: true, dueDate: '2024-02-12', completedDate: '2024-02-10' },
  { id: 'os9', clientId: '1', phase: 3, phaseName: 'Training', title: 'Admin training session', completed: true, dueDate: '2024-02-18', completedDate: '2024-02-15' },
  { id: 'os10', clientId: '1', phase: 3, phaseName: 'Training', title: 'Team workshop & onboarding', completed: true, dueDate: '2024-02-20', completedDate: '2024-02-18' },
  { id: 'os11', clientId: '1', phase: 3, phaseName: 'Training', title: 'Documentation review', completed: true, dueDate: '2024-02-22', completedDate: '2024-02-20' },
  { id: 'os12', clientId: '1', phase: 3, phaseName: 'Training', title: 'Q&A session & feedback', completed: true, dueDate: '2024-02-25', completedDate: '2024-02-23' },
  { id: 'os13', clientId: '1', phase: 4, phaseName: 'Go-Live', title: 'Final pre-launch checks', completed: true, dueDate: '2024-02-28', completedDate: '2024-02-26' },
  { id: 'os14', clientId: '1', phase: 4, phaseName: 'Go-Live', title: 'Production launch', completed: true, dueDate: '2024-03-01', completedDate: '2024-02-28' },
  { id: 'os15', clientId: '1', phase: 4, phaseName: 'Go-Live', title: 'Post-launch monitoring (48h)', completed: true, dueDate: '2024-03-03', completedDate: '2024-03-01' },
  { id: 'os16', clientId: '1', phase: 4, phaseName: 'Go-Live', title: 'Handoff & project closure', completed: true, dueDate: '2024-03-05', completedDate: '2024-03-03' },
  { id: 'os17', clientId: '2', phase: 1, phaseName: 'Setup', title: 'Account creation & configuration', completed: true, dueDate: '2025-01-15', completedDate: '2025-01-12' },
  { id: 'os18', clientId: '2', phase: 1, phaseName: 'Setup', title: 'Team access & permissions', completed: true, dueDate: '2025-01-17', completedDate: '2025-01-14' },
  { id: 'os19', clientId: '2', phase: 1, phaseName: 'Setup', title: 'Initial data import', completed: false, dueDate: '2025-01-20', completedDate: undefined },
  { id: 'os20', clientId: '2', phase: 1, phaseName: 'Setup', title: 'Security configuration', completed: false, dueDate: '2025-01-22', completedDate: undefined },
  { id: 'os21', clientId: '2', phase: 2, phaseName: 'Integration', title: 'API integration setup', completed: false, dueDate: '2025-01-28', completedDate: undefined },
  { id: 'os22', clientId: '2', phase: 2, phaseName: 'Integration', title: 'Third-party tool connections', completed: false, dueDate: '2025-02-01', completedDate: undefined },
  { id: 'os23', clientId: '2', phase: 2, phaseName: 'Integration', title: 'Data sync verification', completed: false, dueDate: '2025-02-05', completedDate: undefined },
  { id: 'os24', clientId: '2', phase: 2, phaseName: 'Integration', title: 'Security audit & compliance check', completed: false, dueDate: '2025-02-08', completedDate: undefined },
  { id: 'os25', clientId: '8', phase: 1, phaseName: 'Setup', title: 'Account creation & configuration', completed: true, dueDate: '2025-01-12', completedDate: '2025-01-08' },
  { id: 'os26', clientId: '8', phase: 1, phaseName: 'Setup', title: 'Team access & permissions', completed: true, dueDate: '2025-01-15', completedDate: '2025-01-10' },
  { id: 'os27', clientId: '8', phase: 1, phaseName: 'Setup', title: 'Initial data import', completed: true, dueDate: '2025-01-18', completedDate: '2025-01-14' },
  { id: 'os28', clientId: '8', phase: 1, phaseName: 'Setup', title: 'Security configuration', completed: true, dueDate: '2025-01-20', completedDate: '2025-01-16' },
  { id: 'os29', clientId: '8', phase: 2, phaseName: 'Integration', title: 'API integration setup', completed: false, dueDate: '2025-01-25', completedDate: undefined },
  { id: 'os30', clientId: '8', phase: 2, phaseName: 'Integration', title: 'Third-party tool connections', completed: false, dueDate: '2025-01-28', completedDate: undefined },
];

export const documents = [
  { id: 'd1', clientId: '1', name: 'Master Service Agreement.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-15', uploadedBy: 'Alex Morgan' },
  { id: 'd2', clientId: '1', name: 'Q4 Performance Report.pdf', type: 'pdf', size: '4.1 MB', date: '2024-12-30', uploadedBy: 'System' },
  { id: 'd3', clientId: '1', name: 'SEO Audit Results.xlsx', type: 'xlsx', size: '1.8 MB', date: '2025-01-18', uploadedBy: 'Jordan Lee' },
  { id: 'd4', clientId: '1', name: 'Campaign Assets.zip', type: 'zip', size: '156 MB', date: '2025-01-10', uploadedBy: 'Alex Morgan' },
  { id: 'd5', clientId: '1', name: 'Invoice - Jan 2025.pdf', type: 'pdf', size: '890 KB', date: '2025-01-15', uploadedBy: 'System' },
  { id: 'd6', clientId: '1', name: 'Meeting Notes - Strategy.docx', type: 'docx', size: '245 KB', date: '2025-01-12', uploadedBy: 'Alex Morgan' },
  { id: 'd7', clientId: '1', name: 'Brand Guidelines.pdf', type: 'pdf', size: '12.3 MB', date: '2024-02-01', uploadedBy: 'Sarah Chen' },
  { id: 'd8', clientId: '1', name: 'API Documentation.pdf', type: 'pdf', size: '3.2 MB', date: '2024-02-10', uploadedBy: 'System' },
  { id: 'd9', clientId: '3', name: 'Enterprise Contract.pdf', type: 'pdf', size: '5.6 MB', date: '2023-08-20', uploadedBy: 'Alex Morgan' },
  { id: 'd10', clientId: '3', name: 'Q4 Business Review.pdf', type: 'pdf', size: '8.2 MB', date: '2024-12-28', uploadedBy: 'System' },
];

// Helper functions
export function getClientEarnings(clientId: string): Earning[] {
  return earnings.filter(e => e.clientId === clientId);
}

export function getClientActivities(clientId: string): Activity[] {
  return activities.filter(a => a.clientId === clientId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getClientServices(clientId: string): Service[] {
  return clientServices.filter(s => s.clientId === clientId);
}

export function getClientOnboardingSteps(clientId: string): OnboardingStep[] {
  return onboardingSteps.filter(s => s.clientId === clientId);
}

export function getClientDocuments(clientId: string) {
  return documents.filter(d => d.clientId === clientId);
}

export function getClientById(id: string): Client | undefined {
  return clients.find(c => c.id === id);
}
