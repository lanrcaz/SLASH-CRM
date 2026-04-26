import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  UserPlus, TrendingUp, Sparkles, UserMinus,
  ArrowRight, Play, Check,
  MessageSquare, BarChart3, Shield, Zap
} from 'lucide-react'
import CountUp from 'react-countup'

/* ── NavBar ─────────────────────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-950/90 backdrop-blur-md border-b border-navy-700' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon-green flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-navy-950" />
          </div>
          <span className="font-heading font-bold text-lg">
            <span className="text-white">Client</span>
            <span className="text-neon-green">Vault</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a>
          <a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a>
          <a href="#stats" className="text-gray-400 hover:text-white text-sm transition-colors">Stats</a>
        </div>
        <Link to="/app">
          <button className="bg-neon-green text-navy-950 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-neon-green-hover transition-all hover:shadow-glow-green">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  )
}

/* ── Section wrapper ──────────────────────────────────────────────── */
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

/* ── Feature card ───────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-navy-900 border border-white/[0.06] rounded-2xl p-8 hover:border-neon-green/20 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-neon-green opacity-60" />
      <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center mb-5 group-hover:bg-neon-green/20 transition-colors">
        <Icon className="w-6 h-6 text-neon-green" />
      </div>
      <h3 className="font-heading font-semibold text-xl text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

/* ── Pricing toggle ────────────────────────────────────────────── */
function PricingCard({ name, price, period, features, featured = false }: {
  name: string; price: string; period: string; features: string[]; featured?: boolean
}) {
  return (
    <div className={`rounded-2xl p-8 ${featured ? 'bg-navy-900 border-2 border-neon-green relative' : 'bg-navy-900 border border-white/[0.06]'}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-green text-navy-950 text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="font-heading font-semibold text-lg text-white mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-heading font-bold text-4xl text-white">{price}</span>
        <span className="text-gray-500 text-sm">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <Check className="w-4 h-4 text-neon-green flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
        featured
          ? 'bg-neon-green text-navy-950 hover:bg-neon-green-hover hover:shadow-glow-green'
          : 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.1]'
      }`}>
        Get Started
      </button>
    </div>
  )
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="bg-navy-950 text-white overflow-x-hidden">
      <NavBar />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.12)_0%,_transparent_50%),radial-gradient(ellipse_at_top_left,_rgba(126,234,87,0.06)_0%,_transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-neon-green" />
              <span className="text-neon-green text-xs font-semibold tracking-wide">Now with AI Assistant</span>
            </div>
            <h1 className="font-heading font-bold text-display-md md:text-display-lg text-white mb-6">
              AI-Powered Client<br />Lifecycle Management
            </h1>
            <p className="text-gray-400 text-body-lg max-w-2xl mx-auto mb-8">
              Onboard, track earnings, and manage every client relationship — from first contact to final handshake.
              See your client's journey from <span className="text-neon-green font-semibold">$0 to 100x</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/app">
                <button className="bg-neon-green text-navy-950 px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-neon-green-hover transition-all hover:shadow-glow-green hover:scale-[1.02] flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button className="border border-white/20 text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-white/5 transition-all flex items-center gap-2">
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </div>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <img
              src="/hero-dashboard.jpg"
              alt="ClientVault Dashboard"
              className="w-full rounded-2xl shadow-dark-lg border border-white/[0.06]"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-neon-green/20 blur-2xl rounded-full" />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────── */}
      <div className="py-12 border-y border-navy-700/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-6">Trusted by 1,200+ client service teams</p>
          <img src="/integration-logos.jpg" alt="Partner integrations" className="mx-auto h-8 opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all" />
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <Section id="features">
        <div className="text-center mb-16">
          <span className="text-label text-neon-green uppercase tracking-wider">Platform</span>
          <h2 className="font-heading font-bold text-heading-lg text-white mt-3">
            Everything you need to manage client relationships
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={UserPlus}
            title="Smart Onboarding"
            description="Guided multi-phase onboarding with visual progress tracking. Get clients from signup to revenue in days, not weeks."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Earnings Tracking"
            description="Watch every dollar your clients earn from $0 to 100x. Real-time revenue dashboards with milestone celebrations."
          />
          <FeatureCard
            icon={Sparkles}
            title="AI Assistant"
            description={`Chat with your CRM. Ask "Show me at-risk clients" or "What's our Q3 revenue?" and get instant answers.`}
          />
          <FeatureCard
            icon={UserMinus}
            title="Smart Offboarding"
            description="Structured exit workflows with automated data export, compliance checks, and churn analysis."
          />
        </div>
      </Section>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <Section id="stats" className="bg-navy-900/30 border-y border-navy-700/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: 10, suffix: 'x', label: 'Faster Onboarding' },
            { num: 2.4, suffix: 'M', prefix: '$', label: 'Client Earnings Tracked' },
            { num: 94, suffix: '%', label: 'Client Retention' },
            { num: 1200, suffix: '+', label: 'Active Teams' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-heading font-bold text-display-md text-neon-green mb-2">
                {s.prefix || ''}
                <CountUp end={s.num} duration={2} decimals={s.num < 10 ? 1 : 0} />
                {s.suffix}
              </div>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── DEEP DIVE: ONBOARDING ───────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-label text-electric-blue uppercase tracking-wider">Onboarding</span>
            <h2 className="font-heading font-bold text-heading-lg text-white mt-3 mb-4">
              From Prospect to Partner in 4 Phases
            </h2>
            <p className="text-gray-400 mb-6">
              Our structured onboarding process ensures every client is set up for success.
              Track progress visually and hit revenue milestones faster.
            </p>
            <ul className="space-y-3">
              {['Setup & Configuration', 'Integration & Data Import', 'Training & Onboarding', 'Go-Live & Revenue'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-7 h-7 rounded-full bg-electric-blue/20 flex items-center justify-center text-electric-blue text-xs font-bold">
                    {i + 1}
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src="/onboarding-flow.jpg" alt="Onboarding flow" className="rounded-2xl shadow-dark-lg w-full" />
          </div>
        </div>
      </Section>

      {/* ── DEEP DIVE: EARNINGS ─────────────────────────────────── */}
      <Section className="bg-navy-900/30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <img src="/earnings-chart.jpg" alt="Earnings chart" className="rounded-2xl shadow-dark-lg w-full" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-label text-neon-green uppercase tracking-wider">Earnings</span>
            <h2 className="font-heading font-bold text-heading-lg text-white mt-3 mb-4">
              Track Every Dollar From $0 to 100x
            </h2>
            <p className="text-gray-400 mb-6">
              Multi-stream revenue tracking with real-time dashboards. Watch your clients grow
              and celebrate every milestone from first dollar to six figures.
            </p>
            <ul className="space-y-3">
              {['Revenue source breakdown', 'Milestone celebrations', 'AI-powered projections', 'Payout management'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-neon-green/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-neon-green" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── DEEP DIVE: AI ───────────────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-label text-purple-vibrant uppercase tracking-wider">AI Assistant</span>
            <h2 className="font-heading font-bold text-heading-lg text-white mt-3 mb-4">
              Ask Questions. Get Answers. Take Action.
            </h2>
            <p className="text-gray-400 mb-6">
              Natural language CRM queries that deliver instant insights. No more digging through reports —
              just ask and get visual dashboards in seconds.
            </p>
            <div className="space-y-2">
              {['Show me at-risk clients', "What's our Q3 revenue?", 'Onboard Acme Corp', 'Export TechStart data'].map((cmd) => (
                <div key={cmd} className="flex items-center gap-2 bg-navy-900 border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-gray-300">
                  <MessageSquare className="w-4 h-4 text-purple-vibrant" />
                  {cmd}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="/ai-chat-demo.jpg" alt="AI chat demo" className="rounded-2xl shadow-dark-lg w-full" />
          </div>
        </div>
      </Section>

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <Section id="pricing" className="bg-navy-900/30">
        <div className="text-center mb-12">
          <span className="text-label text-neon-green uppercase tracking-wider">Pricing</span>
          <h2 className="font-heading font-bold text-heading-lg text-white mt-3">Simple, transparent pricing</h2>
        </div>
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`w-12 h-6 rounded-full transition-colors relative ${annual ? 'bg-neon-green' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${annual ? 'left-6' : 'left-0.5'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-gray-500'}`}>Annual <span className="text-neon-green">(Save 20%)</span></span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PricingCard
            name="Starter"
            price={annual ? '$23' : '$29'}
            period="mo"
            features={['10 clients', 'Basic onboarding', 'Email support', 'Standard reports']}
          />
          <PricingCard
            name="Growth"
            price={annual ? '$63' : '$79'}
            period="mo"
            features={['50 clients', 'AI assistant', 'Earnings tracking', 'Priority support', 'Custom workflows']}
            featured
          />
          <PricingCard
            name="Enterprise"
            price={annual ? '$119' : '$149'}
            period="mo"
            features={['Unlimited clients', 'Dedicated support', 'SLA guarantee', 'API access', 'White-label portal']}
          />
        </div>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/gradient-mesh-bg.png" alt="" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-heading font-bold text-heading-lg md:text-display-md text-white mb-4">
            Ready to transform your client relationships?
          </h2>
          <p className="text-gray-400 text-body-lg mb-8">
            Join 1,200+ teams using ClientVault to onboard faster, track earnings smarter, and retain clients longer.
          </p>
          <Link to="/app">
            <button className="bg-neon-green text-navy-950 px-10 py-4 rounded-xl font-bold text-base hover:bg-neon-green-hover transition-all hover:shadow-glow-green hover:scale-[1.02]">
              Start Free Trial — No Credit Card
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t border-navy-700/50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-neon-green flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-navy-950" />
              </div>
              <span className="font-heading font-bold">
                <span className="text-white">Client</span><span className="text-neon-green">Vault</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">AI-powered client lifecycle management for modern teams.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/app" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a className="hover:text-white transition-colors">Documentation</a></li>
              <li><a className="hover:text-white transition-colors">API Reference</a></li>
              <li><a className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a className="hover:text-white transition-colors">About</a></li>
              <li><a className="hover:text-white transition-colors">Contact</a></li>
              <li><a className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-navy-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2025 ClientVault. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500">
            <BarChart3 className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Shield className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Zap className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  )
}
