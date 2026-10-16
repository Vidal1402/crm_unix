import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { PLATFORM_NAV_ITEMS, TOP_NAV_ITEMS } from './nav-config';
import { toast } from 'sonner';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { useAuth } from '@/app/providers/AuthProvider';
import { TractionLogo } from '@/components/brand/TractionLogo';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick?: () => void;
  platform?: boolean;
}

export function Header({ onMenuClick, platform = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = platform ? PLATFORM_NAV_ITEMS : TOP_NAV_ITEMS;
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success('Sessão encerrada.');
    navigate('/auth/login', { replace: true });
  };

  return (
    <header
      className="h-[4.25rem] shrink-0 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-3 sm:px-5 gap-3"
      role="banner"
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="md:hidden h-11 w-11 flex items-center justify-center rounded-xl text-[#6B7280] hover:bg-[#F3F4F6]"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block shrink-0">
          <TractionLogo compact />
        </div>
      </div>

      <nav
        className="hidden md:flex flex-1 justify-center min-w-0 overflow-x-auto"
        aria-label="Seções Traction"
      >
        <div className="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] p-1">
          {items.map((item) => {
            const active =
              item.to === '/saas'
                ? location.pathname === '/saas'
                : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/saas' || item.to === '/dashboard'}
                className={cn(
                  'whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                  active ? 'bg-[#111827] text-white' : 'text-[#4B5563] hover:text-[#111827]',
                )}
                title={item.comingSoon ? 'Ainda não funciona — módulo em construção' : undefined}
              >
                {item.label}
                {item.comingSoon ? (
                  <span className={cn('ml-1.5 text-[10px] font-semibold uppercase tracking-wide', active ? 'text-amber-300' : 'text-amber-600')}>
                    em breve
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="flex items-center gap-2 shrink-0">
        {!platform ? <NotificationsDropdown /> : null}
        <div className="hidden xl:block text-right leading-tight mr-1">
          <div className="text-[10px] font-medium text-[#6B7280]">
            {platform ? 'Super Admin' : 'Conectado'}
          </div>
          <div className="text-xs font-medium text-[#111827] max-w-[180px] truncate">
            {user?.email ?? '—'}
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Sair" onClick={handleLogout}>
          <LogOut className="h-4.5 w-4.5" />
        </Button>
      </div>
    </header>
  );
}
