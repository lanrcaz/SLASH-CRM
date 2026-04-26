// ============================================================================
// Onboarding Mock Data
// ============================================================================

export interface OnboardingClient {
  id: string;
  clientName: string;
  company: string;
  avatar: string;
  progress: number;
  phase: number;
  phaseName: string;
  tasksCompleted: number;
  totalTasks: number;
  dueDate: string;
  startDate: string;
  assignee: string;
  assigneeAvatar: string;
  health: 'Good' | 'At Risk' | 'Excellent';
  aiPrediction?: string;
  blocker?: string;
}

export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  estimatedDays: number;
  phases: string[];
  usageCount: number;
}

export const activeOnboardings: OnboardingClient[] = [
  {
    id: 'onb-1',
    clientName: 'TechFlow Inc',
    company: 'TechFlow Solutions',
    avatar: 'TF',
    progress: 75,
    phase: 3,
    phaseName: 'Training',
    tasksCompleted: 15,
    totalTasks: 20,
    dueDate: '2025-06-18',
    startDate: '2025-06-01',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'SC',
    health: 'Good',
    aiPrediction: '2025-06-18',
  },
  {
    id: 'onb-2',
    clientName: 'QuantumLabs',
    company: 'QuantumLabs AI',
    avatar: 'QL',
    progress: 40,
    phase: 2,
    phaseName: 'Integration',
    tasksCompleted: 8,
    totalTasks: 16,
    dueDate: '2025-06-22',
    startDate: '2025-05-28',
    assignee: 'Mike Torres',
    assigneeAvatar: 'MT',
    health: 'At Risk',
    aiPrediction: '2025-06-22',
    blocker: 'API credentials pending from client',
  },
  {
    id: 'onb-3',
    clientName: 'Polaris Group',
    company: 'Polaris Financial',
    avatar: 'PG',
    progress: 50,
    phase: 2,
    phaseName: 'Integration',
    tasksCompleted: 10,
    totalTasks: 18,
    dueDate: '2025-06-19',
    startDate: '2025-06-05',
    assignee: 'Lisa Park',
    assigneeAvatar: 'LP',
    health: 'Good',
    aiPrediction: '2025-06-19',
  },
  {
    id: 'onb-4',
    clientName: 'BrightPath Edu',
    company: 'BrightPath Education',
    avatar: 'BE',
    progress: 90,
    phase: 4,
    phaseName: 'Go-Live',
    tasksCompleted: 18,
    totalTasks: 20,
    dueDate: '2025-06-10',
    startDate: '2025-05-20',
    assignee: 'James Wilson',
    assigneeAvatar: 'JW',
    health: 'Excellent',
    aiPrediction: '2025-06-10',
  },
  {
    id: 'onb-5',
    clientName: 'Meridian Digital',
    company: 'Meridian Digital Agency',
    avatar: 'MD',
    progress: 25,
    phase: 1,
    phaseName: 'Setup',
    tasksCompleted: 4,
    totalTasks: 16,
    dueDate: '2025-06-17',
    startDate: '2025-06-03',
    assignee: 'Anna Kim',
    assigneeAvatar: 'AK',
    health: 'Good',
    aiPrediction: '2025-06-17',
  },
];

export const completedOnboardings: OnboardingClient[] = [
  {
    id: 'onb-comp-1',
    clientName: 'NorthStar Dynamics',
    company: 'NorthStar Dynamics',
    avatar: 'ND',
    progress: 100,
    phase: 4,
    phaseName: 'Go-Live',
    tasksCompleted: 22,
    totalTasks: 22,
    dueDate: '2025-06-01',
    startDate: '2025-05-15',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'SC',
    health: 'Good',
    aiPrediction: '2025-06-01',
  },
];

export const onboardingTemplates: OnboardingTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Standard Setup',
    description: 'Full 4-phase onboarding with dedicated integration support and team training. Ideal for most clients.',
    estimatedDays: 20,
    phases: ['Setup', 'Integration', 'Training', 'Go-Live'],
    usageCount: 42,
  },
  {
    id: 'tmpl-2',
    name: 'Enterprise',
    description: 'Extended onboarding for complex multi-team deployments with custom integrations and dedicated success manager.',
    estimatedDays: 35,
    phases: ['Discovery', 'Setup', 'Integration', 'Training', 'Go-Live'],
    usageCount: 18,
  },
  {
    id: 'tmpl-3',
    name: 'Express',
    description: 'Streamlined 3-phase onboarding for simple, self-service-ready clients who need to get started quickly.',
    estimatedDays: 10,
    phases: ['Setup', 'Integration', 'Go-Live'],
    usageCount: 27,
  },
];

export const onboardingPhases = ['Setup', 'Integration', 'Training', 'Go-Live'];

// ============================================================================
// Offboarding Mock Data
// ============================================================================

export interface OffboardingStep {
  id: number;
  name: string;
  icon: string;
  status: 'completed' | 'current' | 'pending';
}

export interface OffboardingClient {
  id: string;
  clientName: string;
  company: string;
  avatar: string;
  currentStep: number;
  steps: OffboardingStep[];
  startDate: string;
  expectedCompletion: string;
  reason: string;
  compliance: string;
  urgent?: boolean;
  notes?: string;
}

export interface CompletedOffboarding {
  id: string;
  clientName: string;
  offboardDate: string;
  reason: string;
  satisfaction: number;
  dataExported: string;
  complianceStatus: string;
  duration: string;
}

export interface ChurnReason {
  reason: string;
  count: number;
  color: string;
}

export const activeOffboardings: OffboardingClient[] = [
  {
    id: 'offb-1',
    clientName: 'NovaScale',
    company: 'NovaScale Systems',
    avatar: 'NS',
    currentStep: 3,
    steps: [
      { id: 1, name: 'Initiate', icon: 'Flag', status: 'completed' },
      { id: 2, name: 'Data Export', icon: 'Download', status: 'completed' },
      { id: 3, name: 'Feedback', icon: 'MessageSquare', status: 'current' },
      { id: 4, name: 'Access Revocation', icon: 'Lock', status: 'pending' },
      { id: 5, name: 'Final Review', icon: 'CheckCircle', status: 'pending' },
    ],
    startDate: '2025-06-10',
    expectedCompletion: '2025-06-15',
    reason: 'Client moving in-house',
    compliance: 'On track',
  },
  {
    id: 'offb-2',
    clientName: 'Veridian Labs',
    company: 'Veridian Labs Co',
    avatar: 'VL',
    currentStep: 2,
    steps: [
      { id: 1, name: 'Initiate', icon: 'Flag', status: 'completed' },
      { id: 2, name: 'Data Export', icon: 'Download', status: 'current' },
      { id: 3, name: 'Feedback', icon: 'MessageSquare', status: 'pending' },
      { id: 4, name: 'Access Revocation', icon: 'Lock', status: 'pending' },
      { id: 5, name: 'Final Review', icon: 'CheckCircle', status: 'pending' },
    ],
    startDate: '2025-06-12',
    expectedCompletion: '2025-06-18',
    reason: 'Contract ended',
    compliance: 'On track',
    notes: 'Large data export in progress (450MB)',
  },
  {
    id: 'offb-3',
    clientName: 'Atlas Consulting',
    company: 'Atlas Consulting Group',
    avatar: 'AC',
    currentStep: 4,
    steps: [
      { id: 1, name: 'Initiate', icon: 'Flag', status: 'completed' },
      { id: 2, name: 'Data Export', icon: 'Download', status: 'completed' },
      { id: 3, name: 'Feedback', icon: 'MessageSquare', status: 'completed' },
      { id: 4, name: 'Access Revocation', icon: 'Lock', status: 'current' },
      { id: 5, name: 'Final Review', icon: 'CheckCircle', status: 'pending' },
    ],
    startDate: '2025-06-08',
    expectedCompletion: '2025-06-14',
    reason: 'Service no longer needed',
    compliance: 'Final review pending',
    urgent: true,
  },
];

export const completedOffboardings: CompletedOffboarding[] = [
  {
    id: 'offb-comp-1',
    clientName: 'Horizon Media',
    offboardDate: '2025-06-05',
    reason: 'Contract ended',
    satisfaction: 4.5,
    dataExported: '89MB',
    complianceStatus: 'Compliant',
    duration: '4 days',
  },
  {
    id: 'offb-comp-2',
    clientName: 'Summit Solutions',
    offboardDate: '2025-05-28',
    reason: 'Moved in-house',
    satisfaction: 3.8,
    dataExported: '245MB',
    complianceStatus: 'Compliant',
    duration: '6 days',
  },
  {
    id: 'offb-comp-3',
    clientName: 'Prism Digital',
    offboardDate: '2025-05-20',
    reason: 'Budget cuts',
    satisfaction: 4.2,
    dataExported: '56MB',
    complianceStatus: 'Compliant',
    duration: '3 days',
  },
  {
    id: 'offb-comp-4',
    clientName: 'Vertex Studios',
    offboardDate: '2025-05-15',
    reason: 'Switching provider',
    satisfaction: 3.5,
    dataExported: '120MB',
    complianceStatus: 'Compliant',
    duration: '5 days',
  },
  {
    id: 'offb-comp-5',
    clientName: 'CedarPoint Co',
    offboardDate: '2025-05-08',
    reason: 'Service no longer needed',
    satisfaction: 4.8,
    dataExported: '34MB',
    complianceStatus: 'Compliant',
    duration: '3 days',
  },
  {
    id: 'offb-comp-6',
    clientName: 'IronWorks Inc',
    offboardDate: '2025-04-28',
    reason: 'Contract ended',
    satisfaction: 4.0,
    dataExported: '178MB',
    complianceStatus: 'Compliant',
    duration: '4 days',
  },
];

export const churnReasons: ChurnReason[] = [
  { reason: 'Contract ended', count: 18, color: '#7eea57' },
  { reason: 'Moved in-house', count: 12, color: '#3b82f6' },
  { reason: 'Budget cuts', count: 8, color: '#f59e0b' },
  { reason: 'Switching provider', count: 6, color: '#8b5cf6' },
  { reason: 'Service no longer needed', count: 10, color: '#ef4444' },
];

// ============================================================================
// Wizard Mock Data
// ============================================================================

export const availableClients = [
  { id: 'c1', name: 'Apex Industries', avatar: 'AI' },
  { id: 'c2', name: 'Blue Ridge Corp', avatar: 'BR' },
  { id: 'c3', name: 'Catalyst Health', avatar: 'CH' },
  { id: 'c4', name: 'DeltaStream', avatar: 'DS' },
  { id: 'c5', name: 'Evergreen Energy', avatar: 'EE' },
];

export const availableTeam = [
  { id: 't1', name: 'Sarah Chen', role: 'Account Manager', avatar: 'SC' },
  { id: 't2', name: 'Mike Torres', role: 'Integration Engineer', avatar: 'MT' },
  { id: 't3', name: 'Lisa Park', role: 'Success Manager', avatar: 'LP' },
  { id: 't4', name: 'James Wilson', role: 'Technical Lead', avatar: 'JW' },
  { id: 't5', name: 'Anna Kim', role: 'Support Specialist', avatar: 'AK' },
];

export const availableServices = [
  { id: 'svc-1', name: 'CRM Integration', category: 'Integration' },
  { id: 'svc-2', name: 'Analytics Dashboard', category: 'Data' },
  { id: 'svc-3', name: 'API Access', category: 'Developer' },
  { id: 'svc-4', name: 'Team Training', category: 'Training' },
  { id: 'svc-5', name: 'Custom Workflows', category: 'Customization' },
  { id: 'svc-6', name: 'Priority Support', category: 'Support' },
  { id: 'svc-7', name: 'Data Migration', category: 'Migration' },
  { id: 'svc-8', name: 'SSO Setup', category: 'Security' },
];
