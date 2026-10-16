import type { ReactElement } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { useSupabaseConfig } from '@/hooks/useSupabase';
import { useAuth } from './providers/AuthProvider';
import { isAuthCallbackLocation } from '@/lib/auth-callback';
import { useAppUser } from './providers/AppUserProvider';
import { homePath } from '@/lib/home-path';
import SetupPage from './routes/setup/SetupPage';
import LoginPage from './routes/auth/LoginPage';
import SignupPage from './routes/auth/SignupPage';
import InvitePage from './routes/invite/InvitePage';
import DashboardPage from './routes/dashboard/DashboardPage';
import InboxPage from './routes/inbox/InboxPage';
import CampaignsPage from './routes/campaigns/CampaignsPage';
import ContactsPage from './routes/contacts/ContactsPage';
import ContactDetailPage from './routes/contacts/ContactDetailPage';
import FunilPage from './routes/funil/FunilPage';
import SettingsPage from './routes/settings/SettingsPage';
import SaasTenantsPage from './routes/saas/SaasTenantsPage';
import SaasTenantDetailPage from './routes/saas/SaasTenantDetailPage';
import SaasAdminsPage from './routes/saas/SaasAdminsPage';
import ComingSoonPage from './routes/coming-soon/ComingSoonPage';

function HomeRedirect() {
  const { isSuperAdmin, loading } = useAppUser();
  if (loading) return null;
  return <Navigate to={homePath(isSuperAdmin)} replace />;
}

function RequireSetup({ children }: { children: ReactElement }) {
  const { configured } = useSupabaseConfig();
  const location = useLocation();
  if (!configured) {
    return <Navigate to="/setup" state={{ from: location.pathname }} replace />;
  }
  return children;
}

function RequireSession({ children }: { children: ReactElement }) {
  const { session, loading } = useAuth();
  const location = useLocation();
  if (loading && !session) return null;
  if (!session) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }
  return children;
}

function RedirectIfConfigured({ children }: { children: ReactElement }) {
  const { configured } = useSupabaseConfig();
  const { session } = useAuth();
  const location = useLocation();
  if (isAuthCallbackLocation(location.search, location.hash)) {
    return null;
  }
  if (configured) {
    return session ? <HomeRedirect /> : <Navigate to="/auth/login" replace />;
  }
  return children;
}

function RequireSuperAdmin({ children }: { children: ReactElement }) {
  const { isSuperAdmin, loading } = useAppUser();
  if (loading && !isSuperAdmin) return null;
  if (!isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function RedirectIfAuthenticated({ children }: { children: ReactElement }) {
  const { session, loading } = useAuth();
  const { isSuperAdmin, loading: userLoading } = useAppUser();
  if (loading || userLoading) return children;
  if (session) {
    return <Navigate to={homePath(isSuperAdmin)} replace />;
  }
  return children;
}

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/setup"
        element={
          <RedirectIfConfigured>
            <SetupPage />
          </RedirectIfConfigured>
        }
      />

      <Route
        path="/auth/login"
        element={
          <RequireSetup>
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          </RequireSetup>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <RequireSetup>
            <RedirectIfAuthenticated>
              <SignupPage />
            </RedirectIfAuthenticated>
          </RequireSetup>
        }
      />
      <Route path="/invite" element={<InvitePage />} />

      <Route
        element={
          <RequireSetup>
            <RequireSession>
              <AppLayout />
            </RequireSession>
          </RequireSetup>
        }
      >
        <Route index element={<HomeRedirect />} />
        <Route
          path="/saas"
          element={
            <RequireSuperAdmin>
              <SaasTenantsPage />
            </RequireSuperAdmin>
          }
        />
        <Route
          path="/saas/admins"
          element={
            <RequireSuperAdmin>
              <SaasAdminsPage />
            </RequireSuperAdmin>
          }
        />
        <Route
          path="/saas/:id"
          element={
            <RequireSuperAdmin>
              <SaasTenantDetailPage />
            </RequireSuperAdmin>
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inbox" element={<InboxPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/templates" element={<Navigate to="/campaigns?tab=templates" replace />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        <Route path="/funil" element={<FunilPage />} />
        <Route path="/automacao" element={<ComingSoonPage />} />
        <Route path="/playbooks" element={<ComingSoonPage />} />
        <Route path="/inteligencia" element={<ComingSoonPage />} />
        <Route path="/roi" element={<ComingSoonPage />} />
        <Route path="/projetos" element={<Navigate to="/funil" replace />} />
        <Route path="/educacao" element={<Navigate to="/funil" replace />} />
        <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />
        <Route path="/settings/profile" element={<SettingsPage />} />
        <Route path="/settings/credentials" element={<Navigate to="/settings/profile" replace />} />
      </Route>

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
