import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, Users, Layers, Target, Plus, Calendar, Clock,
  Download, FileText, ChevronRight, X, Check, Trash2, Edit3,
  Pause, Play, FileSpreadsheet, ChevronLeft,
} from "lucide-react";
import {
  quickReports, scheduledReports, recentReports,
  reportDataSourceOptions, reportMetricsBySource,
} from "@/mocks/earningsMock";

/* ─── design tokens (workspace-aligned light theme) ─── */
const NAVY_950 = "#ffffff";
const NAVY_900 = "#ffffff";
const NAVY_800 = "#f7f8fb";
const NAVY_700 = "#e4e6eb";
const NEON_GREEN = "#6f4bd8";
const ELECTRIC_BLUE = "#3b82f6";
const GRAY_500 = "#6f747d";
const GRAY_400 = "#8b9099";
const WHITE = "#202124";
const WARNING = "#f59e0b";
const ERROR = "#ef4444";
const SUCCESS = "#10b981";

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ─── icon map ─── */
const iconMap: Record<string, React.ElementType> = {
  DollarSign, Users, Layers, Target, Clock,
};

function ReportIcon({ name, size = 24, color = NEON_GREEN }: { name: string; size?: number; color?: string }) {
  const Icon = iconMap[name] || FileText;
  return <Icon size={size} style={{ color }} />;
}

/* ─── Status dot ─── */
function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className="w-2 h-2 rounded-full inline-block"
      style={{ background: active ? SUCCESS : WARNING }}
    />
  );
}

/* ─── Quick Report Card ─── */
function QuickReportCard({ report, index, onGenerate }: {
  report: typeof quickReports[0]; index: number; onGenerate: (r: typeof quickReports[0]) => void;
}) {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      onGenerate(report);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + index * 0.08 }}
      whileHover={{ y: -2, borderColor: `${NEON_GREEN}26` }}
      className="rounded-[16px] p-6 cursor-pointer transition-all duration-200"
      style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: `${report.color}20` }}
        >
          <ReportIcon name={report.icon} size={22} color={report.color} />
        </div>
        {report.popular && (
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
            style={{ background: `${NEON_GREEN}20`, color: NEON_GREEN, border: `1px solid ${NEON_GREEN}40` }}
          >
            Most Popular
          </span>
        )}
      </div>
      <h3 className="text-[18px] font-semibold text-white">{report.title}</h3>
      <p className="text-[13px] mt-1" style={{ color: GRAY_500 }}>{report.description}</p>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-1 text-[13px] font-medium transition-all hover:opacity-80 disabled:opacity-60"
          style={{ color: NEON_GREEN }}
        >
          {generating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Clock size={14} />
              </motion.div>
              Generating...
            </>
          ) : (
            <>
              Generate <ChevronRight size={14} />
            </>
          )}
        </button>
        <span className="text-[11px]" style={{ color: GRAY_500 }}>{report.lastGenerated}</span>
      </div>
    </motion.div>
  );
}

/* ─── Report Builder Modal ─── */
function ReportBuilderModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [reportName, setReportName] = useState("");
  const [format, setFormat] = useState<"PDF" | "CSV" | "Excel">("PDF");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [frequency, setFrequency] = useState("Weekly");

  const totalSteps = 5;

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleMetric = (id: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const canProceed = () => {
    if (step === 1) return selectedSources.length > 0;
    if (step === 2) return selectedMetrics.length > 0;
    if (step === 3) return dateRange.start && dateRange.end;
    if (step === 4) return reportName.length > 0;
    return true;
  };

  const stepLabels = ["", "Data Sources", "Metrics", "Date Range", "Output", "Schedule"];

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
        className="w-full max-w-[800px] rounded-[16px] p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[20px] font-semibold text-white">Create Custom Report</h3>
            <p className="text-[13px] mt-1" style={{ color: GRAY_500 }}>
              Step {step} of {totalSteps}: {stepLabels[step]}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-[6px] hover:bg-white/10 transition-colors" style={{ color: GRAY_500 }}>
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i < step ? NEON_GREEN : NAVY_700 }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Data Sources */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
            >
              <p className="text-[14px] mb-4" style={{ color: GRAY_500 }}>Select the data sources you want to include</p>
              <div className="grid grid-cols-2 gap-3">
                {reportDataSourceOptions.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className="flex items-center gap-3 p-4 rounded-[12px] text-left transition-all"
                    style={{
                      background: selectedSources.includes(source.id) ? `${NEON_GREEN}15` : NAVY_800,
                      border: selectedSources.includes(source.id) ? `1px solid ${NEON_GREEN}60` : `1px solid ${NAVY_700}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: selectedSources.includes(source.id) ? `${NEON_GREEN}25` : `${NAVY_700}` }}
                    >
                      <ReportIcon name={source.icon} size={20} color={selectedSources.includes(source.id) ? NEON_GREEN : GRAY_500} />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-white">{source.label}</p>
                    </div>
                    {selectedSources.includes(source.id) && <Check size={16} style={{ color: NEON_GREEN }} className="ml-auto" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Metrics */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
            >
              <p className="text-[14px] mb-4" style={{ color: GRAY_500 }}>Choose specific metrics to include</p>
              <div className="space-y-4">
                {selectedSources.map((sourceId) => {
                  const metrics = reportMetricsBySource[sourceId] || [];
                  const sourceLabel = reportDataSourceOptions.find((s) => s.id === sourceId)?.label || sourceId;
                  return (
                    <div key={sourceId}>
                      <h4 className="text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: GRAY_500 }}>{sourceLabel}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {metrics.map((metric) => (
                          <button
                            key={metric.id}
                            onClick={() => toggleMetric(`${sourceId}.${metric.id}`)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] transition-all"
                            style={{
                              background: selectedMetrics.includes(`${sourceId}.${metric.id}`) ? `${NEON_GREEN}15` : NAVY_800,
                              border: selectedMetrics.includes(`${sourceId}.${metric.id}`) ? `1px solid ${NEON_GREEN}60` : `1px solid ${NAVY_700}`,
                              color: selectedMetrics.includes(`${sourceId}.${metric.id}`) ? NEON_GREEN : WHITE,
                            }}
                          >
                            {selectedMetrics.includes(`${sourceId}.${metric.id}`) && <Check size={14} />}
                            {metric.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Date Range */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
            >
              <p className="text-[14px] mb-4" style={{ color: GRAY_500 }}>Set the reporting period</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full rounded-[10px] px-4 py-3 text-[14px] text-white outline-none"
                    style={{ background: NAVY_800, border: `1px solid ${NAVY_700}`, colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full rounded-[10px] px-4 py-3 text-[14px] text-white outline-none"
                    style={{ background: NAVY_800, border: `1px solid ${NAVY_700}`, colorScheme: "dark" }}
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {["Last 7 days", "Last 30 days", "This Quarter", "This Year"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      const end = new Date().toISOString().split("T")[0];
                      let start = new Date().toISOString().split("T")[0];
                      if (preset === "Last 7 days") {
                        const d = new Date(); d.setDate(d.getDate() - 7);
                        start = d.toISOString().split("T")[0];
                      } else if (preset === "Last 30 days") {
                        const d = new Date(); d.setDate(d.getDate() - 30);
                        start = d.toISOString().split("T")[0];
                      } else if (preset === "This Quarter") {
                        const d = new Date(); d.setMonth(Math.floor(d.getMonth() / 3) * 3, 1);
                        start = d.toISOString().split("T")[0];
                      } else if (preset === "This Year") {
                        start = `${new Date().getFullYear()}-01-01`;
                      }
                      setDateRange({ start, end });
                    }}
                    className="px-3 py-2 rounded-[8px] text-[12px] font-medium transition-all hover:bg-white/10"
                    style={{ background: NAVY_800, color: GRAY_400, border: `1px solid ${NAVY_700}` }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Output */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
            >
              <div className="mb-4">
                <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Report Name</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="w-full rounded-[10px] px-4 py-3 text-[14px] text-white outline-none"
                  style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
                  placeholder="My Custom Report"
                />
              </div>
              <p className="text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: GRAY_500 }}>Export Format</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {(["PDF", "CSV", "Excel"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className="flex flex-col items-center gap-2 p-4 rounded-[12px] transition-all"
                    style={{
                      background: format === f ? `${NEON_GREEN}15` : NAVY_800,
                      border: format === f ? `1px solid ${NEON_GREEN}60` : `1px solid ${NAVY_700}`,
                    }}
                  >
                    {f === "PDF" ? <FileText size={24} style={{ color: format === f ? NEON_GREEN : GRAY_500 }} /> :
                      f === "CSV" ? <FileSpreadsheet size={24} style={{ color: format === f ? NEON_GREEN : GRAY_500 }} /> :
                        <FileSpreadsheet size={24} style={{ color: format === f ? NEON_GREEN : GRAY_500 }} />}
                    <span className="text-[13px] font-medium" style={{ color: format === f ? NEON_GREEN : WHITE }}>{f}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-[10px]" style={{ background: NAVY_800 }}>
                <input
                  type="checkbox"
                  id="includeCharts"
                  className="w-4 h-4 rounded accent-[#6f4bd8]"
                  defaultChecked
                />
                <label htmlFor="includeCharts" className="text-[13px] text-white">Include charts and visualizations</label>
              </div>
            </motion.div>
          )}

          {/* Step 5: Schedule */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
            >
              <div className="flex items-center gap-3 p-4 rounded-[10px] mb-4 cursor-pointer"
                style={{ background: NAVY_800 }}
                onClick={() => setScheduleEnabled(!scheduleEnabled)}
              >
                <div
                  className="w-10 h-6 rounded-full flex items-center px-0.5 transition-colors"
                  style={{ background: scheduleEnabled ? NEON_GREEN : NAVY_700 }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white shadow"
                    animate={{ x: scheduleEnabled ? 16 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <span className="text-[14px] font-medium text-white">Schedule this report</span>
              </div>

              <AnimatePresence>
                {scheduleEnabled && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: easeSmooth }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[12px] font-medium uppercase tracking-wider mb-2" style={{ color: GRAY_500 }}>Frequency</label>
                        <div className="flex flex-wrap gap-2">
                          {["Daily", "Weekly", "Monthly", "Quarterly"].map((f) => (
                            <button
                              key={f}
                              onClick={() => setFrequency(f)}
                              className="px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all"
                              style={{
                                background: frequency === f ? `${NEON_GREEN}15` : NAVY_800,
                                border: frequency === f ? `1px solid ${NEON_GREEN}60` : `1px solid ${NAVY_700}`,
                                color: frequency === f ? NEON_GREEN : WHITE,
                              }}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium uppercase tracking-wider mb-1.5" style={{ color: GRAY_500 }}>Delivery Email</label>
                        <input
                          type="email"
                          className="w-full rounded-[10px] px-4 py-3 text-[14px] text-white outline-none"
                          style={{ background: NAVY_800, border: `1px solid ${NAVY_700}` }}
                          placeholder="team@company.com"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preview */}
              <div className="mt-6 p-4 rounded-[10px]" style={{ background: NAVY_800 }}>
                <h4 className="text-[14px] font-medium text-white mb-2">Report Preview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: GRAY_500 }}>Sources:</span>
                    <span className="text-white">{selectedSources.map(s => reportDataSourceOptions.find(o => o.id === s)?.label).join(", ") || "None selected"}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: GRAY_500 }}>Period:</span>
                    <span className="text-white">{dateRange.start || "—"} to {dateRange.end || "—"}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: GRAY_500 }}>Format:</span>
                    <span className="text-white">{format}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: GRAY_500 }}>Metrics:</span>
                    <span className="text-white">{selectedMetrics.length} selected</span>
                  </div>
                  {scheduleEnabled && (
                    <div className="flex justify-between text-[13px]">
                      <span style={{ color: GRAY_500 }}>Schedule:</span>
                      <span style={{ color: NEON_GREEN }}>{frequency}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all disabled:opacity-30"
            style={{ color: GRAY_500, border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <ChevronLeft size={14} /> Back
          </button>
          {step < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-1 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all disabled:opacity-30"
              style={{ background: NEON_GREEN, color: NAVY_950 }}
            >
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all hover:scale-[1.02]"
              style={{ background: NEON_GREEN, color: NAVY_950 }}
            >
              <Check size={14} /> Generate Report
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Reports Page ─── */
export default function Reports() {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [scheduled, setScheduled] = useState(scheduledReports);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToastMessage = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGenerate = (report: typeof quickReports[0]) => {
    showToastMessage(`${report.title} generated and downloaded`);
  };

  const toggleScheduleStatus = (id: number) => {
    setScheduled((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "Active" ? "Paused" : "Active" as "Active" | "Paused" } : r))
    );
  };

  const deleteScheduled = (id: number) => {
    setScheduled((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-[100dvh]" style={{ background: NAVY_950 }}>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            className="fixed top-6 left-1/2 z-[999] px-6 py-3 rounded-[12px] flex items-center gap-2"
            style={{ background: NAVY_800, border: `1px solid ${NEON_GREEN}40`, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
          >
            <Check size={16} style={{ color: NEON_GREEN }} />
            <span className="text-[13px] font-medium text-white">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-[36px] font-semibold tracking-tight text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Reports
            </h1>
            <p className="text-[15px] mt-1" style={{ color: GRAY_500 }}>
              12 report templates · {scheduled.length} scheduled · Last run: 2 hours ago
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all hover:bg-white/10"
              style={{ color: GRAY_500, border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Calendar size={14} /> Scheduled Reports
            </button>
            <button
              onClick={() => setBuilderOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all hover:scale-[1.02]"
              style={{ background: NEON_GREEN, color: NAVY_950 }}
            >
              <Plus size={14} /> Create Custom Report
            </button>
          </div>
        </motion.div>

        {/* ── Quick Report Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {quickReports.map((report, i) => (
            <QuickReportCard key={report.id} report={report} index={i} onGenerate={handleGenerate} />
          ))}
        </div>

        {/* ── Scheduled Reports ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
          className="rounded-[16px] p-6 mb-6"
          style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-semibold text-white">Scheduled Reports</h3>
            <button className="text-[13px] font-medium flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: NEON_GREEN }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {scheduled.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.3 + i * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[12px]"
                style={{ background: NAVY_800 }}
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <StatusDot active={report.status === "Active"} />
                  <div>
                    <p className="text-[14px] font-medium text-white">{report.name}</p>
                    <p className="text-[12px]" style={{ color: GRAY_500 }}>
                      {report.frequency} · Next: {report.nextRun} · {report.recipient}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-0 sm:ml-4">
                  <button className="p-1.5 rounded-[6px] hover:bg-white/10 transition-colors" style={{ color: GRAY_500 }}>
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => toggleScheduleStatus(report.id)}
                    className="p-1.5 rounded-[6px] hover:bg-white/10 transition-colors"
                    style={{ color: report.status === "Active" ? WARNING : SUCCESS }}
                  >
                    {report.status === "Active" ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button
                    onClick={() => deleteScheduled(report.id)}
                    className="p-1.5 rounded-[6px] hover:bg-white/10 transition-colors"
                    style={{ color: ERROR }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Recent Downloads ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.4 }}
          className="rounded-[16px] p-6"
          style={{ background: NAVY_900, border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h3 className="text-[18px] font-semibold text-white mb-4">Recent Downloads</h3>
          <div className="space-y-2">
            {recentReports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.4 + i * 0.04 }}
                className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0"
                    style={{ background: report.format === "PDF" ? `${ERROR}20` : report.format === "CSV" ? `${NEON_GREEN}20` : `${ELECTRIC_BLUE}20` }}
                  >
                    {report.format === "PDF" ? (
                      <FileText size={16} style={{ color: ERROR }} />
                    ) : report.format === "CSV" ? (
                      <FileSpreadsheet size={16} style={{ color: NEON_GREEN }} />
                    ) : (
                      <FileSpreadsheet size={16} style={{ color: ELECTRIC_BLUE }} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white truncate">{report.name}</p>
                    <p className="text-[12px]" style={{ color: GRAY_500 }}>
                      {report.generated} · {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
                    style={{
                      background: report.format === "PDF" ? `${ERROR}15` : report.format === "CSV" ? `${NEON_GREEN}15` : `${ELECTRIC_BLUE}15`,
                      color: report.format === "PDF" ? ERROR : report.format === "CSV" ? NEON_GREEN : ELECTRIC_BLUE,
                    }}
                  >
                    {report.format}
                  </span>
                  <button
                    onClick={() => showToastMessage(`${report.name} downloaded`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-all hover:opacity-80"
                    style={{ color: WHITE, border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <Download size={12} /> Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Builder Modal ── */}
      <AnimatePresence>
        {builderOpen && (
          <ReportBuilderModal onClose={() => setBuilderOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
