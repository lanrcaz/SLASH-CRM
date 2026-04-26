import { HashRouter } from 'react-router'

type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <HashRouter>{children}</HashRouter>
}
