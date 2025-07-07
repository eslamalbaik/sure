
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminAuthForm from './AdminAuthForm';
import AdminLoadingSpinner from './AdminLoadingSpinner';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminAuth = () => {
  const { toast } = useToast();
  const { user, session, loading, handleLogin, handleSignup, handleLogout } = useAdminAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const onLogin = async (email: string, password: string) => {
    await handleLogin(email, password);
  };

  const onSignup = async (email: string, password: string, fullName: string) => {
    await handleSignup(email, password, fullName);
  };

  const onSignupWithValidation = async (email: string, password: string, confirmPassword: string, fullName: string) => {
    if (password !== confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive"
      });
      return;
    }
    await onSignup(email, password, fullName);
  };

  if (loading) {
    return <AdminLoadingSpinner />;
  }

  if (user && session) {
    return <AdminDashboard />;
  }

  return (
    <AdminAuthForm
      authMode={authMode}
      onAuthModeChange={setAuthMode}
      onLogin={onLogin}
      onSignup={(email, password, fullName) => onSignup(email, password, fullName)}
      loading={loading}
    />
  );
};

export default AdminAuth;
