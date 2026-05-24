
CREATE TABLE public.school_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  contact_person text NOT NULL,
  role text,
  email text NOT NULL,
  phone text,
  city text,
  student_count integer,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.school_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a school lead"
ON public.school_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view school leads"
ON public.school_leads FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update school leads"
ON public.school_leads FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete school leads"
ON public.school_leads FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
