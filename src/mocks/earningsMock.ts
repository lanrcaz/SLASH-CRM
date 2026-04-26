// ────────────────────────────────────────────
// ClientVault — Mock Data for Earnings, Services & Reports
// ────────────────────────────────────────────

// ─── EARNINGS DATA ───

export const monthlyEarnings = [
  { month: "Jul 2024", actual: 3200, projected: 0 },
  { month: "Aug 2024", actual: 5800, projected: 0 },
  { month: "Sep 2024", actual: 9500, projected: 0 },
  { month: "Oct 2024", actual: 14200, projected: 0 },
  { month: "Nov 2024", actual: 21500, projected: 0 },
  { month: "Dec 2024", actual: 31000, projected: 0 },
  { month: "Jan 2025", actual: 42800, projected: 0 },
  { month: "Feb 2025", actual: 54200, projected: 0 },
  { month: "Mar 2025", actual: 67100, projected: 0 },
  { month: "Apr 2025", actual: 78900, projected: 0 },
  { month: "May 2025", actual: 91800, projected: 0 },
  { month: "Jun 2025", actual: 109200, projected: 132000 },
  { month: "Jul 2025", actual: 0, projected: 148000 },
  { month: "Aug 2025", actual: 0, projected: 165000 },
  { month: "Sep 2025", actual: 0, projected: 182000 },
  { month: "Oct 2025", actual: 0, projected: 201000 },
  { month: "Nov 2025", actual: 0, projected: 221000 },
  { month: "Dec 2025", actual: 0, projected: 245000 },
];

export const miniBarData = [
  { day: "Mon", value: 3200 },
  { day: "Tue", value: 4100 },
  { day: "Wed", value: 3800 },
  { day: "Thu", value: 5100 },
  { day: "Fri", value: 4600 },
  { day: "Sat", value: 2100 },
  { day: "Sun", value: 1950 },
];

export const sparklineData = [
  { i: 1, v: 3200 },
  { i: 2, v: 5800 },
  { i: 3, v: 9500 },
  { i: 4, v: 14200 },
  { i: 5, v: 21500 },
  { i: 6, v: 31000 },
  { i: 7, v: 42800 },
  { i: 8, v: 54200 },
  { i: 9, v: 67100 },
  { i: 10, v: 78900 },
  { i: 11, v: 91800 },
  { i: 12, v: 109200 },
];

export const revenueSources = [
  { name: "Services", value: 498000, color: "#7eea57" },
  { name: "Ad Revenue", value: 374000, color: "#3b82f6" },
  { name: "Referrals", value: 187000, color: "#8b5cf6" },
  { name: "Upgrades", value: 125000, color: "#f59e0b" },
  { name: "Other", value: 63800, color: "#64748b" },
];

export const revenueSourcePerformance = [
  { source: "Services", thisMonth: 9940, lastMonth: 8200, change: 21, color: "#7eea57" },
  { source: "Ad Revenue", thisMonth: 8450, lastMonth: 9100, change: -7, color: "#3b82f6" },
  { source: "Referrals", thisMonth: 4200, lastMonth: 3800, change: 11, color: "#8b5cf6" },
  { source: "Upgrades", thisMonth: 1600, lastMonth: 2400, change: -33, color: "#f59e0b" },
  { source: "Other", thisMonth: 660, lastMonth: 540, change: 22, color: "#64748b" },
];

export interface Milestone {
  label: string;
  amount: string;
  numericAmount: number;
  date: string;
  achieved: boolean;
}

export const milestones: Milestone[] = [
  { label: "First Dollar", amount: "$1", numericAmount: 1, date: "Jul 12, 2024", achieved: true },
  { label: "Growing", amount: "$1K", numericAmount: 1000, date: "Aug 28, 2024", achieved: true },
  { label: "Momentum", amount: "$5K", numericAmount: 5000, date: "Sep 18, 2024", achieved: true },
  { label: "Breakthrough", amount: "$10K", numericAmount: 10000, date: "Oct 22, 2024", achieved: true },
  { label: "Scaling", amount: "$25K", numericAmount: 25000, date: "Nov 30, 2024", achieved: true },
  { label: "Surging", amount: "$50K", numericAmount: 50000, date: "Jan 5, 2025", achieved: true },
  { label: "Milestone", amount: "$100K", numericAmount: 100000, date: "Feb 14, 2025", achieved: true },
  { label: "Half Million", amount: "$500K", numericAmount: 500000, date: "Apr 20, 2025", achieved: true },
  { label: "The Big One", amount: "$1M", numericAmount: 1000000, date: "Jun 1, 2025", achieved: true },
  { label: "2x Growth", amount: "$2M", numericAmount: 2000000, date: "Dec 2025 (proj)", achieved: false },
  { label: "5x Vision", amount: "$5M", numericAmount: 5000000, date: "Jun 2026 (proj)", achieved: false },
];

export const earningsFeed = [
  { id: 1, client: "QuantumLabs", amount: 7200, source: "Services", status: "paid", date: "Jun 15, 2025" },
  { id: 2, client: "SummitCo", amount: 6800, source: "Services", status: "paid", date: "Jun 15, 2025" },
  { id: 3, client: "BrightPath", amount: 3200, source: "Ad Revenue", status: "paid", date: "Jun 14, 2025" },
  { id: 4, client: "Orbit Systems", amount: 4900, source: "Services", status: "pending", date: "Jun 14, 2025" },
  { id: 5, client: "Acme Corp", amount: 4100, source: "Referrals", status: "paid", date: "Jun 13, 2025" },
  { id: 6, client: "Nexus Inc", amount: 2800, source: "Ad Revenue", status: "paid", date: "Jun 13, 2025" },
  { id: 7, client: "Pinnacle Labs", amount: 5600, source: "Services", status: "pending", date: "Jun 12, 2025" },
  { id: 8, client: "Vertex Co", amount: 1500, source: "Upgrades", status: "paid", date: "Jun 12, 2025" },
  { id: 9, client: "Atlas Tech", amount: 8900, source: "Services", status: "paid", date: "Jun 11, 2025" },
  { id: 10, client: "Stellar Labs", amount: 2100, source: "Ad Revenue", status: "rejected", date: "Jun 11, 2025" },
  { id: 11, client: "Horizon Co", amount: 4300, source: "Referrals", status: "paid", date: "Jun 10, 2025" },
  { id: 12, client: "Core Systems", amount: 6700, source: "Services", status: "pending", date: "Jun 10, 2025" },
  { id: 13, client: "Zenith Corp", amount: 3400, source: "Ad Revenue", status: "paid", date: "Jun 9, 2025" },
  { id: 14, client: "Flux Labs", amount: 1200, source: "Other", status: "paid", date: "Jun 9, 2025" },
  { id: 15, client: "Prime Co", amount: 7800, source: "Services", status: "pending", date: "Jun 8, 2025" },
];

export const topClients = [
  { rank: 1, client: "QuantumLabs", total: 89400, thisMonth: 7200, trend: "up" },
  { rank: 2, client: "SummitCo", total: 91200, thisMonth: 6800, trend: "up" },
  { rank: 3, client: "BrightPath", total: 67800, thisMonth: 5400, trend: "up" },
  { rank: 4, client: "Orbit Systems", total: 56300, thisMonth: 4900, trend: "up" },
  { rank: 5, client: "Acme Corp", total: 48200, thisMonth: 4100, trend: "down" },
];

export const payoutsList = [
  { id: 1, date: "Jun 10", amount: 5200, method: "Bank Transfer", status: "Completed" },
  { id: 2, date: "Jun 3", amount: 3800, method: "PayPal", status: "Completed" },
  { id: 3, date: "May 28", amount: 4100, method: "Bank Transfer", status: "Completed" },
  { id: 4, date: "May 20", amount: 2900, method: "PayPal", status: "Processing" },
];

export const payoutStats = {
  available: 18400,
  pending: 12500,
  processing: 6200,
  totalPaid: 1210700,
};

export const aiProjections = [
  { scenario: "Conservative", amount: "$1.4M by Dec 2025", probability: 60, color: "#64748b" },
  { scenario: "Expected", amount: "$1.7M by Dec 2025", probability: 80, color: "#7eea57" },
  { scenario: "Optimistic", amount: "$2.1M by Dec 2025", probability: 40, color: "#3b82f6" },
];

export const aiInsight =
  "Based on current growth velocity and client retention patterns, you're projected to hit $1.7M by December. 3 clients are likely to upgrade services in Q3, adding an estimated $8K/month.";

// ─── SERVICES DATA ───

export const servicesKPI = {
  mrr: 42000,
  mrrGrowth: 8,
  activeSubscriptions: 87,
  avgServiceValue: 482,
  churnedThisMonth: 2,
};

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  price: number;
  clients: number;
  revenue: number;
  rating: number;
  status: "Active" | "Paused" | "Archived";
  category: string;
  sparkline: { month: string; value: number }[];
}

export const servicesData: Service[] = [
  {
    id: 1,
    name: "Ad Management",
    description: "Full-service ad campaign management across Google, Meta, and LinkedIn platforms",
    icon: "Megaphone",
    color: "#7eea57",
    price: 2500,
    clients: 24,
    revenue: 60000,
    rating: 4.8,
    status: "Active",
    category: "Marketing",
    sparkline: [
      { month: "Jan", value: 42000 },
      { month: "Feb", value: 46000 },
      { month: "Mar", value: 49000 },
      { month: "Apr", value: 52000 },
      { month: "May", value: 56000 },
      { month: "Jun", value: 60000 },
    ],
  },
  {
    id: 2,
    name: "SEO Optimization",
    description: "Technical SEO audits, content strategy, and ongoing optimization",
    icon: "Search",
    color: "#3b82f6",
    price: 1800,
    clients: 18,
    revenue: 32400,
    rating: 4.6,
    status: "Active",
    category: "Marketing",
    sparkline: [
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 29000 },
      { month: "Mar", value: 30000 },
      { month: "Apr", value: 31000 },
      { month: "May", value: 31600 },
      { month: "Jun", value: 32400 },
    ],
  },
  {
    id: 3,
    name: "Content Marketing",
    description: "Blog content, social media management, and email marketing campaigns",
    icon: "FileText",
    color: "#8b5cf6",
    price: 3200,
    clients: 12,
    revenue: 38400,
    rating: 4.9,
    status: "Active",
    category: "Marketing",
    sparkline: [
      { month: "Jan", value: 32000 },
      { month: "Feb", value: 33600 },
      { month: "Mar", value: 34800 },
      { month: "Apr", value: 36000 },
      { month: "May", value: 37200 },
      { month: "Jun", value: 38400 },
    ],
  },
  {
    id: 4,
    name: "Social Media Mgmt",
    description: "Full social media management, scheduling, engagement, and analytics",
    icon: "Share2",
    color: "#f59e0b",
    price: 1500,
    clients: 15,
    revenue: 22500,
    rating: 4.5,
    status: "Active",
    category: "Advertising",
    sparkline: [
      { month: "Jan", value: 19500 },
      { month: "Feb", value: 20250 },
      { month: "Mar", value: 21000 },
      { month: "Apr", value: 21000 },
      { month: "May", value: 21750 },
      { month: "Jun", value: 22500 },
    ],
  },
  {
    id: 5,
    name: "Web Development",
    description: "Custom web development, landing pages, and ongoing maintenance",
    icon: "Code",
    color: "#06b6d4",
    price: 4000,
    clients: 8,
    revenue: 32000,
    rating: 4.7,
    status: "Active",
    category: "Development",
    sparkline: [
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 28000 },
      { month: "Mar", value: 30000 },
      { month: "Apr", value: 32000 },
      { month: "May", value: 32000 },
      { month: "Jun", value: 32000 },
    ],
  },
  {
    id: 6,
    name: "Consulting",
    description: "Strategic consulting hours for business growth and optimization",
    icon: "MessageCircle",
    color: "#22c55e",
    price: 5000,
    clients: 10,
    revenue: 50000,
    rating: 4.8,
    status: "Active",
    category: "Consulting",
    sparkline: [
      { month: "Jan", value: 40000 },
      { month: "Feb", value: 42000 },
      { month: "Mar", value: 44000 },
      { month: "Apr", value: 46000 },
      { month: "May", value: 48000 },
      { month: "Jun", value: 50000 },
    ],
  },
];

export const serviceIcons = [
  "Megaphone", "Search", "FileText", "Share2", "Code", "MessageCircle",
  "BarChart3", "TrendingUp", "Globe", "Zap", "Layers", "Target",
  "Briefcase", "Award", "Users", "Settings", "Mail", "Shield",
  "Database", "Cloud",
];

export const serviceColors = [
  "#7eea57", "#3b82f6", "#8b5cf6", "#f59e0b", "#06b6d4",
  "#22c55e", "#ec4899", "#f97316", "#14b8a6", "#a855f7",
];

// ─── REPORTS DATA ───

export const quickReports = [
  {
    id: 1,
    title: "Revenue Summary",
    description: "Total earnings, payouts, and projections",
    icon: "DollarSign",
    color: "#7eea57",
    lastGenerated: "2 hours ago",
    popular: true,
  },
  {
    id: 2,
    title: "Client Activity",
    description: "Onboarding, offboarding, and engagement",
    icon: "Users",
    color: "#3b82f6",
    lastGenerated: "1 day ago",
    popular: false,
  },
  {
    id: 3,
    title: "Service Performance",
    description: "MRR, churn, and satisfaction by service",
    icon: "Layers",
    color: "#8b5cf6",
    lastGenerated: "3 days ago",
    popular: false,
  },
  {
    id: 4,
    title: "Pipeline Analytics",
    description: "Prospect flow, conversion rates, and forecasts",
    icon: "Target",
    color: "#f59e0b",
    lastGenerated: "1 week ago",
    popular: false,
  },
];

export interface ScheduledReport {
  id: number;
  name: string;
  frequency: string;
  nextRun: string;
  recipient: string;
  status: "Active" | "Paused";
}

export const scheduledReports: ScheduledReport[] = [
  { id: 1, name: "Weekly Revenue", frequency: "Every Monday", nextRun: "Jun 16, 2025", recipient: "alex@team.com", status: "Active" },
  { id: 2, name: "Monthly Client Summary", frequency: "1st of month", nextRun: "Jul 1, 2025", recipient: "team@company.com", status: "Active" },
  { id: 3, name: "Quarterly Board Report", frequency: "Quarterly", nextRun: "Jul 1, 2025", recipient: "board@company.com", status: "Paused" },
  { id: 4, name: "Weekly Service Metrics", frequency: "Every Friday", nextRun: "Jun 13, 2025", recipient: "ops@company.com", status: "Active" },
];

export const recentReports = [
  { id: 1, name: "Revenue Summary — Jun 2025", generated: "2 hours ago", format: "PDF", size: "1.2 MB" },
  { id: 2, name: "Client Activity — Q2 2025", generated: "1 day ago", format: "CSV", size: "450 KB" },
  { id: 3, name: "Service Performance", generated: "3 days ago", format: "Excel", size: "890 KB" },
  { id: 4, name: "Pipeline Analytics", generated: "1 week ago", format: "PDF", size: "780 KB" },
  { id: 5, name: "Churn Analysis — May 2025", generated: "2 weeks ago", format: "PDF", size: "650 KB" },
  { id: 6, name: "Earnings Breakdown", generated: "3 weeks ago", format: "CSV", size: "320 KB" },
];

export const reportDataSourceOptions = [
  { id: "earnings", label: "Earnings Data", icon: "DollarSign" },
  { id: "clients", label: "Client Data", icon: "Users" },
  { id: "services", label: "Service Data", icon: "Layers" },
  { id: "pipeline", label: "Pipeline Data", icon: "Target" },
  { id: "activity", label: "Activity Data", icon: "Clock" },
];

export const reportMetricsBySource: Record<string, { id: string; label: string }[]> = {
  earnings: [
    { id: "total", label: "Total Revenue" },
    { id: "bySource", label: "Revenue by Source" },
    { id: "byClient", label: "Revenue by Client" },
    { id: "projected", label: "Projected Revenue" },
  ],
  clients: [
    { id: "total", label: "Total Clients" },
    { id: "byStatus", label: "Clients by Status" },
    { id: "new", label: "New Clients" },
    { id: "churned", label: "Churned Clients" },
  ],
  services: [
    { id: "mrr", label: "MRR" },
    { id: "churnRate", label: "Churn Rate" },
    { id: "satisfaction", label: "Satisfaction Score" },
  ],
  pipeline: [
    { id: "totalValue", label: "Total Pipeline Value" },
    { id: "conversion", label: "Conversion Rate" },
    { id: "avgDeal", label: "Avg Deal Size" },
  ],
  activity: [
    { id: "logins", label: "Login Activity" },
    { id: "actions", label: "User Actions" },
    { id: "exports", label: "Data Exports" },
  ],
};
