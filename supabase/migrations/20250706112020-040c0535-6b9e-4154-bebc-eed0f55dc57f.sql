
-- Create consultations table
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('medical', 'personal')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit consultations)
CREATE POLICY "Anyone can submit consultations" 
  ON public.consultations 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for admin select (only authenticated users can view)
CREATE POLICY "Authenticated users can view consultations" 
  ON public.consultations 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create policy for admin updates
CREATE POLICY "Authenticated users can update consultations" 
  ON public.consultations 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Enable realtime for live updates
ALTER TABLE public.consultations REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.consultations;

-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can view their own data" 
  ON public.admin_users 
  FOR ALL 
  TO authenticated
  USING (user_id = auth.uid());
