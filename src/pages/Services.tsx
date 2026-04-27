import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import {
  Plus, Pencil, Users, TrendingUp,
  X, Check, Megaphone, Search, FileText,
  Share2, Code, MessageCircle, BarChart3, Layers,
  Target, Briefcase, Award, Settings, Globe, Zap,
} from "lucide-react";
import {
  servicesKPI, servicesData, serviceIcons, serviceColors,
  type Service,
} from "@/mocks/earningsMock";

/* ─── design tokens (workspace-aligned light theme) ─── */
const NAVY_950 = "#ffffff";
const NAVY_900 = "#ffffff";
const NAVY_800 = "#f7f8fb";
const NAVY_700 = "#e4e6eb";
const NEON_GREEN = "#6f4bd8";
const ELECTRIC_BLUE = "#3b82f6";
const GRAY_500 = "#6f747d";
const WHITE = "#202124";
const ERROR = "#ef4444";

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── count-up hook ─── */
function useCountUp(target: number, duration = 1500, prefix = "", suffix = "") {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = from + (target - from) * eased;
      setVal(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return `${prefix}${Math.floor(val).toLocaleString("en-US")}${suffix}`;
}

/* ─── icon map ─── */
const iconMap: Record<string, React.ElementType> = {
  Megaphone, Search, FileText, Share2, Code, MessageCircle,
  BarChart3, TrendingUp, Globe, Zap, Layers, Target,
  Briefcase, Award, Users, Settings,
};

function ServiceIcon({ name, size = 22, color = NEON_GREEN }: { name: string; size?: number; color?: string }) {
  const Icon = iconMap[name] || BarChart3;
  return <Icon size={size} style={{ color }} />;
}

/* ─── Status Badge ─── */
function ServiceStatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    Active: { bg: "rgba(111,75,216,0.15)", text: "#6f4bd8" },
    Paused: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    Archived: { bg: "rgba(100,116,139,0.15)", text: "#64748b" },
  };
  const c = config[status] || config.Archived;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.text}30` }}
    >
      {status}
    </span>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, index, onEdit }: { service: Service; index: number; onEdit: (s: Service) => void }) {
  const [isActive, setIsActive] = useState(service.status === "Active");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -4, borderColor: `${NEON_GREEN}33`, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      className="rounded-[16px] p-6 transition-all duration-250"
      style={{
        background: NAVY_900,
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `2px solid ${service.color}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: `${service.color}20` }}
          >
            <ServiceIcon name={service.icon} size={22} color={service.color} />
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-[#202124]">{service.name}</h3>
            <ServiceStatusBadge status={isActive ? "Active" : "Paused"} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-medium" style={{ color: NEON_GREEN }}>
            ${(service.price / 1000).toFixed(service.price >= 1000 ? 1 : 0)}K<span className="text-[12px]" style={{ color: GRAY_500 }}>/mo</span>
          </span>
          <button
            onClick={() => onEdit(service)}
            className="p-1.5 rounded-[6px] transition-colors hover:bg-white/10"
            style={{ color: GRAY_500 }}
          >
            <Pencil size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] mt-3 leading-relaxed" style={{ color: GRAY_500 }}>
        {service.description}
      </p>

      {/* Metrics */}
      <div className="flex items-center gap-6 mt-5">
        <div>
          <p className="text-[14px] font-semibold text-[#202124]">{service.clients}</p>
          <p className="text-[11px]" style={{ color: GRAY_500 }}>clients</p>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#202124]">${(service.revenue / 1000).toFixed(1)}K</p>
          <p className="text-[11px]" style={{ color: GRAY_500 }}>total</p>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#202124]">{service.rating}</p>
          <p className="text-[11px]" style={{ color: GRAY_500 }}>rating</p>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-4 h-[60px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={service.sparkline}>
            <defs>
              <linearGradient id={`sl-${service.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={service.color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={service.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={service.color} strokeWidth={1.5} fill={`url(#sl-${service.id})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <button className="text-[12px] font-medium transition-colors hover:text-[#202124]" style={{ color: GRAY_500 }}>
            View Clients
          </button>
          <button className="text-[12px] font-medium transition-colors hover:text-[#202124]" style={{ color: GRAY_500 }}>
            Edit Pricing
          </button>
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className="relative w-9 h-5 rounded-full transition-colors duration-200"
          style={{ background: isActive ? NEON_GREEN : GRAY_500 }}
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
            animate={{ left: isActive ? 18 : 2 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Add/Edit Service Modal ─── */
function ServiceModal({ service, onClose, onSave }: {
  service: Service | null; onClose: () => void;
  onSave: (s: Service) => void;
}) {
  const isEdit = !!service;
  const [form, setForm] = useState<Partial<Service>>({
    name: service?.name || "",
    description: service?.description || "",
    price: service?.price || 0,
    color: service?.color || serviceColors[0],
    icon: service?.icon || serviceIcons[0],
    status: service?.status || "Active",
    category: service?.category || "Marketing",
  });

  const handleSave = () => {
    if (!form.name || !form.price) return;
    onSave({
      ...service,
      ...form,
      id: service?.id || Date.now(),
      clients: service?.clients || 0,
      revenue: service?.revenue || 0,
      rating: service?.rating || 5,
      sparkline: service?.sparkline || [],
    } as Service);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="w-full max-w-[520px] rounded-[16px] p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[20px] font-semibold text-[#202124]">
            {isEdit ? "Edit Service" : "Add Service"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-[6px] hover:bg-white/10 transition-colors" style={{ color: GRAY_500 }}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Service Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-[10px] px-4 py-3 text-[14px] text-[#202124] outline-none transition-all focus:ring-1"
              style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
              placeholder="e.g., SEO Optimization"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-[10px] px-4 py-3 text-[14px] text-[#202124] outline-none transition-all resize-none"
              style={{ background: NAVY_800, border: `1px solid ${NAVY_700}`, minHeight: 80 }}
              placeholder="Describe what this service includes..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Monthly Price ($)</label>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full rounded-[10px] px-4 py-3 text-[14px] text-[#202124] outline-none transition-all"
                style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
                placeholder="2500"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-[10px] px-4 py-3 text-[14px] text-[#202124] outline-none transition-all"
                style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
              >
                {["Marketing", "Development", "Design", "Consulting", "Advertising", "Analytics"].map((c) => (
                  <option key={c} value={c} style={{ background: NAVY_900 }}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: GRAY_500 }}>Icon</label>
            <div className="flex flex-wrap gap-2">
              {serviceIcons.slice(0, 12).map((icon) => (
                <button
                  key={icon}
                  onClick={() => setForm({ ...form, icon })}
                  className="w-9 h-9 rounded-[8px] flex items-center justify-center transition-all"
                  style={{
                    background: form.icon === icon ? `${form.color || NEON_GREEN}30` : NAVY_800,
                    border: form.icon === icon ? `1px solid ${form.color || NEON_GREEN}` : `1px solid ${NAVY_700}`,
                  }}
                >
                  <ServiceIcon name={icon} size={16} color={form.icon === icon ? (form.color || NEON_GREEN) : GRAY_500} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: GRAY_500 }}>Color</label>
            <div className="flex flex-wrap gap-2">
              {serviceColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setForm({ ...form, color })}
                  className="w-8 h-8 rounded-full transition-all"
                  style={{
                    background: color,
                    border: form.color === color ? "2px solid white" : "2px solid transparent",
                    transform: form.color === color ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Status</label>
            <div className="flex gap-3">
              {(["Active", "Paused"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, status: s })}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all"
                  style={{
                    background: form.status === s ? `${s === "Active" ? NEON_GREEN : "#f59e0b"}20` : NAVY_800,
                    border: `1px solid ${form.status === s ? (s === "Active" ? NEON_GREEN : "#f59e0b") : NAVY_700}`,
                    color: form.status === s ? (s === "Active" ? NEON_GREEN : "#f59e0b") : GRAY_500,
                  }}
                >
                  {form.status === s && <Check size={14} />}
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all hover:bg-white/5"
            style={{ color: GRAY_500, border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all hover:scale-[1.02]"
            style={{ background: NEON_GREEN, color: NAVY_950 }}
          >
            {isEdit ? "Save Changes" : "Create Service"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Service Detail Modal ─── */
function ServiceDetailModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const tabs = ["Overview", "Revenue History", "Settings"];
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="w-full max-w-[720px] rounded-[16px] p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${service.color}20` }}
            >
              <ServiceIcon name={service.icon} size={24} color={service.color} />
            </div>
            <div>
              <h3 className="text-[22px] font-semibold text-[#202124]">{service.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <ServiceStatusBadge status={service.status} />
                <span className="text-[14px] font-medium" style={{ color: NEON_GREEN }}>
                  ${service.price.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-[6px] hover:bg-white/10 transition-colors" style={{ color: GRAY_500 }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-[10px]" style={{ background: NAVY_950 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-[8px] text-[13px] font-medium transition-all"
              style={{
                background: activeTab === tab ? NAVY_800 : "transparent",
                color: activeTab === tab ? WHITE : GRAY_500,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-[14px] mb-6" style={{ color: GRAY_500 }}>{service.description}</p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
                  <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Clients</p>
                  <p className="text-[24px] font-medium text-[#202124] mt-1">{service.clients}</p>
                </div>
                <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
                  <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Total Revenue</p>
                  <p className="text-[24px] font-medium mt-1" style={{ color: NEON_GREEN }}>${(service.revenue / 1000).toFixed(1)}K</p>
                </div>
                <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
                  <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Rating</p>
                  <p className="text-[24px] font-medium text-[#202124] mt-1">{service.rating}</p>
                </div>
                <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
                  <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: GRAY_500 }}>Avg Tenure</p>
                  <p className="text-[24px] font-medium text-[#202124] mt-1">8.2<span className="text-[12px]" style={{ color: GRAY_500 }}>mo</span></p>
                </div>
              </div>
              <div className="rounded-[10px] p-4" style={{ background: NAVY_800 }}>
                <p className="text-[12px] font-medium mb-2" style={{ color: GRAY_500 }}>6-Month Revenue Trend</p>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={service.sparkline}>
                      <defs>
                        <linearGradient id={`dl-${service.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={service.color} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={service.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke={service.color} strokeWidth={2} fill={`url(#dl-${service.id})`} dot={{ r: 3, fill: service.color }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "Revenue History" && (
            <motion.div
              key="revenue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-[200px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={service.sparkline}>
                    <Bar dataKey="value" fill={service.color} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {service.sparkline.map((d, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                    <span className="text-[13px] text-[#202124]">{d.month} 2025</span>
                    <span className="text-[13px] font-medium" style={{ color: NEON_GREEN }}>${d.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Service Name</label>
                  <input
                    type="text"
                    defaultValue={service.name}
                    className="w-full rounded-[10px] px-4 py-3 text-[14px] text-[#202124] outline-none"
                    style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Price</label>
                  <input
                    type="number"
                    defaultValue={service.price}
                    className="w-full rounded-[10px] px-4 py-3 text-[14px] text-[#202124] outline-none"
                    style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
                  />
                </div>
                <button className="w-full py-3 rounded-[10px] text-[13px] font-medium transition-all hover:opacity-90" style={{ background: "rgba(239,68,68,0.15)", color: ERROR, border: "1px solid rgba(239,68,68,0.3)" }}>
                  Archive Service
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─── KPI Card ─── */
function ServicesKPICard({ label, value, sub, iconColor, delay }: {
  label: string; value: string; sub: string; iconColor: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo, delay }}
      className="rounded-[16px] p-6"
      style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="text-[13px] font-medium" style={{ color: GRAY_500 }}>{label}</p>
      <p className="text-[32px] font-medium mt-1 tracking-tight" style={{ color: iconColor }}>{value}</p>
      <p className="text-[13px] mt-1" style={{ color: GRAY_500 }}>{sub}</p>
    </motion.div>
  );
}

/* ─── Main Services Page ─── */
export default function Services() {
  const [services, setServices] = useState(servicesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [detailService, setDetailService] = useState<Service | null>(null);

  const mrrValue = useCountUp(servicesKPI.mrr, 1500, "$");
  const subscriptionsValue = useCountUp(servicesKPI.activeSubscriptions, 1500);
  const avgValue = useCountUp(servicesKPI.avgServiceValue, 1500, "$");
  const churnValue = useCountUp(servicesKPI.churnedThisMonth, 1500);

  const handleEdit = (s: Service) => {
    setEditingService(s);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleSave = (s: Service) => {
    if (editingService) {
      setServices((prev) => prev.map((p) => (p.id === s.id ? s : p)));
    } else {
      setServices((prev) => [...prev, s]);
    }
  };

  return (
    <div className="min-h-[100dvh]" style={{ background: NAVY_950 }}>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-[36px] font-semibold tracking-tight text-[#202124]" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Services
            </h1>
            <p className="text-[15px] mt-1" style={{ color: GRAY_500 }}>
              {services.length} active services · 87 client subscriptions · $42K MRR
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all hover:bg-white/10"
              style={{ color: GRAY_500, border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Service Templates
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all hover:scale-[1.02]"
              style={{ background: NEON_GREEN, color: NAVY_950 }}
            >
              <Plus size={14} /> Add Service
            </button>
          </div>
        </motion.div>

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <ServicesKPICard label="Monthly Recurring Revenue" value={mrrValue} sub="+8% vs last month" iconColor={NEON_GREEN} delay={0} />
          <ServicesKPICard label="Active Subscriptions" value={subscriptionsValue} sub="Across 6 services" iconColor={WHITE} delay={0.1} />
          <ServicesKPICard label="Avg. Service Value" value={avgValue} sub="Per client per month" iconColor={ELECTRIC_BLUE} delay={0.2} />
          <ServicesKPICard label="Churned This Month" value={churnValue} sub="Services cancelled" iconColor={ERROR} delay={0.3} />
        </div>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={service.id} onClick={() => setDetailService(service)} className="cursor-pointer">
              <ServiceCard service={service} index={i} onEdit={(s) => { handleEdit(s); }} />
            </div>
          ))}
        </div>

        {/* ── Modals ── */}
        <AnimatePresence>
          {modalOpen && (
            <ServiceModal
              service={editingService}
              onClose={() => setModalOpen(false)}
              onSave={handleSave}
            />
          )}
          {detailService && (
            <ServiceDetailModal
              service={detailService}
              onClose={() => setDetailService(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
