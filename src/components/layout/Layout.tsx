import { useLocation } from 'react-router';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="app-workspace flex min-h-screen bg-[#f7f8fb] text-[#2f3137]">
      <Navbar />
      <main className="min-w-0 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
