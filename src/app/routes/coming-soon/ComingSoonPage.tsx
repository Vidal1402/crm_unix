import { useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { TOP_NAV_ITEMS } from '@/app/layout/nav-config';
import { SectionStub } from '@/components/SectionStub';

export default function ComingSoonPage() {
  const { pathname } = useLocation();
  const item = TOP_NAV_ITEMS.find((n) => n.to === pathname);
  return (
    <SectionStub
      icon={item?.icon ?? Sparkles}
      title={item?.label ?? 'Em breve'}
      description="Módulo Traction em construção neste portal. Os dados comerciais continuam em Visão Geral, CRM, Leads e Pipeline."
    />
  );
}
