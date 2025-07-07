
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
          setTimeout(() => {
            createAdminProfile(session.user);
          }, 100);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Current session:', session);
          setSession(session);
          setUser(session?.user ?? null);
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

  const createAdminProfile = async (user: User) => {
    try {
      console.log('Creating admin profile for user:', user.id);
      
      // التحقق من وجود الملف الشخصي
      const { data: existingProfile, error: fetchError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching admin profile:', fetchError);
        return;
      }

      if (!existingProfile) {
        // إنشاء ملف شخصي جديد
        const { error: insertError } = await supabase
          .from('admin_profiles')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('Error creating admin profile:', insertError);
        } else {
          console.log('Admin profile created successfully');
        }
      }
    } catch (error) {
      console.error('Error in createAdminProfile:', error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);

    try {
      console.log('Attempting login with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful:', data);
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم"
      });

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message === 'Invalid login credentials' 
        ? 'بيانات الدخول غير صحيحة' 
        : error.message;
      
      toast({
        title: "خطأ في تسجيل الدخول",
        description: errorMessage,
        variant: "destructive"
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

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
