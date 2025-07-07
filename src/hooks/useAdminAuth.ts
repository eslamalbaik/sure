
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // إنشاء الملف الشخصي عند تسجيل الدخول لأول مرة
        if (event === 'SIGNED_IN' && session?.user) {
          await createAdminProfile(session.user);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Current session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createAdminProfile = async (user: User) => {
    try {
      // التحقق من وجود الملف الشخصي
      const { data: existingProfile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!existingProfile) {
        // إنشاء ملف شخصي جديد
        const { error } = await supabase
          .from('admin_profiles')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error creating admin profile:', error);
        }
      }
    } catch (error) {
      console.error('Error in createAdminProfile:', error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('Login successful:', data);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم"
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, fullName: string) => {
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      // Create admin user record
      if (data.user) {
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
      }

      console.log('Signup successful:', data);
      toast({
        title: "تم إنشاء الحساب",
        description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب"
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "خطأ في إنشاء الحساب",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
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
