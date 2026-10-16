import {
  LayoutDashboard,
  Inbox,
  Megaphone,
  Users,
  Settings,
  type LucideIcon,
  SquareKanban,
  Building2,
  Shield,
  Bot,
  BookOpen,
  LineChart,
  Calculator,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

export const PLATFORM_NAV_ITEMS: NavItem[] = [
  { to: '/saas', label: 'Clientes', icon: Building2 },
  { to: '/saas/admins', label: 'Acesso', icon: Shield },
];

export const TOP_NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard },
  { to: '/inbox', label: 'CRM', icon: Inbox },
  { to: '/contacts', label: 'Leads', icon: Users },
  { to: '/funil', label: 'Pipeline', icon: SquareKanban },
  { to: '/automacao', label: 'Automação (IA)', icon: Bot },
  { to: '/playbooks', label: 'Playbooks', icon: BookOpen },
  { to: '/inteligencia', label: 'Inteligência', icon: LineChart },
  { to: '/roi', label: 'Calculadora ROI', icon: Calculator },
];

export const NAV_ITEMS: NavItem[] = [
  ...TOP_NAV_ITEMS,
  { to: '/campaigns', label: 'Disparos', icon: Megaphone },
  { to: '/settings/profile', label: 'Configurações', icon: Settings },
];
