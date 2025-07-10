
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';

export const useAdminAuth = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
          setUser(null);
          setSession(null);
          return;
        }

        // ❌ ما نسجلش اليوزر على طول غير لما نتحقق من إنه أدمن
        const { data: isAdmin } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (isAdmin) {
          setSession(session);
          setUser(session.user);
        } else {
          setSession(null);
          setUser(null);
        }

      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError || !authData?.user) {
        throw new Error('بيانات الدخول غير صحيحة');
      }

      const user = authData.user;

      const { data: isAdmin, error: adminCheckError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (adminCheckError || !isAdmin) {
        throw new Error("هذا الحساب غير مسجّل كأدمن");
      }

      const { data: allAdmins } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('role', 'admin');

      if (!allAdmins || allAdmins.length !== 1 || allAdmins[0].user_id !== user.id) {
        throw new Error("عدد الأدمنات غير مسموح أو الحساب ليس الأدمن الوحيد");
      }

      setUser(user);
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم"
      });

      return { success: true };

    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive"
      });

      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // باقي الفانكشنات (handleSignup, handleLogout) زي ما هي شغالة تمام
  const handleSignup = async (email: string, password: string, fullName: string) => {
    setLoading(true);

    try {
      console.log('Attempting signup with:', email);
      
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      // Create admin user record
      if (data.user && !data.session) {
        console.log('User created, waiting for email confirmation');
        toast({
          title: "تم إنشاء الحساب",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب"
        });
      } else if (data.user && data.session) {
        // Create admin user record
        const { error: adminError } = await supabase
          .from('admin_users')
          .insert({
            user_id: data.user.id,
            email: email,
            role: 'admin'
          });

        if (adminError) {
          console.error('Error creating admin user:', adminError);
        }

        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "مرحباً بك في لوحة التحكم"
        });
      }

      console.log('Signup successful:', data);
      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.message === 'User already registered' 
        ? 'هذا الإيميل مسجل مسبقاً' 
        : error.message;
      
      toast({
        title: "خطأ في إنشاء الحساب",
        description: errorMessage,
        variant: "destructive"
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح"
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message,
        variant: "destructive"
      });
    }
  };


  return {
    user,
    session,
    loading,
    handleLogin,
    handleSignup,
    handleLogout
  };
};

