import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserMinus,
  Target,
  TrendingUp,
  Layers,
  FileText,
  Settings,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/app/clients', icon: Users, label: 'Clients' },
  { path: '/app/onboarding', icon: UserPlus, label: 'Onboarding' },
  { path: '/app/offboarding', icon: UserMinus, label: 'Offboarding' },
  { path: '/app/prospects', icon: Target, label: 'Prospects' },
  { path: '/app/earnings', icon: TrendingUp, label: 'Earnings' },
  { path: '/app/services', icon: Layers, label: 'Services' },
  { path: '/app/reports', icon: FileText, label: 'Reports' },
  { path: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`flex flex-col bg-navy-950 border-r border-navy-700 h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-navy-700 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/app')}>
          <div className="w-8 h-8 rounded-lg bg-neon-green flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-navy-950" />
          </div>
          {!collapsed && (
            <span className="font-heading font-bold text-lg tracking-tight">
              <span className="text-white">Client</span>
              <span className="text-neon-green">Vault</span>
            </span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[rgba(126,234,87,0.1)] text-neon-green border-l-2 border-neon-green'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-neon-green' : 'group-hover:text-white'}`} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Chat Trigger */}
      <div className="px-3 pb-2">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-vibrant/10 text-purple-vibrant hover:bg-purple-vibrant/20 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'AI Assistant' : undefined}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">AI Assistant</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <div className="px-3 pb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
