
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AdminAuthFormProps {
  authMode: 'login' | 'signup';
  onAuthModeChange: (mode: 'login' | 'signup') => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, fullName: string) => void;
  loading: boolean;
}

const AdminAuthForm = ({ 
  authMode, 
  onAuthModeChange, 
  onLogin, 
  onSignup, 
  loading 
}: AdminAuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'login') {
      onLogin(formData.email, formData.password);
    } else {
      if (formData.password !== formData.confirmPassword) {
        return;
      }
      onSignup(formData.email, formData.password, formData.fullName);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#1a365d]">
            {authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </CardTitle>
          <CardDescription>
            {authMode === 'login' 
              ? 'الدخول إلى لوحة تحكم الإدارة' 
              : 'إنشاء حساب إدارة جديد'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="كلمة المرور"
                required
              />
            </div>

            {authMode === 'signup' && (
              <div>
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="تأكيد كلمة المرور"
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90"
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : (authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب')}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => onAuthModeChange(authMode === 'login' ? 'signup' : 'login')}
            >
              {authMode === 'login' 
                ? 'ليس لديك حساب؟ إنشاء حساب جديد' 
                : 'لديك حساب؟ تسجيل الدخول'
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuthForm;
