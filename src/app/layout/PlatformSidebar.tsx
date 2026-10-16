import { NavLink } from 'react-router-dom';
import { PLATFORM_NAV_ITEMS } from './nav-config';
import { TractionMark } from '@/components/brand/TractionLogo';

export function PlatformSidebar() {
  return (
    <aside
      className="app-sidebar hidden md:flex md:flex-col w-[72px] shrink-0 sticky top-0 h-screen"
      aria-label="Navegação da plataforma"
    >
      <div className="h-[4.25rem] grid place-items-center text-[#111827]">
        <TractionMark className="h-6 w-6" />
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {PLATFORM_NAV_ITEMS.map(({ to, label, icon: Icon, comingSoon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/saas'}
            title={comingSoon ? `${label} — Super Admin ainda não está ativo neste banco` : label}
            className="sidebar-link"
          >
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.7} />
            <span className="sr-only">{comingSoon ? `${label} (em breve)` : label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
