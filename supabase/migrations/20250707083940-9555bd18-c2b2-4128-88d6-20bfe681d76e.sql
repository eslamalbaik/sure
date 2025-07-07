
-- إضافة جدول للملفات الشخصية للمديرين
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إضافة جدول لتتبع الردود التلقائية لتجنب إرسال رد متكرر
CREATE TABLE public.auto_reply_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID REFERENCES public.consultations NOT NULL,
  user_email TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(consultation_id, user_email)
);

-- تمكين RLS للجداول الجديدة
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_reply_log ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للملفات الشخصية للمديرين
CREATE POLICY "Admins can view their own profile" 
  ON public.admin_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can update their own profile" 
  ON public.admin_profiles 
  FOR ALL 
  USING (auth.uid() = user_id);

-- سياسات الأمان لسجل الردود التلقائية
CREATE POLICY "Authenticated users can view auto reply log" 
  ON public.auto_reply_log 
  FOR SELECT 
  USING (true);

CREATE POLICY "System can insert auto reply log" 
  ON public.auto_reply_log 
  FOR INSERT 
  WITH CHECK (true);

-- إضافة فهرس لتحسين الأداء
CREATE INDEX idx_consultations_email ON public.consultations(email);
CREATE INDEX idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX idx_consultations_status ON public.consultations(status);
