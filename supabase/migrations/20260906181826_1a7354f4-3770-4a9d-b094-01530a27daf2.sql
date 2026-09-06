CREATE TABLE public.counsellor_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  grade TEXT,
  school_name TEXT,
  mobile TEXT NOT NULL,
  email TEXT,
  preferred_date DATE NOT NULL,
  preferred_slot TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'video',
  report_token TEXT,
  holland_code TEXT,
  top_stream TEXT,
  chosen_profession TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.counsellor_bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.counsellor_bookings TO authenticated;
GRANT ALL ON public.counsellor_bookings TO service_role;
ALTER TABLE public.counsellor_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a booking" ON public.counsellor_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view bookings" ON public.counsellor_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update bookings" ON public.counsellor_bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete bookings" ON public.counsellor_bookings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_counsellor_bookings_updated_at BEFORE UPDATE ON public.counsellor_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();