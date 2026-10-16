import type { ReactNode } from 'react';
import { useAppUser } from '@/app/providers/AppUserProvider';
import { hasPlanFeature, type PlanFeature } from '@/lib/plans';
import { PlanLocked } from './PlanLocked';

export function FeatureGate({ feature, children }: { feature: PlanFeature; children: ReactNode }) {
  const { plan, loading } = useAppUser();
  if (loading) {
    return children;
  }
  if (!hasPlanFeature(plan, feature)) {
    return <PlanLocked feature={feature} />;
  }
  return children;
}
