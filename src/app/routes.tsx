import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Clients = lazy(() => import('@/pages/Clients'))
const ClientDetail = lazy(() => import('@/pages/ClientDetail'))
const Onboarding = lazy(() => import('@/pages/Onboarding'))
const Offboarding = lazy(() => import('@/pages/Offboarding'))
const Prospects = lazy(() => import('@/pages/Prospects'))
const Earnings = lazy(() => import('@/pages/Earnings'))
const Services = lazy(() => import('@/pages/Services'))
const Reports = lazy(() => import('@/pages/Reports'))
const Settings = lazy(() => import('@/pages/Settings'))

function RouteFallback() {
  return <div className="min-h-screen bg-white" />
}

export default function AppRoutes() {
  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/clients" element={<Clients />} />
          <Route path="/app/clients/:id" element={<ClientDetail />} />
          <Route path="/app/onboarding" element={<Onboarding />} />
          <Route path="/app/offboarding" element={<Offboarding />} />
          <Route path="/app/prospects" element={<Prospects />} />
          <Route path="/app/earnings" element={<Earnings />} />
          <Route path="/app/services" element={<Services />} />
          <Route path="/app/reports" element={<Reports />} />
          <Route path="/app/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
