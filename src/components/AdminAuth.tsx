
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminAuthForm from './AdminAuthForm';
import AdminLoadingSpinner from './AdminLoadingSpinner';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminAuth = () => {
  const { toast } = useToast();
  const { user, session, loading, handleLogin, handleLogout } = useAdminAuth();

  const onLogin = async (email: string, password: string) => {
    await handleLogin(email, password);
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  if (user && session) {
    return <AdminDashboard />;
  }

  return (
    <AdminAuthForm
      authMode="login"
      onAuthModeChange={() => {}}
      onLogin={onLogin}
      onSignup={() => {}}
      loading={loading}
    />
  );
};

export default AdminAuth;
