import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  UserPlus, TrendingUp, Sparkles, UserMinus,
  ArrowRight, Play, Check,
  MessageSquare, BarChart3, Shield, Zap,
  type LucideIcon
} from 'lucide-react'
import CountUp from 'react-countup'

const ACCENT = '#6f4bd8'
const ACCENT_HOVER = '#5b39c4'
const ACCENT_SOFT = '#f2efff'
const ACCENT_BORDER = '#d8cffa'

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'border-b border-slate-200 bg-white/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md" style={{ backgroundColor: ACCENT }}>
            <Sparkles className="size-4 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">SLASH CRM</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-normal text-slate-600 transition-colors hover:text-slate-900">Features</a>
          <a href="#pricing" className="text-sm font-normal text-slate-600 transition-colors hover:text-slate-900">Pricing</a>
          <a href="#stats" className="text-sm font-normal text-slate-600 transition-colors hover:text-slate-900">Stats</a>
        </div>
        <Link to="/app">
          <button
            className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: ACCENT }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  )
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`px-6 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div
        className="mb-5 flex size-11 items-center justify-center rounded-lg"
        style={{ backgroundColor: ACCENT_SOFT }}
      >
        <Icon className="size-5" style={{ color: ACCENT }} strokeWidth={1.8} />
      </div>
      <h3 className="mb-2 text-base font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  )
}

function PricingCard({
  name, price, period, features, featured = false,
}: {
  name: string; price: string; period: string; features: string[]; featured?: boolean
}) {
  return (
    <div
      className={`relative rounded-xl bg-white p-8 transition-shadow ${
        featured
          ? 'shadow-[0_12px_32px_rgba(111,75,216,0.18)]'
          : 'border border-slate-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]'
      }`}
      style={featured ? { border: `2px solid ${ACCENT}` } : undefined}
    >
      {featured && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
          style={{ backgroundColor: ACCENT }}
        >
          Most Popular
        </div>
      )}
      <h3 className="mb-2 text-base font-semibold text-slate-900">{name}</h3>
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-slate-900">{price}</span>
        <span className="text-sm text-slate-500">/{period}</span>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="mt-0.5 size-4 flex-shrink-0" style={{ color: ACCENT }} strokeWidth={2.2} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full rounded-md py-2.5 text-sm font-medium transition-colors ${
          featured ? 'text-white' : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
        }`}
        style={featured ? { backgroundColor: ACCENT } : undefined}
        onMouseEnter={featured ? (e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER) : undefined}
        onMouseLeave={featured ? (e) => (e.currentTarget.style.backgroundColor = ACCENT) : undefined}
      >
        Get Started
      </button>
    </div>
  )
}

export default function Home() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(111,75,216,0.10), transparent 60%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ backgroundColor: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}` }}
            >
              <Zap className="size-3.5" style={{ color: ACCENT }} strokeWidth={2.2} />
              <span className="text-xs font-medium tracking-wide" style={{ color: ACCENT }}>Now with AI Assistant</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
              AI-Powered Client<br />Lifecycle Management
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Onboard, track earnings, and manage every client relationship — from first contact to final handshake.
              See your client&apos;s journey from <span className="font-semibold" style={{ color: ACCENT }}>$0 to 100x</span>.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/app">
                <button
                  className="flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
                >
                  Start Free Trial <ArrowRight className="size-4" strokeWidth={2} />
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
                <Play className="size-4" strokeWidth={2} /> Watch Demo
              </button>
            </div>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <img
              src="/hero-dashboard.jpg"
              alt="SLASH CRM Dashboard"
              className="w-full rounded-xl border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
            />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <div className="border-y border-slate-200 bg-slate-50/60 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-6 text-sm text-slate-500">Trusted by 1,200+ client service teams</p>
          <img
            src="/integration-logos.jpg"
            alt="Partner integrations"
            className="mx-auto h-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
        </div>
      </div>

      {/* Features */}
      <Section id="features">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>Platform</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Everything you need to manage client relationships
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
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

      {/* Stats */}
      <Section id="stats" className="border-y border-slate-200 bg-slate-50/60">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { num: 10, suffix: 'x', label: 'Faster Onboarding' },
            { num: 2.4, suffix: 'M', prefix: '$', label: 'Client Earnings Tracked' },
            { num: 94, suffix: '%', label: 'Client Retention' },
            { num: 1200, suffix: '+', label: 'Active Teams' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="mb-2 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: ACCENT }}>
                {s.prefix || ''}
                <CountUp end={s.num} duration={2} decimals={s.num < 10 ? 1 : 0} />
                {s.suffix}
              </div>
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Onboarding deep dive */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>Onboarding</span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              From Prospect to Partner in 4 Phases
            </h2>
            <p className="mb-6 text-slate-600">
              Our structured onboarding process ensures every client is set up for success.
              Track progress visually and hit revenue milestones faster.
            </p>
            <ul className="space-y-3">
              {['Setup & Configuration', 'Integration & Data Import', 'Training & Onboarding', 'Go-Live & Revenue'].map((item, i) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <div
                    className="flex size-6 items-center justify-center rounded-full text-xs font-semibold"
                    style={{ backgroundColor: ACCENT_SOFT, color: ACCENT }}
                  >
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src="/onboarding-flow.jpg" alt="Onboarding flow" className="w-full rounded-xl border border-slate-200 shadow-[0_12px_32px_rgba(15,23,42,0.06)]" />
          </div>
        </div>
      </Section>

      {/* Earnings deep dive */}
      <Section className="bg-slate-50/60">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <img src="/earnings-chart.jpg" alt="Earnings chart" className="w-full rounded-xl border border-slate-200 shadow-[0_12px_32px_rgba(15,23,42,0.06)]" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>Earnings</span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Track Every Dollar From $0 to 100x
            </h2>
            <p className="mb-6 text-slate-600">
              Multi-stream revenue tracking with real-time dashboards. Watch your clients grow
              and celebrate every milestone from first dollar to six figures.
            </p>
            <ul className="space-y-3">
              {['Revenue source breakdown', 'Milestone celebrations', 'AI-powered projections', 'Payout management'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="flex size-5 items-center justify-center rounded-full" style={{ backgroundColor: ACCENT_SOFT }}>
                    <Check className="size-3" style={{ color: ACCENT }} strokeWidth={2.5} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* AI deep dive */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>AI Assistant</span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Ask Questions. Get Answers. Take Action.
            </h2>
            <p className="mb-6 text-slate-600">
              Natural language CRM queries that deliver instant insights. No more digging through reports —
              just ask and get visual dashboards in seconds.
            </p>
            <div className="space-y-2">
              {['Show me at-risk clients', "What's our Q3 revenue?", 'Onboard Acme Corp', 'Export TechStart data'].map((cmd) => (
                <div key={cmd} className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                  <MessageSquare className="size-4" style={{ color: ACCENT }} strokeWidth={1.8} />
                  {cmd}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="/ai-chat-demo.jpg" alt="AI chat demo" className="w-full rounded-xl border border-slate-200 shadow-[0_12px_32px_rgba(15,23,42,0.06)]" />
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-slate-50/60">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>Pricing</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Simple, transparent pricing</h2>
        </div>
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className={`text-sm ${!annual ? 'font-semibold text-slate-900' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle annual pricing"
            className="relative h-6 w-11 rounded-full transition-colors"
            style={{ backgroundColor: annual ? ACCENT : '#cbd5e1' }}
          >
            <div className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all ${annual ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
          <span className={`text-sm ${annual ? 'font-semibold text-slate-900' : 'text-slate-500'}`}>
            Annual <span style={{ color: ACCENT }}>(Save 20%)</span>
          </span>
        </div>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
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

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(111,75,216,0.10), transparent 60%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Ready to transform your client relationships?
          </h2>
          <p className="mb-8 text-base text-slate-600 md:text-lg">
            Join 1,200+ teams using SLASH CRM to onboard faster, track earnings smarter, and retain clients longer.
          </p>
          <Link to="/app">
            <button
              className="rounded-md px-8 py-3.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: ACCENT }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
            >
              Start Free Trial — No Credit Card
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md" style={{ backgroundColor: ACCENT }}>
                <Sparkles className="size-3.5 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-sm font-semibold text-slate-900">SLASH CRM</span>
            </div>
            <p className="text-sm text-slate-500">AI-powered client lifecycle management for modern teams.</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-slate-900">Features</a></li>
              <li><a href="#pricing" className="hover:text-slate-900">Pricing</a></li>
              <li><Link to="/app" className="hover:text-slate-900">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-slate-900">Documentation</a></li>
              <li><a className="hover:text-slate-900">API Reference</a></li>
              <li><a className="hover:text-slate-900">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-slate-900">About</a></li>
              <li><a className="hover:text-slate-900">Contact</a></li>
              <li><a className="hover:text-slate-900">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">© 2026 SLASH CRM. All rights reserved.</p>
          <div className="flex gap-4 text-slate-400">
            <BarChart3 className="size-5 cursor-pointer transition-colors hover:text-slate-900" />
            <Shield className="size-5 cursor-pointer transition-colors hover:text-slate-900" />
            <Zap className="size-5 cursor-pointer transition-colors hover:text-slate-900" />
          </div>
        </div>
      </footer>
    </div>
  )
}
