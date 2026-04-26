import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import Onboarding from './pages/Onboarding'
import Offboarding from './pages/Offboarding'
import Prospects from './pages/Prospects'
import Earnings from './pages/Earnings'
import Services from './pages/Services'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Layout>
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
    </Layout>
  )
}
