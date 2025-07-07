
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Key } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AdminProfile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    email: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // جلب بيانات الملف الشخصي
      const { data: profileData, error: profileError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile fetch error:', profileError);
      }

      setProfile({
        full_name: profileData?.full_name || '',
        phone: profileData?.phone || '',
        email: user.email || ''
      });

    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل بيانات الملف الشخصي",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير موجود');

      // تحديث بيانات الملف الشخصي
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .upsert({
          user_id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      // تحديث الإيميل إذا تم تغييره
      if (profile.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: profile.email
        });

        if (emailError) {
          console.error('Email update error:', emailError);
          throw emailError;
        }

        toast({
          title: "تحديث الإيميل",
          description: "تم إرسال رسالة تأكيد إلى الإيميل الجديد"
        });
      }

      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم حفظ التغييرات بنجاح"
      });

    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "خطأ في التحديث",
        description: error.message || "حدث خطأ أثناء تحديث البيانات",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمات المرور الجديدة غير متطابقة",
        variant: "destructive"
      });
      return;
    }

    if (passwordForm.new_password.length < 6) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.new_password
      });

      if (error) throw error;

      toast({
        title: "تم تحديث كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح"
      });

      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

    } catch (error: any) {
      console.error('Password update error:', error);
      toast({
        title: "خطأ في تحديث كلمة المرور",
        description: error.message || "حدث خطأ أثناء تحديث كلمة المرور",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1a365d]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] mb-2">الملف الشخصي</h1>
        <p className="text-gray-600">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* معلومات الملف الشخصي */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={updateProfile} className="space-y-6">
                <div>
                  <Label htmlFor="full_name">الاسم الكامل</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="أدخل اسمك الكامل"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="البريد الإلكتروني"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="رقم الهاتف"
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90"
                >
                  {updating ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* تغيير كلمة المرور */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                تغيير كلمة المرور
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    تغيير كلمة المرور
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>تغيير كلمة المرور</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={updatePassword} className="space-y-4">
                    <div>
                      <Label htmlFor="new_password">كلمة المرور الجديدة</Label>
                      <Input
                        id="new_password"
                        type="password"
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                        required
                        minLength={6}
                        className="mt-2"
                        placeholder="أدخل كلمة مرور جديدة"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirm_password">تأكيد كلمة المرور</Label>
                      <Input
                        id="confirm_password"
                        type="password"
                        value={passwordForm.confirm_password}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                        required
                        minLength={6}
                        className="mt-2"
                        placeholder="أكد كلمة المرور الجديدة"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90">
                      تحديث كلمة المرور
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
