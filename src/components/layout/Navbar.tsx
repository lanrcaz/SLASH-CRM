import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Blocks,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Home,
  Layers,
  MessageSquare,
  Settings,
  Sparkles,
  Target,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const primaryNavItems = [
  { path: '/app', icon: Home, label: 'Home' },
  { path: '/app/clients', icon: Users, label: 'Clients' },
  { path: '/app/prospects', icon: Target, label: 'Prospects' },
  { path: '/app/onboarding', icon: UserPlus, label: 'Onboarding' },
  { path: '/app/offboarding', icon: UserMinus, label: 'Offboarding' },
  { path: '/app/services', icon: Layers, label: 'Services' },
  { path: '/app/earnings', icon: ChartNoAxesCombined, label: 'Earnings' },
  { path: '/app/reports', icon: ClipboardCheck, label: 'Reports' },
];

const secondaryNavItems = [
  { path: '/app/settings', icon: Settings, label: 'Settings' },
  { path: '/app/settings', icon: Blocks, label: 'Apps & Integrations', neverActive: true },
];

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavItem = (item: (typeof primaryNavItems)[number] | (typeof secondaryNavItems)[number]) => {
    const isActive = !('neverActive' in item) && (location.pathname === item.path || location.pathname.startsWith(`${item.path}/`));
    const Icon = item.icon;

    return (
      <button
        key={`${item.path}-${item.label}`}
        onClick={() => navigate(item.path)}
        className={cn(
          'group flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2 text-left text-[14px] transition-colors',
          isActive
            ? 'bg-[#f2efff] font-semibold text-[#4b3bb4]'
            : 'font-normal text-[#3c4043] hover:bg-[#f1f2f5] hover:font-medium hover:text-[#202124]',
          collapsed ? 'justify-center px-2' : 'justify-center px-2 lg:justify-start lg:px-3'
        )}
        title={collapsed ? item.label : undefined}
      >
        <Icon
          className={cn(
            'size-[18px] shrink-0 transition-colors',
            isActive ? 'text-[#6f4bd8]' : 'text-[#5f6368] group-hover:text-[#3c4043]'
          )}
          strokeWidth={isActive ? 2 : 1.75}
        />
        {!collapsed && <span className="hidden truncate lg:inline">{item.label}</span>}
      </button>
    );
  };

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen shrink-0 flex-col border-r border-[#dfe2e8] bg-white transition-[width] duration-200 ease-out',
        collapsed ? 'w-[74px]' : 'w-[74px] lg:w-[286px]'
      )}
    >
      <div className={cn('flex h-[62px] items-center border-b border-[#e4e6eb]', collapsed ? 'justify-center px-2' : 'justify-center px-2 lg:justify-start lg:px-4')}>
        <button
          onClick={() => navigate('/app')}
          className={cn('flex items-center gap-3 rounded-md text-left transition-colors hover:bg-[#f5f6f8]', collapsed ? 'p-2' : 'px-2 py-2')}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#d9dde6] bg-[#f7f8fb] text-[#6f4bd8]">
            <Sparkles className="size-[18px]" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="hidden min-w-0 lg:block">
              <p className="truncate text-[15px] font-bold leading-tight text-[#202124]">SLASH CRM</p>
              <p className="truncate text-[11px] font-medium text-[#777b84]">Client operations workspace</p>
            </div>
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-1">
          {primaryNavItems.map(renderNavItem)}
        </div>

        <div className="my-4 border-t border-[#e5e7ec]" />

        <div className="space-y-1">
          {secondaryNavItems.map(renderNavItem)}
        </div>
      </nav>

      <div className="border-t border-[#e5e7ec] px-3 py-3">
        <button
          className={cn(
            'mb-2 flex w-full items-center gap-3 rounded-md border border-[#d9dde6] bg-[#fbfbfc] px-3 py-2.5 text-[14px] font-semibold text-[#4b3bb4] transition-colors hover:border-[#bdb7ee] hover:bg-[#f5f3ff]',
            collapsed ? 'justify-center px-2' : 'justify-center px-2 lg:justify-start lg:px-3'
          )}
          title={collapsed ? 'AI Assistant' : undefined}
        >
          <MessageSquare className="size-[18px] shrink-0" strokeWidth={1.9} />
          {!collapsed && <span className="hidden lg:inline">AI Assistant</span>}
        </button>

        {!collapsed && (
          <div className="mb-3 hidden rounded-md border border-[#e4e6eb] bg-[#f7f8fb] px-3 py-2 lg:block">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[#4a4d55]">
              <BriefcaseBusiness className="size-3.5 text-[#6f4bd8]" />
              Market readiness
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e1e4ea]">
              <div className="h-full w-[62%] rounded-full bg-[#6f4bd8]" />
            </div>
            <p className="mt-1.5 text-[11px] text-[#777b84]">Phase 1 foundation in progress</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-md border border-[#d9dde6] bg-white py-2 text-[#5f6368] transition-colors hover:bg-[#f5f6f8] hover:text-[#202124]"
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
    </aside>
  );
}
